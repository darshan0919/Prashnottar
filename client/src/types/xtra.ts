import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
/** All built-in and custom scalars, mapped to their actual values */

export type Query = {
    __typename?: "Query";

    getPosts?: Array<PostSnippetFragment>;
    getPost?: Maybe<Post>;
    getUser?: Maybe<User>;
};

export type QueryPostsArgs = {
    cursor?: Maybe<string>;
    limit: number;
};

export type QueryPostArgs = {
    id: string;
};

export type Post = {
    __typename?: "Post";
    id: string;
    question: string;
    imageUrl: string;
    user: string;
    answers: Array<string>;
    createdAt: string;
};

export type User = {
    __typename?: "User";
    id: string;
    username: string;
    email: string;
    createdAt: string;
    editdAt: string;
};

export type Mutation = {
    __typename?: "Mutation";
    vote: boolean;
    createPost: Post;
    editPost?: Maybe<Post>;
    deletePost: boolean;
    changePassword: UserResponse;
    forgotPassword: boolean;
    register: UserResponse;
    login: UserResponse;
    logout: boolean;
};

export type MutationVoteArgs = {
    value: string;
    postId: string;
};

export type MutationCreatePostArgs = {
    input: PostInput;
};

export type MutationEditPostArgs = {
    text: string;
    title: string;
    id: string;
};

export type MutationDeletePostArgs = {
    id: string;
};

export type MutationChangePasswordArgs = {
    newPassword: string;
    token: string;
};

export type MutationForgotPasswordArgs = {
    email: string;
};

export type MutationRegisterArgs = {
    options: UsernamePasswordInput;
};

export type MutationLoginArgs = {
    password: string;
    usernameOrEmail: string;
};

export type PostInput = {
    title: string;
    text: string;
};

export type UserResponse = {
    __typename?: "UserResponse";
    errors?: Maybe<Array<FieldError>>;
    user?: Maybe<User>;
};

export type FieldError = {
    __typename?: "FieldError";
    field: string;
    message: string;
};

export type UsernamePasswordInput = {
    email: string;
    username: string;
    password: string;
};

export type PostSnippetFragment = { __typename?: "Post" } & Pick<Post, "id">;

export type RegularErrorFragment = { __typename?: "FieldError" } & Pick<
    FieldError,
    "field" | "message"
>;

export type RegularUserFragment = { __typename?: "User" } & Pick<
    User,
    "id" | "username"
>;

export type RegularUserResponseFragment = { __typename?: "UserResponse" } & {
    errors?: Maybe<Array<{ __typename?: "FieldError" } & RegularErrorFragment>>;
    user?: Maybe<{ __typename?: "User" } & RegularUserFragment>;
};

export type ChangePasswordMutationVariables = Exact<{
    token: string;
    newPassword: string;
}>;

export type ChangePasswordMutation = { __typename?: "Mutation" } & {
    changePassword: {
        __typename?: "UserResponse";
    } & RegularUserResponseFragment;
};

export type CreatePostMutationVariables = Exact<{
    input: PostInput;
}>;

export type CreatePostMutation = { __typename?: "Mutation" } & {
    createPost: { __typename?: "Post" } & Pick<Post, "id">;
};

export type DeletePostMutationVariables = Exact<{
    id: string;
}>;

export type DeletePostMutation = { __typename?: "Mutation" } & Pick<
    Mutation,
    "deletePost"
>;

export type ForgotPasswordMutationVariables = Exact<{
    email: string;
}>;

export type ForgotPasswordMutation = { __typename?: "Mutation" } & Pick<
    Mutation,
    "forgotPassword"
>;

export type LoginMutationVariables = Exact<{
    usernameOrEmail: string;
    password: string;
}>;

export type LoginMutation = { __typename?: "Mutation" } & {
    login: { __typename?: "UserResponse" } & RegularUserResponseFragment;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation" } & Pick<
    Mutation,
    "logout"
>;

export type RegisterMutationVariables = Exact<{
    options: UsernamePasswordInput;
}>;

export type RegisterMutation = { __typename?: "Mutation" } & {
    register: { __typename?: "UserResponse" } & RegularUserResponseFragment;
};

export type EditPostMutationVariables = Exact<{
    id: string;
    title: string;
    text: string;
}>;

export type EditPostMutation = { __typename?: "Mutation" } & {
    editPost?: Maybe<
        { __typename?: "Post" } & Pick<Post, "id" | "question" | "imageUrl">
    >;
};

export type VoteMutationVariables = Exact<{
    value: string;
    postId: string;
}>;

export type VoteMutation = { __typename?: "Mutation" } & Pick<Mutation, "vote">;

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: "Query" } & {
    me?: Maybe<{ __typename?: "User" } & RegularUserFragment>;
};

