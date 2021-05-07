import { useMutation } from "@apollo/client";
import { DELETE_POST_MUTATION, FETCH_POSTS_QUERY } from "../../graphql";

import {
    PostsQuery,
    DeletePostMutation,
    DeletePostMutationVariables,
} from "../../types";

export function useDeletePostMutation(postId) {
    const [deleteFunction] = useMutation<
        DeletePostMutation,
        DeletePostMutationVariables
    >(DELETE_POST_MUTATION, {
        variables: { postId },
        update(proxy, result) {
            const data: PostsQuery = {
                ...proxy.readQuery<PostsQuery>({ query: FETCH_POSTS_QUERY }),
            };
            if (result.data) {
                const Index = data.getPosts.findIndex(
                    ({ id }) => id === postId
                );
                data.getPosts = [
                    ...data.getPosts.slice(0, Index),
                    ...data.getPosts.slice(Index + 1),
                ];
                proxy.writeQuery({ query: FETCH_POSTS_QUERY, data });
            } else {
                console.log(`Server failed to delete Post!`);
            }
        },
    });
    return deleteFunction;
}
