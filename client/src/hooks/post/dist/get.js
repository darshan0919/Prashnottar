"use strict";
exports.__esModule = true;
exports.useGetPostsQuery = exports.useGetPostQuery = void 0;
var react_1 = require("react");
var client_1 = require("@apollo/client");
var graphql_1 = require("../../graphql");
function useGetPostQuery(postId) {
    var _a = react_1.useState(null), result = _a[0], setResult = _a[1];
    var _b = client_1.useQuery(graphql_1.FETCH_POST_QUERY, { variables: { postId: postId } }), loading = _b.loading, data = _b.data, error = _b.error;
    react_1.useEffect(function () {
        if (!loading) {
            if (error)
                alert("Error Loading Post!");
            else
                setResult(data["getPost"]);
        }
    }, [loading, data, error]);
    return result;
}
exports.useGetPostQuery = useGetPostQuery;
function useGetPostsQuery() {
    var _a = react_1.useState(null), result = _a[0], setResult = _a[1];
    var _b = client_1.useQuery(graphql_1.FETCH_POSTS_QUERY), loading = _b.loading, data = _b.data, error = _b.error;
    react_1.useEffect(function () {
        if (!loading) {
            if (error)
                alert("Error Loading Post!");
            else
                setResult(data["getPosts"]);
        }
    }, [loading, data, error]);
    return result;
}
exports.useGetPostsQuery = useGetPostsQuery;
