import { useMutation } from "@apollo/client";
import { DELETE_ANSWER_MUTATION, FETCH_POST_QUERY } from "../../graphql";
import {
    DeleteAnswerMutation,
    DeleteAnswerMutationVariables,
    PostQuery,
    PostQueryVariables,
} from "../../types";

export function useDeleteAnswerMutation(answerId, postId) {
    const [deleteFunction] = useMutation<
        DeleteAnswerMutation,
        DeleteAnswerMutationVariables
    >(DELETE_ANSWER_MUTATION, {
        variables: { answerId },
        update(proxy, result) {
            const data: PostQuery = {
                ...proxy.readQuery<PostQuery, PostQueryVariables>({
                    query: FETCH_POST_QUERY,
                    variables: { postId },
                }),
            };
            if (result.data) {
                const Index = data.getPost.answers.findIndex(
                    (Id) => answerId === Id
                );
                data.getPost = {
                    ...data.getPost,
                    answers: [
                        ...data.getPost.answers.slice(0, Index),
                        ...data.getPost.answers.slice(Index + 1),
                    ],
                };
                proxy.writeQuery({
                    query: FETCH_POST_QUERY,
                    variables: { postId },
                    data,
                });
            } else {
                console.log(`Server failed to delete answer!`);
            }
        },
    });
    return deleteFunction;
}
