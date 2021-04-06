const { AuthenticationError, UserInputError } = require("apollo-server");

const checkAuth = require("../../util/check-auth");
const { Vote, Answer, Comment, Reply } = require("../../models");

const { asyncFindIndex } = require("../../util");

const vote = async (model, objId, type, context) => {
    const { username, id } = checkAuth(context);

    const obj = await model.findById(objId);

    if (obj) {
        const typeVoteIndex = await asyncFindIndex(obj[type], async (c) => {
            const { user } = await Vote.findById(c);
            return user == id;
        });

        if (typeVoteIndex >= 0) {
            //console.log("Again upvoted by!!", username);
            const vote = await Vote.findById(obj[type][typeVoteIndex]);
            await vote.delete();

            obj[type].splice(typeVoteIndex, 1);
            await obj.save();
            return obj;
        }

        otherType = type == "upvotes" ? "downvotes" : "upvotes";
        const otherTypeVoteIndex = await asyncFindIndex(
            obj[otherType],
            async (c) => {
                const { user } = await Vote.findById(c);
                return user == id;
            }
        );

        if (otherTypeVoteIndex >= 0) {
            const vote = await Vote.findById(
                obj[otherType][otherTypeVoteIndex]
            );
            obj[type].unshift(vote.id);

            obj[otherType].splice(otherTypeVoteIndex, 1);
            await obj.save();
            return obj;
        }

        const newVote = new Vote({
            user: id,
            obj: objId,
            createdAt: new Date().toISOString(),
        });

        const vote = await newVote.save();

        obj[type].unshift(vote.id);
        await obj.save();
        return obj;
    } else throw new UserInputError("Obj not found");
};

module.exports = {
    Query: {},
    Mutation: {
        upvoteAnswer: async (_, { answerId }, context) => {
            return await vote(Answer, answerId, "upvotes", context);
        },
        downvoteAnswer: async (_, { answerId }, context) => {
            return await vote(Answer, answerId, "downvotes", context);
        },
        upvoteComment: async (_, { commentId }, context) => {
            return await vote(Comment, commentId, "upvotes", context);
        },
        downvoteComment: async (_, { commentId }, context) => {
            return await vote(Comment, commentId, "downvotes", context);
        },
        upvoteReply: async (_, { replyId }, context) => {
            return await vote(Reply, replyId, "upvotes", context);
        },
        downvoteReply: async (_, { replyId }, context) => {
            return await vote(Reply, replyId, "downvotes", context);
        },
        deleteVote: async (_, { voteId }, context) => {
            const { id } = checkAuth(context);

            const vote = await Vote.findById(voteId);

            if (vote) {
                const answer = await Answer.findById(voteId);

                if (answer) {
                    const voteIndex = await asyncFindIndex(
                        answer.votes,
                        (vote) => vote === voteId
                    );

                    if (answer.votes[voteIndex].user === id) {
                        await vote.delete();

                        answer.votes.splice(voteIndex, 1);
                        await answer.save();
                        return answer;
                    } else {
                        throw new AuthenticationError("Action not allowed");
                    }
                } else throw new UserInputError("Answer not found");
            } else {
                throw new UserInputError("Vote not found");
            }
        },
    },
};
