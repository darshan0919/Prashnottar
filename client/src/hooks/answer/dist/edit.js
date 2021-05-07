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
exports.useEditAnswerMutation = void 0;
var react_1 = require("react");
var client_1 = require("@apollo/client");
var graphql_1 = require("../../graphql");
var initialValue = JSON.stringify([
    {
        type: "paragraph",
        children: [{ text: "This is editable " }]
    },
]);
function useEditAnswerMutation(answerId, obj) {
    var _a = react_1.useState(false), IsModalOpen = _a[0], setIsModalOpen = _a[1];
    var _b = react_1.useState({
        answerId: answerId,
        body: initialValue
    }), values = _b[0], setValues = _b[1];
    var onChange = function (body) {
        return setValues(__assign(__assign({}, values), { body: JSON.stringify(body) }));
    };
    react_1.useEffect(function () {
        if (obj)
            setValues(function (values) { return (__assign(__assign({}, values), { body: obj.body })); });
    }, [obj, setValues]);
    var edit = client_1.useMutation(graphql_1.EDIT_ANSWER_MUTATION, {
        variables: values,
        update: function (proxy, result) {
            var data = __assign({}, proxy.readQuery({
                query: graphql_1.FETCH_ANSWER_QUERY,
                variables: { answerId: answerId }
            }));
            data.getAnswer = __assign(__assign({}, data.getAnswer), result.data.editAnswer);
            proxy.writeQuery({
                query: graphql_1.FETCH_ANSWER_QUERY,
                variables: { answerId: answerId },
                data: data
            });
        }
    })[0];
    function editCallback() {
        edit();
        setIsModalOpen(false);
    }
    return {
        IsModalOpen: IsModalOpen,
        setIsModalOpen: setIsModalOpen,
        onChange: onChange,
        editCallback: editCallback,
        values: values
    };
}
exports.useEditAnswerMutation = useEditAnswerMutation;
