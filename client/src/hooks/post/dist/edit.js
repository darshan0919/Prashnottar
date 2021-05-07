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
exports.useEditPostMutation = void 0;
var react_1 = require("react");
var client_1 = require("@apollo/client");
var form_1 = require("../form");
var graphql_1 = require("../../graphql");
function useEditPostMutation(postId, post) {
    var _a = react_1.useState(false), IsModalOpen = _a[0], setIsModalOpen = _a[1];
    var _b = form_1.useForm(editPostCallback, {
        postId: postId,
        question: "",
        imageUrl: ""
    }), onChange = _b.onChange, onSubmit = _b.onSubmit, values = _b.values;
    react_1.useEffect(function () {
        if (post) {
            onChange({
                target: { name: "question", value: post.question }
            });
            onChange({
                target: { name: "imageUrl", value: post.imageUrl }
            });
        }
    }, [post, onChange]);
    function editPostCallback() {
        editPost();
        setIsModalOpen(false);
    }
    var editPost = client_1.useMutation(graphql_1.EDIT_POST_MUTATION, {
        variables: values,
        update: function (proxy, result) {
            var data = __assign({}, proxy.readQuery({
                query: graphql_1.FETCH_POST_QUERY,
                variables: { postId: postId }
            }));
            data.getPost = __assign(__assign({}, data.getPost), result.data.editPost);
            proxy.writeQuery({
                query: graphql_1.FETCH_POST_QUERY,
                variables: { postId: postId },
                data: data
            });
        }
    })[0];
    return {
        IsModalOpen: IsModalOpen,
        setIsModalOpen: setIsModalOpen,
        onChange: onChange,
        onSubmit: onSubmit,
        values: values
    };
}
exports.useEditPostMutation = useEditPostMutation;
