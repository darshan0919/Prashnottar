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
    FETCH_REPLY_QUERY,
    UPVOTE_REPLY_MUTATION,
    DOWNVOTE_REPLY_MUTATION,
    EDIT_REPLY_MUTATION,
    DELETE_REPLY_MUTATION,
    CREATE_REREPLY_MUTATION,
} from "../util/graphql";
import { useForm } from "../util/hooks";
import { AuthContext } from "../context/auth";
import moment from "moment";
import InputModal from "./InputModal";
import SlateEditor from "./SlateEditor";

export default function Reply({
    id,
    commentId,
    commentUser,
    parentId,
    parentUser,
    deleteReplyComment,
}) {
    //console.log("Reply", id);

    const { user: authUser } = useContext(AuthContext);
    const { loading, data: reply } = useQuery(FETCH_REPLY_QUERY, {
        variables: {
            replyId: id,
        },
    });

    const [getReplyUser, { data: replyUser }] = useLazyQuery(FETCH_USER_QUERY, {
        onError(err) {
            console.log("onerror", err);
        },
    });

    useEffect(() => {
        if (!loading) {
            //console.log("checkReply", reply);
            getReplyUser({
                variables: {
                    id: reply.getReply.user,
                },
            });
        }
    }, [loading, reply, getReplyUser]);

    const [upvoteReply] = useMutation(UPVOTE_REPLY_MUTATION, {
        variables: {
            replyId: id,
        },
        update(proxy, result) {
            const data = {
                ...proxy.readQuery({
                    query: FETCH_REPLY_QUERY,
                    variables: {
                        replyId: id,
                    },
                }),
            };
            data.getReply = {
                ...data.getReply,
                ...result.data.upvoteReply,
            };
            proxy.writeQuery({
                query: FETCH_REPLY_QUERY,
                variables: { replyId: id },
                data,
            });
        },
    });

    const [downvoteReply] = useMutation(DOWNVOTE_REPLY_MUTATION, {
        variables: {
            replyId: id,
        },
        update(proxy, result) {
            const data = {
                ...proxy.readQuery({
                    query: FETCH_REPLY_QUERY,
                    variables: {
                        replyId: id,
                    },
                }),
            };
            data.getReply = {
                ...data.getReply,
                ...result.data.downvoteReply,
            };
            proxy.writeQuery({
                query: FETCH_REPLY_QUERY,
                variables: {
                    replyId: id,
                },
                data,
            });
        },
    });

    const [IsModalOpen, setIsModalOpen] = useState(false);

    const [values, setValues] = useState({
        replyId: id,
        body: JSON.stringify([
            {
                type: "paragraph",
                children: [{ text: "This is editable " }],
            },
        ]),
    });

    const onChange = (body) => {
        setValues({ ...values, body: JSON.stringify(values.body) });
    };

    useEffect(() => {
        if (!loading) {
            values.body = reply.getReply.body;
        }
    }, [loading]);

    const [editReply] = useMutation(EDIT_REPLY_MUTATION, {
        variables: values,
        update(proxy, result) {
            const data = {
                ...proxy.readQuery({
                    query: FETCH_REPLY_QUERY,
                    variables: {
                        replyId: id,
                    },
                }),
            };
            data.getReply = {
                ...data.getReply,
                ...result.data.editReply,
            };
            proxy.writeQuery({
                query: FETCH_REPLY_QUERY,
                variables: {
                    replyId: id,
                },
                data,
            });
        },
    });
    function editReplyCallback() {
        //console.log(values);
        editReply();
        setIsModalOpen(false);
    }

    const [IsModalOpenReply, setIsModalOpenReply] = useState(false);

    const [valuesReply, setValuesReply] = useState({
        replyId: id,
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

    const [createReply] = useMutation(CREATE_REREPLY_MUTATION, {
        variables: valuesReply,
        update(proxy, result) {
            const data = {
                ...proxy.readQuery({
                    query: FETCH_REPLY_QUERY,
                    variables: { replyId: id },
                }),
            };
            console.log(data.getReply);
            //console.log(result.data.createReReply);
            data.getReply = {
                ...data.getReply,
                ...result.data.createReReply,
            };
            console.log(data.getReply);
            proxy.writeQuery({
                query: FETCH_REPLY_QUERY,
                variables: { replyId: id },
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
        //console.log(valuesReply);
        createReply();
        setIsModalOpenReply(false);
    }

    const [deleteReply] = useMutation(DELETE_REPLY_MUTATION, {
        variables: {
            replyId: id,
        },
        update(proxy, result) {
            const data = {
                ...proxy.readQuery({
                    query: FETCH_REPLY_QUERY,
                    variables: {
                        replyId: parentId,
                    },
                }),
            };
            const replyIndex = data.getReply.replys.findIndex((replyId) => {
                return id === replyId;
            });
            data.getReply = {
                ...data.getReply,
                replys: [
                    ...data.getReply.replys.slice(0, replyIndex),
                    ...data.getReply.replys.slice(replyIndex + 1),
                ],
                replyCount: data.getReply.replyCount - 1,
            };
            //console.log(data.getReply.replys);
            proxy.writeQuery({
                query: FETCH_REPLY_QUERY,
                variables: {
                    replyId: parentId,
                },
                data,
            });
        },
    });

    const [showReplys, setShowReplys] = useState(false);

    //return <></>;
    return loading || !replyUser ? (
        <></>
    ) : (
        <div key={id} className="post__single__answer single__reply">
            <div className="answer__info">
                <div className="post__info">
                    <Avatar
                        className="reply"
                        src={
                            replyUser
                                ? replyUser.getUser.photo
                                : "https://d2q79iu7y748jz.cloudfront.net/s/_squarelogo/c7fa9a548c4d01b6d80c60bbc6af74bd"
                        }
                    />
                    <div className="reply__info">
                        <h5>{replyUser ? replyUser.getUser.username : ""}</h5>
                        <span>·</span>
                        <small>
                            {moment(reply.getReply.createdAt).fromNow()}
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
                        value={JSON.parse(reply.getReply.body)}
                    />
                </span>
            </p>
            <div className="post__footer">
                <div className="post__footerAction">
                    <ArrowUpwardOutlinedIcon onClick={upvoteReply} />
                    <span className="values">{reply.getReply.upvoteCount}</span>
                    <span>|</span>
                    <ArrowDownwardOutlinedIcon onClick={downvoteReply} />
                    {/*<span className="values">
                        {reply.getReply.downvoteCount}
            </span>*/}
                </div>

                <ReplyIcon
                    onClick={() => {
                        setShowReplys(!showReplys);
                    }}
                />
                {reply.getReply.replyCount}
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
                                show: authUser.id === reply.getReply.user,
                            },
                            Delete: {
                                func: () => {
                                    if (commentId) deleteReplyComment();
                                    else deleteReply();
                                },
                                show:
                                    authUser.id === reply.getReply.user ||
                                    authUser.id === parentUser ||
                                    authUser.id === commentUser,
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
                            reply last updated{" "}
                            <span className="name">
                                {moment(reply.getReply.createdAt).fromNow()}
                            </span>
                        </p>
                    </div>
                    <div className="modal__Field modal__SlateField">
                        <SlateEditor
                            onChange={onChange}
                            value={JSON.parse(values.body)}
                            placeholder="Enter Your Reply"
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
                            onClick={editReplyCallback}
                        >
                            Submit
                        </Button>
                    </div>
                </Modal>
            </div>
            {
                <div className="post__answer">
                    {showReplys ? (
                        reply.getReply.replys.map((Id) => (
                            <Reply
                                key={Id}
                                id={Id}
                                parentId={id}
                                parentUser={replyUser.getUser.id}
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
