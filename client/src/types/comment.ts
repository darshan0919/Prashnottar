type Maybe<T> = T | null;

export type Comment = {
    __typename?: "Comment";
    id: string;
    body: string;
    user: string;
    upvoteCount: number;
    downvoteCount: number;
    replyCount: number;
    replys: Array<string>;
    createdAt: string;
};

export type CommentSnippetFragment = Pick<Comment, "id">;
export type CommentInput = Pick<Comment, "body">;

export type CommentQueryVariables = { commentId: string };
export type CommentQuery = { __typename?: "Query" } & {
    getComment?: Maybe<{ __typename?: "Comment" } & Comment>;
};
export type CommentsQuery = { __typename?: "Query" } & {
    getComments: { __typename?: "Comments" } & Array<
        { __typename?: "Comment" } & CommentSnippetFragment
    >;
};

export type CreateCommentMutationVariables = {
    answerId: string;
} & CommentInput;
export type CreateCommentMutation = { __typename?: "Mutation" } & {
    createComment: CommentSnippetFragment;
};

export type DeleteCommentMutationVariables = CommentQueryVariables;
export type DeleteCommentMutation = { __typename?: "Mutation" } & {
    deleteComment: CommentSnippetFragment;
};

export type EditCommentMutationVariables = CommentQueryVariables & CommentInput;
export type EditCommentMutation = { __typename?: "Mutation" } & {
    editComment?: Maybe<
        { __typename?: "Comment" } & Pick<Comment, "id" | "body">
    >;
};

export type UpvoteCommentMutationVariables = CommentQueryVariables;
export type UpvoteCommentMutation = { __typename?: "Mutation" } & {
    upvoteComment?: Maybe<
        { __typename?: "Comment" } & Pick<
            Comment,
            "id" | "upvoteCount" | "downvoteCount"
        >
    >;
};

export type DownvoteCommentMutationVariables = CommentQueryVariables;
export type DownvoteCommentMutation = { __typename?: "Mutation" } & {
    downvoteComment?: Maybe<
        { __typename?: "Comment" } & Pick<
            Comment,
            "id" | "downvoteCount" | "downvoteCount"
        >
    >;
};
