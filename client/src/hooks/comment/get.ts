import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_COMMENT_QUERY } from "../../graphql";
import {
    Maybe,
    Comment,
    CommentQuery,
    CommentQueryVariables,
} from "../../types";

export function useGetCommentQuery(commentId) {
    const [result, setResult] = useState<Maybe<Comment>>(null);
    const { loading, data, error } = useQuery<
        CommentQuery,
        CommentQueryVariables
    >(FETCH_COMMENT_QUERY, { variables: { commentId } });
    useEffect(() => {
        if (!loading) {
            if (error) alert(`Error Loading Comment!`);
            else setResult(data.getComment);
        }
    }, [loading, data, error]);
    return result;
}
