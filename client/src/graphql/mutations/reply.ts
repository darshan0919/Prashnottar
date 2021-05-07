import gql from "graphql-tag";
export const CREATE_REPLY_MUTATION = gql`
    mutation createReply($commentId: ID!, $body: String!) {
        createReply(commentId: $commentId, body: $body) {
            id
        }
    }
`;

export const CREATE_REREPLY_MUTATION = gql`
    mutation createRereply($replyId: ID!, $body: String!) {
        createRereply(replyId: $replyId, body: $body) {
            id
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
            upvoteCount
            downvoteCount
        }
    }
`;

export const DOWNVOTE_REPLY_MUTATION = gql`
    mutation downvoteReply($replyId: ID!) {
        downvoteReply(replyId: $replyId) {
            id
            upvoteCount
            downvoteCount
        }
    }
`;
