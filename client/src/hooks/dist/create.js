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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.useCreateMutation = void 0;
var react_1 = require("react");
var client_1 = require("@apollo/client");
var graphql_1 = require("../graphql");
var initialValue = JSON.stringify([
    {
        type: "paragraph",
        children: [{ text: "This is editable " }]
    },
]);
function useCreateMutation(id, model, childModel) {
    var _a;
    var Model = model.charAt(0).toUpperCase() + model.slice(1);
    var ChildModel = childModel.charAt(0).toUpperCase() + childModel.slice(1);
    var _b = react_1.useState(false), IsModalOpen = _b[0], setIsModalOpen = _b[1];
    var _c = react_1.useState((_a = {},
        _a[model + "Id"] = id,
        _a.body = initialValue,
        _a)), values = _c[0], setValues = _c[1];
    var onChange = function (body) {
        return setValues(__assign(__assign({}, values), { body: JSON.stringify(body) }));
    };
    var create = client_1.useMutation(graphql_1.getMutation(childModel, "create"), {
        variables: values,
        update: function (proxy, result) {
            var _a, _b, _c, _d;
            var data = __assign({}, proxy.readQuery({
                query: graphql_1.getQuery(model),
                variables: (_a = {}, _a[model + "Id"] = id, _a)
            }));
            ///console.log("resultId", result.data[`create${ChildModel}`].id);
            if (result.data) {
                data["get" + Model] = __assign(__assign({}, data["get" + Model]), (_b = {}, _b[childModel + "s"] = __spreadArrays([
                    result.data["create" + ChildModel].id
                ], data["get" + Model][childModel + "s"]), _b));
                if (childModel === "comment" ||
                    childModel === "reply" ||
                    childModel === "rereply") {
                    data["get" + Model] = __assign(__assign({}, data["get" + Model]), (_c = {}, _c[childModel + "Count"] = data["get" + Model][childModel + "Count"] + 1, _c));
                }
                ///console.log("resultData", data[`get${Model}`]);
                proxy.writeQuery({
                    query: graphql_1.getQuery(model),
                    variables: (_d = {}, _d[model + "Id"] = id, _d),
                    data: data
                });
                values.body = initialValue;
            }
            else {
                console.log("Server failed to create " + Model);
            }
        }
    })[0];
    function createCallback() {
        create();
        setIsModalOpen(false);
    }
    return {
        IsModalOpen: IsModalOpen,
        setIsModalOpen: setIsModalOpen,
        values: values,
        onChange: onChange,
        createCallback: createCallback
    };
}
exports.useCreateMutation = useCreateMutation;
