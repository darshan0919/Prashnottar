const { model, Schema } = require("mongoose");

module.exports = model(
    "User",
    new Schema({
        username: String,
        password: String,
        email: String,
        createdAt: String,
        photo: String,
    })
);
