import gql from "graphql-tag";
export const FETCH_ANSWER_QUERY = gql`
    query($answerId: ID!) {
        getAnswer(answerId: $answerId) {
            id
            body
            createdAt
            user
            upvoteCount
            downvoteCount
            commentCount
            comments
        }
    }
`;
