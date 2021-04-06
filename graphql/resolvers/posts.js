const { AuthenticationError, UserInputError } = require("apollo-server");

const { Post, Answer } = require("../../models");
const checkAuth = require("../../util/check-auth");
const {
    Mutation: { deleteAnswer },
} = require("./answers.js");

module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts = await Post.find().sort({ createdAt: -1 });
                return posts;
            } catch (err) {
                throw new Error(err);
            }
        },
        async getPost(_, { postId }) {
            try {
                let post = await Post.findById(postId);

                if (post) {
                    //console.log("post1", post);
                    let answers = await Promise.all(
                        post.answers.map(
                            async (id) => await Answer.findById(id)
                        )
                    );
                    answers = answers.sort(
                        (b, a) =>
                            a.upvotes.length -
                            a.downvotes.length -
                            (b.upvotes.length - b.downvotes.length)
                    );
                    post.answers = answers.map(({ id }) => id);
                    await post.save();
                    //console.log("post2", post);
                    return post;
                } else {
                    throw new Error("Post not found");
                }
            } catch (err) {
                throw new Error(err);
            }
        },
    },
    Mutation: {
        async createPost(_, { question, imageUrl }, context) {
            const user = checkAuth(context);
            //console.log(context.req.headers.authorization);
            if (question.trim() === "") {
                throw new Error("Question field must not be empty!!");
            }
            const newPost = new Post({
                question,
                imageUrl,
                user: user.id,
                createdAt: new Date().toISOString(),
            });

            const post = await newPost.save();

            context.pubsub.publish("NEW_POST", {
                newPost: post,
            });
            return post;
        },
        async editPost(_, { postId, question, imageUrl }, context) {
            const { id } = checkAuth(context);
            console.log("Post is being edited!");
            if (question.trim() === "") {
                throw new Error("Question field must not be empty!!");
            }
            try {
                const post = await Post.findById(postId);
                if (id == post.user) {
                    post.question = question;
                    post.imageUrl = imageUrl;
                    post.createdAt = new Date().toISOString();
                    await post.save();
                    return post;
                } else {
                    throw new AuthenticationError("Action not allowed");
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        deletePost: async (_, { postId }, context) => {
            const { id } = checkAuth(context);
            console.log(postId);
            try {
                const post = await Post.findById(postId);
                if (id == post.user) {
                    post.answers.forEach((answerId) => {
                        deleteAnswer({ answerId });
                    });
                    console.log("Answers deleted");
                    const result = { id: post.id };
                    await post.delete();
                    console.log("Post deleted");
                    return result;
                } else {
                    throw new AuthenticationError("Action not allowed");
                }
            } catch (err) {
                throw new Error(err);
            }
        },
    },
    Subscription: {
        newPost: {
            subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
        },
    },
};
