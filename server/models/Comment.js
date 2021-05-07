const { model, Schema } = require("mongoose");

module.exports = model(
    "Comment",
    new Schema({
        body: String,
        user: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        answer: {
            type: Schema.Types.ObjectId,
            ref: "answers",
        },
        replys: [
            {
                type: Schema.Types.ObjectId,
                ref: "replys",
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
        createdAt: String,
    })
);
