"use strict";
exports.__esModule = true;
var react_1 = require("react");
var hooks_1 = require("../../hooks");
var QuoraBox_1 = require("./QuoraBox");
var Post_1 = require("./Post");
require("./Feed.css");
function Feed(_a) {
    var id = _a.id, singlePost = _a.singlePost, singleAnswer = _a.singleAnswer;
    var posts = hooks_1.useGetPostsQuery();
    return (react_1["default"].createElement("div", { className: "feed" },
        react_1["default"].createElement(QuoraBox_1["default"], null),
        singlePost ? (react_1["default"].createElement(Post_1["default"], { key: id, id: id, singleAnswer: null })) : posts ? (posts.map(function (_a) {
            var id = _a.id;
            return (react_1["default"].createElement(Post_1["default"], { key: id, id: id, singleAnswer: singleAnswer }));
        })) : (react_1["default"].createElement(react_1["default"].Fragment, null))));
}
exports["default"] = Feed;
