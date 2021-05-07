"use strict";
exports.__esModule = true;
exports.useLoginUserMutation = void 0;
var react_1 = require("react");
var client_1 = require("@apollo/client");
var graphql_1 = require("../../graphql");
var form_1 = require("../form");
var auth_1 = require("../../context/auth");
function useLoginUserMutation(props) {
    var context = react_1.useContext(auth_1.AuthContext);
    //TODO
    var _a = react_1.useState({}), errors = _a[0], setErrors = _a[1];
    var _b = form_1.useForm(loginUserCallback, {
        username: "",
        password: ""
    }), onChange = _b.onChange, onSubmit = _b.onSubmit, values = _b.values;
    var _c = client_1.useMutation(graphql_1.LOGIN_USER_MUTATION, {
        variables: values,
        update: function (_, _a) {
            var userData = _a.data.login;
            context.login(userData);
            props.history.push("/");
        },
        onError: function (err) {
            setErrors(err.graphQLErrors[0].extensions.exception.errors);
        }
    }), loginUser = _c[0], loading = _c[1].loading;
    function loginUserCallback() {
        loginUser();
    }
    return {
        errors: errors,
        onChange: onChange,
        onSubmit: onSubmit,
        values: values,
        loading: loading
    };
}
exports.useLoginUserMutation = useLoginUserMutation;
