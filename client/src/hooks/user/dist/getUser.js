"use strict";
exports.__esModule = true;
exports.useGetUserQuery = void 0;
var react_1 = require("react");
var client_1 = require("@apollo/client");
var graphql_1 = require("../../graphql");
function useGetUserQuery() {
    var _a = react_1.useState(null), result = _a[0], setResult = _a[1];
    var _b = client_1.useLazyQuery(graphql_1.FETCH_USER_QUERY), getData = _b[0], _c = _b[1], data = _c.data, error = _c.error;
    var runQuery = react_1.useCallback(function (id) { return getData({ variables: { id: id } }); }, [getData]);
    react_1.useEffect(function () {
        if (error) {
            alert("Error Loading Post User!");
        }
        else if (data) {
            setResult(data.getUser);
        }
        else {
            console.log("No idea what is happenning!");
        }
    }, [data, error]);
    return { user: result, setUser: runQuery };
}
exports.useGetUserQuery = useGetUserQuery;
