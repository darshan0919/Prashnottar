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
exports.useDeleteAnswerMutation = void 0;
var client_1 = require("@apollo/client");
var graphql_1 = require("../../graphql");
function useDeleteAnswerMutation(answerId, postId) {
    var deleteFunction = client_1.useMutation(graphql_1.DELETE_ANSWER_MUTATION, {
        variables: { answerId: answerId },
        update: function (proxy, result) {
            var data = __assign({}, proxy.readQuery({
                query: graphql_1.FETCH_POST_QUERY,
                variables: { postId: postId }
            }));
            if (result.data) {
                var Index = data.getPost.answers.findIndex(function (Id) { return answerId === Id; });
                data.getPost = __assign(__assign({}, data.getPost), { answers: __spreadArrays(data.getPost.answers.slice(0, Index), data.getPost.answers.slice(Index + 1)) });
                proxy.writeQuery({
                    query: graphql_1.FETCH_POST_QUERY,
                    variables: { postId: postId },
                    data: data
                });
            }
            else {
                console.log("Server failed to delete answer!");
            }
        }
    })[0];
    return deleteFunction;
}
exports.useDeleteAnswerMutation = useDeleteAnswerMutation;
