import React, { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import moment from "moment";

import { Button } from "semantic-ui-react";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import ChatBubbleOutlineOutlinedIcon from "@material-ui/icons/ChatBubbleOutlineOutlined";
import { Avatar } from "@material-ui/core";

import Comment from "../comment/Comment";
import MoreMenu from "../utils/MoreMenu";
import "../qBox.css";
import { AuthContext } from "../../context/auth";
import InputModal from "../modal/InputModal";
import SlateEditor from "../editor/SlateEditor";

import {
    useCreateCommentMutation,
    useDeleteAnswerMutation,
    useEditAnswerMutation,
    useGetAnswerQuery,
    useGetUserQuery,
    useVoteAnswerMutation,
} from "../../hooks";

export default function Answer({
    id,
    postId,
    postUser,
    postQuestion,
    hasAnswered,
    notAnswered,
}: {
    id: string;
    postId: string;
    postUser: string;
    postQuestion: string;
    hasAnswered: () => void;
    notAnswered: () => void;
}) {
    const { user: authUser } = useContext(AuthContext);

    const answer = useGetAnswerQuery(id);

    /// Check if Answer is given by Current User
    useEffect(() => {
        if (answer && authUser) {
            if (answer.user === authUser.id) {
                hasAnswered();
            }
        }
    }, [answer, authUser, hasAnswered]);

    /// answerUser
    const { user: answerUser, setUser: setAnswerUser } = useGetUserQuery();

    useEffect(() => {
        if (answer) setAnswerUser(answer.user);
    }, [answer, setAnswerUser]);

    /// upvote | downvote
    const { upvoteAnswer, downvoteAnswer } = useVoteAnswerMutation(id);

    const {
        IsModalOpen,
        setIsModalOpen,
        onChange,
        editCallback,
        values,
    } = useEditAnswerMutation(id, answer);

    const deleteAnswer = useDeleteAnswerMutation(id, postId);

    /// Show Comments Button
    const [showComments, setShowComments] = useState<boolean>(false);

    /// createComment
    const {
        IsModalOpen: IsModalOpenComment,
        setIsModalOpen: setIsModalOpenComment,
        values: valuesComment,
        onChange: onChangeComment,
        createCallback: createCommentCallback,
    } = useCreateCommentMutation(id);

    return !answer ? (
        <></>
    ) : (
        <div key={id} className="post__single__answer">
            {answerUser ? (
                <div className="answer__info">
                    <div className="answer">Answer</div>
                    <div className="post__info">
                        <Avatar src={answerUser.photo} />
                        <h4>{answerUser.username}</h4>
                        <span>·</span>
                        <small>{moment(answer.createdAt).fromNow()}</small>
                    </div>
                </div>
            ) : (
                <></>
            )}
            <div
                className="p"
                key={id}
                style={{
                    position: "relative",
                    paddingBottom: "5px",
                }}
            >
                <span>
                    <SlateEditor
                        readOnly={true}
                        value={JSON.parse(answer.body)}
                        onChange={onChange}
                        placeholder="Enter Your Reply"
                    />
                </span>
            </div>
            <div className="post__footer">
                <div className="post__footerAction">
                    <ArrowUpwardOutlinedIcon onClick={() => upvoteAnswer()} />
                    <span className="values">{answer.upvoteCount}</span>
                    <span>|</span>
                    <ArrowDownwardOutlinedIcon
                        onClick={() => downvoteAnswer()}
                    />
                </div>

                <ChatBubbleOutlineOutlinedIcon
                    onClick={() => setShowComments(!showComments)}
                />
                <span className="values">{answer.commentCount}</span>

                <InputModal
                    {...{
                        title: "Comment",
                        action: "commented",
                        IsModalOpen: IsModalOpenComment,
                        setIsModalOpen: setIsModalOpenComment,
                        callBack: createCommentCallback,
                        onChange: onChangeComment,
                        values: valuesComment,
                    }}
                />

                <div className="post__footerLeft">
                    <MoreMenu
                        actions={[
                            {
                                name: "Edit",
                                func: () => setIsModalOpen(true),
                                show: authUser.id === answer.user,
                            },
                            {
                                name: "Delete",
                                func: () => {
                                    deleteAnswer();
                                    if (authUser.id === answer.user) {
                                        console.log("showAnswer");
                                        notAnswered();
                                    }
                                },
                                show:
                                    authUser.id === answer.user ||
                                    authUser.id === postUser,
                            },
                            {
                                name: "Comment",
                                func: () => setIsModalOpenComment(true),
                                show: true,
                            },
                        ]}
                    />
                </div>
                <Modal
                    isOpen={IsModalOpen}
                    onRequestClose={() => setIsModalOpen(false)}
                    shouldCloseOnOverlayClick={false}
                    style={{
                        overlay: {
                            width: 700,
                            height: 670,
                            background: "none",
                            zIndex: "3000",
                            top: "50%",
                            left: "50%",
                            marginTop: "-300px",
                            marginLeft: "-375px",
                        },
                        content: {
                            border: "2.5px solid #ccc",
                            borderRadius: "none",
                        },
                    }}
                >
                    <div className="modal__question">
                        <h1>{postQuestion}</h1>
                        <p>
                            answer last updated{" "}
                            <span className="name">
                                {moment(answer.createdAt).fromNow()}
                            </span>
                        </p>
                    </div>

                    <SlateEditor
                        readOnly={false}
                        onChange={onChange}
                        value={JSON.parse(values.body)}
                        placeholder="Enter Your Answer"
                    />

                    <div className="modal__button">
                        <button
                            className="cancel"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </button>
                        <Button
                            type="sumbit"
                            className="add"
                            onClick={editCallback}
                        >
                            Submit
                        </Button>
                    </div>
                </Modal>
            </div>
            <div className="post__answer">
                {showComments ? (
                    <>
                        <div className="comments">Comments</div>
                        {answer.comments.map((Id) => (
                            <Comment
                                key={Id}
                                id={Id}
                                answerId={id}
                                answerUser={answer.user}
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
