import { useMutation } from "@apollo/client";
import {
    DOWNVOTE_REPLY_MUTATION,
    FETCH_REPLY_QUERY,
    UPVOTE_REPLY_MUTATION,
} from "../../graphql";
import {
    DownvoteReplyMutation,
    DownvoteReplyMutationVariables,
    ReplyQuery,
    ReplyQueryVariables,
    UpvoteReplyMutation,
    UpvoteReplyMutationVariables,
} from "../../types";

export function useUpvoteReplyMutation(replyId) {
    const [vote] = useMutation<
        UpvoteReplyMutation,
        UpvoteReplyMutationVariables
    >(UPVOTE_REPLY_MUTATION, {
        variables: { replyId },
        update(proxy, result) {
            const data: ReplyQuery = {
                ...proxy.readQuery<ReplyQuery, ReplyQueryVariables>({
                    query: FETCH_REPLY_QUERY,
                    variables: { replyId },
                }),
            };
            data.getReply = { ...data.getReply, ...result.data.upvoteReply };
            proxy.writeQuery({
                query: FETCH_REPLY_QUERY,
                variables: { replyId },
                data,
            });
        },
    });
    return vote;
}

export function useDownvoteReplyMutation(replyId) {
    const [vote] = useMutation<
        DownvoteReplyMutation,
        DownvoteReplyMutationVariables
    >(DOWNVOTE_REPLY_MUTATION, {
        variables: { replyId },
        update(proxy, result) {
            const data: ReplyQuery = {
                ...proxy.readQuery<ReplyQuery, ReplyQueryVariables>({
                    query: FETCH_REPLY_QUERY,
                    variables: { replyId },
                }),
            };
            data.getReply = {
                ...data.getReply,
                ...result.data.downvoteReply,
            };
            proxy.writeQuery({
                query: FETCH_REPLY_QUERY,
                variables: { replyId },
                data,
            });
        },
    });
    return vote;
}

export function useVoteReplyMutation(id) {
    return {
        upvoteReply: useUpvoteReplyMutation(id),
        downvoteReply: useDownvoteReplyMutation(id),
    };
}
