const { AuthenticationError, UserInputError } = require("apollo-server");

const checkAuth = require("../../util/check-auth");
const { Comment, Reply } = require("../../models");
const {
    Mutation: { deleteVote },
} = require("./votes");
const { asyncFindIndex } = require("../../util");

module.exports = {
    Query: {
        async getReply(_, { replyId }) {
            try {
                const reply = await Reply.findById(replyId);
                //console.log("Fetching reply!");
                if (reply) {
                    //console.log("Found Reply!");
                    //console.log(reply);
                    return reply;
                } else {
                    throw new Error("Reply not found");
                }
            } catch (err) {
                throw new Error(err);
            }
        },
    },
    Mutation: {
        createReply: async (_, { commentId, body }, context) => {
            console.log("Creating new Reply!");
            const { username, id } = checkAuth(context);

            if (body.trim() === "") {
                throw new UserInputError("Empty Reply", {
                    errors: {
                        body: "Reply body must not empty",
                    },
                });
            }
            const comment = await Comment.findById(commentId);

            if (comment) {
                /*const replyIndex = await asyncFindIndex(
                    comment.replys,
                    async (c) => {
                        const { user } = await Reply.findById(c);
                        console.log(user, id);
                        return user == id;
                    }
                );

                if (replyIndex >= 0) {
                    console.log(
                        "You have already entered the reply, edit reply functionality will be added soon:)"
                    );
                    return comment;
                }*/

                const newReply = new Reply({
                    body,
                    user: id,
                    comment: commentId,
                    createdAt: new Date().toISOString(),
                });

                const reply = await newReply.save();
                reply.save();

                comment.replys.unshift(reply.id);
                await comment.save();
                console.log(comment.replys);
                return comment;
            } else throw new UserInputError("Comment not found");
        },
        createReReply: async (_, { replyId, body }, context) => {
            //console.log("Creating new Reply!");
            const { username, id } = checkAuth(context);

            if (body.trim() === "") {
                throw new UserInputError("Empty Reply", {
                    errors: {
                        body: "Reply body must not empty",
                    },
                });
            }

            const reply = await Reply.findById(replyId);

            if (reply) {
                /*const replyIndex = await asyncFindIndex(
                    reply.replys,
                    async (c) => {
                        const { user } = await Reply.findById(c);
                        console.log(user, id);
                        return user == id;
                    }
                );

                if (replyIndex >= 0) {
                    console.log(
                        "You have already entered the reply, edit reply functionality will be added soon:)"
                    );
                    return reply;
                }*/

                const newReply = new Reply({
                    body,
                    user: id,
                    reply: replyId,
                    createdAt: new Date().toISOString(),
                });

                const rereply = await newReply.save();

                reply.replys.unshift(rereply.id);
                await reply.save();
                //console.log(reply.replys);
                return reply;
            } else throw new UserInputError("Reply not found");
        },
        editReply: async (_, { replyId, body }, context) => {
            //console.log("Creating new Reply!");
            const { id } = checkAuth(context);

            if (body.trim() === "") {
                throw new UserInputError("Empty Reply", {
                    errors: {
                        body: "Reply body must not empty",
                    },
                });
            }

            const reply = await Reply.findById(replyId);

            if (reply) {
                if (reply.user == id) {
                    reply.body = body;
                    reply.createdAt = new Date().toISOString();
                    await reply.save();
                    return reply;
                } else {
                    throw new AuthenticationError("Action not allowed!");
                }
            } else throw new UserInputError("Reply not found");
        },
        deleteReply: async (_, { replyId }, context) => {
            const { id } = checkAuth(context);

            const reply = await Reply.findById(replyId);

            if (reply) {
                if (reply.comment) {
                    const comment = await Comment.findById(reply.comment);

                    if (comment) {
                        const replyIndex = await asyncFindIndex(
                            comment.replys,
                            (reply) => reply === replyId
                        );

                        //console.log(reply.user, id);

                        if (reply.user == id || comment.user == id) {
                            reply.upvotes.forEach((upvoteId) => {
                                deleteVote({ upvoteId });
                            });

                            reply.downvotes.forEach((downvoteId) => {
                                deleteVote({ downvoteId });
                            });

                            const result = { id: reply.id };
                            await reply.delete();

                            //console.log(replyIndex);
                            comment.replys.splice(replyIndex, 1);
                            await comment.save();
                            return result;
                        } else {
                            throw new AuthenticationError("Action not allowed");
                        }
                    } else throw new UserInputError("Comment not found");
                } else {
                    const rereply = await Comment.findById(reply.reply);

                    if (rereply) {
                        const replyIndex = await asyncFindIndex(
                            rereply.replys,
                            (reply) => reply === replyId
                        );

                        //console.log(reply.user, id);

                        if (reply.user == id || rereply.user == id) {
                            reply.upvotes.forEach((upvoteId) => {
                                deleteVote({ upvoteId });
                            });

                            reply.downvotes.forEach((downvoteId) => {
                                deleteVote({ downvoteId });
                            });

                            const result = { id: reply.id };
                            await reply.delete();

                            //console.log(replyIndex);
                            rereply.replys.splice(replyIndex, 1);
                            await rereply.save();
                            return result;
                        } else {
                            throw new AuthenticationError("Action not allowed");
                        }
                    } else throw new UserInputError("Comment not found");
                }
            } else {
                throw new UserInputError("Reply not found");
            }
        },
    },
};
