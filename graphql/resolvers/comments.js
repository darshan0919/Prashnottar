const { AuthenticationError, UserInputError } = require("apollo-server");

const checkAuth = require("../../util/check-auth");
const { Answer, Comment } = require("../../models");
const {
    Mutation: { deleteVote },
} = require("./votes");
const { asyncFindIndex } = require("../../util");

module.exports = {
    Query: {
        async getComment(_, { commentId }) {
            try {
                const comment = await Comment.findById(commentId);
                //console.log("Fetching comment!");
                if (comment) {
                    //console.log("Found Comment!");
                    //console.log(comment);
                    return comment;
                } else {
                    throw new Error("Comment not found");
                }
            } catch (err) {
                throw new Error(err);
            }
        },
    },
    Mutation: {
        createComment: async (_, { answerId, body }, context) => {
            //console.log("Creating new Comment!");
            const { username, id } = checkAuth(context);

            if (body.trim() === "") {
                throw new UserInputError("Empty Comment", {
                    errors: {
                        body: "Comment body must not empty",
                    },
                });
            }

            const answer = await Answer.findById(answerId);

            if (answer) {
                /*const commentIndex = await asyncFindIndex(
                    answer.comments,
                    async (c) => {
                        const { user } = await Comment.findById(c);
                        console.log(user, id);
                        return user == id;
                    }
                );

                if (commentIndex >= 0) {
                    console.log(
                        "You have already entered the comment, edit comment functionality will be added soon:)"
                    );
                    return answer;
                }*/

                const newComment = new Comment({
                    body,
                    user: id,
                    answer: answerId,
                    createdAt: new Date().toISOString(),
                });

                const comment = await newComment.save();

                answer.comments.unshift(comment.id);
                await answer.save();
                console.log(answer.comments);
                return answer;
            } else throw new UserInputError("Answer not found");
        },
        editComment: async (_, { commentId, body }, context) => {
            //console.log("Creating new Comment!");
            const { id } = checkAuth(context);

            if (body.trim() === "") {
                throw new UserInputError("Empty Comment", {
                    errors: {
                        body: "Comment body must not empty",
                    },
                });
            }

            const comment = await Comment.findById(commentId);

            if (comment) {
                if (comment.user == id) {
                    comment.body = body;
                    comment.createdAt = new Date().toISOString();
                    await comment.save();
                    return comment;
                } else {
                    throw new AuthenticationError("Action not allowed!");
                }
            } else throw new UserInputError("Comment not found");
        },
        deleteComment: async (_, { commentId }, context) => {
            const { id } = checkAuth(context);

            const comment = await Comment.findById(commentId);

            if (comment) {
                const answer = await Answer.findById(comment.answer);

                if (answer) {
                    const commentIndex = await asyncFindIndex(
                        answer.comments,
                        (comment) => comment === commentId
                    );

                    //console.log(comment.user, id);

                    if (comment.user == id || answer.user == id) {
                        comment.upvotes.forEach((upvoteId) => {
                            deleteVote({ upvoteId });
                        });

                        comment.downvotes.forEach((downvoteId) => {
                            deleteVote({ downvoteId });
                        });

                        const result = { id: comment.id };
                        await comment.delete();

                        //console.log(commentIndex);
                        answer.comments.splice(commentIndex, 1);
                        await answer.save();
                        return result;
                    } else {
                        throw new AuthenticationError("Action not allowed");
                    }
                } else throw new UserInputError("Answer not found");
            } else {
                throw new UserInputError("Comment not found");
            }
        },
    },
};
