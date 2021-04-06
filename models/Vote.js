const { model, Schema } = require("mongoose");

module.exports = model(
    "Vote",
    new Schema({
        user: {
            type: Schema.Types.ObjectId,
            ref: "users",
        },
        answer: {
            type: Schema.Types.ObjectId,
            ref: "answers",
        },
        createdAt: String,
    })
);
