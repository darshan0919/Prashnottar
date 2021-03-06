"use strict";
exports.__esModule = true;
exports.useGetCommentQuery = void 0;
var react_1 = require("react");
var client_1 = require("@apollo/client");
var graphql_1 = require("../../graphql");
function useGetCommentQuery(commentId) {
    var _a = react_1.useState(null), result = _a[0], setResult = _a[1];
    var _b = client_1.useQuery(graphql_1.FETCH_COMMENT_QUERY, { variables: { commentId: commentId } }), loading = _b.loading, data = _b.data, error = _b.error;
    react_1.useEffect(function () {
        if (!loading) {
            if (error)
                alert("Error Loading Comment!");
            else
                setResult(data.getComment);
        }
    }, [loading, data, error]);
    return result;
}
exports.useGetCommentQuery = useGetCommentQuery;
