import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";

import { Button } from "semantic-ui-react";
import { Avatar } from "@material-ui/core";

import QuestionModal from "../modal/QuestionModal";
import Answer from "../answer/Answer";
import "../qBox.css";

import { AuthContext } from "../../context/auth";
import MoreMenu from "../utils/MoreMenu";
import moment from "moment";
import SlateEditor from "../editor/SlateEditor";

import {
    useCreateAnswerMutation,
    useDeletePostMutation,
    useEditPostMutation,
    useGetPostQuery,
    useGetUserQuery,
} from "../../hooks";

function Post({ id, singleAnswer }: { id: string; singleAnswer: boolean }) {
    //console.log("postID", id);
    const { user: authUser } = useContext(AuthContext);

    /// getPost
    const post = useGetPostQuery(id);

    /// getPostUser
    const { user: postUser, setUser: setPostUser } = useGetUserQuery();

    useEffect(() => {
        if (post) setPostUser(post.user);
    }, [post, setPostUser]);

    /// editPost
    const {
        IsModalOpen,
        setIsModalOpen,
        onChange,
        onSubmit,
        values,
    } = useEditPostMutation(id, post);

    /// deletePost
    const deletePost = useDeletePostMutation(id);

    /// Add Answer Button
    const [showAddAnswer, setShowAddAnswer] = useState<boolean>(true);

    /// addAnswer
    const {
        IsModalOpen: IsModalOpenAnswer,
        setIsModalOpen: setIsModalOpenAnswer,
        values: valuesAnswer,
        onChange: onChangeAnswer,
        createCallback: createCallbackAnswer,
    } = useCreateAnswerMutation(id);

    return !post ? (
        <></>
    ) : (
        <div className="post">
            {postUser ? (
                <div className="post__info">
                    <Avatar src={postUser.photo} />
                    <h4>{postUser.username}</h4>
                    <span>·</span>
                    <small>{moment(post.createdAt).fromNow()} </small>
                    <div className="MenuButton">
                        <MoreMenu
                            actions={[
                                {
                                    name: "Edit",
                                    func: () => setIsModalOpen(true),
                                    show: postUser.id === authUser.id,
                                },
                                {
                                    name: "Delete",
                                    func: deletePost,
                                    show: postUser.id === authUser.id,
                                },
                            ]}
                        />
                    </div>
                </div>
            ) : (
                <></>
            )}
            <div className="post__body">
                <div className="post__question">
                    <Link className="p" to={`/posts/${id}`}>
                        {post.question}
                    </Link>
                    {showAddAnswer ? (
                        <button
                            onClick={() => setIsModalOpenAnswer(true)}
                            className="post__btnAnswer"
                        >
                            Answer
                        </button>
                    ) : (
                        <></>
                    )}
                    {postUser ? (
                        <Modal
                            isOpen={IsModalOpenAnswer}
                            onRequestClose={() => setIsModalOpenAnswer(false)}
                            shouldCloseOnOverlayClick={false}
                            style={{
                                overlay: {
                                    width: 650,
                                    height: 630,
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
                                <h2>{post.question}</h2>
                                <p>
                                    asked by{" "}
                                    <span className="name">
                                        {postUser.username}
                                    </span>{" "}
                                    <span className="time">
                                        {moment(post.createdAt).fromNow()}
                                    </span>
                                </p>
                            </div>
                            <div>
                                <SlateEditor
                                    readOnly={false}
                                    onChange={onChangeAnswer}
                                    value={JSON.parse(valuesAnswer.body)}
                                    placeholder="Enter Your Reply"
                                />
                            </div>
                            <div className="modal__button">
                                <button
                                    className="cancel"
                                    onClick={() => setIsModalOpenAnswer(false)}
                                >
                                    Cancel
                                </button>
                                <Button
                                    type="submit"
                                    className="add"
                                    onClick={createCallbackAnswer}
                                >
                                    Add Answer
                                </Button>
                            </div>
                        </Modal>
                    ) : (
                        <></>
                    )}
                </div>
                {
                    <QuestionModal
                        {...{
                            IsModalOpen,
                            setIsModalOpen,
                            onChange,
                            onSubmit,
                            values,
                        }}
                    />
                }
                <img src={post.imageUrl} alt="" />
                <div className="post__answer">
                    {singleAnswer
                        ? post.answers
                              .slice(0, 1)
                              .map((Id) => (
                                  <Answer
                                      key={Id}
                                      id={Id}
                                      postId={id}
                                      postUser={post.user}
                                      postQuestion={post.question}
                                      hasAnswered={() =>
                                          setShowAddAnswer(false)
                                      }
                                      notAnswered={() => setShowAddAnswer(true)}
                                  />
                              ))
                        : post.answers.map((Id) => (
                              <Answer
                                  key={Id}
                                  id={Id}
                                  postId={id}
                                  postUser={post.user}
                                  postQuestion={post.question}
                                  hasAnswered={() => setShowAddAnswer(false)}
                                  notAnswered={() => setShowAddAnswer(true)}
                              />
                          ))}
                </div>
            </div>
        </div>
    );
}

export default Post;
