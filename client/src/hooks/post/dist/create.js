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
exports.useCreatePostMutation = void 0;
var react_1 = require("react");
var client_1 = require("@apollo/client");
var form_1 = require("../form");
var graphql_1 = require("../../graphql");
var initialValue = {
    question: "",
    imageUrl: ""
};
function useCreatePostMutation() {
    var _a = react_1.useState(false), IsModalOpen = _a[0], setIsModalOpen = _a[1];
    var _b = form_1.useForm(createPostCallback, initialValue), onChange = _b.onChange, onSubmit = _b.onSubmit, values = _b.values;
    var createPost = client_1.useMutation(graphql_1.CREATE_POST_MUTATION, {
        variables: values,
        update: function (proxy, result) {
            var data = __assign({}, proxy.readQuery({
                query: graphql_1.FETCH_POSTS_QUERY
            }));
            console.log("getPosts", data.getPosts);
            data.getPosts = __spreadArrays([
                { id: result.data.createPost.id }
            ], data.getPosts);
            proxy.writeQuery({ query: graphql_1.FETCH_POSTS_QUERY, data: data });
            values.question = "";
            values.imageUrl = "";
        }
    })[0];
    function createPostCallback() {
        setIsModalOpen(false);
        createPost();
    }
    return {
        IsModalOpen: IsModalOpen,
        setIsModalOpen: setIsModalOpen,
        onChange: onChange,
        onSubmit: onSubmit,
        values: values
    };
}
exports.useCreatePostMutation = useCreatePostMutation;
