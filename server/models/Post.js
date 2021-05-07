const { model, Schema } = require("mongoose");

module.exports = model(
    "Post",
    new Schema({
        question: String,
        imageUrl: String,
        answers: [
            {
                type: Schema.Types.ObjectId,
                ref: "answers",
            },
        ],
        user: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        createdAt: String,
    })
);
