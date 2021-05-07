"use strict";
exports.__esModule = true;
exports.useGetQuery = void 0;
var react_1 = require("react");
var client_1 = require("@apollo/client");
var graphql_1 = require("../graphql");
function useGetQuery(id, model) {
    var _a;
    var Model = model.charAt(0).toUpperCase() + model.slice(1);
    var _b = react_1.useState(null), result = _b[0], setResult = _b[1];
    //console.log(`${model}Id`, id, model);
    //console.log(getQuery(model));
    var _c = client_1.useQuery(graphql_1.getQuery(model), {
        variables: (_a = {}, _a[model + "Id"] = id, _a)
    }), loading = _c.loading, data = _c.data, error = _c.error;
    react_1.useEffect(function () {
        if (!loading) {
            if (error) {
                alert("Error Loading " + Model + "!");
            }
            else {
                setResult(data["get" + Model]);
            }
        }
    }, [loading, data, error, Model]);
    return result;
}
exports.useGetQuery = useGetQuery;
