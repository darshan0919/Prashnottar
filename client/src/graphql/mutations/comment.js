import gql from "graphql-tag";
export const CREATE_COMMENT_MUTATION = gql`
    mutation createComment($answerId: ID!, $body: String!) {
        createComment(answerId: $answerId, body: $body) {
            id
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
            upvoteCount
            downvoteCount
        }
    }
`;

export const DOWNVOTE_COMMENT_MUTATION = gql`
    mutation downvoteComment($commentId: ID!) {
        downvoteComment(commentId: $commentId) {
            id
            upvoteCount
            downvoteCount
        }
    }
`;
