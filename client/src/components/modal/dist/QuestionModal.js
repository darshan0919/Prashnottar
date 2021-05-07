"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_modal_1 = require("react-modal");
var auth_1 = require("../../context/auth");
var semantic_ui_react_1 = require("semantic-ui-react");
var PeopleAltOutlined_1 = require("@material-ui/icons/PeopleAltOutlined");
var icons_1 = require("@material-ui/icons");
var core_1 = require("@material-ui/core");
require("./QuestionModal.css");
react_modal_1["default"].setAppElement("#root");
function QuestionModal(_a) {
    var IsModalOpen = _a.IsModalOpen, setIsModalOpen = _a.setIsModalOpen, onSubmit = _a.onSubmit, onChange = _a.onChange, values = _a.values;
    var user = react_1.useContext(auth_1.AuthContext).user;
    return (react_1["default"].createElement(react_modal_1["default"], { isOpen: IsModalOpen, onRequestClose: function () { return setIsModalOpen(false); }, shouldCloseOnOverlayClick: false, style: {
            overlay: {
                width: 700,
                height: 620,
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
            react_1["default"].createElement("h5", null, "Add Question")),
        react_1["default"].createElement("div", { className: "modal__info" },
            react_1["default"].createElement(core_1.Avatar, { className: "avatar", src: user
                    ? user.photo
                    : "https://images-platform.99static.com//_QXV_u2KU7-ihGjWZVHQb5d-yVM=/238x1326:821x1909/fit-in/500x500/99designs-contests-attachments/119/119362/attachment_119362573" }),
            react_1["default"].createElement("p", null,
                user ? user.username : "D",
                " asked"),
            react_1["default"].createElement("div", { className: "modal__scope" },
                react_1["default"].createElement(PeopleAltOutlined_1["default"], null),
                react_1["default"].createElement("p", null, "Public"),
                react_1["default"].createElement(icons_1.ExpandMore, null))),
        react_1["default"].createElement(semantic_ui_react_1.Form, { onSubmit: onSubmit },
            react_1["default"].createElement("div", { className: "modal__Field" },
                react_1["default"].createElement("textarea", { placeholder: "Start your question with 'What', 'How', 'Why', etc. ", name: "question", onChange: onChange, value: values.question }),
                react_1["default"].createElement("div", { className: "modal__fieldLink" },
                    react_1["default"].createElement(icons_1.Link, null),
                    react_1["default"].createElement(semantic_ui_react_1.Form.Input, { className: "linkBox", placeholder: "Optional: inclue a link that gives context", name: "imageUrl", onChange: onChange, value: values.imageUrl }))),
            react_1["default"].createElement("div", { className: "modal__buttons" },
                react_1["default"].createElement("button", { className: "cancel", onClick: function () { return setIsModalOpen(false); } }, "Cancel"),
                react_1["default"].createElement(core_1.Button, { type: "submit", className: "add" }, "Submit")))));
}
exports["default"] = QuestionModal;
