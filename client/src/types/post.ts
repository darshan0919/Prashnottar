type Maybe<T> = T | null;

export type Post = {
    __typename?: "Post";
    id: string;
    question: string;
    imageUrl: string;
    user: string;
    answers: Array<string>;
    createdAt: string;
};

export type PostSnippetFragment = Pick<Post, "id">;
export type PostInput = Pick<Post, "question" | "imageUrl">;

export type PostQueryVariables = { postId: string };
export type PostQuery = { __typename?: "Query" } & {
    getPost?: Maybe<{ __typename?: "Post" } & Post>;
};

export type Posts = Array<{ __typename?: "Post" } & PostSnippetFragment>;
export type PostsQuery = { __typename?: "Query" } & {
    getPosts: { __typename?: "Posts" } & Posts;
};

export type CreatePostMutationVariables = PostInput;
export type CreatePostMutation = { __typename?: "Mutation" } & {
    createPost: PostSnippetFragment;
};

export type DeletePostMutationVariables = PostQueryVariables;
export type DeletePostMutation = { __typename?: "Mutation" } & {
    deletePost: PostSnippetFragment;
};

export type EditPostMutationVariables = PostQueryVariables & PostInput;
export type EditPostMutation = { __typename?: "Mutation" } & {
    editPost?: Maybe<
        { __typename?: "Post" } & Pick<Post, "id" | "question" | "imageUrl">
    >;
};
