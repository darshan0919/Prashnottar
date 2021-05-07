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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.useDeleteCommentMutation = void 0;
var client_1 = require("@apollo/client");
var graphql_1 = require("../../graphql");
function useDeleteCommentMutation(commentId, answerId) {
    var deleteFunction = client_1.useMutation(graphql_1.DELETE_COMMENT_MUTATION, {
        variables: { commentId: commentId },
        update: function (proxy, result) {
            var data = __assign({}, proxy.readQuery({
                query: graphql_1.FETCH_ANSWER_QUERY,
                variables: { answerId: answerId }
            }));
            if (result.data) {
                var Index = data.getAnswer.comments.findIndex(function (Id) { return commentId === Id; });
                data.getAnswer = __assign(__assign({}, data.getAnswer), { comments: __spreadArrays(data.getAnswer.comments.slice(0, Index), data.getAnswer.comments.slice(Index + 1)), commentCount: data.getAnswer.commentCount - 1 });
                proxy.writeQuery({
                    query: graphql_1.FETCH_ANSWER_QUERY,
                    variables: { answerId: answerId },
                    data: data
                });
            }
            else {
                console.log("Server failed to delete comment!");
            }
        }
    })[0];
    return deleteFunction;
}
exports.useDeleteCommentMutation = useDeleteCommentMutation;
