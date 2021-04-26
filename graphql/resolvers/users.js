const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");

const {
    validateRegisterInput,
    validateLoginInput,
} = require("../../util/validators");
const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");

function generateToken(user) {
    const token = jwt.sign(
        {
            id: user.id,
            email: user.email,
            username: user.username,
            photo: user.photo,
        },
        SECRET_KEY,
        { expiresIn: "1h" }
    );
    return token;
}

module.exports = {
    Query: {
        async getUser(_, { id }) {
            try {
                const user = await User.findById(id);
                //console.log("GETTING USER!");
                if (user) {
                    //console.log("Found User!");
                    return user;
                } else {
                    throw new Error("User not found");
                }
            } catch (err) {
                throw new Error(err);
            }
        },
        async getUsers() {
            try {
                const users = await User.find();
                if (users) {
                    return users;
                } else {
                    throw new Error("Users not found");
                }
            } catch (err) {
                throw new Error(err);
            }
        },
    },
    Mutation: {
        async login(_, { username, password }) {
            const { errors, valid } = validateLoginInput(username, password);

            if (!valid) {
                throw new UserInputError("Errors", { errors });
            }

            const user = await User.findOne({ username });

            if (!user) {
                errors.general = "User not found";
                throw new UserInputError("User not found", { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = "Wrong crendetials";
                throw new UserInputError("Wrong crendetials", { errors });
            }

            const token = generateToken(user);
            console.log(token);
            return {
                ...user._doc,
                id: user._id,
                photo: user.photo,
                token,
            };
        },
        async register(
            _,
            { registerInput: { username, email, password, confirmPassword } }
        ) {
            // Validate user data
            const { valid, errors } = await validateRegisterInput(
                username,
                email,
                password,
                confirmPassword
            );
            if (!valid) {
                throw new UserInputError("Errors", { errors });
            }
            // TODO: Make sure user doesnt already exist
            const user = await User.findOne({ username });
            if (user) {
                throw new UserInputError("Username is taken", {
                    errors: {
                        username: "This username is taken",
                    },
                });
            }
            // hash password and create an auth token
            password = await bcrypt.hash(password, 12);
            //photo = `https://ui-avatars.com/api/?rounded=true&name=${username[0]}&background=6c9eea&color=ecebc5`;
            photo = `https://ui-avatars.com/api/?rounded=true&name=${username[0]}&background=random`;

            const newUser = new User({
                email,
                username,
                password,
                photo,
                createdAt: new Date().toISOString(),
            });

            const res = await newUser.save();

            const token = generateToken(res);

            return {
                ...res._doc,
                id: res._id,
                photo,
                token,
            };
        },
    },
};
