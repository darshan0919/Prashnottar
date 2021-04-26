import React, { useEffect, useState, useContext } from "react";
import Modal from "react-modal";

import { Button } from "semantic-ui-react";
import ArrowUpwardOutlinedIcon from "@material-ui/icons/ArrowUpwardOutlined";
import ArrowDownwardOutlinedIcon from "@material-ui/icons/ArrowDownwardOutlined";
import ReplyIcon from "@material-ui/icons/Reply";
import { Avatar } from "@material-ui/core";

import MoreMenu from "../utils/MoreMenu";
import "../qBox.css";
import { AuthContext } from "../../context/auth";
import Reply from "../reply/Reply";
import InputModal from "../modal/InputModal";
import moment from "moment";
import SlateEditor from "../editor/SlateEditor";
import {
    useCreateMutation,
    useDeleteMutation,
    useEditMutation,
    useGetQuery,
    useGetUserQuery,
    useVoteMutation,
} from "../../hooks";

export default function Comment({ id, answerId, answerUser }) {
    //console.log("Comment", id);

    const { user: authUser } = useContext(AuthContext);

    const comment = useGetQuery(id, "comment");

    /// commentUser
    const [commentUser, setCommentUser] = useGetUserQuery();

    useEffect(() => {
        if (comment) {
            setCommentUser(comment.user);
        }
    }, [comment, setCommentUser]);

    /// upvote | downvote
    const upvoteComment = useVoteMutation(id, "comment", "upvote");
    const downvoteComment = useVoteMutation(id, "comment", "downvote");

    const {
        IsModalOpen,
        setIsModalOpen,
        onChange,
        editCallback,
        values,
    } = useEditMutation(id, comment, "comment");

    const deleteComment = useDeleteMutation(id, "comment", answerId, "answer");

    /// Show Replys Button
    const [showReplys, setShowReplys] = useState(false);

    /// createReply
    const {
        IsModalOpen: IsModalOpenReply,
        setIsModalOpen: setIsModalOpenReply,
        values: valuesReply,
        onChange: onChangeReply,
        createCallback: createReplyCallback,
    } = useCreateMutation(id, "comment", "reply");

    //return <></>;
    return !comment ? (
        <></>
    ) : (
        <div key={id} className="post__single__answer single__comment">
            {commentUser ? (
                <div className="answer__info">
                    <div className="post__info">
                        <Avatar className="comment" src={commentUser.photo} />
                        <div className="comment__info">
                            <h4>{commentUser.username}</h4>
                            <small>{moment(comment.createdAt).fromNow()}</small>
                        </div>
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
                        value={JSON.parse(comment.body)}
                    />
                </span>
            </div>
            <div className="post__footer">
                <div className="post__footerAction">
                    <ArrowUpwardOutlinedIcon onClick={upvoteComment} />
                    <span className="values">{comment.upvoteCount}</span>
                    <span>|</span>
                    <ArrowDownwardOutlinedIcon onClick={downvoteComment} />
                </div>

                <ReplyIcon
                    onClick={() => {
                        setShowReplys(!showReplys);
                    }}
                />
                {comment.replyCount}

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
                        actions={[
                            {
                                name: "Edit",
                                func: () => setIsModalOpen(true),
                                show: authUser.id === comment.user,
                            },
                            {
                                name: "Delete",
                                func: deleteComment,
                                show:
                                    authUser.id === comment.user ||
                                    authUser.id === answerUser,
                            },
                            {
                                name: "Reply",
                                func: () => setIsModalOpenReply(true),
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
                            width: 680,
                            height: 650,
                            background: "none",
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
                                {moment(comment.createdAt).fromNow()}
                            </span>
                        </p>
                    </div>
                    <div>
                        <SlateEditor
                            onChange={onChange}
                            value={JSON.parse(values.body)}
                            placeholder="Enter Your Comment"
                        />
                    </div>
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
            {
                <div className="post__answer">
                    {showReplys ? (
                        comment.replys.map((Id) => (
                            <Reply
                                key={Id}
                                id={Id}
                                commentId={id}
                                commentUser={comment.user}
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
