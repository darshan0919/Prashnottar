const { model, Schema } = require("mongoose");

module.exports = model(
    "Reply",
    new Schema({
        body: String,
        user: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        reply: {
            type: Schema.Types.ObjectId,
            ref: "replys",
        },
        comment: {
            type: Schema.Types.ObjectId,
            ref: "comments",
        },
        rereplys: [
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
