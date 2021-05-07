import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_POSTS_QUERY, FETCH_POST_QUERY } from "../../graphql";
import {
    Maybe,
    Post,
    PostQuery,
    PostQueryVariables,
    Posts,
    PostsQuery,
} from "../../types";

export function useGetPostQuery(postId) {
    const [result, setResult] = useState<Maybe<Post>>(null);
    const { loading, data, error } = useQuery<PostQuery, PostQueryVariables>(
        FETCH_POST_QUERY,
        { variables: { postId } }
    );
    useEffect(() => {
        if (!loading) {
            if (error) alert(`Error Loading Post!`);
            else setResult(data[`getPost`]);
        }
    }, [loading, data, error]);
    return result;
}

export function useGetPostsQuery() {
    const [result, setResult] = useState<Maybe<Posts>>(null);
    const { loading, data, error } = useQuery<PostsQuery>(FETCH_POSTS_QUERY);
    useEffect(() => {
        if (!loading) {
            if (error) alert(`Error Loading Post!`);
            else setResult(data[`getPosts`]);
        }
    }, [loading, data, error]);
    return result;
}
