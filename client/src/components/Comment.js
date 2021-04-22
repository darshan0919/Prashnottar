import React, { useEffect, useState, useContext } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import Modal from "react-modal";

import { Form, Button } from "semantic-ui-react";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import ReplyIcon from "@material-ui/icons/Reply";
import { Avatar } from "@material-ui/core";

import MoreMenu from "./MoreMenu";
import "./Post.css";
import {
    FETCH_USER_QUERY,
    FETCH_COMMENT_QUERY,
    UPVOTE_COMMENT_MUTATION,
    DOWNVOTE_COMMENT_MUTATION,
    EDIT_COMMENT_MUTATION,
    DELETE_REPLY_MUTATION,
    CREATE_REPLY_MUTATION,
    FETCH_ANSWER_QUERY,
    DELETE_COMMENT_MUTATION,
} from "../util/graphql";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";
import Reply from "./Reply";
import InputModal from "./InputModal";
import moment from "moment";
import SlateEditor from "./SlateEditor";

export default function Comment({ id, answerId, answerUser }) {
    //console.log("Comment", id);

    const { user: authUser } = useContext(AuthContext);
    const { loading, data: comment } = useQuery(FETCH_COMMENT_QUERY, {
        variables: {
            commentId: id,
        },
    });

    const [getCommentUser, { data: commentUser }] = useLazyQuery(
        FETCH_USER_QUERY,
        {
            onError(err) {
                console.log("onerror", err);
            },
        }
    );

    useEffect(() => {
        if (!loading) {
            //console.log("checkComment", comment);
            getCommentUser({
                variables: {
                    id: comment.getComment.user,
                },
            });
        }
    }, [loading, comment, getCommentUser]);

    const [upvoteComment] = useMutation(UPVOTE_COMMENT_MUTATION, {
        variables: {
            commentId: id,
        },
        update(proxy, result) {
            const data = {
                ...proxy.readQuery({
                    query: FETCH_COMMENT_QUERY,
                    variables: {
                        commentId: id,
                    },
                }),
            };
            data.getComment = {
                ...data.getComment,
                ...result.data.upvoteComment,
            };
            proxy.writeQuery({
                query: FETCH_COMMENT_QUERY,
                variables: {
                    commentId: id,
                },
                data,
            });
        },
    });

    const [downvoteComment] = useMutation(DOWNVOTE_COMMENT_MUTATION, {
        variables: {
            commentId: id,
        },
        update(proxy, result) {
            const data = {
                ...proxy.readQuery({
                    query: FETCH_COMMENT_QUERY,
                    variables: {
                        commentId: id,
                    },
                }),
            };
            data.getComment = {
                ...data.getComment,
                ...result.data.downvoteComment,
            };
            proxy.writeQuery({
                query: FETCH_COMMENT_QUERY,
                variables: {
                    commentId: id,
                },
                data,
            });
        },
    });

    const [IsModalOpen, setIsModalOpen] = useState(false);

    const [values, setValues] = useState({
        commentId: id,
        body: JSON.stringify([
            {
                type: "paragraph",
                children: [{ text: "This is editable " }],
            },
        ]),
    });

    const onChange = (body) => {
        setValues({ ...values, body: JSON.stringify(body) });
    };

    useEffect(() => {
        if (!loading) {
            values.body = comment.getComment.body;
        }
    }, [loading]);

    const [editComment] = useMutation(EDIT_COMMENT_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = {
                ...proxy.readQuery({
                    query: FETCH_COMMENT_QUERY,
                    variables: {
                        commentId: id,
                    },
                }),
            };
            data.getComment = {
                ...data.getComment,
                ...result.data.editComment,
            };
            proxy.writeQuery({
                query: FETCH_COMMENT_QUERY,
                variables: {
                    commentId: id,
                },
                data,
            });
        },
    });
    function editCommentCallback() {
        console.log(values);
        editComment();
        setIsModalOpen(false);
    }

    const [deleteComment] = useMutation(DELETE_COMMENT_MUTATION, {
        variables: {
            commentId: id,
        },
        update(proxy, result) {
            const data = {
                ...proxy.readQuery({
                    query: FETCH_ANSWER_QUERY,
                    variables: { answerId },
                }),
            };
            if (result.data) {
                const commentIndex = data.getAnswer.comments.findIndex(
                    (commentId) => {
                        return id === commentId;
                    }
                );
                data.getAnswer = {
                    ...data.getAnswer,
                    comments: [
                        ...data.getAnswer.comments.slice(0, commentIndex),
                        ...data.getAnswer.comments.slice(commentIndex + 1),
                    ],
                };
                //console.log(data.getAnswer.comments);
                proxy.writeQuery({
                    query: FETCH_ANSWER_QUERY,
                    variables: { answerId },
                    data,
                });
            } else {
                console.log("Server failed to delete comment!");
            }
        },
    });

    const [IsModalOpenReply, setIsModalOpenReply] = useState(false);

    const [valuesReply, setValuesReply] = useState({
        commentId: id,
        body: JSON.stringify([
            {
                type: "paragraph",
                children: [{ text: "This is editable " }],
            },
        ]),
    });

    const onChangeReply = (body) => {
        setValuesReply({ ...valuesReply, body: JSON.stringify(body) });
    };

    const [createReply] = useMutation(CREATE_REPLY_MUTATION, {
        variables: valuesReply,
        update(proxy, result) {
            const data = {
                ...proxy.readQuery({
                    query: FETCH_COMMENT_QUERY,
                    variables: {
                        commentId: id,
                    },
                }),
            };
            data.getComment = {
                ...data.getComment,
                ...result.data.createReply,
            };
            proxy.writeQuery({
                query: FETCH_COMMENT_QUERY,
                variables: {
                    commentId: id,
                },
                data,
            });
            valuesReply.body = JSON.stringify([
                {
                    type: "paragraph",
                    children: [{ text: "This is editable " }],
                },
            ]);
        },
    });

    function createReplyCallback() {
        console.log(valuesReply);
        createReply();
        setIsModalOpenReply(false);
    }

    const [replyId, setReplyId] = useState("");

    const [deleteReply] = useMutation(DELETE_REPLY_MUTATION, {
        variables: {
            replyId,
        },
        update(proxy, result) {
            const data = {
                ...proxy.readQuery({
                    query: FETCH_COMMENT_QUERY,
                    variables: {
                        commentId: id,
                    },
                }),
            };
            const replyIndex = data.getComment.replys.findIndex((id) => {
                return id === replyId;
            });
            data.getComment = {
                ...data.getComment,
                replys: [
                    ...data.getComment.replys.slice(0, replyIndex),
                    ...data.getComment.replys.slice(replyIndex + 1),
                ],
                replyCount: data.getComment.replyCount - 1,
            };
            //console.log(data.getComment.replys);
            proxy.writeQuery({
                query: FETCH_COMMENT_QUERY,
                variables: {
                    commentId: id,
                },
                data,
            });
        },
    });

    useEffect(() => {
        if (replyId) {
            deleteReply();
        }
    }, [replyId]);

    const [showReplys, setShowReplys] = useState(false);

    //return <></>;
    return loading ? (
        <></>
    ) : (
        <div key={id} className="post__single__answer single__comment">
            <div className="answer__info">
                <div className="post__info">
                    <Avatar
                        className="comment"
                        src={
                            commentUser
                                ? commentUser.getUser.photo
                                : "https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/c7fa9a548c4d01b6d80c60bbc6af74bd"
                        }
                    />
                    <div className="comment__info">
                        <h4>
                            {commentUser ? commentUser.getUser.username : ""}
                        </h4>
                        <small>
                            {moment(comment.getComment.createdAt).fromNow()}
                        </small>
                    </div>
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
                    <SlateEditor
                        readOnly={true}
                        value={JSON.parse(comment.getComment.body)}
                    />
                </span>
            </p>
            <div className="post__footer">
                <div className="post__footerAction">
                    <ArrowUpwardOutlinedIcon onClick={upvoteComment} />
                    <span className="values">
                        {comment.getComment.upvoteCount}
                    </span>
                    <span>|</span>
                    <ArrowDownwardOutlinedIcon onClick={downvoteComment} />
                    {/*<span className="values">
                        {comment.getComment.downvoteCount}
                    </span>*/}
                </div>

                <ReplyIcon
                    onClick={() => {
                        setShowReplys(!showReplys);
                    }}
                />
                {comment.getComment.replyCount}
                <InputModal
                    {...{
                        title: "Reply",
                        action: "replied",
                        IsModalOpen: IsModalOpenReply,
                        setIsModalOpen: setIsModalOpenReply,
                        callBack: createReplyCallback,
                        onChange: onChangeReply,
                        values: valuesReply,
                    }}
                />

                <div className="post__footerLeft">
                    <MoreMenu
                        {...{
                            Edit: {
                                func: () => setIsModalOpen(true),
                                show: authUser.id === comment.getComment.user,
                            },
                            Delete: {
                                func: deleteComment,
                                show:
                                    authUser.id === comment.getComment.user ||
                                    authUser.id === answerUser,
                            },
                            Reply: {
                                func: () => setIsModalOpenReply(true),
                                show: true,
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
                        <p>
                            comment last updated{" "}
                            <span className="name">
                                {moment(comment.getComment.createdAt).fromNow()}
                            </span>
                        </p>
                    </div>
                    <div className="modal__Field modal__SlateField">
                        <SlateEditor
                            onChange={onChange}
                            value={JSON.parse(values.body)}
                            placeholder="Enter Your Comment"
                        />
                    </div>
                    <div className="modal__button">
                        <button
                            className="cancle"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </button>
                        <Button
                            type="sumbit"
                            className="add"
                            onClick={editCommentCallback}
                        >
                            Submit
                        </Button>
                    </div>
                </Modal>
            </div>
            {
                <div className="post__answer">
                    {showReplys ? (
                        comment.getComment.replys.map((Id) => (
                            <Reply
                                key={Id}
                                id={Id}
                                commentId={id}
                                commentUser={comment.getComment.user}
                                deleteReplyComment={() => setReplyId(Id)}
                            />
                        ))
                    ) : (
                        <></>
                    )}
                </div>
            }
        </div>
    );
}
