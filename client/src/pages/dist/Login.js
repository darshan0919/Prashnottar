"use strict";
exports.__esModule = true;
var react_1 = require("react");
var semantic_ui_react_1 = require("semantic-ui-react");
var react_router_dom_1 = require("react-router-dom");
var ArrowForwardIos_1 = require("@material-ui/icons/ArrowForwardIos");
require("./Login.css");
var loginUser_1 = require("../hooks/user/loginUser");
function Login(props) {
    var _a = loginUser_1.useLoginUserMutation(props), errors = _a.errors, onChange = _a.onChange, onSubmit = _a.onSubmit, values = _a.values, loading = _a.loading;
    return (react_1["default"].createElement("div", { className: "login" },
        react_1["default"].createElement("div", { className: "login__container" },
            react_1["default"].createElement("div", { className: "login__logo" },
                react_1["default"].createElement("img", { src: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Quora_logo_2015.svg/250px-Quora_logo_2015.svg.png", alt: "" })),
            react_1["default"].createElement("div", { className: "login__desc" },
                react_1["default"].createElement("p", null, "A Place to Share knowledge and better understand the world")),
            react_1["default"].createElement("div", { className: "login__auth" },
                react_1["default"].createElement("div", { className: "login__authOptions" },
                    react_1["default"].createElement("div", { className: "login__authOption" },
                        react_1["default"].createElement("img", { className: "login__googleAuth", src: "https://media-public.canva.com/MADnBiAubGA/3/screen.svg", alt: "" }),
                        react_1["default"].createElement("p", null, "Continue With Google")),
                    react_1["default"].createElement("div", { className: "login__authOption" },
                        react_1["default"].createElement("img", { className: "login__googleAuth", src: "https://1000logos.net/wp-content/uploads/2016/11/Facebook-logo-500x350.png", alt: "" }),
                        react_1["default"].createElement("span", null, "Continue With Facebook")),
                    react_1["default"].createElement(react_router_dom_1.Link, { className: "login__authOption", to: "/register" }, "Sign up with email"),
                    react_1["default"].createElement("div", { className: "login__authDesc" },
                        react_1["default"].createElement("p", null,
                            "By continuing you indicate that you have read and agree to Quora's",
                            react_1["default"].createElement("span", { style: { color: "blue", cursor: "pointer" } },
                                "Terms of Service",
                                " "),
                            "and",
                            " ",
                            react_1["default"].createElement("span", { style: { color: "blue", cursor: "pointer" } }, "Privacy Policy"),
                            "."))),
                react_1["default"].createElement("div", { className: "login__emailPass" },
                    react_1["default"].createElement("div", { className: "login__label" },
                        react_1["default"].createElement("h3", null, "Login")),
                    react_1["default"].createElement(semantic_ui_react_1.Form, { onSubmit: onSubmit, noValidate: true, className: loading ? "loading" : "" },
                        react_1["default"].createElement("div", { className: "login__inputFields" },
                            react_1["default"].createElement("div", { className: "login__inputField" },
                                react_1["default"].createElement(semantic_ui_react_1.Form.Input, { label: "Username", placeholder: "Username..", name: "username", type: "text", value: values.username, error: errors.username ? true : false, onChange: onChange })),
                            react_1["default"].createElement("div", { className: "login__inputField" },
                                react_1["default"].createElement(semantic_ui_react_1.Form.Input, { label: "Password", placeholder: "Password..", name: "password", type: "password", value: values.password, error: errors.password ? true : false, onChange: onChange }))),
                        react_1["default"].createElement("div", { className: "login__forgButt" },
                            react_1["default"].createElement("small", null, "Forgot Password?"),
                            react_1["default"].createElement(semantic_ui_react_1.Button, { type: "submit", primary: true }, "Login"))),
                    Object.keys(errors).length > 0 && (react_1["default"].createElement("div", { className: "ui error message" },
                        react_1["default"].createElement("ul", { className: "list" }, 
                        //TODO
                        Object.values(errors).map(function (value) { return (react_1["default"].createElement("li", { key: value }, value)); })))))),
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
exports["default"] = Login;
