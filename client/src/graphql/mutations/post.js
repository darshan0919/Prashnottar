import gql from "graphql-tag";
export const CREATE_POST_MUTATION = gql`
    mutation createPost($question: String!, $imageUrl: String) {
        createPost(question: $question, imageUrl: $imageUrl) {
            id
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
