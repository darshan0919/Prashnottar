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
        if (!loading) {
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
        if (!loading) {
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
            proxy.writeQuery({ query: FETCH_POST_QUERY, data });
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

    //const [showAddAnswer, setShowAddAnswer] = useState(true);

    const { onChange, onSubmit, values } = useForm(createAnswerCallback, {
        postId: id,
        body: "",
    });

    const [createAnswer] = useMutation(CREATE_ANSWER_MUTATION, {
        variables: values,
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
                answers: result.data.createAnswer.answers,
            };
            proxy.writeQuery({ query: FETCH_POST_QUERY, data });
            //setShowAddAnswer(false);

            values.body = "";
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
                <small>{moment(post.getPost.createdAt).fromNow()} </small>
                <div className="MenuButton">
                    <MoreMenu
                        {...{
                            Edit: () => {
                                if (postUser.getUser.id === authUser.id)
                                    setIsModalOpenPost(true);
                            },
                            Delete: () => {
                                if (postUser.getUser.id === authUser.id)
                                    deletePost();
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
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="post__btnAnswer"
                    >
                        Answer
                    </button>
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
                            <h1>{post.getPost.question}</h1>
                            <p>
                                asked by{" "}
                                <span className="name">
                                    {postUser.getUser.username}
                                </span>{" "}
                                {""}
                                on{" "}
                                <span className="name">
                                    {moment(post.getPost.createdAt).fromNow()}
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
                                {true ? (
                                    <Button type="sumbit" className="add">
                                        Add Answer
                                    </Button>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </Form>
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
                        post.getPost.answers
                            .slice(0, 1)
                            .map((Id) => (
                                <Answer
                                    key={Id}
                                    id={Id}
                                    postId={id}
                                    postUser={postUser.getUser.id}
                                    postQuestion={post.getPost.question}
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
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default Post;
