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
exports.useVoteMutation = void 0;
var client_1 = require("@apollo/client");
var graphql_1 = require("../../graphql");
function useVoteMutation(id, model, type) {
    var _a;
    var Model = model.charAt(0).toUpperCase() + model.slice(1);
    var vote = client_1.useMutation(graphql_1.getMutation(model, type), {
        variables: (_a = {}, _a[model + "Id"] = id, _a),
        update: function (proxy, result) {
            var _a, _b;
            var data = __assign({}, proxy.readQuery({
                query: graphql_1.getQuery(model),
                variables: (_a = {}, _a[model + "Id"] = id, _a)
            }));
            data["get" + Model] = __assign(__assign({}, data["get" + Model]), result.data["" + type + Model]);
            proxy.writeQuery({
                query: graphql_1.getQuery(model),
                variables: (_b = {}, _b[model + "Id"] = id, _b),
                data: data
            });
        }
    })[0];
    return vote;
}
exports.useVoteMutation = useVoteMutation;
