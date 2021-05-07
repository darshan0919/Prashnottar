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
exports.useDeleteMutation = void 0;
var client_1 = require("@apollo/client");
var graphql_1 = require("../../graphql");
function useDeleteMutation(id, model, parentId, parentModel) {
    var _a;
    var momodel = model === parentModel ? "re" + model : model;
    var Model = model.charAt(0).toUpperCase() + model.slice(1);
    var ParentModel = parentModel.charAt(0).toUpperCase() + parentModel.slice(1);
    var deleteFunction = client_1.useMutation(graphql_1.getMutation(model, "delete"), {
        variables: (_a = {}, _a[model + "Id"] = id, _a),
        update: function (proxy, result) {
            var _a, _b, _c, _d;
            var data = __assign({}, proxy.readQuery({
                query: graphql_1.getQuery(parentModel),
                variables: (_a = {}, _a[parentModel + "Id"] = parentId, _a)
            }));
            if (result.data) {
                var Index = data["get" + ParentModel][momodel + "s"].findIndex(function (Id) { return id === Id; });
                data["get" + ParentModel] = __assign(__assign({}, data["get" + ParentModel]), (_b = {}, _b[momodel + "s"] = __spreadArrays(data["get" + ParentModel][momodel + "s"].slice(0, Index), data["get" + ParentModel][momodel + "s"].slice(Index + 1)), _b));
                if (model === "comment" || model === "reply") {
                    data["get" + ParentModel] = __assign(__assign({}, data["get" + ParentModel]), (_c = {}, _c[momodel + "Count"] = data["get" + ParentModel][momodel + "Count"] - 1, _c));
                }
                proxy.writeQuery({
                    query: graphql_1.getQuery(parentModel),
                    variables: (_d = {}, _d[parentModel + "Id"] = parentId, _d),
                    data: data
                });
            }
            else {
                console.log("Server failed to delete " + Model + "!");
            }
        }
    })[0];
    return deleteFunction;
}
exports.useDeleteMutation = useDeleteMutation;
