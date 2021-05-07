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
exports.useVoteAnswerMutation = exports.useDownvoteAnswerMutation = exports.useUpvoteAnswerMutation = void 0;
var client_1 = require("@apollo/client");
var graphql_1 = require("../../graphql");
function useUpvoteAnswerMutation(answerId) {
    var vote = client_1.useMutation(graphql_1.UPVOTE_ANSWER_MUTATION, {
        variables: { answerId: answerId },
        update: function (proxy, result) {
            var data = __assign({}, proxy.readQuery({
                query: graphql_1.FETCH_ANSWER_QUERY,
                variables: { answerId: answerId }
            }));
            data.getAnswer = __assign(__assign({}, data.getAnswer), result.data.upvoteAnswer);
            proxy.writeQuery({
                query: graphql_1.FETCH_ANSWER_QUERY,
                variables: { answerId: answerId },
                data: data
            });
        }
    })[0];
    return vote;
}
exports.useUpvoteAnswerMutation = useUpvoteAnswerMutation;
function useDownvoteAnswerMutation(answerId) {
    var vote = client_1.useMutation(graphql_1.DOWNVOTE_ANSWER_MUTATION, {
        variables: { answerId: answerId },
        update: function (proxy, result) {
            var data = __assign({}, proxy.readQuery({
                query: graphql_1.FETCH_ANSWER_QUERY,
                variables: { answerId: answerId }
            }));
            data.getAnswer = __assign(__assign({}, data.getAnswer), result.data.downvoteAnswer);
            proxy.writeQuery({
                query: graphql_1.FETCH_ANSWER_QUERY,
                variables: { answerId: answerId },
                data: data
            });
        }
    })[0];
    return vote;
}
exports.useDownvoteAnswerMutation = useDownvoteAnswerMutation;
function useVoteAnswerMutation(id) {
    return {
        upvoteAnswer: useUpvoteAnswerMutation(id),
        downvoteAnswer: useDownvoteAnswerMutation(id)
    };
}
exports.useVoteAnswerMutation = useVoteAnswerMutation;
