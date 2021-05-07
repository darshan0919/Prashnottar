import { useMutation } from "@apollo/client";
import {
    DOWNVOTE_COMMENT_MUTATION,
    FETCH_COMMENT_QUERY,
    UPVOTE_COMMENT_MUTATION,
} from "../../graphql";
import {
    CommentQuery,
    CommentQueryVariables,
    DownvoteCommentMutation,
    DownvoteCommentMutationVariables,
    UpvoteCommentMutation,
    UpvoteCommentMutationVariables,
} from "../../types";

export function useUpvoteCommentMutation(commentId) {
    const [vote] = useMutation<
        UpvoteCommentMutation,
        UpvoteCommentMutationVariables
    >(UPVOTE_COMMENT_MUTATION, {
        variables: { commentId },
        update(proxy, result) {
            const data: CommentQuery = {
                ...proxy.readQuery<CommentQuery, CommentQueryVariables>({
                    query: FETCH_COMMENT_QUERY,
                    variables: { commentId },
                }),
            };
            data.getComment = {
                ...data.getComment,
                ...result.data.upvoteComment,
            };
            proxy.writeQuery({
                query: FETCH_COMMENT_QUERY,
                variables: { commentId },
                data,
            });
        },
    });
    return vote;
}

export function useDownvoteCommentMutation(commentId) {
    const [vote] = useMutation<
        DownvoteCommentMutation,
        DownvoteCommentMutationVariables
    >(DOWNVOTE_COMMENT_MUTATION, {
        variables: { commentId },
        update(proxy, result) {
            const data: CommentQuery = {
                ...proxy.readQuery<CommentQuery, CommentQueryVariables>({
                    query: FETCH_COMMENT_QUERY,
                    variables: { commentId },
                }),
            };
            data.getComment = {
                ...data.getComment,
                ...result.data.downvoteComment,
            };
            proxy.writeQuery({
                query: FETCH_COMMENT_QUERY,
                variables: { commentId },
                data,
            });
        },
    });
    return vote;
}

export function useVoteCommentMutation(id) {
    return {
        upvoteComment: useUpvoteCommentMutation(id),
        downvoteComment: useDownvoteCommentMutation(id),
    };
}
