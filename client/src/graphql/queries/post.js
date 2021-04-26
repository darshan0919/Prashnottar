import gql from "graphql-tag";
export const FETCH_POSTS_QUERY = gql`
    {
        getPosts {
            id
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
