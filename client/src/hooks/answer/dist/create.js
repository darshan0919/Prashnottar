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
exports.useCreateAnswerMutation = void 0;
var react_1 = require("react");
var client_1 = require("@apollo/client");
var graphql_1 = require("../../graphql");
var initialValue = JSON.stringify([
    {
        type: "paragraph",
        children: [{ text: "This is editable " }]
    },
]);
function useCreateAnswerMutation(postId) {
    var _a = react_1.useState(false), IsModalOpen = _a[0], setIsModalOpen = _a[1];
    var _b = react_1.useState({
        postId: postId,
        body: initialValue
    }), values = _b[0], setValues = _b[1];
    var onChange = function (body) {
        return setValues(__assign(__assign({}, values), { body: JSON.stringify(body) }));
    };
    var create = client_1.useMutation(graphql_1.CREATE_ANSWER_MUTATION, {
        variables: values,
        update: function (proxy, result) {
            var data = __assign({}, proxy.readQuery({
                query: graphql_1.FETCH_POST_QUERY,
                variables: { postId: postId }
            }));
            ///console.log("resultId", result.data.createAnswer.id);
            if (result.data) {
                data.getPost = __assign(__assign({}, data.getPost), { answers: __spreadArrays([
                        result.data.createAnswer.id
                    ], data.getPost.answers) });
                /*if (
                    childModel === "comment" ||
                    childModel === "reply" ||
                    childModel === "rereply"
                ) {
                    data[`get${Model}`] = {
                        ...data[`get${Model}`],
                        [`${childModel}Count`]:
                            data[`get${Model}`][`${childModel}Count`] + 1,
                    };
                }*/
                ///console.log("resultData", data.getPost);
                proxy.writeQuery({
                    query: graphql_1.FETCH_POST_QUERY,
                    variables: { postId: postId },
                    data: data
                });
                values.body = initialValue;
            }
            else {
                console.log("Server failed to create Post");
            }
        }
    })[0];
    function createCallback() {
        create();
        setIsModalOpen(false);
    }
    return {
        IsModalOpen: IsModalOpen,
        setIsModalOpen: setIsModalOpen,
        values: values,
        onChange: onChange,
        createCallback: createCallback
    };
}
exports.useCreateAnswerMutation = useCreateAnswerMutation;
