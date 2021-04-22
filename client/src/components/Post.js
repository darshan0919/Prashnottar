import React, { useState, useContext, useEffect } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import Modal from "react-modal";

import { Form, Button } from "semantic-ui-react";
import { Avatar } from "@material-ui/core";

import QuestionModal from "./QuestionModal";
import Answer from "./Answer";
import "./Post.css";

import {
    FETCH_USER_QUERY,
    FETCH_POST_QUERY,
    CREATE_ANSWER_MUTATION,
    EDIT_POST_MUTATION,
    DELETE_POST_MUTATION,
    FETCH_POSTS_QUERY,
} from "../util/graphql";

import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";
import MoreMenu from "./MoreMenu";
import moment from "moment";
import SlateEditor from "./SlateEditor";

function Post({ id, singleAnswer }) {
    console.log("postID", id);
    const { user: authUser } = useContext(AuthContext);
    const [IsModalOpen, setIsModalOpen] = useState(false);
    const { loading, data: post } = useQuery(FETCH_POST_QUERY, {
        variables: {
            postId: id,
        },
    });

    const [getPostUser, { data: postUser }] = useLazyQuery(FETCH_USER_QUERY, {
        onError(err) {
            console.log("onerror", err);
        },
    });

    useEffect(() => {
        if (!loading && post) {
            getPostUser({
                variables: {
                    id: post.getPost.user,
                },
            });
        }
    }, [loading, post, getPostUser]);

    const [IsModalOpenPost, setIsModalOpenPost] = useState(false);

    const {
        onChange: onChangePost,
        onSubmit: onSubmitPost,
        values: valuesPost,
        error: errorPost,
    } = useForm(editPostCallback, {
        postId: id,
        question: "",
        imageUrl: "",
    });

    useEffect(() => {
        if (!loading && post) {
            valuesPost.question = post.getPost.question;
            valuesPost.imageUrl = post.getPost.imageUrl;
        }
    }, [loading]);

    const [editPost] = useMutation(EDIT_POST_MUTATION, {
        variables: valuesPost,
        update(proxy, result) {
            const data = {
                ...proxy.readQuery({
                    query: FETCH_POST_QUERY,
                    variables: {
                        postId: id,
                    },
                }),
            };
            data.getPost = {
                ...data.getPost,
                ...result.data.editPost,
            };
            console.log(data.getPost);
            proxy.writeQuery({
                query: FETCH_POST_QUERY,
                variables: {
                    postId: id,
                },
                data,
            });
        },
    });
    function editPostCallback() {
        //console.log(valuesPost);
        editPost();
        setIsModalOpenPost(false);
    }

    const [deletePost] = useMutation(DELETE_POST_MUTATION, {
        variables: { postId: id },
        update(proxy, result) {
            const data = {
                ...proxy.readQuery({
                    query: FETCH_POSTS_QUERY,
                }),
            };
            if (result.data) {
                const postIndex = data.getPosts.findIndex(({ id: postId }) => {
                    return id === postId;
                });
                console.log("postIndex", postIndex);
                data.getPosts = [
                    ...data.getPosts.slice(0, postIndex),
                    ...data.getPosts.slice(postIndex + 1),
                ];
                proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
                if (
                    window.location.href.startsWith(
                        "http://localhost:3000/posts"
                    )
                )
                    window.location.href = "http://localhost:3000/home";
            } else {
                console.log("Server failed in deleting Post!");
            }
        },
    });

    const [showAddAnswer, setShowAddAnswer] = useState(true);

    const [values, setValues] = useState({
        postId: id,
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

    const [createAnswer] = useMutation(CREATE_ANSWER_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = {
                ...proxy.readQuery({
                    query: FETCH_POST_QUERY,
                    variables: { postId: id },
                }),
            };
            data.getPost = {
                ...data.getPost,
                answers: result.data.createAnswer.answers,
            };
            proxy.writeQuery({
                query: FETCH_POST_QUERY,
                variables: { postId: id },
                data,
            });
            //setShowAddAnswer(false);

            values.body = JSON.stringify([
                {
                    type: "paragraph",
                    children: [{ text: "This is editable " }],
                },
            ]);
        },
    });

    function createAnswerCallback() {
        createAnswer();
        setIsModalOpen(false);
    }

    return loading || !postUser ? (
        <></>
    ) : (
        <div className="post">
            <div className="post__info">
                <Avatar src={postUser.getUser.photo} />
                <h4>{postUser.getUser.username}</h4>
                <span>·</span>
                <small>{moment(post.getPost.createdAt).fromNow()} </small>
                <div className="MenuButton">
                    <MoreMenu
                        {...{
                            Edit: {
                                func: () => setIsModalOpenPost(true),
                                show: postUser.getUser.id === authUser.id,
                            },
                            Delete: {
                                func: deletePost,
                                show: postUser.getUser.id === authUser.id,
                            },
                        }}
                    />
                </div>
            </div>
            <div className="post__body">
                <div className="post__question">
                    <Link className="p" to={`/posts/${id}`}>
                        {post.getPost.question}
                    </Link>
                    {showAddAnswer ? (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="post__btnAnswer"
                        >
                            Answer
                        </button>
                    ) : (
                        <></>
                    )}
                    <Modal
                        isOpen={IsModalOpen}
                        onRequestClose={() => setIsModalOpen(false)}
                        shouldCloseOnOverlayClick={false}
                        style={{
                            overlay: {
                                width: 650,
                                height: 650,
                                background: "none",
                                zIndex: "1000",
                                top: "50%",
                                left: "50%",
                                marginTop: "-400px",
                                marginLeft: "-350px",
                                scrollbarWidth: "1px",
                            },
                        }}
                    >
                        <div className="modal__question">
                            <h2>{post.getPost.question}</h2>
                            <p>
                                asked by{" "}
                                <span className="name">
                                    {postUser.getUser.username}
                                </span>{" "}
                                <span className="time">
                                    {moment(post.getPost.createdAt).fromNow()}
                                </span>
                            </p>
                        </div>
                        <div className="modal__FieldAnswer modal__SlateFieldAnswer">
                            <SlateEditor
                                placeholder={`Enter your answer here...`}
                                onChange={onChange}
                                value={JSON.parse(values.body)}
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
                                type="submit"
                                className="add"
                                onClick={createAnswerCallback}
                            >
                                Add Answer
                            </Button>
                        </div>
                    </Modal>
                </div>
                <QuestionModal
                    {...{
                        IsModalOpen: IsModalOpenPost,
                        setIsModalOpen: setIsModalOpenPost,
                        onSubmit: onSubmitPost,
                        onChange: onChangePost,
                        values: valuesPost,
                        error: errorPost,
                    }}
                />
                <img src={post.getPost.imageUrl} alt="" />
                <div className="post__answer">
                    {loading ? (
                        <></>
                    ) : singleAnswer ? (
                        post.getPost.answers.slice(0, 1).map((Id) => (
                            <Answer
                                key={Id}
                                id={Id}
                                postId={id}
                                postUser={postUser.getUser.id}
                                postQuestion={post.getPost.question}
                                hasAnswered={() => {
                                    setShowAddAnswer(false);
                                    console.log(showAddAnswer);
                                }}
                            />
                        ))
                    ) : (
                        post.getPost.answers.map((Id) => (
                            <Answer
                                key={Id}
                                id={Id}
                                postId={id}
                                postUser={postUser.getUser.id}
                                postQuestion={post.getPost.question}
                                hasAnswered={() => setShowAddAnswer(false)}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Post;
