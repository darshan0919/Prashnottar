import { useMutation } from "@apollo/client";
import {
    DOWNVOTE_ANSWER_MUTATION,
    FETCH_ANSWER_QUERY,
    UPVOTE_ANSWER_MUTATION,
} from "../../graphql";
import {
    AnswerQuery,
    AnswerQueryVariables,
    DownvoteAnswerMutation,
    DownvoteAnswerMutationVariables,
    UpvoteAnswerMutation,
    UpvoteAnswerMutationVariables,
} from "../../types";

export function useUpvoteAnswerMutation(answerId) {
    const [vote] = useMutation<
        UpvoteAnswerMutation,
        UpvoteAnswerMutationVariables
    >(UPVOTE_ANSWER_MUTATION, {
        variables: { answerId },
        update(proxy, result) {
            const data: AnswerQuery = {
                ...proxy.readQuery<AnswerQuery, AnswerQueryVariables>({
                    query: FETCH_ANSWER_QUERY,
                    variables: { answerId },
                }),
            };
            data.getAnswer = { ...data.getAnswer, ...result.data.upvoteAnswer };
            proxy.writeQuery({
                query: FETCH_ANSWER_QUERY,
                variables: { answerId },
                data,
            });
        },
    });
    return vote;
}

export function useDownvoteAnswerMutation(answerId) {
    const [vote] = useMutation<
        DownvoteAnswerMutation,
        DownvoteAnswerMutationVariables
    >(DOWNVOTE_ANSWER_MUTATION, {
        variables: { answerId },
        update(proxy, result) {
            const data: AnswerQuery = {
                ...proxy.readQuery<AnswerQuery, AnswerQueryVariables>({
                    query: FETCH_ANSWER_QUERY,
                    variables: { answerId },
                }),
            };
            data.getAnswer = {
                ...data.getAnswer,
                ...result.data.downvoteAnswer,
            };
            proxy.writeQuery({
                query: FETCH_ANSWER_QUERY,
                variables: { answerId },
                data,
            });
        },
    });
    return vote;
}

export function useVoteAnswerMutation(id) {
    return {
        upvoteAnswer: useUpvoteAnswerMutation(id),
        downvoteAnswer: useDownvoteAnswerMutation(id),
    };
}
