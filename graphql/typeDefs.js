const { gql } = require("apollo-server");

module.exports = gql`
    type User {
        id: ID!
        email: String!
        username: String!
        photo: String
        createdAt: String!
        token: String!
    }
    type Vote {
        id: ID!
        answer: ID!
        createdAt: String!
        user: ID!
    }
    type Comment {
        id: ID!
        createdAt: String!
        user: ID!
        answer: ID!
        body: String!
        replys: [ID]
        replyCount: Int!
        upvotes: [ID]
        upvoteCount: Int!
        downvotes: [ID]
        downvoteCount: Int!
    }
    type Reply {
        id: ID!
        createdAt: String!
        user: ID!
        reply: ID
        comment: ID
        body: String!
        replys: [ID]
        replyCount: Int!
        upvotes: [ID]
        upvoteCount: Int!
        downvotes: [ID]
        downvoteCount: Int!
    }
    type Answer {
        id: ID!
        body: String!
        createdAt: String!
        user: ID!
        post: ID!
        comments: [ID]
        commentCount: Int!
        upvotes: [ID]
        upvoteCount: Int!
        downvotes: [ID]
        downvoteCount: Int!
    }
    type Post {
        id: ID!
        question: String!
        imageUrl: String
        user: ID!
        createdAt: String!
        answers: [ID]
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query {
        getUser(id: ID!): User
        getUsers: [User]
        getPosts: [Post]
        getPost(postId: ID!): Post
        getAnswer(answerId: ID!): Answer
        getComment(commentId: ID!): Comment
        getReply(replyId: ID!): Reply
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        unregister(id: ID!): User!
        login(username: String!, password: String!): User!
        createPost(question: String!, imageUrl: String): Post
        editPost(postId: ID!, question: String!, imageUrl: String): Post
        deletePost(postId: ID!): Post
        createAnswer(postId: ID!, body: String!): Post
        editAnswer(answerId: ID!, body: String!): Answer
        deleteAnswer(answerId: ID!): Answer
        upvoteAnswer(answerId: ID!): Answer
        downvoteAnswer(answerId: ID!): Answer
        createComment(answerId: ID!, body: String!): Answer
        editComment(commentId: ID!, body: String!): Comment
        deleteComment(commentId: ID!): Comment
        upvoteComment(commentId: ID!): Comment
        downvoteComment(commentId: ID!): Comment
        createReply(commentId: ID!, body: String!): Comment
        createReReply(replyId: ID!, body: String!): Reply
        editReply(replyId: ID!, body: String!): Reply
        deleteReply(replyId: ID!): Reply
        upvoteReply(replyId: ID!): Reply
        downvoteReply(replyId: ID!): Reply
        deleteVote(voteId: ID!): Vote
    }
    type Subscription {
        newUser: User!
        newPost: Post!
        newAnswer: Answer!
        newComment: Comment!
        newVote: Vote!
    }
`;
