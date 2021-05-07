"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.DELETE_POST_MUTATION = exports.EDIT_POST_MUTATION = exports.CREATE_POST_MUTATION = void 0;
var graphql_tag_1 = require("graphql-tag");
exports.CREATE_POST_MUTATION = graphql_tag_1["default"](templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    mutation createPost($question: String!, $imageUrl: String) {\n        createPost(question: $question, imageUrl: $imageUrl) {\n            id\n        }\n    }\n"], ["\n    mutation createPost($question: String!, $imageUrl: String) {\n        createPost(question: $question, imageUrl: $imageUrl) {\n            id\n        }\n    }\n"])));
exports.EDIT_POST_MUTATION = graphql_tag_1["default"](templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    mutation editPost($postId: ID!, $question: String!, $imageUrl: String) {\n        editPost(postId: $postId, question: $question, imageUrl: $imageUrl) {\n            id\n            question\n            imageUrl\n        }\n    }\n"], ["\n    mutation editPost($postId: ID!, $question: String!, $imageUrl: String) {\n        editPost(postId: $postId, question: $question, imageUrl: $imageUrl) {\n            id\n            question\n            imageUrl\n        }\n    }\n"])));
exports.DELETE_POST_MUTATION = graphql_tag_1["default"](templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    mutation deletePost($postId: ID!) {\n        deletePost(postId: $postId) {\n            id\n        }\n    }\n"], ["\n    mutation deletePost($postId: ID!) {\n        deletePost(postId: $postId) {\n            id\n        }\n    }\n"])));
var templateObject_1, templateObject_2, templateObject_3;
