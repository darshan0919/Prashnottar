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
var react_modal_1 = require("react-modal");
var moment_1 = require("moment");
var semantic_ui_react_1 = require("semantic-ui-react");
var ArrowUpwardOutlined_1 = require("@material-ui/icons/ArrowUpwardOutlined");
var ArrowDownwardOutlined_1 = require("@material-ui/icons/ArrowDownwardOutlined");
var ChatBubbleOutlineOutlined_1 = require("@material-ui/icons/ChatBubbleOutlineOutlined");
var core_1 = require("@material-ui/core");
var Comment_1 = require("../comment/Comment");
var MoreMenu_1 = require("../utils/MoreMenu");
require("../qBox.css");
var auth_1 = require("../../context/auth");
var InputModal_1 = require("../modal/InputModal");
var SlateEditor_1 = require("../editor/SlateEditor");
var hooks_1 = require("../../hooks");
function Answer(_a) {
    var id = _a.id, postId = _a.postId, postUser = _a.postUser, postQuestion = _a.postQuestion, hasAnswered = _a.hasAnswered, notAnswered = _a.notAnswered;
    var authUser = react_1.useContext(auth_1.AuthContext).user;
    var answer = hooks_1.useGetAnswerQuery(id);
    /// Check if Answer is given by Current User
    react_1.useEffect(function () {
        if (answer && authUser) {
            if (answer.user === authUser.id) {
                hasAnswered();
            }
        }
    }, [answer, authUser, hasAnswered]);
    /// answerUser
    var _b = hooks_1.useGetUserQuery(), answerUser = _b.user, setAnswerUser = _b.setUser;
    react_1.useEffect(function () {
        if (answer)
            setAnswerUser(answer.user);
    }, [answer, setAnswerUser]);
    /// upvote | downvote
    var _c = hooks_1.useVoteAnswerMutation(id), upvoteAnswer = _c.upvoteAnswer, downvoteAnswer = _c.downvoteAnswer;
    var _d = hooks_1.useEditAnswerMutation(id, answer), IsModalOpen = _d.IsModalOpen, setIsModalOpen = _d.setIsModalOpen, onChange = _d.onChange, editCallback = _d.editCallback, values = _d.values;
    var deleteAnswer = hooks_1.useDeleteAnswerMutation(id, postId);
    /// Show Comments Button
    var _e = react_1.useState(false), showComments = _e[0], setShowComments = _e[1];
    /// createComment
    var _f = hooks_1.useCreateCommentMutation(id), IsModalOpenComment = _f.IsModalOpen, setIsModalOpenComment = _f.setIsModalOpen, valuesComment = _f.values, onChangeComment = _f.onChange, createCommentCallback = _f.createCallback;
    return !answer ? (react_1["default"].createElement(react_1["default"].Fragment, null)) : (react_1["default"].createElement("div", { key: id, className: "post__single__answer" },
        answerUser ? (react_1["default"].createElement("div", { className: "answer__info" },
            react_1["default"].createElement("div", { className: "answer" }, "Answer"),
            react_1["default"].createElement("div", { className: "post__info" },
                react_1["default"].createElement(core_1.Avatar, { src: answerUser.photo }),
                react_1["default"].createElement("h4", null, answerUser.username),
                react_1["default"].createElement("span", null, "\u00B7"),
                react_1["default"].createElement("small", null, moment_1["default"](answer.createdAt).fromNow())))) : (react_1["default"].createElement(react_1["default"].Fragment, null)),
        react_1["default"].createElement("div", { className: "p", key: id, style: {
                position: "relative",
                paddingBottom: "5px"
            } },
            react_1["default"].createElement("span", null,
                react_1["default"].createElement(SlateEditor_1["default"], { readOnly: true, value: JSON.parse(answer.body), onChange: onChange, placeholder: "Enter Your Reply" }))),
        react_1["default"].createElement("div", { className: "post__footer" },
            react_1["default"].createElement("div", { className: "post__footerAction" },
                react_1["default"].createElement(ArrowUpwardOutlined_1["default"], { onClick: function () { return upvoteAnswer(); } }),
                react_1["default"].createElement("span", { className: "values" }, answer.upvoteCount),
                react_1["default"].createElement("span", null, "|"),
                react_1["default"].createElement(ArrowDownwardOutlined_1["default"], { onClick: function () { return downvoteAnswer(); } })),
            react_1["default"].createElement(ChatBubbleOutlineOutlined_1["default"], { onClick: function () { return setShowComments(!showComments); } }),
            react_1["default"].createElement("span", { className: "values" }, answer.commentCount),
            react_1["default"].createElement(InputModal_1["default"], __assign({}, {
                title: "Comment",
                action: "commented",
                IsModalOpen: IsModalOpenComment,
                setIsModalOpen: setIsModalOpenComment,
                callBack: createCommentCallback,
                onChange: onChangeComment,
                values: valuesComment
            })),
            react_1["default"].createElement("div", { className: "post__footerLeft" },
                react_1["default"].createElement(MoreMenu_1["default"], { actions: [
                        {
                            name: "Edit",
                            func: function () { return setIsModalOpen(true); },
                            show: authUser.id === answer.user
                        },
                        {
                            name: "Delete",
                            func: function () {
                                deleteAnswer();
                                if (authUser.id === answer.user) {
                                    console.log("showAnswer");
                                    notAnswered();
                                }
                            },
                            show: authUser.id === answer.user ||
                                authUser.id === postUser
                        },
                        {
                            name: "Comment",
                            func: function () { return setIsModalOpenComment(true); },
                            show: true
                        },
                    ] })),
            react_1["default"].createElement(react_modal_1["default"], { isOpen: IsModalOpen, onRequestClose: function () { return setIsModalOpen(false); }, shouldCloseOnOverlayClick: false, style: {
                    overlay: {
                        width: 700,
                        height: 670,
                        background: "none",
                        zIndex: "3000",
                        top: "50%",
                        left: "50%",
                        marginTop: "-300px",
                        marginLeft: "-375px"
                    },
                    content: {
                        border: "2.5px solid #ccc",
                        borderRadius: "none"
                    }
                } },
                react_1["default"].createElement("div", { className: "modal__question" },
                    react_1["default"].createElement("h1", null, postQuestion),
                    react_1["default"].createElement("p", null,
                        "answer last updated",
                        " ",
                        react_1["default"].createElement("span", { className: "name" }, moment_1["default"](answer.createdAt).fromNow()))),
                react_1["default"].createElement(SlateEditor_1["default"], { readOnly: false, onChange: onChange, value: JSON.parse(values.body), placeholder: "Enter Your Answer" }),
                react_1["default"].createElement("div", { className: "modal__button" },
                    react_1["default"].createElement("button", { className: "cancel", onClick: function () { return setIsModalOpen(false); } }, "Cancel"),
                    react_1["default"].createElement(semantic_ui_react_1.Button, { type: "sumbit", className: "add", onClick: editCallback }, "Submit")))),
        react_1["default"].createElement("div", { className: "post__answer" }, showComments ? (react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement("div", { className: "comments" }, "Comments"),
            answer.comments.map(function (Id) { return (react_1["default"].createElement(Comment_1["default"], { key: Id, id: Id, answerId: id, answerUser: answer.user })); }))) : (react_1["default"].createElement(react_1["default"].Fragment, null)))));
}
exports["default"] = Answer;
