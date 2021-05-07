"use strict";

var _require = require("apollo-server"),
    AuthenticationError = _require.AuthenticationError,
    UserInputError = _require.UserInputError;

var checkAuth = require("../../util/check-auth");

var _require2 = require("../../models"),
    Comment = _require2.Comment,
    Reply = _require2.Reply;

var _require3 = require("./votes"),
    deleteVote = _require3.Mutation.deleteVote;

var _require4 = require("../../util"),
    asyncFindIndex = _require4.asyncFindIndex;

module.exports = {
  Query: {
    getReply: function getReply(_, _ref) {
      var replyId, reply, rereplys;
      return regeneratorRuntime.async(function getReply$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              replyId = _ref.replyId;
              _context2.prev = 1;
              _context2.next = 4;
              return regeneratorRuntime.awrap(Reply.findById(replyId));

            case 4:
              reply = _context2.sent;

              if (!reply) {
                _context2.next = 16;
                break;
              }

              _context2.next = 8;
              return regeneratorRuntime.awrap(Promise.all(reply.rereplys.map(function _callee(id) {
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
              rereplys = _context2.sent;
              rereplys = rereplys.sort(function (b, a) {
                return a.upvotes.length - a.downvotes.length - (b.upvotes.length - b.downvotes.length);
              });
              reply.rereplys = rereplys.map(function (_ref2) {
                var id = _ref2.id;
                return id;
              });
              _context2.next = 13;
              return regeneratorRuntime.awrap(reply.save());

            case 13:
              return _context2.abrupt("return", reply);

            case 16:
              throw new Error("Reply not found");

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
    createReply: function createReply(_, _ref3, context) {
      var commentId, body, _checkAuth, username, id, comment, newReply, reply;

      return regeneratorRuntime.async(function createReply$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              commentId = _ref3.commentId, body = _ref3.body;
              console.log("Creating new Reply!");
              _checkAuth = checkAuth(context), username = _checkAuth.username, id = _checkAuth.id;

              if (!(body.trim() === "")) {
                _context3.next = 5;
                break;
              }

              throw new UserInputError("Empty Reply", {
                errors: {
                  body: "Reply body must not empty"
                }
              });

            case 5:
              _context3.next = 7;
              return regeneratorRuntime.awrap(Comment.findById(commentId));

            case 7:
              comment = _context3.sent;

              if (!comment) {
                _context3.next = 21;
                break;
              }

              newReply = new Reply({
                body: body,
                user: id,
                comment: commentId,
                createdAt: new Date().toISOString()
              });
              _context3.next = 12;
              return regeneratorRuntime.awrap(newReply.save());

            case 12:
              reply = _context3.sent;
              reply.save();
              comment.replys.unshift(reply.id);
              _context3.next = 17;
              return regeneratorRuntime.awrap(comment.save());

            case 17:
              console.log(comment.replys);
              return _context3.abrupt("return", reply);

            case 21:
              throw new UserInputError("Comment not found");

            case 22:
            case "end":
              return _context3.stop();
          }
        }
      });
    },
    createRereply: function createRereply(_, _ref4, context) {
      var replyId, body, _checkAuth2, username, id, reply, newReply, rereply;

      return regeneratorRuntime.async(function createRereply$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              replyId = _ref4.replyId, body = _ref4.body;
              //console.log("Creating new Reply!");
              _checkAuth2 = checkAuth(context), username = _checkAuth2.username, id = _checkAuth2.id;

              if (!(body.trim() === "")) {
                _context4.next = 4;
                break;
              }

              throw new UserInputError("Empty Reply", {
                errors: {
                  body: "Reply body must not empty"
                }
              });

            case 4:
              _context4.next = 6;
              return regeneratorRuntime.awrap(Reply.findById(replyId));

            case 6:
              reply = _context4.sent;

              if (!reply) {
                _context4.next = 18;
                break;
              }

              newReply = new Reply({
                body: body,
                user: id,
                reply: replyId,
                createdAt: new Date().toISOString()
              });
              _context4.next = 11;
              return regeneratorRuntime.awrap(newReply.save());

            case 11:
              rereply = _context4.sent;
              reply.rereplys.unshift(rereply.id);
              _context4.next = 15;
              return regeneratorRuntime.awrap(reply.save());

            case 15:
              return _context4.abrupt("return", rereply);

            case 18:
              throw new UserInputError("Reply not found");

            case 19:
            case "end":
              return _context4.stop();
          }
        }
      });
    },
    editReply: function editReply(_, _ref5, context) {
      var replyId, body, _checkAuth3, id, reply;

      return regeneratorRuntime.async(function editReply$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              replyId = _ref5.replyId, body = _ref5.body;
              //console.log("Creating new Reply!");
              _checkAuth3 = checkAuth(context), id = _checkAuth3.id;

              if (!(body.trim() === "")) {
                _context5.next = 4;
                break;
              }

              throw new UserInputError("Empty Reply", {
                errors: {
                  body: "Reply body must not empty"
                }
              });

            case 4:
              _context5.next = 6;
              return regeneratorRuntime.awrap(Reply.findById(replyId));

            case 6:
              reply = _context5.sent;

              if (!reply) {
                _context5.next = 19;
                break;
              }

              if (!(reply.user == id)) {
                _context5.next = 16;
                break;
              }

              reply.body = body;
              reply.createdAt = new Date().toISOString();
              _context5.next = 13;
              return regeneratorRuntime.awrap(reply.save());

            case 13:
              return _context5.abrupt("return", reply);

            case 16:
              throw new AuthenticationError("Action not allowed!");

            case 17:
              _context5.next = 20;
              break;

            case 19:
              throw new UserInputError("Reply not found");

            case 20:
            case "end":
              return _context5.stop();
          }
        }
      });
    },
    deleteReply: function (_deleteReply) {
      function deleteReply(_x, _x2, _x3) {
        return _deleteReply.apply(this, arguments);
      }

      deleteReply.toString = function () {
        return _deleteReply.toString();
      };

      return deleteReply;
    }(function _callee2(_, _ref6, context) {
      var replyId, _checkAuth4, id, reply, comment, replyIndex, parentReply, _replyIndex;

      return regeneratorRuntime.async(function _callee2$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              replyId = _ref6.replyId;
              _checkAuth4 = checkAuth(context), id = _checkAuth4.id;
              _context6.next = 4;
              return regeneratorRuntime.awrap(Reply.findById(replyId));

            case 4:
              reply = _context6.sent;

              if (!reply) {
                _context6.next = 53;
                break;
              }

              if (!reply.comment) {
                _context6.next = 32;
                break;
              }

              _context6.next = 9;
              return regeneratorRuntime.awrap(Comment.findById(reply.comment));

            case 9:
              comment = _context6.sent;

              if (!comment) {
                _context6.next = 29;
                break;
              }

              _context6.next = 13;
              return regeneratorRuntime.awrap(asyncFindIndex(comment.replys, function (reply) {
                return reply === replyId;
              }));

            case 13:
              replyIndex = _context6.sent;

              if (!(reply.user == id || comment.user == id)) {
                _context6.next = 26;
                break;
              }

              reply.upvotes.forEach(function (upvoteId) {
                deleteVote({
                  upvoteId: upvoteId
                });
              });
              reply.downvotes.forEach(function (downvoteId) {
                deleteVote({
                  downvoteId: downvoteId
                });
              });
              reply.rereplys.forEach(function (replyId) {
                deleteReply({
                  replyId: replyId
                });
              });
              _context6.next = 20;
              return regeneratorRuntime.awrap(reply["delete"]());

            case 20:
              //console.log(replyIndex);
              comment.replys.splice(replyIndex, 1);
              _context6.next = 23;
              return regeneratorRuntime.awrap(comment.save());

            case 23:
              return _context6.abrupt("return", {
                id: replyId
              });

            case 26:
              throw new AuthenticationError("Action not allowed");

            case 27:
              _context6.next = 30;
              break;

            case 29:
              throw new UserInputError("Comment not found");

            case 30:
              _context6.next = 51;
              break;

            case 32:
              _context6.next = 34;
              return regeneratorRuntime.awrap(Reply.findById(reply.reply));

            case 34:
              parentReply = _context6.sent;

              if (!parentReply) {
                _context6.next = 50;
                break;
              }

              _context6.next = 38;
              return regeneratorRuntime.awrap(asyncFindIndex(parentReply.rereplys, function (reply) {
                return reply === replyId;
              }));

            case 38:
              _replyIndex = _context6.sent;
              reply.upvotes.forEach(function (upvoteId) {
                deleteVote({
                  upvoteId: upvoteId
                });
              });
              reply.downvotes.forEach(function (downvoteId) {
                deleteVote({
                  downvoteId: downvoteId
                });
              });
              reply.rereplys.forEach(function (replyId) {
                deleteReply({
                  replyId: replyId
                });
              });
              _context6.next = 44;
              return regeneratorRuntime.awrap(reply["delete"]());

            case 44:
              parentReply.rereplys.splice(_replyIndex, 1);
              _context6.next = 47;
              return regeneratorRuntime.awrap(parentReply.save());

            case 47:
              return _context6.abrupt("return", {
                id: replyId
              });

            case 50:
              throw new UserInputError("Comment not found");

            case 51:
              _context6.next = 54;
              break;

            case 53:
              throw new UserInputError("Reply not found");

            case 54:
            case "end":
              return _context6.stop();
          }
        }
      });
    })
  }
};