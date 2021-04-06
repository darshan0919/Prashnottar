import gql from "graphql-tag";

export const FETCH_USER_QUERY = gql`
    query($id: ID!) {
        getUser(id: $id) {
            id
            username
            photo
        }
    }
`;

export const REGISTER_USER = gql`
    mutation register(
        $username: String!
        $email: String!
        $password: String!
        $confirmPassword: String!
    ) {
        register(
            registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }
        ) {
            id
            email
            username
            createdAt
            token
            photo
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            email
            username
            createdAt
            token
            photo
        }
    }
`;

export const FETCH_POST_QUERY = gql`
    query($postId: ID!) {
        getPost(postId: $postId) {
            id
            question
            imageUrl
            createdAt
            user
            answers
        }
    }
`;

export const FETCH_ANSWER_QUERY = gql`
    query($answerId: ID!) {
        getAnswer(answerId: $answerId) {
            id
            body
            createdAt
            user
            upvoteCount
            upvotes
            downvoteCount
            downvotes
            commentCount
            comments
        }
    }
`;

export const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id
        }
    }
`;

export const CREATE_POST_MUTATION = gql`
    mutation createPost($question: String!, $imageUrl: String) {
        createPost(question: $question, imageUrl: $imageUrl) {
            id
            question
            imageUrl
            createdAt
            user
        }
    }
`;

export const EDIT_POST_MUTATION = gql`
    mutation editPost($postId: ID!, $question: String!, $imageUrl: String) {
        editPost(postId: $postId, question: $question, imageUrl: $imageUrl) {
            id
            question
            imageUrl
        }
    }
`;

export const DELETE_POST_MUTATION = gql`
    mutation deletePost($postId: ID!) {
        deletePost(postId: $postId) {
            id
        }
    }
`;

export const CREATE_ANSWER_MUTATION = gql`
    mutation createAnswer($postId: ID!, $body: String!) {
        createAnswer(postId: $postId, body: $body) {
            id
            answers
        }
    }
`;

export const EDIT_ANSWER_MUTATION = gql`
    mutation editAnswer($answerId: ID!, $body: String!) {
        editAnswer(answerId: $answerId, body: $body) {
            id
            body
        }
    }
`;

export const DELETE_ANSWER_MUTATION = gql`
    mutation deleteAnswer($answerId: ID!) {
        deleteAnswer(answerId: $answerId) {
            id
        }
    }
`;

export const UPVOTE_ANSWER_MUTATION = gql`
    mutation upvoteAnswer($answerId: ID!) {
        upvoteAnswer(answerId: $answerId) {
            id
            upvotes
            upvoteCount
            downvotes
            downvoteCount
        }
    }
`;

export const DOWNVOTE_ANSWER_MUTATION = gql`
    mutation downvoteAnswer($answerId: ID!) {
        downvoteAnswer(answerId: $answerId) {
            id
            upvotes
            upvoteCount
            downvotes
            downvoteCount
        }
    }
`;

export const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($answerId: ID!, $body: String!) {
        createComment(answerId: $answerId, body: $body) {
            id
            comments
            commentCount
        }
    }
`;

export const FETCH_COMMENT_QUERY = gql`
    query($commentId: ID!) {
        getComment(commentId: $commentId) {
            id
            body
            createdAt
            user
            upvoteCount
            upvotes
            downvoteCount
            downvotes
            replyCount
            replys
        }
    }
`;

export const EDIT_COMMENT_MUTATION = gql`
    mutation editComment($commentId: ID!, $body: String!) {
        editComment(commentId: $commentId, body: $body) {
            id
            body
        }
    }
`;

export const DELETE_COMMENT_MUTATION = gql`
    mutation deleteComment($commentId: ID!) {
        deleteComment(commentId: $commentId) {
            id
        }
    }
`;

export const UPVOTE_COMMENT_MUTATION = gql`
    mutation upvoteComment($commentId: ID!) {
        upvoteComment(commentId: $commentId) {
            id
            upvotes
            upvoteCount
            downvotes
            downvoteCount
        }
    }
`;

export const DOWNVOTE_COMMENT_MUTATION = gql`
    mutation downvoteComment($commentId: ID!) {
        downvoteComment(commentId: $commentId) {
            id
            upvotes
            upvoteCount
            downvotes
            downvoteCount
        }
    }
`;

export const CREATE_REPLY_MUTATION = gql`
    mutation createReply($commentId: ID!, $body: String!) {
        createReply(commentId: $commentId, body: $body) {
            id
            replys
            replyCount
        }
    }
`;

export const CREATE_REREPLY_MUTATION = gql`
    mutation createReReply($replyId: ID!, $body: String!) {
        createReReply(replyId: $replyId, body: $body) {
            id
            replys
            replyCount
        }
    }
`;

export const FETCH_REPLY_QUERY = gql`
    query($replyId: ID!) {
        getReply(replyId: $replyId) {
            id
            body
            createdAt
            user
            upvoteCount
            upvotes
            downvoteCount
            downvotes
            replyCount
            replys
        }
    }
`;

export const EDIT_REPLY_MUTATION = gql`
    mutation editReply($replyId: ID!, $body: String!) {
        editReply(replyId: $replyId, body: $body) {
            id
            body
        }
    }
`;

export const DELETE_REPLY_MUTATION = gql`
    mutation deleteReply($replyId: ID!) {
        deleteReply(replyId: $replyId) {
            id
        }
    }
`;

export const UPVOTE_REPLY_MUTATION = gql`
    mutation upvoteReply($replyId: ID!) {
        upvoteReply(replyId: $replyId) {
            id
            upvotes
            upvoteCount
            downvotes
            downvoteCount
        }
    }
`;

export const DOWNVOTE_REPLY_MUTATION = gql`
    mutation downvoteReply($replyId: ID!) {
        downvoteReply(replyId: $replyId) {
            id
            upvotes
            upvoteCount
            downvotes
            downvoteCount
        }
    }
`;
