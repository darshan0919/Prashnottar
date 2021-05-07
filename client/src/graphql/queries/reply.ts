import gql from "graphql-tag";
export const FETCH_REPLY_QUERY = gql`
    query($replyId: ID!) {
        getReply(replyId: $replyId) {
            id
            body
            createdAt
            user
            upvoteCount
            downvoteCount
            rereplyCount
            rereplys
        }
    }
`;
