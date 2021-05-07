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
                    let rereplys = await Promise.all(
                        reply.rereplys.map(
                            async (id) => await Reply.findById(id)
                        )
                    );
                    rereplys = rereplys.sort(
                        (b, a) =>
                            a.upvotes.length -
                            a.downvotes.length -
                            (b.upvotes.length - b.downvotes.length)
                    );
                    reply.rereplys = rereplys.map(({ id }) => id);
                    await reply.save();
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
                return reply;
            } else throw new UserInputError("Comment not found");
        },
        createRereply: async (_, { replyId, body }, context) => {
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
                const newReply = new Reply({
                    body,
                    user: id,
                    reply: replyId,
                    createdAt: new Date().toISOString(),
                });

                const rereply = await newReply.save();

                reply.rereplys.unshift(rereply.id);
                await reply.save();
                //console.log(reply.replys);
                return rereply;
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

                        if (reply.user == id || comment.user == id) {
                            reply.upvotes.forEach((upvoteId) => {
                                deleteVote({ upvoteId });
                            });

                            reply.downvotes.forEach((downvoteId) => {
                                deleteVote({ downvoteId });
                            });

                            reply.rereplys.forEach((replyId) => {
                                deleteReply({ replyId });
                            });

                            await reply.delete();

                            //console.log(replyIndex);
                            comment.replys.splice(replyIndex, 1);
                            await comment.save();
                            return { id: replyId };
                        } else {
                            throw new AuthenticationError("Action not allowed");
                        }
                    } else throw new UserInputError("Comment not found");
                } else {
                    const parentReply = await Reply.findById(reply.reply);

                    if (parentReply) {
                        const replyIndex = await asyncFindIndex(
                            parentReply.rereplys,
                            (reply) => reply === replyId
                        );

                        reply.upvotes.forEach((upvoteId) => {
                            deleteVote({ upvoteId });
                        });

                        reply.downvotes.forEach((downvoteId) => {
                            deleteVote({ downvoteId });
                        });

                        reply.rereplys.forEach((replyId) => {
                            deleteReply({ replyId });
                        });

                        await reply.delete();

                        parentReply.rereplys.splice(replyIndex, 1);
                        await parentReply.save();
                        return { id: replyId };
                    } else throw new UserInputError("Comment not found");
                }
            } else {
                throw new UserInputError("Reply not found");
            }
        },
    },
};