export type PostQueryVariables = Exact<{
    postId: string;
}>;

export type PostQuery = { __typename?: "Query" } & {
    getPost?: Maybe<{ __typename?: "Post" } & Post>;
};

export type PostsQueryVariables = Exact<{
    limit: string;
    cursor?: Maybe<string>;
}>;

export type PostsQuery = { __typename?: "Query" } & {
    getPosts: { __typename?: "Posts" } & {
        posts: Array<{ __typename?: "Post" } & PostSnippetFragment>;
    };
};

export const PostSnippetFragmentDoc = gql`
    fragment PostSnippet on Post {
        id
        createdAt
        editdAt
        title
        points
        textSnippet
        voteStatus
        creator {
            id
            username
        }
    }
`;
export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
        field
        message
    }
`;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
        id
        username
    }
`;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
        errors {
            ...RegularError
        }
        user {
            ...RegularUser
        }
    }
    ${RegularErrorFragmentDoc}
    ${RegularUserFragmentDoc}
`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
        changePassword(token: $token, newPassword: $newPassword) {
            ...RegularUserResponse
        }
    }
    ${RegularUserResponseFragmentDoc}
`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(
    baseOptions?: Apollo.MutationHookOptions<
        ChangePasswordMutation,
        ChangePasswordMutationVariables
    >
) {
    return Apollo.useMutation<
        ChangePasswordMutation,
        ChangePasswordMutationVariables
    >(ChangePasswordDocument, baseOptions);
}
export type ChangePasswordMutationHookResult = ReturnType<
    typeof useChangePasswordMutation
>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
>;
export const CreatePostDocument = gql`
    mutation CreatePost($input: PostInput!) {
        createPost(input: $input) {
            id
            createdAt
            editdAt
            title
            text
            points
            creatorId
        }
    }
`;
export type CreatePostMutationFn = Apollo.MutationFunction<
    CreatePostMutation,
    CreatePostMutationVariables
>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(
    baseOptions?: Apollo.MutationHookOptions<
        CreatePostMutation,
        CreatePostMutationVariables
    >
) {
    return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(
        CreatePostDocument,
        baseOptions
    );
}
export type CreatePostMutationHookResult = ReturnType<
    typeof useCreatePostMutation
>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<
    CreatePostMutation,
    CreatePostMutationVariables
>;
export const DeletePostDocument = gql`
    mutation DeletePost($id: Int!) {
        deletePost(id: $id)
    }
`;
export type DeletePostMutationFn = Apollo.MutationFunction<
    DeletePostMutation,
    DeletePostMutationVariables
>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(
    baseOptions?: Apollo.MutationHookOptions<
        DeletePostMutation,
        DeletePostMutationVariables
    >
) {
    return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(
        DeletePostDocument,
        baseOptions
    );
}
export type DeletePostMutationHookResult = ReturnType<
    typeof useDeletePostMutation
>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<
    DeletePostMutation,
    DeletePostMutationVariables
>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
        forgotPassword(email: $email)
    }
`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(
    baseOptions?: Apollo.MutationHookOptions<
        ForgotPasswordMutation,
        ForgotPasswordMutationVariables
    >
) {
    return Apollo.useMutation<
        ForgotPasswordMutation,
        ForgotPasswordMutationVariables
    >(ForgotPasswordDocument, baseOptions);
}
export type ForgotPasswordMutationHookResult = ReturnType<
    typeof useForgotPasswordMutation
>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
        login(usernameOrEmail: $usernameOrEmail, password: $password) {
            ...RegularUserResponse
        }
    }
    ${RegularUserResponseFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<
    LoginMutation,
    LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
    baseOptions?: Apollo.MutationHookOptions<
        LoginMutation,
        LoginMutationVariables
    >
) {
    return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
        LoginDocument,
        baseOptions
    );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
    LoginMutation,
    LoginMutationVariables
>;
export const LogoutDocument = gql`
    mutation Logout {
        logout
    }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
    LogoutMutation,
    LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
    baseOptions?: Apollo.MutationHookOptions<
        LogoutMutation,
        LogoutMutationVariables
    >
) {
    return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
        LogoutDocument,
        baseOptions
    );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
    LogoutMutation,
    LogoutMutationVariables
>;
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
        register(options: $options) {
            ...RegularUserResponse
        }
    }
    ${RegularUserResponseFragmentDoc}
