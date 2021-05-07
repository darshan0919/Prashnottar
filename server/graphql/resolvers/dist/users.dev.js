"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var bcrypt = require("bcryptjs");

var jwt = require("jsonwebtoken");

var _require = require("apollo-server"),
    UserInputError = _require.UserInputError;

var _require2 = require("../../util/validators"),
    validateRegisterInput = _require2.validateRegisterInput,
    validateLoginInput = _require2.validateLoginInput;

var _require3 = require("../../config"),
    SECRET_KEY = _require3.SECRET_KEY;

var User = require("../../models/User");

function generateToken(user) {
  var token = jwt.sign({
    id: user.id,
    email: user.email,
    username: user.username,
    photo: user.photo
  }, SECRET_KEY, {
    expiresIn: "1h"
  });
  return token;
}

module.exports = {
  Query: {
    getUser: function getUser(_, _ref) {
      var id, user;
      return regeneratorRuntime.async(function getUser$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              id = _ref.id;
              _context.prev = 1;
              _context.next = 4;
              return regeneratorRuntime.awrap(User.findById(id));

            case 4:
              user = _context.sent;

              if (!user) {
                _context.next = 9;
                break;
              }

              return _context.abrupt("return", user);

            case 9:
              throw new Error("User not found");

            case 10:
              _context.next = 15;
              break;

            case 12:
              _context.prev = 12;
              _context.t0 = _context["catch"](1);
              throw new Error(_context.t0);

            case 15:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[1, 12]]);
    },
    getUsers: function getUsers() {
      var users;
      return regeneratorRuntime.async(function getUsers$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return regeneratorRuntime.awrap(User.find());

            case 3:
              users = _context2.sent;

              if (!users) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return", users);

            case 8:
              throw new Error("Users not found");

            case 9:
              _context2.next = 14;
              break;

            case 11:
              _context2.prev = 11;
              _context2.t0 = _context2["catch"](0);
              throw new Error(_context2.t0);

            case 14:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[0, 11]]);
    }
  },
  Mutation: {
    login: function login(_, _ref2) {
      var username, password, _validateLoginInput, errors, valid, user, match, token, result;

      return regeneratorRuntime.async(function login$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              username = _ref2.username, password = _ref2.password;
              _validateLoginInput = validateLoginInput(username, password), errors = _validateLoginInput.errors, valid = _validateLoginInput.valid;

              if (valid) {
                _context3.next = 4;
                break;
              }

              throw new UserInputError("Errors", {
                errors: errors
              });

            case 4:
              _context3.next = 6;
              return regeneratorRuntime.awrap(User.findOne({
                username: username
              }));

            case 6:
              user = _context3.sent;

              if (user) {
                _context3.next = 10;
                break;
              }

              errors.general = "User not found";
              throw new UserInputError("User not found", {
                errors: errors
              });

            case 10:
              _context3.next = 12;
              return regeneratorRuntime.awrap(bcrypt.compare(password, user.password));

            case 12:
              match = _context3.sent;

              if (match) {
                _context3.next = 16;
                break;
              }

              errors.general = "Wrong crendetials";
              throw new UserInputError("Wrong crendetials", {
                errors: errors
              });

            case 16:
              token = generateToken(user); //console.log(token);
              //TODO

              result = _objectSpread({}, user._doc, {
                id: user._id,
                photo: user.photo,
                token: token
              });
              console.log(result);
              return _context3.abrupt("return", result);

            case 20:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    register: function register(_, _ref3) {
      var _ref3$registerInput, username, email, password, confirmPassword, _ref4, valid, errors, user, newUser, res, token;

      return regeneratorRuntime.async(function register$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _ref3$registerInput = _ref3.registerInput, username = _ref3$registerInput.username, email = _ref3$registerInput.email, password = _ref3$registerInput.password, confirmPassword = _ref3$registerInput.confirmPassword;
              _context4.next = 3;
              return regeneratorRuntime.awrap(validateRegisterInput(username, email, password, confirmPassword));

            case 3:
              _ref4 = _context4.sent;
              valid = _ref4.valid;
              errors = _ref4.errors;

              if (valid) {
                _context4.next = 8;
                break;
              }

              throw new UserInputError("Errors", {
                errors: errors
              });

            case 8:
              _context4.next = 10;
              return regeneratorRuntime.awrap(User.findOne({
                username: username
              }));

            case 10:
              user = _context4.sent;

              if (!user) {
                _context4.next = 13;
                break;
              }

              throw new UserInputError("Username is taken", {
                errors: {
                  username: "This username is taken"
                }
              });

            case 13:
              _context4.next = 15;
              return regeneratorRuntime.awrap(bcrypt.hash(password, 12));

            case 15:
              password = _context4.sent;
              //photo = `https://ui-avatars.com/api/?rounded=true&name=${username[0]}&background=6c9eea&color=ecebc5`;
              photo = "https://ui-avatars.com/api/?rounded=true&name=".concat(username[0], "&background=random");
              newUser = new User({
                email: email,
                username: username,
                password: password,
                photo: photo,
                createdAt: new Date().toISOString()
              });
              _context4.next = 20;
              return regeneratorRuntime.awrap(newUser.save());

            case 20:
              res = _context4.sent;
              token = generateToken(res);
              return _context4.abrupt("return", _objectSpread({}, res._doc, {
                id: res._id,
                photo: photo,
                token: token
              }));

            case 23:
            case "end":
              return _context4.stop();
          }
        }
      });
    }
  }
};