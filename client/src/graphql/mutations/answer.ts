import gql from "graphql-tag";
export const CREATE_ANSWER_MUTATION = gql`
    mutation createAnswer($postId: ID!, $body: String!) {
        createAnswer(postId: $postId, body: $body) {
            id
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
            upvoteCount
            downvoteCount
        }
    }
`;

export const DOWNVOTE_ANSWER_MUTATION = gql`
    mutation downvoteAnswer($answerId: ID!) {
        downvoteAnswer(answerId: $answerId) {
            id
            upvoteCount
            downvoteCount
        }
    }
`;
