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
var Home_1 = require("@material-ui/icons/Home");
var FeaturedPlayListOutlined_1 = require("@material-ui/icons/FeaturedPlayListOutlined");
var AssignmentTurnedInOutlined_1 = require("@material-ui/icons/AssignmentTurnedInOutlined");
var PeopleAltOutlined_1 = require("@material-ui/icons/PeopleAltOutlined");
var NotificationsOutlined_1 = require("@material-ui/icons/NotificationsOutlined");
var Search_1 = require("@material-ui/icons/Search");
var Language_1 = require("@material-ui/icons/Language");
var core_1 = require("@material-ui/core");
require("./QHeader.css");
var auth_1 = require("../../context/auth");
var QuestionModal_1 = require("../modal/QuestionModal");
var create_1 = require("../../hooks/post/create");
function QHeader() {
    var _a = react_1.useContext(auth_1.AuthContext), user = _a.user, logout = _a.logout;
    if (!user) {
        window.location.href = "http://localhost:3000/";
    }
    var _b = create_1.useCreatePostMutation(), IsModalOpen = _b.IsModalOpen, setIsModalOpen = _b.setIsModalOpen, onChange = _b.onChange, onSubmit = _b.onSubmit, values = _b.values;
    return (react_1["default"].createElement("div", { className: "qHeader" },
        react_1["default"].createElement("div", { className: "qHeader__logo" },
            react_1["default"].createElement("span", { className: "logo" }, "Prashnottar")),
        react_1["default"].createElement("div", { className: "qHeader__icons" },
            react_1["default"].createElement("div", { className: "active qHeader__icon" },
                react_1["default"].createElement(Home_1["default"], { onClick: function () {
                        window.location.href = "http://localhost:3000/";
                    } })),
            react_1["default"].createElement("div", { className: "qHeader__icon" },
                react_1["default"].createElement(FeaturedPlayListOutlined_1["default"], null)),
            react_1["default"].createElement("div", { className: "qHeader__icon" },
                react_1["default"].createElement(AssignmentTurnedInOutlined_1["default"], null)),
            react_1["default"].createElement("div", { className: "qHeader__icon" },
                react_1["default"].createElement(PeopleAltOutlined_1["default"], null)),
            react_1["default"].createElement("div", { className: "qHeader__icon" },
                react_1["default"].createElement(NotificationsOutlined_1["default"], null))),
        react_1["default"].createElement("div", { className: "qHeader__input" },
            react_1["default"].createElement(Search_1["default"], null),
            react_1["default"].createElement("input", { type: "text", placeholder: "Search Quora" })),
        react_1["default"].createElement("div", { className: "qHeader__Rem" },
            react_1["default"].createElement("div", { className: "qHeader__avatar" },
                react_1["default"].createElement(core_1.Avatar, { onClick: logout, src: user.photo })),
            react_1["default"].createElement(Language_1["default"], null),
            react_1["default"].createElement(core_1.Button, { onClick: function () { return setIsModalOpen(true); } }, "Add Question"),
            react_1["default"].createElement(QuestionModal_1["default"], __assign({}, {
                IsModalOpen: IsModalOpen,
                setIsModalOpen: setIsModalOpen,
                onSubmit: onSubmit,
                onChange: onChange,
                values: values
            })))));
}
exports["default"] = QHeader;
