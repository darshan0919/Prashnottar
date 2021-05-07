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
var react_router_dom_1 = require("react-router-dom");
var react_modal_1 = require("react-modal");
var semantic_ui_react_1 = require("semantic-ui-react");
var core_1 = require("@material-ui/core");
var QuestionModal_1 = require("../modal/QuestionModal");
var Answer_1 = require("../answer/Answer");
require("../qBox.css");
var auth_1 = require("../../context/auth");
var MoreMenu_1 = require("../utils/MoreMenu");
var moment_1 = require("moment");
var SlateEditor_1 = require("../editor/SlateEditor");
var hooks_1 = require("../../hooks");
function Post(_a) {
    var id = _a.id, singleAnswer = _a.singleAnswer;
    //console.log("postID", id);
    var authUser = react_1.useContext(auth_1.AuthContext).user;
    /// getPost
    var post = hooks_1.useGetPostQuery(id);
    /// getPostUser
    var _b = hooks_1.useGetUserQuery(), postUser = _b.user, setPostUser = _b.setUser;
    react_1.useEffect(function () {
        if (post)
            setPostUser(post.user);
    }, [post, setPostUser]);
    /// editPost
    var _c = hooks_1.useEditPostMutation(id, post), IsModalOpen = _c.IsModalOpen, setIsModalOpen = _c.setIsModalOpen, onChange = _c.onChange, onSubmit = _c.onSubmit, values = _c.values;
    /// deletePost
    var deletePost = hooks_1.useDeletePostMutation(id);
    /// Add Answer Button
    var _d = react_1.useState(true), showAddAnswer = _d[0], setShowAddAnswer = _d[1];
    /// addAnswer
    var _e = hooks_1.useCreateAnswerMutation(id), IsModalOpenAnswer = _e.IsModalOpen, setIsModalOpenAnswer = _e.setIsModalOpen, valuesAnswer = _e.values, onChangeAnswer = _e.onChange, createCallbackAnswer = _e.createCallback;
    return !post ? (react_1["default"].createElement(react_1["default"].Fragment, null)) : (react_1["default"].createElement("div", { className: "post" },
        postUser ? (react_1["default"].createElement("div", { className: "post__info" },
            react_1["default"].createElement(core_1.Avatar, { src: postUser.photo }),
            react_1["default"].createElement("h4", null, postUser.username),
            react_1["default"].createElement("span", null, "\u00B7"),
            react_1["default"].createElement("small", null,
                moment_1["default"](post.createdAt).fromNow(),
                " "),
            react_1["default"].createElement("div", { className: "MenuButton" },
                react_1["default"].createElement(MoreMenu_1["default"], { actions: [
                        {
                            name: "Edit",
                            func: function () { return setIsModalOpen(true); },
                            show: postUser.id === authUser.id
                        },
                        {
                            name: "Delete",
                            func: deletePost,
                            show: postUser.id === authUser.id
                        },
                    ] })))) : (react_1["default"].createElement(react_1["default"].Fragment, null)),
        react_1["default"].createElement("div", { className: "post__body" },
            react_1["default"].createElement("div", { className: "post__question" },
                react_1["default"].createElement(react_router_dom_1.Link, { className: "p", to: "/posts/" + id }, post.question),
                showAddAnswer ? (react_1["default"].createElement("button", { onClick: function () { return setIsModalOpenAnswer(true); }, className: "post__btnAnswer" }, "Answer")) : (react_1["default"].createElement(react_1["default"].Fragment, null)),
                postUser ? (react_1["default"].createElement(react_modal_1["default"], { isOpen: IsModalOpenAnswer, onRequestClose: function () { return setIsModalOpenAnswer(false); }, shouldCloseOnOverlayClick: false, style: {
                        overlay: {
                            width: 650,
                            height: 630,
                            background: "none",
                            zIndex: "1000",
                            top: "50%",
                            left: "50%",
                            marginTop: "-400px",
                            marginLeft: "-350px",
                            scrollbarWidth: "1px"
                        }
                    } },
                    react_1["default"].createElement("div", { className: "modal__question" },
                        react_1["default"].createElement("h2", null, post.question),
                        react_1["default"].createElement("p", null,
                            "asked by",
                            " ",
                            react_1["default"].createElement("span", { className: "name" }, postUser.username),
                            " ",
                            react_1["default"].createElement("span", { className: "time" }, moment_1["default"](post.createdAt).fromNow()))),
                    react_1["default"].createElement("div", null,
                        react_1["default"].createElement(SlateEditor_1["default"], { readOnly: false, onChange: onChangeAnswer, value: JSON.parse(valuesAnswer.body), placeholder: "Enter Your Reply" })),
                    react_1["default"].createElement("div", { className: "modal__button" },
                        react_1["default"].createElement("button", { className: "cancel", onClick: function () { return setIsModalOpenAnswer(false); } }, "Cancel"),
                        react_1["default"].createElement(semantic_ui_react_1.Button, { type: "submit", className: "add", onClick: createCallbackAnswer }, "Add Answer")))) : (react_1["default"].createElement(react_1["default"].Fragment, null))),
            react_1["default"].createElement(QuestionModal_1["default"], __assign({}, {
                IsModalOpen: IsModalOpen,
                setIsModalOpen: setIsModalOpen,
                onChange: onChange,
                onSubmit: onSubmit,
                values: values
            })),
            react_1["default"].createElement("img", { src: post.imageUrl, alt: "" }),
            react_1["default"].createElement("div", { className: "post__answer" }, singleAnswer
                ? post.answers
                    .slice(0, 1)
                    .map(function (Id) { return (react_1["default"].createElement(Answer_1["default"], { key: Id, id: Id, postId: id, postUser: post.user, postQuestion: post.question, hasAnswered: function () {
                        return setShowAddAnswer(false);
                    }, notAnswered: function () { return setShowAddAnswer(true); } })); })
                : post.answers.map(function (Id) { return (react_1["default"].createElement(Answer_1["default"], { key: Id, id: Id, postId: id, postUser: post.user, postQuestion: post.question, hasAnswered: function () { return setShowAddAnswer(false); }, notAnswered: function () { return setShowAddAnswer(true); } })); })))));
}
exports["default"] = Post;
