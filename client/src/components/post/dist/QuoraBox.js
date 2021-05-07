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
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var auth_1 = require("../../context/auth");
require("./QuoraBox.css");
var QuestionModal_1 = require("../modal/QuestionModal");
var createPost_1 = require("../../hooks/post/createPost");
function QuoraBox() {
    var user = react_1.useContext(auth_1.AuthContext).user;
    var _a = createPost_1.useCreatePostMutation(), IsModalOpen = _a.IsModalOpen, setIsModalOpen = _a.setIsModalOpen, onChange = _a.onChange, onSubmit = _a.onSubmit, values = _a.values;
    return (react_1["default"].createElement("div", { className: "quoraBox" },
        react_1["default"].createElement("div", { className: "quoraBox__info" },
            react_1["default"].createElement(core_1.Avatar, { src: user
                    ? user.photo
                    : "https://cdn.cms-twdigitalassets.com/content/dam/partners-twitter/partner-profile/sprinklr/sprinklr.png.twimg.1920.png", className: "quoraBox__infoAvatar" }),
            react_1["default"].createElement("h5", null, user.username)),
        react_1["default"].createElement("div", { className: "quoraBox__quora" },
            react_1["default"].createElement("p", null, "What is your question or link?")),
        react_1["default"].createElement(QuestionModal_1["default"], __assign({}, {
            IsModalOpen: IsModalOpen,
            setIsModalOpen: setIsModalOpen,
            onSubmit: onSubmit,
            onChange: onChange,
            values: values
        }))));
}
exports["default"] = QuoraBox;
