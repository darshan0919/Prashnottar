const { AuthenticationError, UserInputError } = require("apollo-server");

const checkAuth = require("../../util/check-auth");
const { Post, Answer } = require("../../models");
const {
    Mutation: { deleteComment },
} = require("./comments");
const {
    Mutation: { deleteVote },
} = require("./votes");
const { asyncFindIndex } = require("../../util");

module.exports = {
    Query: {
        async getAnswer(_, { answerId }) {
            try {
                const answer = await Answer.findById(answerId);
                //console.log("Fetching answer!");
                if (answer) {
                    //console.log("Found Answer!");
                    //console.log(answer);
                    return answer;
                } else {
                    throw new Error("Answer not found");
                }
            } catch (err) {
                throw new Error(err);
            }
        },
    },
    Mutation: {
        createAnswer: async (_, { postId, body }, context) => {
            //console.log("Creating new Answer!");
            const { username, id } = checkAuth(context);

            if (body.trim() === "") {
                throw new UserInputError("Empty Answer", {
                    errors: {
                        body: "Answer body must not empty",
                    },
                });
            }

            const post = await Post.findById(postId);

            if (post) {
                const answerIndex = await asyncFindIndex(
                    post.answers,
                    async (c) => {
                        const { user } = await Answer.findById(c);
                        console.log(user, id);
                        return user == id;
                    }
                );

                if (answerIndex >= 0) {
                    console.log(
                        "You have already entered the answer, edit answer functionality will be added soon:)"
                    );
                    return post;
                }

                const newAnswer = new Answer({
                    body,
                    user: id,
                    post: postId,
                    createdAt: new Date().toISOString(),
                });

                const answer = await newAnswer.save();

                post.answers.unshift(answer.id);
                await post.save();
                return answer;
            } else throw new UserInputError("Post not found");
        },
        editAnswer: async (_, { answerId, body }, context) => {
            //console.log("Creating new Answer!");
            const { id } = checkAuth(context);

            if (body.trim() === "") {
                throw new UserInputError("Empty Answer", {
                    errors: {
                        body: "Answer body must not empty",
                    },
                });
            }

            const answer = await Answer.findById(answerId);

            if (answer) {
                if (answer.user == id) {
                    answer.body = body;
                    answer.createdAt = new Date().toISOString();
                    await answer.save();
                    return answer;
                } else {
                    throw new AuthenticationError("Action not allowed!");
                }
            } else throw new UserInputError("Answer not found");
        },
        deleteAnswer: async (_, { answerId }, context) => {
            const { id } = checkAuth(context);

            const answer = await Answer.findById(answerId);

            if (answer) {
                const post = await Post.findById(answer.post);

                if (post) {
                    const answerIndex = await asyncFindIndex(
                        post.answers,
                        (answer) => answer === answerId
                    );

                    //console.log(answer.user, id);

                    if (answer.user == id || post.user == id) {
                        answer.comments.forEach((commentId) => {
                            deleteComment({ commentId });
                        });

                        answer.upvotes.forEach((upvoteId) => {
                            deleteVote({ upvoteId });
                        });

                        answer.downvotes.forEach((downvoteId) => {
                            deleteVote({ downvoteId });
                        });

                        const result = { id: answer.id };
                        await answer.delete();

                        //console.log(answerIndex);
                        post.answers.splice(answerIndex, 1);
                        await post.save();
                        return result;
                    } else {
                        throw new AuthenticationError("Action not allowed");
                    }
                } else throw new UserInputError("Post not found");
            } else {
                throw new UserInputError("Answer not found");
            }
        },
    },
};
