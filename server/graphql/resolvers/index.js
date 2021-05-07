const postsResolvers = require("./posts");
const usersResolvers = require("./users");
const commentsResolvers = require("./comments");
const replysResolvers = require("./replys");
const answersResolvers = require("./answers");
const votesResolvers = require("./votes");

module.exports = {
    Answer: {
        upvoteCount: (parent) => parent.upvotes.length,
        downvoteCount: (parent) => parent.downvotes.length,
        commentCount: (parent) => parent.comments.length,
    },
    Comment: {
        upvoteCount: (parent) => parent.upvotes.length,
        downvoteCount: (parent) => parent.downvotes.length,
        replyCount: (parent) => parent.replys.length,
    },
    Reply: {
        upvoteCount: (parent) => parent.upvotes.length,
        downvoteCount: (parent) => parent.downvotes.length,
        rereplyCount: (parent) => parent.rereplys.length,
    },
    Query: {
        ...usersResolvers.Query,
        ...postsResolvers.Query,
        ...answersResolvers.Query,
        ...commentsResolvers.Query,
        ...replysResolvers.Query,
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation,
        ...answersResolvers.Mutation,
        ...replysResolvers.Mutation,
        ...votesResolvers.Mutation,
    },
    Subscription: {
        ...postsResolvers.Subscription,
    },
};
