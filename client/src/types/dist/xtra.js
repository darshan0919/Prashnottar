"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.usePostsLazyQuery = exports.usePostsQuery = exports.PostsDocument = exports.usePostLazyQuery = exports.usePostQuery = exports.PostDocument = exports.useMeLazyQuery = exports.useMeQuery = exports.MeDocument = exports.useVoteMutation = exports.VoteDocument = exports.useEditPostMutation = exports.EditPostDocument = exports.useRegisterMutation = exports.RegisterDocument = exports.useLogoutMutation = exports.LogoutDocument = exports.useLoginMutation = exports.LoginDocument = exports.useForgotPasswordMutation = exports.ForgotPasswordDocument = exports.useDeletePostMutation = exports.DeletePostDocument = exports.useCreatePostMutation = exports.CreatePostDocument = exports.useChangePasswordMutation = exports.ChangePasswordDocument = exports.RegularUserResponseFragmentDoc = exports.RegularUserFragmentDoc = exports.RegularErrorFragmentDoc = exports.PostSnippetFragmentDoc = void 0;
var client_1 = require("@apollo/client");
var Apollo = require("@apollo/client");
exports.PostSnippetFragmentDoc = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    fragment PostSnippet on Post {\n        id\n        createdAt\n        editdAt\n        title\n        points\n        textSnippet\n        voteStatus\n        creator {\n            id\n            username\n        }\n    }\n"], ["\n    fragment PostSnippet on Post {\n        id\n        createdAt\n        editdAt\n        title\n        points\n        textSnippet\n        voteStatus\n        creator {\n            id\n            username\n        }\n    }\n"])));
exports.RegularErrorFragmentDoc = client_1.gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n    fragment RegularError on FieldError {\n        field\n        message\n    }\n"], ["\n    fragment RegularError on FieldError {\n        field\n        message\n    }\n"])));
exports.RegularUserFragmentDoc = client_1.gql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n    fragment RegularUser on User {\n        id\n        username\n    }\n"], ["\n    fragment RegularUser on User {\n        id\n        username\n    }\n"])));
exports.RegularUserResponseFragmentDoc = client_1.gql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n    fragment RegularUserResponse on UserResponse {\n        errors {\n            ...RegularError\n        }\n        user {\n            ...RegularUser\n        }\n    }\n    ", "\n    ", "\n"], ["\n    fragment RegularUserResponse on UserResponse {\n        errors {\n            ...RegularError\n        }\n        user {\n            ...RegularUser\n        }\n    }\n    ", "\n    ", "\n"])), exports.RegularErrorFragmentDoc, exports.RegularUserFragmentDoc);
exports.ChangePasswordDocument = client_1.gql(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n    mutation ChangePassword($token: String!, $newPassword: String!) {\n        changePassword(token: $token, newPassword: $newPassword) {\n            ...RegularUserResponse\n        }\n    }\n    ", "\n"], ["\n    mutation ChangePassword($token: String!, $newPassword: String!) {\n        changePassword(token: $token, newPassword: $newPassword) {\n            ...RegularUserResponse\n        }\n    }\n    ", "\n"])), exports.RegularUserResponseFragmentDoc);
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
function useChangePasswordMutation(baseOptions) {
    return Apollo.useMutation(exports.ChangePasswordDocument, baseOptions);
}
exports.useChangePasswordMutation = useChangePasswordMutation;
exports.CreatePostDocument = client_1.gql(templateObject_6 || (templateObject_6 = __makeTemplateObject(["\n    mutation CreatePost($input: PostInput!) {\n        createPost(input: $input) {\n            id\n            createdAt\n            editdAt\n            title\n            text\n            points\n            creatorId\n        }\n    }\n"], ["\n    mutation CreatePost($input: PostInput!) {\n        createPost(input: $input) {\n            id\n            createdAt\n            editdAt\n            title\n            text\n            points\n            creatorId\n        }\n    }\n"])));
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
function useCreatePostMutation(baseOptions) {
    return Apollo.useMutation(exports.CreatePostDocument, baseOptions);
}
exports.useCreatePostMutation = useCreatePostMutation;
exports.DeletePostDocument = client_1.gql(templateObject_7 || (templateObject_7 = __makeTemplateObject(["\n    mutation DeletePost($id: Int!) {\n        deletePost(id: $id)\n    }\n"], ["\n    mutation DeletePost($id: Int!) {\n        deletePost(id: $id)\n    }\n"])));
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
function useDeletePostMutation(baseOptions) {
    return Apollo.useMutation(exports.DeletePostDocument, baseOptions);
}
exports.useDeletePostMutation = useDeletePostMutation;
exports.ForgotPasswordDocument = client_1.gql(templateObject_8 || (templateObject_8 = __makeTemplateObject(["\n    mutation ForgotPassword($email: String!) {\n        forgotPassword(email: $email)\n    }\n"], ["\n    mutation ForgotPassword($email: String!) {\n        forgotPassword(email: $email)\n    }\n"])));
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
function useForgotPasswordMutation(baseOptions) {
    return Apollo.useMutation(exports.ForgotPasswordDocument, baseOptions);
}
exports.useForgotPasswordMutation = useForgotPasswordMutation;
exports.LoginDocument = client_1.gql(templateObject_9 || (templateObject_9 = __makeTemplateObject(["\n    mutation Login($usernameOrEmail: String!, $password: String!) {\n        login(usernameOrEmail: $usernameOrEmail, password: $password) {\n            ...RegularUserResponse\n        }\n    }\n    ", "\n"], ["\n    mutation Login($usernameOrEmail: String!, $password: String!) {\n        login(usernameOrEmail: $usernameOrEmail, password: $password) {\n            ...RegularUserResponse\n        }\n    }\n    ", "\n"])), exports.RegularUserResponseFragmentDoc);
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
function useLoginMutation(baseOptions) {
    return Apollo.useMutation(exports.LoginDocument, baseOptions);
}
exports.useLoginMutation = useLoginMutation;
exports.LogoutDocument = client_1.gql(templateObject_10 || (templateObject_10 = __makeTemplateObject(["\n    mutation Logout {\n        logout\n    }\n"], ["\n    mutation Logout {\n        logout\n    }\n"])));
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
function useLogoutMutation(baseOptions) {
    return Apollo.useMutation(exports.LogoutDocument, baseOptions);
}
exports.useLogoutMutation = useLogoutMutation;
exports.RegisterDocument = client_1.gql(templateObject_11 || (templateObject_11 = __makeTemplateObject(["\n    mutation Register($options: UsernamePasswordInput!) {\n        register(options: $options) {\n            ...RegularUserResponse\n        }\n    }\n    ", "\n"], ["\n    mutation Register($options: UsernamePasswordInput!) {\n        register(options: $options) {\n            ...RegularUserResponse\n        }\n    }\n    ", "\n"])), exports.RegularUserResponseFragmentDoc);
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
function useRegisterMutation(baseOptions) {
    return Apollo.useMutation(exports.RegisterDocument, baseOptions);
}
exports.useRegisterMutation = useRegisterMutation;
exports.EditPostDocument = client_1.gql(templateObject_12 || (templateObject_12 = __makeTemplateObject(["\n    mutation EditPost($id: Int!, $title: String!, $text: String!) {\n        editPost(id: $id, title: $title, text: $text) {\n            id\n            title\n            text\n            textSnippet\n        }\n    }\n"], ["\n    mutation EditPost($id: Int!, $title: String!, $text: String!) {\n        editPost(id: $id, title: $title, text: $text) {\n            id\n            title\n            text\n            textSnippet\n        }\n    }\n"])));
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
function useEditPostMutation(baseOptions) {
    return Apollo.useMutation(exports.EditPostDocument, baseOptions);
}
exports.useEditPostMutation = useEditPostMutation;
exports.VoteDocument = client_1.gql(templateObject_13 || (templateObject_13 = __makeTemplateObject(["\n    mutation Vote($value: Int!, $postId: Int!) {\n        vote(value: $value, postId: $postId)\n    }\n"], ["\n    mutation Vote($value: Int!, $postId: Int!) {\n        vote(value: $value, postId: $postId)\n    }\n"])));
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
function useVoteMutation(baseOptions) {
    return Apollo.useMutation(exports.VoteDocument, baseOptions);
}
exports.useVoteMutation = useVoteMutation;
exports.MeDocument = client_1.gql(templateObject_14 || (templateObject_14 = __makeTemplateObject(["\n    query Me {\n        me {\n            ...RegularUser\n        }\n    }\n    ", "\n"], ["\n    query Me {\n        me {\n            ...RegularUser\n        }\n    }\n    ", "\n"])), exports.RegularUserFragmentDoc);
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
function useMeQuery(baseOptions) {
    return Apollo.useQuery(exports.MeDocument, baseOptions);
}
exports.useMeQuery = useMeQuery;
function useMeLazyQuery(baseOptions) {
    return Apollo.useLazyQuery(exports.MeDocument, baseOptions);
}
exports.useMeLazyQuery = useMeLazyQuery;
exports.PostDocument = client_1.gql(templateObject_15 || (templateObject_15 = __makeTemplateObject(["\n    query Post($id: Int!) {\n        post(id: $id) {\n            id\n            createdAt\n            editdAt\n            title\n            points\n            text\n            voteStatus\n            creator {\n                id\n                username\n            }\n        }\n    }\n"], ["\n    query Post($id: Int!) {\n        post(id: $id) {\n            id\n            createdAt\n            editdAt\n            title\n            points\n            text\n            voteStatus\n            creator {\n                id\n                username\n            }\n        }\n    }\n"])));
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
function usePostQuery(baseOptions) {
    return Apollo.useQuery(exports.PostDocument, baseOptions);
}
exports.usePostQuery = usePostQuery;
function usePostLazyQuery(baseOptions) {
    return Apollo.useLazyQuery(exports.PostDocument, baseOptions);
}
exports.usePostLazyQuery = usePostLazyQuery;
exports.PostsDocument = client_1.gql(templateObject_16 || (templateObject_16 = __makeTemplateObject(["\n    query Posts($limit: Int!, $cursor: String) {\n        posts(limit: $limit, cursor: $cursor) {\n            hasMore\n            posts {\n                ...PostSnippet\n            }\n        }\n    }\n    ", "\n"], ["\n    query Posts($limit: Int!, $cursor: String) {\n        posts(limit: $limit, cursor: $cursor) {\n            hasMore\n            posts {\n                ...PostSnippet\n            }\n        }\n    }\n    ", "\n"])), exports.PostSnippetFragmentDoc);
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
function usePostsQuery(baseOptions) {
    return Apollo.useQuery(exports.PostsDocument, baseOptions);
}
exports.usePostsQuery = usePostsQuery;
function usePostsLazyQuery(baseOptions) {
    return Apollo.useLazyQuery(exports.PostsDocument, baseOptions);
}
exports.usePostsLazyQuery = usePostsLazyQuery;
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5, templateObject_6, templateObject_7, templateObject_8, templateObject_9, templateObject_10, templateObject_11, templateObject_12, templateObject_13, templateObject_14, templateObject_15, templateObject_16;
