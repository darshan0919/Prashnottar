"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./Home.css");
var QHeader_1 = require("../components/navbar/QHeader");
var Feed_1 = require("../components/post/Feed");
var Widget_1 = require("../components/widget/Widget");
function SinglePost(props) {
    var id = react_1.useState(props.match.params.postId)[0];
    return (react_1["default"].createElement("div", { className: "quora" },
        react_1["default"].createElement(QHeader_1["default"], null),
        react_1["default"].createElement("div", { className: "quora__content" },
            react_1["default"].createElement(Feed_1["default"], { singleAnswer: false, singlePost: true, id: id }),
            react_1["default"].createElement(Widget_1["default"], null))));
}
exports["default"] = SinglePost;
