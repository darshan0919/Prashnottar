"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.useVoteReplyMutation = exports.useDownvoteReplyMutation = exports.useUpvoteReplyMutation = void 0;
var client_1 = require("@apollo/client");
var graphql_1 = require("../../graphql");
function useUpvoteReplyMutation(replyId) {
    var vote = client_1.useMutation(graphql_1.UPVOTE_REPLY_MUTATION, {
        variables: { replyId: replyId },
        update: function (proxy, result) {
            var data = __assign({}, proxy.readQuery({
                query: graphql_1.FETCH_REPLY_QUERY,
                variables: { replyId: replyId }
            }));
            data.getReply = __assign(__assign({}, data.getReply), result.data.upvoteReply);
            proxy.writeQuery({
                query: graphql_1.FETCH_REPLY_QUERY,
                variables: { replyId: replyId },
                data: data
            });
        }
    })[0];
    return vote;
}
exports.useUpvoteReplyMutation = useUpvoteReplyMutation;
function useDownvoteReplyMutation(replyId) {
    var vote = client_1.useMutation(graphql_1.DOWNVOTE_REPLY_MUTATION, {
        variables: { replyId: replyId },
        update: function (proxy, result) {
            var data = __assign({}, proxy.readQuery({
                query: graphql_1.FETCH_REPLY_QUERY,
                variables: { replyId: replyId }
            }));
            data.getReply = __assign(__assign({}, data.getReply), result.data.downvoteReply);
            proxy.writeQuery({
                query: graphql_1.FETCH_REPLY_QUERY,
                variables: { replyId: replyId },
                data: data
            });
        }
    })[0];
    return vote;
}
exports.useDownvoteReplyMutation = useDownvoteReplyMutation;
function useVoteReplyMutation(id) {
    return {
        upvoteReply: useUpvoteReplyMutation(id),
        downvoteReply: useDownvoteReplyMutation(id)
    };
}
exports.useVoteReplyMutation = useVoteReplyMutation;
