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
exports.useDeleteReplyMutation = exports.useDeleteRereplyMutation = exports.useDeletereplyMutation = void 0;
var client_1 = require("@apollo/client");
var graphql_1 = require("../../graphql");
function useDeletereplyMutation(replyId, commentId) {
    var deleteFunction = client_1.useMutation(graphql_1.DELETE_REPLY_MUTATION, {
        variables: { replyId: replyId },
        update: function (proxy, result) {
            var data = __assign({}, proxy.readQuery({
                query: graphql_1.FETCH_COMMENT_QUERY,
                variables: { commentId: commentId }
            }));
            if (result.data) {
                var Index = data.getComment.replys.findIndex(function (Id) { return replyId === Id; });
                data.getComment = __assign(__assign({}, data.getComment), { replys: __spreadArrays(data.getComment.replys.slice(0, Index), data.getComment.replys.slice(Index + 1)), replyCount: data.getComment.replyCount - 1 });
                proxy.writeQuery({
                    query: graphql_1.FETCH_COMMENT_QUERY,
                    variables: { commentId: commentId },
                    data: data
                });
            }
            else {
                console.log("Server failed to delete reply!");
            }
        }
    })[0];
    return deleteFunction;
}
exports.useDeletereplyMutation = useDeletereplyMutation;
function useDeleteRereplyMutation(replyId, parentId) {
    var deleteFunction = client_1.useMutation(graphql_1.DELETE_REPLY_MUTATION, {
        variables: { replyId: replyId },
        update: function (proxy, result) {
            var data = __assign({}, proxy.readQuery({
                query: graphql_1.FETCH_REPLY_QUERY,
                variables: { replyId: parentId }
            }));
            if (result.data) {
                var Index = data.getReply.rereplys.findIndex(function (Id) { return replyId === Id; });
                data.getReply = __assign(__assign({}, data.getReply), { rereplys: __spreadArrays(data.getReply.rereplys.slice(0, Index), data.getReply.rereplys.slice(Index + 1)), rereplyCount: data.getReply.rereplyCount - 1 });
                proxy.writeQuery({
                    query: graphql_1.FETCH_REPLY_QUERY,
                    variables: { replyId: parentId },
                    data: data
                });
            }
            else {
                console.log("Server failed to delete reply!");
            }
        }
    })[0];
    return deleteFunction;
}
exports.useDeleteRereplyMutation = useDeleteRereplyMutation;
function useDeleteReplyMutation(replyId, parentId, parent) {
    if (parent === void 0) { parent = "comment"; }
    var deleteFunction1 = useDeletereplyMutation(replyId, parentId);
    var deleteFunction2 = useDeleteRereplyMutation(replyId, parentId);
    return parent === "comment" ? deleteFunction1 : deleteFunction2;
}
exports.useDeleteReplyMutation = useDeleteReplyMutation;
