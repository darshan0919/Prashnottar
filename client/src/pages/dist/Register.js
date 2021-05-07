"use strict";
exports.__esModule = true;
var react_1 = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
var ArrowForwardIos_1 = require("@material-ui/icons/ArrowForwardIos");
require("./Login.css");
var registerUser_1 = require("../hooks/user/registerUser");
function Register(props) {
    var _a = registerUser_1.useRegisterUserMutation(props), errors = _a.errors, onChange = _a.onChange, onSubmit = _a.onSubmit, values = _a.values, loading = _a.loading;
    return (react_1["default"].createElement("div", { className: "login" },
        react_1["default"].createElement("div", { className: "login__container" },
            react_1["default"].createElement("div", { className: "login__logo" },
                react_1["default"].createElement("img", { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/250px-Quora_logo_2015.svg.png", alt: "" })),
            react_1["default"].createElement("div", { className: "login__desc" },
                react_1["default"].createElement("p", null, "A Place to Share knowledge and better understand the world")),
            react_1["default"].createElement("div", { className: "login__emailPass" },
                react_1["default"].createElement("div", { className: "login__label" },
                    react_1["default"].createElement("h3", null, "Sign up")),
                react_1["default"].createElement(semantic_ui_react_1.Form, { onSubmit: onSubmit, noValidate: true, className: loading ? "loading" : "" },
                    react_1["default"].createElement("div", { className: "login__inputFields" },
                        react_1["default"].createElement("div", { className: "login__inputField" },
                            react_1["default"].createElement(semantic_ui_react_1.Form.Input, { label: "Username", placeholder: "Username..", name: "username", type: "text", value: values.username, error: errors.username ? true : false, onChange: onChange })),
                        react_1["default"].createElement("div", { className: "login__inputField" },
                            react_1["default"].createElement(semantic_ui_react_1.Form.Input, { label: "Email", placeholder: "Email..", name: "email", type: "email", value: values.email, error: errors.email ? true : false, onChange: onChange })),
                        react_1["default"].createElement("div", { className: "login__inputField" },
                            react_1["default"].createElement(semantic_ui_react_1.Form.Input, { label: "Password", placeholder: "Password..", name: "password", type: "password", value: values.password, error: errors.password ? true : false, onChange: onChange })),
                        react_1["default"].createElement("div", { className: "login__inputField" },
                            react_1["default"].createElement(semantic_ui_react_1.Form.Input, { label: "Confirm Password", placeholder: "Confirm Password..", name: "confirmPassword", type: "password", value: values.confirmPassword, error: errors.confirmPassword ? true : false, onChange: onChange }))),
                    react_1["default"].createElement("div", { className: "login__forgButt" },
                        react_1["default"].createElement(semantic_ui_react_1.Button, { type: "submit", primary: true }, "Sign up"))),
                Object.keys(errors).length > 0 && (react_1["default"].createElement("div", { className: "ui error message" },
                    react_1["default"].createElement("ul", { className: "list" }, 
                    //TODO
                    Object.values(errors).map(function (value) { return (react_1["default"].createElement("li", { key: value }, value)); }))))),
            react_1["default"].createElement("div", { className: "login__lang" },
                react_1["default"].createElement("p", null, "\u0939\u093F\u0928\u094D\u0926\u0940"),
                react_1["default"].createElement(ArrowForwardIos_1["default"], { fontSize: "small" })),
            react_1["default"].createElement("div", { className: "login__footer" },
                react_1["default"].createElement("p", null, "About"),
                react_1["default"].createElement("p", null, "Languages"),
                react_1["default"].createElement("p", null, "Careers"),
                react_1["default"].createElement("p", null, "Businesses"),
                react_1["default"].createElement("p", null, "Privacy"),
                react_1["default"].createElement("p", null, "Terms"),
                react_1["default"].createElement("p", null, "Contact")))));
}
exports["default"] = Register;
