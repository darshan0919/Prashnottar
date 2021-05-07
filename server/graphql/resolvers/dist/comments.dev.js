"use strict";

var _require = require("apollo-server"),
    AuthenticationError = _require.AuthenticationError,
    UserInputError = _require.UserInputError;

var checkAuth = require("../../util/check-auth");

var _require2 = require("../../models"),
    Answer = _require2.Answer,
    Comment = _require2.Comment,
    Reply = _require2.Reply;

var _require3 = require("./votes"),
    deleteVote = _require3.Mutation.deleteVote;

var _require4 = require("./replys"),
    deleteReply = _require4.Mutation.deleteReply;

var _require5 = require("../../util"),
    asyncFindIndex = _require5.asyncFindIndex;

module.exports = {
  Query: {
    getComment: function getComment(_, _ref) {
      var commentId, comment, replys;
      return regeneratorRuntime.async(function getComment$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              commentId = _ref.commentId;
              _context2.prev = 1;
              _context2.next = 4;
              return regeneratorRuntime.awrap(Comment.findById(commentId));

            case 4:
              comment = _context2.sent;

              if (!comment) {
                _context2.next = 16;
                break;
              }

              _context2.next = 8;
              return regeneratorRuntime.awrap(Promise.all(comment.replys.map(function _callee(id) {
                return regeneratorRuntime.async(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return regeneratorRuntime.awrap(Reply.findById(id));

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
              replys = _context2.sent;
              replys = replys.sort(function (b, a) {
                return a.upvotes.length - a.downvotes.length - (b.upvotes.length - b.downvotes.length);
              });
              comment.replys = replys.map(function (_ref2) {
                var id = _ref2.id;
                return id;
              });
              _context2.next = 13;
              return regeneratorRuntime.awrap(comment.save());

            case 13:
              return _context2.abrupt("return", comment);

            case 16:
              throw new Error("Comment not found");

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
    createComment: function createComment(_, _ref3, context) {
      var answerId, body, _checkAuth, username, id, answer, newComment, comment;

      return regeneratorRuntime.async(function createComment$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              answerId = _ref3.answerId, body = _ref3.body;
              //console.log("Creating new Comment!");
              _checkAuth = checkAuth(context), username = _checkAuth.username, id = _checkAuth.id;

              if (!(body.trim() === "")) {
                _context3.next = 4;
                break;
              }

              throw new UserInputError("Empty Comment", {
                errors: {
                  body: "Comment body must not empty"
                }
              });

            case 4:
              _context3.next = 6;
              return regeneratorRuntime.awrap(Answer.findById(answerId));

            case 6:
              answer = _context3.sent;

              if (!answer) {
                _context3.next = 19;
                break;
              }

              newComment = new Comment({
                body: body,
                user: id,
                answer: answerId,
                createdAt: new Date().toISOString()
              });
              _context3.next = 11;
              return regeneratorRuntime.awrap(newComment.save());

            case 11:
              comment = _context3.sent;
              answer.comments.unshift(comment.id);
              _context3.next = 15;
              return regeneratorRuntime.awrap(answer.save());

            case 15:
              console.log(answer.comments);
              return _context3.abrupt("return", comment);

            case 19:
              throw new UserInputError("Answer not found");

            case 20:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    editComment: function editComment(_, _ref4, context) {
      var commentId, body, _checkAuth2, id, comment;

      return regeneratorRuntime.async(function editComment$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              commentId = _ref4.commentId, body = _ref4.body;
              //console.log("Creating new Comment!");
              _checkAuth2 = checkAuth(context), id = _checkAuth2.id;

              if (!(body.trim() === "")) {
                _context4.next = 4;
                break;
              }

              throw new UserInputError("Empty Comment", {
                errors: {
                  body: "Comment body must not empty"
                }
              });

            case 4:
              _context4.next = 6;
              return regeneratorRuntime.awrap(Comment.findById(commentId));

            case 6:
              comment = _context4.sent;

              if (!comment) {
                _context4.next = 19;
                break;
              }

              if (!(comment.user == id)) {
                _context4.next = 16;
                break;
              }

              comment.body = body;
              comment.createdAt = new Date().toISOString();
              _context4.next = 13;
              return regeneratorRuntime.awrap(comment.save());

            case 13:
              return _context4.abrupt("return", comment);

            case 16:
              throw new AuthenticationError("Action not allowed!");

            case 17:
              _context4.next = 20;
              break;

            case 19:
              throw new UserInputError("Comment not found");

            case 20:
            case "end":
              return _context4.stop();
          }
        }
      });
    },
    deleteComment: function deleteComment(_, _ref5, context) {
      var commentId, _checkAuth3, id, comment, answer, commentIndex, result;

      return regeneratorRuntime.async(function deleteComment$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              commentId = _ref5.commentId;
              _checkAuth3 = checkAuth(context), id = _checkAuth3.id;
              _context5.next = 4;
              return regeneratorRuntime.awrap(Comment.findById(commentId));

            case 4:
              comment = _context5.sent;

              if (!comment) {
                _context5.next = 28;
                break;
              }

              _context5.next = 8;
              return regeneratorRuntime.awrap(Answer.findById(comment.answer));

            case 8:
              answer = _context5.sent;

              if (!answer) {
                _context5.next = 25;
                break;
              }

              _context5.next = 12;
              return regeneratorRuntime.awrap(asyncFindIndex(answer.comments, function (comment) {
                return comment === commentId;
              }));

            case 12:
              commentIndex = _context5.sent;
              comment.upvotes.forEach(function (upvoteId) {
                deleteVote({
                  upvoteId: upvoteId
                });
              });
              comment.downvotes.forEach(function (downvoteId) {
                deleteVote({
                  downvoteId: downvoteId
                });
              });
              comment.replys.forEach(function (replyId) {
                deleteReply({
                  replyId: replyId
                });
              });
              result = {
                id: comment.id
              };
              _context5.next = 19;
              return regeneratorRuntime.awrap(comment["delete"]());

            case 19:
              //console.log(commentIndex);
              answer.comments.splice(commentIndex, 1);
              _context5.next = 22;
              return regeneratorRuntime.awrap(answer.save());

            case 22:
              return _context5.abrupt("return", result);

            case 25:
              throw new UserInputError("Answer not found");

            case 26:
              _context5.next = 29;
              break;

            case 28:
              throw new UserInputError("Comment not found");

            case 29:
            case "end":
              return _context5.stop();
          }
        }
      });
    }
  }
};