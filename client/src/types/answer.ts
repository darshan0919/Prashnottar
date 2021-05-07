type Maybe<T> = T | null;

export type Answer = {
    __typename?: "Answer";
    id: string;
    body: string;
    user: string;
    upvoteCount: number;
    downvoteCount: number;
    commentCount: number;
    comments: Array<string>;
    createdAt: string;
};

export type AnswerSnippetFragment = Pick<Answer, "id">;
export type AnswerInput = Pick<Answer, "body">;

export type AnswerQueryVariables = { answerId: string };
export type AnswerQuery = { __typename?: "Query" } & {
    getAnswer?: Maybe<{ __typename?: "Answer" } & Answer>;
};
export type AnswersQuery = { __typename?: "Query" } & {
    getAnswers: { __typename?: "Answers" } & Array<
        { __typename?: "Answer" } & AnswerSnippetFragment
    >;
};

export type CreateAnswerMutationVariables = { postId: string } & AnswerInput;
export type CreateAnswerMutation = { __typename?: "Mutation" } & {
    createAnswer: AnswerSnippetFragment;
};

export type DeleteAnswerMutationVariables = AnswerQueryVariables;
export type DeleteAnswerMutation = { __typename?: "Mutation" } & {
    deleteAnswer: AnswerSnippetFragment;
};

export type EditAnswerMutationVariables = AnswerQueryVariables & AnswerInput;
export type EditAnswerMutation = { __typename?: "Mutation" } & {
    editAnswer?: Maybe<{ __typename?: "Answer" } & Pick<Answer, "id" | "body">>;
};

export type UpvoteAnswerMutationVariables = AnswerQueryVariables;
export type UpvoteAnswerMutation = { __typename?: "Mutation" } & {
    upvoteAnswer?: Maybe<
        { __typename?: "Answer" } & Pick<
            Answer,
            "id" | "upvoteCount" | "downvoteCount"
        >
    >;
};

export type DownvoteAnswerMutationVariables = AnswerQueryVariables;
export type DownvoteAnswerMutation = { __typename?: "Mutation" } & {
    downvoteAnswer?: Maybe<
        { __typename?: "Answer" } & Pick<
            Answer,
            "id" | "downvoteCount" | "downvoteCount"
        >
    >;
};
