"use strict";

var _require = require("apollo-server"),
    AuthenticationError = _require.AuthenticationError,
    UserInputError = _require.UserInputError;

var checkAuth = require("../../util/check-auth");

var _require2 = require("../../models"),
    Post = _require2.Post,
    Answer = _require2.Answer,
    Comment = _require2.Comment;

var _require3 = require("./comments"),
    deleteComment = _require3.Mutation.deleteComment;

var _require4 = require("./votes"),
    deleteVote = _require4.Mutation.deleteVote;

var _require5 = require("../../util"),
    asyncFindIndex = _require5.asyncFindIndex;

module.exports = {
  Query: {
    getAnswer: function getAnswer(_, _ref) {
      var answerId, answer, comments;
      return regeneratorRuntime.async(function getAnswer$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              answerId = _ref.answerId;
              _context2.prev = 1;
              _context2.next = 4;
              return regeneratorRuntime.awrap(Answer.findById(answerId));

            case 4:
              answer = _context2.sent;

              if (!answer) {
                _context2.next = 16;
                break;
              }

              _context2.next = 8;
              return regeneratorRuntime.awrap(Promise.all(answer.comments.map(function _callee(id) {
                return regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return regeneratorRuntime.awrap(Comment.findById(id));

                      case 2:
                        return _context.abrupt("return", _context.sent);

                      case 3:
                      case "end":
                        return _context.stop();
                    }
                  }
                });
              })));

            case 8:
              comments = _context2.sent;
              comments = comments.sort(function (b, a) {
                return a.upvotes.length - a.downvotes.length - (b.upvotes.length - b.downvotes.length);
              });
              answer.comments = comments.map(function (_ref2) {
                var id = _ref2.id;
                return id;
              });
              _context2.next = 13;
              return regeneratorRuntime.awrap(answer.save());

            case 13:
              return _context2.abrupt("return", answer);

            case 16:
              throw new Error("Answer not found");

            case 17:
              _context2.next = 22;
              break;

            case 19:
              _context2.prev = 19;
              _context2.t0 = _context2["catch"](1);
              throw new Error(_context2.t0);

            case 22:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[1, 19]]);
    }
  },
  Mutation: {
    createAnswer: function createAnswer(_, _ref3, context) {
      var postId, body, _checkAuth, username, id, post, answerIndex, newAnswer, answer;

      return regeneratorRuntime.async(function createAnswer$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              postId = _ref3.postId, body = _ref3.body;
              //console.log("Creating new Answer!");
              _checkAuth = checkAuth(context), username = _checkAuth.username, id = _checkAuth.id;

              if (!(body.trim() === "")) {
                _context4.next = 4;
                break;
              }

              throw new UserInputError("Empty Answer", {
                errors: {
                  body: "Answer body must not empty"
                }
              });

            case 4:
              _context4.next = 6;
              return regeneratorRuntime.awrap(Post.findById(postId));

            case 6:
              post = _context4.sent;

              if (!post) {
                _context4.next = 24;
                break;
              }

              _context4.next = 10;
              return regeneratorRuntime.awrap(asyncFindIndex(post.answers, function _callee2(c) {
                var _ref4, user;

                return regeneratorRuntime.async(function _callee2$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _context3.next = 2;
                        return regeneratorRuntime.awrap(Answer.findById(c));

                      case 2:
                        _ref4 = _context3.sent;
                        user = _ref4.user;
                        console.log(user, id);
                        return _context3.abrupt("return", user == id);

                      case 6:
                      case "end":
                        return _context3.stop();
                    }
                  }
                });
              }));

            case 10:
              answerIndex = _context4.sent;

              if (!(answerIndex >= 0)) {
                _context4.next = 14;
                break;
              }

              console.log("You have already entered the answer, edit answer functionality will be added soon:)");
              return _context4.abrupt("return", post);

            case 14:
              newAnswer = new Answer({
                body: body,
                user: id,
                post: postId,
                createdAt: new Date().toISOString()
              });
              _context4.next = 17;
              return regeneratorRuntime.awrap(newAnswer.save());

            case 17:
              answer = _context4.sent;
              post.answers.unshift(answer.id);
              _context4.next = 21;
              return regeneratorRuntime.awrap(post.save());

            case 21:
              return _context4.abrupt("return", answer);

            case 24:
              throw new UserInputError("Post not found");

            case 25:
            case "end":
              return _context4.stop();
          }
        }
      });
    },
    editAnswer: function editAnswer(_, _ref5, context) {
      var answerId, body, _checkAuth2, id, answer;

      return regeneratorRuntime.async(function editAnswer$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              answerId = _ref5.answerId, body = _ref5.body;
              //console.log("Creating new Answer!");
              _checkAuth2 = checkAuth(context), id = _checkAuth2.id;

              if (!(body.trim() === "")) {
                _context5.next = 4;
                break;
              }

              throw new UserInputError("Empty Answer", {
                errors: {
                  body: "Answer body must not empty"
                }
              });

            case 4:
              _context5.next = 6;
              return regeneratorRuntime.awrap(Answer.findById(answerId));

            case 6:
              answer = _context5.sent;

              if (!answer) {
                _context5.next = 19;
                break;
              }

              if (!(answer.user == id)) {
                _context5.next = 16;
                break;
              }

              answer.body = body;
              answer.createdAt = new Date().toISOString();
              _context5.next = 13;
              return regeneratorRuntime.awrap(answer.save());

            case 13:
              return _context5.abrupt("return", answer);

            case 16:
              throw new AuthenticationError("Action not allowed!");

            case 17:
              _context5.next = 20;
              break;

            case 19:
              throw new UserInputError("Answer not found");

            case 20:
            case "end":
              return _context5.stop();
          }
        }
      });
    },
    deleteAnswer: function deleteAnswer(_, _ref6, context) {
      var answerId, _checkAuth3, id, answer, post, answerIndex, result;

      return regeneratorRuntime.async(function deleteAnswer$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              answerId = _ref6.answerId;
              _checkAuth3 = checkAuth(context), id = _checkAuth3.id;
              _context6.next = 4;
              return regeneratorRuntime.awrap(Answer.findById(answerId));

            case 4:
              answer = _context6.sent;

              if (!answer) {
                _context6.next = 32;
                break;
              }

              _context6.next = 8;
              return regeneratorRuntime.awrap(Post.findById(answer.post));

            case 8:
              post = _context6.sent;

              if (!post) {
                _context6.next = 29;
                break;
              }

              _context6.next = 12;
              return regeneratorRuntime.awrap(asyncFindIndex(post.answers, function (answer) {
                return answer === answerId;
              }));

            case 12:
              answerIndex = _context6.sent;

              if (!(answer.user == id || post.user == id)) {
                _context6.next = 26;
                break;
              }

              answer.comments.forEach(function (commentId) {
                deleteComment({
                  commentId: commentId
                });
              });
              answer.upvotes.forEach(function (upvoteId) {
                deleteVote({
                  upvoteId: upvoteId
                });
              });
              answer.downvotes.forEach(function (downvoteId) {
                deleteVote({
                  downvoteId: downvoteId
                });
              });
              result = {
                id: answer.id
              };
              _context6.next = 20;
              return regeneratorRuntime.awrap(answer["delete"]());

            case 20:
              //console.log(answerIndex);
              post.answers.splice(answerIndex, 1);
              _context6.next = 23;
              return regeneratorRuntime.awrap(post.save());

            case 23:
              return _context6.abrupt("return", result);

            case 26:
              throw new AuthenticationError("Action not allowed");

            case 27:
              _context6.next = 30;
              break;

            case 29:
              throw new UserInputError("Post not found");

            case 30:
              _context6.next = 33;
              break;

            case 32:
              throw new UserInputError("Answer not found");

            case 33:
            case "end":
              return _context6.stop();
          }
        }
      });
    }
  }
};