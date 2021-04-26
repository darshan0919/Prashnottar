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
import moment from "moment";
import InputModal from "../modal/InputModal";
import SlateEditor from "../editor/SlateEditor";
import {
    useCreateMutation,
    useDeleteMutation,
    useEditMutation,
    useGetQuery,
    useGetUserQuery,
    useVoteMutation,
} from "../../hooks";

export default function Reply({
    id,
    commentId,
    commentUser,
    parentId,
    parentUser,
}) {
    //console.log("Reply", id);

    const { user: authUser } = useContext(AuthContext);

    const reply = useGetQuery(id, "reply");

    /// replyUser
    const [replyUser, setReplyUser] = useGetUserQuery();

    useEffect(() => {
        if (reply) {
            setReplyUser(reply.user);
        }
    }, [reply, setReplyUser]);

    /// upvote | downvote
    const upvoteReply = useVoteMutation(id, "reply", "upvote");
    const downvoteReply = useVoteMutation(id, "reply", "downvote");

    const {
        IsModalOpen,
        setIsModalOpen,
        onChange,
        editCallback,
        values,
    } = useEditMutation(id, reply, "reply");

    const deleteReply = useDeleteMutation(
        id,
        "reply",
        commentId ? commentId : parentId,
        commentId ? "comment" : "reply"
    );

    /// Show Replys Button
    const [showReplys, setShowReplys] = useState(false);

    /// createRereply
    const {
        IsModalOpen: IsModalOpenReply,
        setIsModalOpen: setIsModalOpenReply,
        values: valuesReply,
        onChange: onChangeReply,
        createCallback: createReplyCallback,
    } = useCreateMutation(id, "reply", "rereply");

    return !reply ? (
        <></>
    ) : (
        <div key={id} className="post__single__answer single__reply">
            {replyUser ? (
                <div className="answer__info">
                    <div className="post__info">
                        <Avatar className="reply" src={replyUser.photo} />
                        <div className="reply__info">
                            <h5>{replyUser.username}</h5>
                            <small>{moment(reply.createdAt).fromNow()}</small>
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
                        value={JSON.parse(reply.body)}
                    />
                </span>
            </div>
            <div className="post__footer">
                <div className="post__footerAction">
                    <ArrowUpwardOutlinedIcon onClick={upvoteReply} />
                    <span className="values">{reply.upvoteCount}</span>
                    <span>|</span>
                    <ArrowDownwardOutlinedIcon onClick={downvoteReply} />
                </div>

                <ReplyIcon
                    onClick={() => {
                        setShowReplys(!showReplys);
                    }}
                />
                {reply.rereplyCount}
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
                                show: authUser.id === reply.user,
                            },
                            {
                                name: "Delete",
                                func: deleteReply,
                                show:
                                    authUser.id === reply.user ||
                                    authUser.id === parentUser ||
                                    authUser.id === commentUser,
                                /*missing two more options answerUser, postUser */
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
                            height: 550,
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
                            reply last updated{" "}
                            <span className="name">
                                {moment(reply.createdAt).fromNow()}
                            </span>
                        </p>
                    </div>
                    <div>
                        <SlateEditor
                            onChange={onChange}
                            value={JSON.parse(values.body)}
                            placeholder="Enter Your Reply"
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
                        reply.rereplys.map((Id) => (
                            <Reply
                                key={Id}
                                id={Id}
                                parentId={id}
                                parentUser={reply.user}
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
