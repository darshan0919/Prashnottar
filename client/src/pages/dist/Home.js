"use strict";
exports.__esModule = true;
var react_1 = require("react");
require("./Home.css");
var QHeader_1 = require("../components/navbar/QHeader");
var Sidebar_1 = require("../components/sidebar/Sidebar");
var Feed_1 = require("../components/post/Feed");
var Widget_1 = require("../components/widget/Widget");
function Home() {
    return (react_1["default"].createElement("div", { className: "quora test" },
        react_1["default"].createElement(QHeader_1["default"], null),
        react_1["default"].createElement("div", { className: "quora__content" },
            react_1["default"].createElement(Sidebar_1["default"], null),
            react_1["default"].createElement(Feed_1["default"], { id: null, singleAnswer: true, singlePost: false }),
            react_1["default"].createElement(Widget_1["default"], null))));
}
exports["default"] = Home;
