import { useMutation } from "@apollo/client";
import {
    DELETE_REPLY_MUTATION,
    FETCH_COMMENT_QUERY,
    FETCH_REPLY_QUERY,
} from "../../graphql";
import {
    DeleteReplyMutation,
    DeleteReplyMutationVariables,
    CommentQuery,
    CommentQueryVariables,
    ReplyQueryVariables,
    ReplyQuery,
} from "../../types";

export function useDeletereplyMutation(replyId, commentId) {
    const [deleteFunction] = useMutation<
        DeleteReplyMutation,
        DeleteReplyMutationVariables
    >(DELETE_REPLY_MUTATION, {
        variables: { replyId },
        update(proxy, result) {
            const data: CommentQuery = {
                ...proxy.readQuery<CommentQuery, CommentQueryVariables>({
                    query: FETCH_COMMENT_QUERY,
                    variables: { commentId },
                }),
            };
            if (result.data) {
                const Index = data.getComment.replys.findIndex(
                    (Id) => replyId === Id
                );
                data.getComment = {
                    ...data.getComment,
                    replys: [
                        ...data.getComment.replys.slice(0, Index),
                        ...data.getComment.replys.slice(Index + 1),
                    ],
                    replyCount: data.getComment.replyCount - 1,
                };
                proxy.writeQuery({
                    query: FETCH_COMMENT_QUERY,
                    variables: { commentId },
                    data,
                });
            } else {
                console.log(`Server failed to delete reply!`);
            }
        },
    });
    return deleteFunction;
}

export function useDeleteRereplyMutation(replyId, parentId) {
    const [deleteFunction] = useMutation<
        DeleteReplyMutation,
        DeleteReplyMutationVariables
    >(DELETE_REPLY_MUTATION, {
        variables: { replyId },
        update(proxy, result) {
            const data: ReplyQuery = {
                ...proxy.readQuery<ReplyQuery, ReplyQueryVariables>({
                    query: FETCH_REPLY_QUERY,
                    variables: { replyId: parentId },
                }),
            };
            if (result.data) {
                const Index = data.getReply.rereplys.findIndex(
                    (Id) => replyId === Id
                );
                data.getReply = {
                    ...data.getReply,
                    rereplys: [
                        ...data.getReply.rereplys.slice(0, Index),
                        ...data.getReply.rereplys.slice(Index + 1),
                    ],
                    rereplyCount: data.getReply.rereplyCount - 1,
                };
                proxy.writeQuery({
                    query: FETCH_REPLY_QUERY,
                    variables: { replyId: parentId },
                    data,
                });
            } else {
                console.log(`Server failed to delete reply!`);
            }
        },
    });
    return deleteFunction;
}

export function useDeleteReplyMutation(replyId, parentId, parent = "comment") {
    const deleteFunction1 = useDeletereplyMutation(replyId, parentId);
    const deleteFunction2 = useDeleteRereplyMutation(replyId, parentId);
    return parent === "comment" ? deleteFunction1 : deleteFunction2;
}
