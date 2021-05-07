import { useMutation } from "@apollo/client";
import { DELETE_COMMENT_MUTATION, FETCH_ANSWER_QUERY } from "../../graphql";
import {
    DeleteCommentMutation,
    DeleteCommentMutationVariables,
    AnswerQuery,
    AnswerQueryVariables,
} from "../../types";

export function useDeleteCommentMutation(commentId, answerId) {
    const [deleteFunction] = useMutation<
        DeleteCommentMutation,
        DeleteCommentMutationVariables
    >(DELETE_COMMENT_MUTATION, {
        variables: { commentId },
        update(proxy, result) {
            const data: AnswerQuery = {
                ...proxy.readQuery<AnswerQuery, AnswerQueryVariables>({
                    query: FETCH_ANSWER_QUERY,
                    variables: { answerId },
                }),
            };
            if (result.data) {
                const Index = data.getAnswer.comments.findIndex(
                    (Id) => commentId === Id
                );
                data.getAnswer = {
                    ...data.getAnswer,
                    comments: [
                        ...data.getAnswer.comments.slice(0, Index),
                        ...data.getAnswer.comments.slice(Index + 1),
                    ],
                    commentCount: data.getAnswer.commentCount - 1,
                };
                proxy.writeQuery({
                    query: FETCH_ANSWER_QUERY,
                    variables: { answerId },
                    data,
                });
            } else {
                console.log(`Server failed to delete comment!`);
            }
        },
    });
    return deleteFunction;
}
