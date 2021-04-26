import gql from "graphql-tag";
export const FETCH_COMMENT_QUERY = gql`
    query($commentId: ID!) {
        getComment(commentId: $commentId) {
            id
            body
            createdAt
            user
            upvoteCount
            downvoteCount
            replyCount
            replys
        }
    }
`;
