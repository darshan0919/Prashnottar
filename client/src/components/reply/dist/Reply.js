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
var semantic_ui_react_1 = require("semantic-ui-react");
var ArrowUpwardOutlined_1 = require("@material-ui/icons/ArrowUpwardOutlined");
var ArrowDownwardOutlined_1 = require("@material-ui/icons/ArrowDownwardOutlined");
var Reply_1 = require("@material-ui/icons/Reply");
var core_1 = require("@material-ui/core");
var MoreMenu_1 = require("../utils/MoreMenu");
require("../qBox.css");
var auth_1 = require("../../context/auth");
var moment_1 = require("moment");
var InputModal_1 = require("../modal/InputModal");
var SlateEditor_1 = require("../editor/SlateEditor");
var hooks_1 = require("../../hooks");
function Reply(_a) {
    //console.log("Reply", id);
    var id = _a.id, commentId = _a.commentId, commentUser = _a.commentUser, parentId = _a.parentId, parentUser = _a.parentUser;
    var authUser = react_1.useContext(auth_1.AuthContext).user;
    var reply = hooks_1.useGetReplyQuery(id);
    /// replyUser
    var _b = hooks_1.useGetUserQuery(), replyUser = _b.user, setReplyUser = _b.setUser;
    react_1.useEffect(function () {
        if (reply)
            setReplyUser(reply.user);
    }, [reply, setReplyUser]);
    /// upvote | downvote
    var _c = hooks_1.useVoteReplyMutation(id), upvoteReply = _c.upvoteReply, downvoteReply = _c.downvoteReply;
    var _d = hooks_1.useEditReplyMutation(id, reply), IsModalOpen = _d.IsModalOpen, setIsModalOpen = _d.setIsModalOpen, onChange = _d.onChange, editCallback = _d.editCallback, values = _d.values;
    var deleteReply = hooks_1.useDeleteReplyMutation(id, commentId ? commentId : parentId, commentId ? "comment" : "parent");
    /// Show Rereplys Button
    var _e = react_1.useState(false), showReplys = _e[0], setShowReplys = _e[1];
    /// createRereply
    var _f = hooks_1.useCreateRereplyMutation(id), IsModalOpenReply = _f.IsModalOpen, setIsModalOpenReply = _f.setIsModalOpen, valuesReply = _f.values, onChangeReply = _f.onChange, createReplyCallback = _f.createCallback;
    return !reply ? (react_1["default"].createElement(react_1["default"].Fragment, null)) : (react_1["default"].createElement("div", { key: id, className: "post__single__answer single__reply" },
        replyUser ? (react_1["default"].createElement("div", { className: "answer__info" },
            react_1["default"].createElement("div", { className: "post__info" },
                react_1["default"].createElement(core_1.Avatar, { className: "reply", src: replyUser.photo }),
                react_1["default"].createElement("div", { className: "reply__info" },
                    react_1["default"].createElement("h5", null, replyUser.username),
                    react_1["default"].createElement("small", null, moment_1["default"](reply.createdAt).fromNow()))))) : (react_1["default"].createElement(react_1["default"].Fragment, null)),
        react_1["default"].createElement("div", { className: "p", key: id, style: {
                position: "relative",
                paddingBottom: "5px"
            } },
            react_1["default"].createElement("span", null,
                react_1["default"].createElement(SlateEditor_1["default"], { readOnly: true, onChange: onChange, value: JSON.parse(values.body), placeholder: "Enter Your Reply" }))),
        react_1["default"].createElement("div", { className: "post__footer" },
            react_1["default"].createElement("div", { className: "post__footerAction" },
                react_1["default"].createElement(ArrowUpwardOutlined_1["default"], { onClick: function () { return upvoteReply(); } }),
                react_1["default"].createElement("span", { className: "values" }, reply.upvoteCount),
                react_1["default"].createElement("span", null, "|"),
                react_1["default"].createElement(ArrowDownwardOutlined_1["default"], { onClick: function () { return downvoteReply(); } })),
            react_1["default"].createElement(Reply_1["default"], { onClick: function () {
                    setShowReplys(!showReplys);
                } }),
            reply.rereplyCount,
            react_1["default"].createElement(InputModal_1["default"], __assign({}, {
                title: "Reply",
                action: "replied",
                IsModalOpen: IsModalOpenReply,
                setIsModalOpen: setIsModalOpenReply,
                callBack: createReplyCallback,
                onChange: onChangeReply,
                values: valuesReply
            })),
            react_1["default"].createElement("div", { className: "post__footerLeft" },
                react_1["default"].createElement(MoreMenu_1["default"], { actions: [
                        {
                            name: "Edit",
                            func: function () { return setIsModalOpen(true); },
                            show: authUser.id === reply.user
                        },
                        {
                            name: "Delete",
                            func: deleteReply,
                            show: authUser.id === reply.user ||
                                authUser.id === parentUser ||
                                authUser.id === commentUser
                        },
                        {
                            name: "Reply",
                            func: function () { return setIsModalOpenReply(true); },
                            show: true
                        },
                    ] })),
            react_1["default"].createElement(react_modal_1["default"], { isOpen: IsModalOpen, onRequestClose: function () { return setIsModalOpen(false); }, shouldCloseOnOverlayClick: false, style: {
                    overlay: {
                        width: 680,
                        height: 550,
                        background: "none",
                        zIndex: "1000",
                        top: "50%",
                        left: "50%",
                        marginTop: "-250px",
                        marginLeft: "-350px"
                    }
                } },
                react_1["default"].createElement("div", { className: "modal__question" },
                    react_1["default"].createElement("p", null,
                        "reply last updated",
                        " ",
                        react_1["default"].createElement("span", { className: "name" }, moment_1["default"](reply.createdAt).fromNow()))),
                react_1["default"].createElement("div", null,
                    react_1["default"].createElement(SlateEditor_1["default"], { readOnly: false, onChange: onChange, value: JSON.parse(values.body), placeholder: "Enter Your Reply" })),
                react_1["default"].createElement("div", { className: "modal__button" },
                    react_1["default"].createElement("button", { className: "cancel", onClick: function () { return setIsModalOpen(false); } }, "Cancel"),
                    react_1["default"].createElement(semantic_ui_react_1.Button, { type: "sumbit", className: "add", onClick: editCallback }, "Submit")))),
        react_1["default"].createElement("div", { className: "post__answer" }, showReplys ? (reply.rereplys.map(function (Id) { return (react_1["default"].createElement(Reply, { key: Id, id: Id, parentId: id, parentUser: reply.user, commentId: null, commentUser: null })); })) : (react_1["default"].createElement(react_1["default"].Fragment, null)))));
}
exports["default"] = Reply;
