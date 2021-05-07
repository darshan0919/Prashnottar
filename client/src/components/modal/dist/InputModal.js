"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_modal_1 = require("react-modal");
var auth_1 = require("../../context/auth");
var SlateEditor_1 = require("../editor/SlateEditor");
var core_1 = require("@material-ui/core");
require("./InputModal.css");
react_modal_1["default"].setAppElement("#root");
function InputModal(_a) {
    var IsModalOpen = _a.IsModalOpen, setIsModalOpen = _a.setIsModalOpen, onChange = _a.onChange, values = _a.values, callBack = _a.callBack, title = _a.title, action = _a.action;
    var user = react_1.useContext(auth_1.AuthContext).user;
    return (react_1["default"].createElement(react_modal_1["default"], { isOpen: IsModalOpen, onRequestClose: function () { return setIsModalOpen(false); }, shouldCloseOnOverlayClick: false, style: {
            overlay: {
                width: 700,
                height: 650,
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
        react_1["default"].createElement("div", { className: "modal__title" },
            react_1["default"].createElement("h5", null,
                "Add ",
                title)),
        user ? (react_1["default"].createElement("div", { className: "modal__info" },
            react_1["default"].createElement(core_1.Avatar, { className: "avatar", src: user.photo }),
            react_1["default"].createElement("p", null,
                user.username,
                " ",
                action))) : (react_1["default"].createElement(react_1["default"].Fragment, null)),
        react_1["default"].createElement("div", null,
            react_1["default"].createElement(SlateEditor_1["default"], { readOnly: false, placeholder: "Enter " + title + "...", onChange: onChange, value: JSON.parse(values.body) })),
        react_1["default"].createElement("div", { className: "modal__buttons" },
            react_1["default"].createElement("button", { className: "cancel", onClick: function () { return setIsModalOpen(false); } }, "Cancel"),
            react_1["default"].createElement(core_1.Button, { type: "submit", className: "add", onClick: callBack }, "Submit"))));
}
exports["default"] = InputModal;