`;
export type RegisterMutationFn = Apollo.MutationFunction<
    RegisterMutation,
    RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useRegisterMutation(
    baseOptions?: Apollo.MutationHookOptions<
        RegisterMutation,
        RegisterMutationVariables
    >
) {
    return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
        RegisterDocument,
        baseOptions
    );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
    RegisterMutation,
    RegisterMutationVariables
>;
export const EditPostDocument = gql`
    mutation EditPost($id: Int!, $title: String!, $text: String!) {
        editPost(id: $id, title: $title, text: $text) {
            id
            title
            text
            textSnippet
        }
    }
`;
export type EditPostMutationFn = Apollo.MutationFunction<
    EditPostMutation,
    EditPostMutationVariables
>;

/**
 * __useEditPostMutation__
 *
 * To run a mutation, you first call `useEditPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPostMutation, { data, loading, error }] = useEditPostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      text: // value for 'text'
 *   },
 * });
 */
export function useEditPostMutation(
    baseOptions?: Apollo.MutationHookOptions<
        EditPostMutation,
        EditPostMutationVariables
    >
) {
    return Apollo.useMutation<EditPostMutation, EditPostMutationVariables>(
        EditPostDocument,
        baseOptions
    );
}
export type EditPostMutationHookResult = ReturnType<typeof useEditPostMutation>;
export type EditPostMutationResult = Apollo.MutationResult<EditPostMutation>;
export type EditPostMutationOptions = Apollo.BaseMutationOptions<
    EditPostMutation,
    EditPostMutationVariables
>;
export const VoteDocument = gql`
    mutation Vote($value: Int!, $postId: Int!) {
        vote(value: $value, postId: $postId)
    }
`;
export type VoteMutationFn = Apollo.MutationFunction<
    VoteMutation,
    VoteMutationVariables
>;

/**
 * __useVoteMutation__
 *
 * To run a mutation, you first call `useVoteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMutation, { data, loading, error }] = useVoteMutation({
 *   variables: {
 *      value: // value for 'value'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useVoteMutation(
    baseOptions?: Apollo.MutationHookOptions<
        VoteMutation,
        VoteMutationVariables
    >
) {
    return Apollo.useMutation<VoteMutation, VoteMutationVariables>(
        VoteDocument,
        baseOptions
    );
}
export type VoteMutationHookResult = ReturnType<typeof useVoteMutation>;
export type VoteMutationResult = Apollo.MutationResult<VoteMutation>;
export type VoteMutationOptions = Apollo.BaseMutationOptions<
    VoteMutation,
    VoteMutationVariables
>;
export const MeDocument = gql`
    query Me {
        me {
            ...RegularUser
        }
    }
    ${RegularUserFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
    baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
    return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
}
export function useMeLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
    return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(
        MeDocument,
        baseOptions
    );
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const PostDocument = gql`
    query Post($id: Int!) {
        post(id: $id) {
            id
            createdAt
            editdAt
            title
            points
            text
            voteStatus
            creator {
                id
                username
            }
        }
    }
`;

/**
 * __usePostQuery__
 *
 * To run a query within a React component, call `usePostQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePostQuery(
    baseOptions?: Apollo.QueryHookOptions<PostQuery, PostQueryVariables>
) {
    return Apollo.useQuery<PostQuery, PostQueryVariables>(
        PostDocument,
        baseOptions
    );
}
export function usePostLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<PostQuery, PostQueryVariables>
) {
    return Apollo.useLazyQuery<PostQuery, PostQueryVariables>(
        PostDocument,
        baseOptions
    );
}
export type PostQueryHookResult = ReturnType<typeof usePostQuery>;
export type PostLazyQueryHookResult = ReturnType<typeof usePostLazyQuery>;
export type PostQueryResult = Apollo.QueryResult<PostQuery, PostQueryVariables>;
export const PostsDocument = gql`
    query Posts($limit: Int!, $cursor: String) {
        posts(limit: $limit, cursor: $cursor) {
            hasMore
            posts {
                ...PostSnippet
            }
        }
    }
    ${PostSnippetFragmentDoc}
`;

/**
 * __usePostsQuery__
 *
 * To run a query within a React component, call `usePostsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePostsQuery(
    baseOptions?: Apollo.QueryHookOptions<PostsQuery, PostsQueryVariables>
) {
    return Apollo.useQuery<PostsQuery, PostsQueryVariables>(
        PostsDocument,
        baseOptions
    );
}
export function usePostsLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<PostsQuery, PostsQueryVariables>
) {
    return Apollo.useLazyQuery<PostsQuery, PostsQueryVariables>(
        PostsDocument,
        baseOptions
    );
}
export type PostsQueryHookResult = ReturnType<typeof usePostsQuery>;
export type PostsLazyQueryHookResult = ReturnType<typeof usePostsLazyQuery>;
export type PostsQueryResult = Apollo.QueryResult<
    PostsQuery,
    PostsQueryVariables
>;
