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
exports.useForm = void 0;
var react_1 = require("react");
exports.useForm = function (callback, initialState) {
    if (initialState === void 0) { initialState = {}; }
    //TODO
    var _a = react_1.useState(initialState), values = _a[0], setValues = _a[1];
    var onChange = react_1.useCallback(function (event) {
        var _a = event.target, name = _a.name, value = _a.value;
        setValues(function (values) {
            var _a;
            return (__assign(__assign({}, values), (_a = {}, _a[name] = value, _a)));
        });
    }, [setValues]);
    var onSubmit = function (event) {
        event.preventDefault();
        callback();
    };
    return {
        onChange: onChange,
        onSubmit: onSubmit,
        values: values
    };
};
