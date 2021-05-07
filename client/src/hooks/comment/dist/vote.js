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
exports.useVoteCommentMutation = exports.useDownvoteCommentMutation = exports.useUpvoteCommentMutation = void 0;
var client_1 = require("@apollo/client");
var graphql_1 = require("../../graphql");
function useUpvoteCommentMutation(commentId) {
    var vote = client_1.useMutation(graphql_1.UPVOTE_COMMENT_MUTATION, {
        variables: { commentId: commentId },
        update: function (proxy, result) {
            var data = __assign({}, proxy.readQuery({
                query: graphql_1.FETCH_COMMENT_QUERY,
                variables: { commentId: commentId }
            }));
            data.getComment = __assign(__assign({}, data.getComment), result.data.upvoteComment);
            proxy.writeQuery({
                query: graphql_1.FETCH_COMMENT_QUERY,
                variables: { commentId: commentId },
                data: data
            });
        }
    })[0];
    return vote;
}
exports.useUpvoteCommentMutation = useUpvoteCommentMutation;
function useDownvoteCommentMutation(commentId) {
    var vote = client_1.useMutation(graphql_1.DOWNVOTE_COMMENT_MUTATION, {
        variables: { commentId: commentId },
        update: function (proxy, result) {
            var data = __assign({}, proxy.readQuery({
                query: graphql_1.FETCH_COMMENT_QUERY,
                variables: { commentId: commentId }
            }));
            data.getComment = __assign(__assign({}, data.getComment), result.data.downvoteComment);
            proxy.writeQuery({
                query: graphql_1.FETCH_COMMENT_QUERY,
                variables: { commentId: commentId },
                data: data
            });
        }
    })[0];
    return vote;
}
exports.useDownvoteCommentMutation = useDownvoteCommentMutation;
function useVoteCommentMutation(id) {
    return {
        upvoteComment: useUpvoteCommentMutation(id),
        downvoteComment: useDownvoteCommentMutation(id)
    };
}
exports.useVoteCommentMutation = useVoteCommentMutation;
