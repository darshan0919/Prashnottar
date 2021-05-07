type Maybe<T> = T | null;

export type Reply = {
    __typename?: "Reply";
    id: string;
    body: string;
    user: string;
    upvoteCount: number;
    downvoteCount: number;
    rereplyCount: number;
    rereplys: Array<string>;
    createdAt: string;
};

export type ReplySnippetFragment = Pick<Reply, "id">;
export type ReplyInput = Pick<Reply, "body">;

export type ReplyQueryVariables = { replyId: string };
export type ReplyQuery = { __typename?: "Query" } & {
    getReply?: Maybe<{ __typename?: "Reply" } & Reply>;
};
export type ReplysQuery = { __typename?: "Query" } & {
    getReplys: { __typename?: "Replys" } & Array<
        { __typename?: "Reply" } & ReplySnippetFragment
    >;
};

export type CreateReplyMutationVariables = { commentId: string } & ReplyInput;
export type CreateReplyMutation = { __typename?: "Mutation" } & {
    createReply: ReplySnippetFragment;
};

export type CreateRereplyMutationVariables = { replyId: string } & ReplyInput;
export type CreateRereplyMutation = { __typename?: "Mutation" } & {
    createRereply: ReplySnippetFragment;
};

export type DeleteReplyMutationVariables = ReplyQueryVariables;
export type DeleteReplyMutation = { __typename?: "Mutation" } & {
    deleteReply: ReplySnippetFragment;
};

export type EditReplyMutationVariables = ReplyQueryVariables & ReplyInput;
export type EditReplyMutation = { __typename?: "Mutation" } & {
    editReply?: Maybe<{ __typename?: "Reply" } & Pick<Reply, "id" | "body">>;
};

export type UpvoteReplyMutationVariables = ReplyQueryVariables;
export type UpvoteReplyMutation = { __typename?: "Mutation" } & {
    upvoteReply?: Maybe<
        { __typename?: "Reply" } & Pick<
            Reply,
            "id" | "upvoteCount" | "downvoteCount"
        >
    >;
};

export type DownvoteReplyMutationVariables = ReplyQueryVariables;
export type DownvoteReplyMutation = { __typename?: "Mutation" } & {
    downvoteReply?: Maybe<
        { __typename?: "Reply" } & Pick<
            Reply,
            "id" | "downvoteCount" | "downvoteCount"
        >
    >;
};
