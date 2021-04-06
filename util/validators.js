const User = require("../models/User");
const { asyncFindIndex } = require("./index");

module.exports.validateRegisterInput = async (
    username,
    email,
    password,
    confirmPassword
) => {
    const errors = {};
    if (username.trim() === "") {
        errors.username = "Username must not be empty";
    }
    if (email.trim() === "") {
        errors.email = "Email must not be empty";
    } else {
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
        if (!email.match(regEx)) {
            errors.email = "Email must be a valid email address";
        } else {
            const users = await User.find();
            const userIndex = await asyncFindIndex(
                users,
                (user) => user.email === email
            );
            if (userIndex >= 0)
                errors.email = "Account with email already exists";
        }
    }
    if (password === "") {
        errors.password = "Password must not empty";
    } else if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords must match";
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};

module.exports.validateLoginInput = (username, password) => {
    const errors = {};
    if (username.trim() === "") {
        errors.username = "Username must not be empty";
    }
    if (password.trim() === "") {
        errors.password = "Password must not be empty";
    }

    return {
        errors,
        valid: Object.keys(errors).length < 1,
    };
};
