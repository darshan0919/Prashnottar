import React, { useEffect, useState, useContext } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import Modal from "react-modal";
import moment from "moment";

import { Form, Button } from "semantic-ui-react";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import { Avatar } from "@material-ui/core";

import Comment from "./Comment";
import MoreMenu from "./MoreMenu";
import "./Post.css";
import {
    FETCH_USER_QUERY,
    FETCH_ANSWER_QUERY,
    EDIT_ANSWER_MUTATION,
    UPVOTE_ANSWER_MUTATION,
    DOWNVOTE_ANSWER_MUTATION,
    CREATE_COMMENT_MUTATION,
    DELETE_COMMENT_MUTATION,
    DELETE_ANSWER_MUTATION,
    FETCH_POST_QUERY,
} from "../util/graphql";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";
import InputModal from "./InputModal";

export default function Answer({ id, postId, postUser, postQuestion }) {
    console.log("AnswerID", id);
    const { user: authUser } = useContext(AuthContext);
    const { loading, data: answer } = useQuery(FETCH_ANSWER_QUERY, {
        variables: {
            answerId: id,
        },
    });

    const [getAnswerUser, { data: answerUser }] = useLazyQuery(
        FETCH_USER_QUERY,
        {
            onError(err) {
                console.log("onerror", err);
            },
        }
    );

    useEffect(() => {
        if (!loading) {
            getAnswerUser({
                variables: {
                    id: answer.getAnswer.user,
                },
            });
        }
    }, [loading, answer, getAnswerUser]);

    const [upvoteAnswer] = useMutation(UPVOTE_ANSWER_MUTATION, {
        variables: {
            answerId: id,
        },
        update(proxy, result) {
            const data = {
                ...proxy.readQuery({
                    query: FETCH_ANSWER_QUERY,
                    variables: {
                        answerId: id,
                    },
                }),
            };
            data.getAnswer = { ...data.getAnswer, ...result.data.upvoteAnswer };
            proxy.writeQuery({ query: FETCH_ANSWER_QUERY, data });
        },
    });

    const [downvoteAnswer] = useMutation(DOWNVOTE_ANSWER_MUTATION, {
        variables: {
            answerId: id,
        },
        update(proxy, result) {
            const data = {
                ...proxy.readQuery({
                    query: FETCH_ANSWER_QUERY,
                    variables: {
                        answerId: id,
                    },
                }),
            };
            data.getAnswer = {
                ...data.getAnswer,
                ...result.data.downvoteAnswer,
            };
            proxy.writeQuery({ query: FETCH_ANSWER_QUERY, data });
        },
    });

    const [IsModalOpen, setIsModalOpen] = useState(false);

    const { onChange, onSubmit, values } = useForm(editAnswerCallback, {
        answerId: id,
        body: "",
    });

    useEffect(() => {
        if (!loading) {
            values.body = answer.getAnswer.body;
        }
    }, [loading]);

    const [editAnswer] = useMutation(EDIT_ANSWER_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = {
                ...proxy.readQuery({
                    query: FETCH_ANSWER_QUERY,
                    variables: {
                        answerId: id,
                    },
                }),
            };
            data.getAnswer = {
                ...data.getAnswer,
                ...result.data.editAnswer,
            };
            proxy.writeQuery({ query: FETCH_ANSWER_QUERY, data });
        },
    });
    function editAnswerCallback() {
        console.log(values);
        editAnswer();
        setIsModalOpen(false);
    }

    const [deleteAnswer] = useMutation(DELETE_ANSWER_MUTATION, {
        variables: {
            answerId: id,
        },
        update(proxy, result) {
            const data = {
                ...proxy.readQuery({
                    query: FETCH_POST_QUERY,
                    variables: { postId },
                }),
            };
            if (result.data) {
                const answerIndex = data.getPost.answers.findIndex(
                    (answerId) => {
                        return id === answerId;
                    }
                );
                data.getPost = {
                    ...data.getPost,
                    answers: [
                        ...data.getPost.answers.slice(0, answerIndex),
                        ...data.getPost.answers.slice(answerIndex + 1),
                    ],
                };
                //console.log(data.getPost.answers);
                proxy.writeQuery({ query: FETCH_POST_QUERY, data });
            } else {
                console.log("Server failed to remove Answer!");
            }
        },
    });

    const [showComments, setShowComments] = useState(false);

    const [IsModalOpenComment, setIsModalOpenComment] = useState(false);

    const {
        onChange: onChangeComment,
        onSubmit: onSubmitComment,
        values: valuesComment,
    } = useForm(createCommentCallback, {
        answerId: id,
        body: "",
    });

    const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = {
                ...proxy.readQuery({
                    query: FETCH_ANSWER_QUERY,
                    variables: {
                        answerId: id,
                    },
                }),
            };
            data.getAnswer = {
                ...data.getAnswer,
                ...result.data.createComment,
            };
            proxy.writeQuery({ query: FETCH_ANSWER_QUERY, data });
            values.body = "";
        },
    });

    function createCommentCallback() {
        createComment();
        setIsModalOpenComment(false);
    }

    return loading ? (
        <></>
    ) : (
        <div key={id} className="post__single__answer">
            <div className="answer__info">
                <div className="answer">Answer</div>
                {/*<br>*/}
                <div className="post__info">
                    <Avatar
                        src={
                            answerUser
                                ? answerUser.getUser.photo
                                : "https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/c7fa9a548c4d01b6d80c60bbc6af74bd"
                        }
                    />
                    <h4>{answerUser ? answerUser.getUser.username : ""}</h4>
                    <small>
                        {moment(answer.getAnswer.createdAt).fromNow()}
                    </small>
                </div>
            </div>
            <p
                key={id}
                style={{
                    position: "relative",
                    paddingBottom: "5px",
                }}
            >
                <span>
                    {answer.getAnswer.body}
                    <br />
                    <span
                        style={{
                            position: "absolute",
                            color: "gray",
                            fontSize: "small",
                            display: "flex",
                            right: "0px",
                        }}
                    ></span>
                </span>
            </p>
            <div className="post__footer">
                <div className="post__footerAction">
                    <ArrowUpwardOutlinedIcon onClick={upvoteAnswer} />
                    {answer.getAnswer.upvoteCount}
                    <span>|</span>
                    <ArrowDownwardOutlinedIcon onClick={downvoteAnswer} />
                    {answer.getAnswer.downvoteCount}
                </div>

                <ChatBubbleOutlineOutlinedIcon
                    onClick={() => setShowComments(!showComments)}
                />
                <InputModal
                    {...{
                        title: "Comment",
                        action: "commented",
                        IsModalOpen: IsModalOpenComment,
                        setIsModalOpen: setIsModalOpenComment,
                        onSubmit: onSubmitComment,
                        onChange: onChangeComment,
                        values: valuesComment,
                    }}
                />
                {answer.getAnswer.commentCount}
                <div className="post__footerLeft">
                    <MoreMenu
                        {...{
                            Edit: () => {
                                if (authUser.id === answer.getAnswer.user)
                                    setIsModalOpen(true);
                            },
                            Delete: () => {
                                if (
                                    authUser.id === answer.getAnswer.user ||
                                    authUser.id === postUser
                                )
                                    deleteAnswer();
                            },
                            Comment: () => {
                                setIsModalOpenComment(true);
                            },
                        }}
                    />
                </div>
                <Modal
                    isOpen={IsModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    shouldCloseOnOverlayClick={false}
                    style={{
                        overlay: {
                            width: 680,
                            height: 550,
                            backgroundColor: "rgba(0,0,0,0.8)",
                            zIndex: "1000",
                            top: "50%",
                            left: "50%",
                            marginTop: "-250px",
                            marginLeft: "-350px",
                        },
                    }}
                >
                    <div className="modal__question">
                        <h1>{postQuestion}</h1>
                        <p>
                            answer last updated on{" "}
                            <span className="name">
                                {moment(answer.getAnswer.createdAt).fromNow()}
                            </span>
                        </p>
                    </div>
                    <Form onSubmit={onSubmit}>
                        <div className="modal__answer">
                            <textarea
                                name="body"
                                onChange={onChange}
                                value={values.body}
                                placeholder="Enter Your Answer"
                            />
                        </div>
                        <div className="modal__button">
                            <button
                                className="cancle"
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <Button type="sumbit" className="add">
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Modal>
            </div>
            <div className="post__answer">
                {showComments ? (
                    <>
                        <div className="comments">Comments</div>
                        {answer.getAnswer.comments.map((Id) => (
                            <Comment
                                key={Id}
                                id={Id}
                                answerId={id}
                                answerUser={answer.getAnswer.user}
                            />
                        ))}
                    </>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
