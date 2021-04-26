import { useMutation } from "@apollo/client";
import { getQuery, getMutation } from "../../graphql";

export function useDeletePostMutation(postId) {
    const [deleteFunction] = useMutation(getMutation("post", "delete"), {
        variables: { postId },
        update(proxy, result) {
            const data = { ...proxy.readQuery({ query: getQuery("posts") }) };
            if (result.data) {
                const Index = data.getPosts.findIndex(
                    ({ id }) => id === postId
                );
                data.getPosts = [
                    ...data.getPosts.slice(0, Index),
                    ...data.getPosts.slice(Index + 1),
                ];
                proxy.writeQuery({ query: getQuery("posts"), data });
            } else {
                console.log(`Server failed to delete Post!`);
            }
        },
    });
    return deleteFunction;
}
