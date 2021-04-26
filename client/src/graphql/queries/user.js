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
