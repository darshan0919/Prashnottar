"use strict";
exports.__esModule = true;
var react_1 = require("react");
var core_1 = require("@material-ui/core");
var MoreVert_1 = require("@material-ui/icons/MoreVert");
var ITEM_HEIGHT = 48;
function MoreMenu(_a) {
    var actions = _a.actions;
    //TODO
    var _b = react_1.useState(null), anchorEl = _b[0], setAnchorEl = _b[1];
    var options = react_1.useState(actions.filter(function (option) { return option.show; }))[0];
    var open = Boolean(anchorEl);
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    return options.length ? (react_1["default"].createElement("div", null,
        react_1["default"].createElement(core_1.IconButton, { "aria-label": "more", "aria-controls": "long-menu", "aria-haspopup": "true", onClick: handleClick },
            react_1["default"].createElement(MoreVert_1["default"], null)),
        react_1["default"].createElement(core_1.Menu, { id: "long-menu", anchorEl: anchorEl, keepMounted: true, open: open, onClose: handleClose, PaperProps: {
                style: {
                    maxHeight: ITEM_HEIGHT * 4.5,
                    width: "20ch"
                }
            } }, options.map(function (option) { return (react_1["default"].createElement(core_1.MenuItem, { key: option.name, onClick: function () {
                handleClose();
                option.func();
            } }, option.name)); })))) : (react_1["default"].createElement(react_1["default"].Fragment, null));
}
exports["default"] = MoreMenu;
