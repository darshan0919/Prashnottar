const { model, Schema } = require("mongoose");

module.exports = model(
    "Answer",
    new Schema({
        body: String,
        createdAt: String,
        post: {
            type: Schema.Types.ObjectId,
            ref: "posts",
        },
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "comments",
            },
        ],
        upvotes: [
            {
                type: Schema.Types.ObjectId,
                ref: "votes",
            },
        ],
        downvotes: [
            {
                type: Schema.Types.ObjectId,
                ref: "votes",
            },
        ],
        user: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
    })
);
