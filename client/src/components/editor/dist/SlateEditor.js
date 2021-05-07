"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var react_1 = require("react");
var is_hotkey_1 = require("is-hotkey");
//import imageExtensions from "image-extensions";
//import isUrl from "is-url";
var slate_react_1 = require("slate-react");
var slate_1 = require("slate");
var slate_history_1 = require("slate-history");
var comps_1 = require("./comps");
var css_1 = require("@emotion/css");
require("./SlateEditor.css");
var HOTKEYS = {
    "mod+b": "bold",
    "mod+i": "italic",
    "mod+u": "underline",
    "mod+`": "code"
};
var LIST_TYPES = ["numbered-list", "bulleted-list"];
var SlateEditor = function (props) {
    //console.log("value", props.value);
    var renderElement = react_1.useCallback(function (props) { return react_1["default"].createElement(Element, __assign({}, props)); }, []);
    var renderLeaf = react_1.useCallback(function (props) { return react_1["default"].createElement(Leaf, __assign({}, props)); }, []);
    var editor = react_1.useMemo(function () { return withImages(slate_history_1.withHistory(slate_react_1.withReact(slate_1.createEditor()))); }, []);
    return props ? (react_1["default"].createElement("div", { className: props.readOnly ? "" : "slate" },
        react_1["default"].createElement(slate_react_1.Slate, { editor: editor, value: props.value ? props.value : initialValue, onChange: function (value) {
                if (!props.readOnly) {
                    props.onChange(value);
                }
            } },
            props.readOnly ? (react_1["default"].createElement(react_1["default"].Fragment, null)) : (react_1["default"].createElement(comps_1.Toolbar, null,
                react_1["default"].createElement(MarkButton, { format: "bold", icon: "format_bold" }),
                react_1["default"].createElement(MarkButton, { format: "italic", icon: "format_italic" }),
                react_1["default"].createElement(MarkButton, { format: "underline", icon: "format_underlined" }),
                react_1["default"].createElement(MarkButton, { format: "code", icon: "code" }),
                react_1["default"].createElement(BlockButton, { format: "heading-one", icon: "looks_one" }),
                react_1["default"].createElement(BlockButton, { format: "heading-two", icon: "looks_two" }),
                react_1["default"].createElement(BlockButton, { format: "heading-three", icon: "looks_3" }),
                react_1["default"].createElement(BlockButton, { format: "block-quote", icon: "format_quote" }),
                react_1["default"].createElement(BlockButton, { format: "numbered-list", icon: "format_list_numbered" }),
                react_1["default"].createElement(BlockButton, { format: "bulleted-list", icon: "format_list_bulleted" }),
                react_1["default"].createElement(InsertImageButton, null))),
            props.readOnly ? (react_1["default"].createElement(slate_react_1.Editable, { readOnly: true, renderElement: renderElement, renderLeaf: renderLeaf })) : (react_1["default"].createElement(slate_react_1.Editable, { className: "slate__editable", renderElement: renderElement, renderLeaf: renderLeaf, placeholder: props.placeholder ? props.placeholder : "Type here…", spellCheck: true, autoFocus: true, 
                //TODO
                onKeyDown: function (event) {
                    for (var hotkey in HOTKEYS) {
                        if (is_hotkey_1["default"](hotkey, event)) {
                            event.preventDefault();
                            var mark = HOTKEYS[hotkey];
                            toggleMark(editor, mark);
                        }
                    }
                } }))))) : (react_1["default"].createElement(react_1["default"].Fragment, null));
};
var toggleBlock = function (editor, format) {
    var isActive = isBlockActive(editor, format);
    var isList = LIST_TYPES.includes(format);
    slate_1.Transforms.unwrapNodes(editor, {
        match: function (n) {
            return LIST_TYPES.includes(!slate_1.Editor.isEditor(n) && slate_1.Element.isElement(n) && n.type);
        },
        split: true
    });
    var newProperties = {
        type: isActive ? "paragraph" : isList ? "list-item" : format
    };
    slate_1.Transforms.setNodes(editor, newProperties);
    if (!isActive && isList) {
        var block = { type: format, children: [] };
        slate_1.Transforms.wrapNodes(editor, block);
    }
};
var toggleMark = function (editor, format) {
    var isActive = isMarkActive(editor, format);
    if (isActive) {
        slate_1.Editor.removeMark(editor, format);
    }
    else {
        slate_1.Editor.addMark(editor, format, true);
    }
};
var isBlockActive = function (editor, format) {
    var match = slate_1.Editor.nodes(editor, {
        match: function (n) {
            return !slate_1.Editor.isEditor(n) &&
                slate_1.Element.isElement(n) &&
                n.type === format;
        }
    })[0];
    return !!match;
};
var isMarkActive = function (editor, format) {
    var marks = slate_1.Editor.marks(editor);
    return marks ? marks[format] === true : false;
};
var Element = function (props) {
    var attributes = props.attributes, children = props.children, element = props.element;
    switch (element.type) {
        case "block-quote":
            return react_1["default"].createElement("blockquote", __assign({}, attributes), children);
        case "bulleted-list":
            return react_1["default"].createElement("ul", __assign({}, attributes), children);
        case "heading-one":
            return react_1["default"].createElement("h1", __assign({}, attributes), children);
        case "heading-two":
            return react_1["default"].createElement("h2", __assign({}, attributes), children);
        case "heading-three":
            return react_1["default"].createElement("h3", __assign({}, attributes), children);
        case "list-item":
            return react_1["default"].createElement("li", __assign({}, attributes), children);
        case "numbered-list":
            return react_1["default"].createElement("ol", __assign({}, attributes), children);
        case "image":
            return react_1["default"].createElement(Image, __assign({}, props));
        default:
            return react_1["default"].createElement("p", __assign({}, attributes), children);
    }
};
var Leaf = function (_a) {
    var attributes = _a.attributes, children = _a.children, leaf = _a.leaf;
    if (leaf.bold) {
        children = react_1["default"].createElement("strong", null, children);
    }
    if (leaf.code) {
        children = react_1["default"].createElement("code", null, children);
    }
    if (leaf.italic) {
        children = react_1["default"].createElement("em", null, children);
    }
    if (leaf.underline) {
        children = react_1["default"].createElement("u", null, children);
    }
    return react_1["default"].createElement("span", __assign({}, attributes), children);
};
var BlockButton = function (_a) {
    var format = _a.format, icon = _a.icon;
    var editor = slate_react_1.useSlate();
    return (react_1["default"].createElement(comps_1.Button, { active: isBlockActive(editor, format), onMouseDown: function (event) {
            event.preventDefault();
            toggleBlock(editor, format);
        } },
        react_1["default"].createElement(comps_1.Icon, null, icon)));
};
var MarkButton = function (_a) {
    var format = _a.format, icon = _a.icon;
    var editor = slate_react_1.useSlate();
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(comps_1.Button, { active: isMarkActive(editor, format), onMouseDown: function (event) {
                event.preventDefault();
                toggleMark(editor, format);
            } },
            react_1["default"].createElement(comps_1.Icon, null, icon))));
};
var initialValue = [
    {
        type: "paragraph",
        children: [{ text: "This is editable " }]
    },
];
var withImages = function (editor) {
    var insertData = editor.insertData, isVoid = editor.isVoid;
    editor.isVoid = function (element) {
        return element.type === "image" ? true : isVoid(element);
    };
    editor.insertData = function (data) {
        var text = data.getData("text/plain");
        var files = data.files;
        if (files && files.length > 0) {
            var _loop_1 = function (file) {
                var reader = new FileReader();
                var mime = file.type.split("/")[0];
                if (mime === "image") {
                    reader.addEventListener("load", function () {
                        var url = reader.result;
                        insertImage(editor, url);
                    });
                    reader.readAsDataURL(file);
                }
            };
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var file = files_1[_i];
                _loop_1(file);
            }
        } //TODO
        else
            insertImage(editor, text);
        /*if (isImageUrl(text)) {
            insertImage(editor, text);
        } else {
            insertData(data);
        }*/
    };
    return editor;
};
var insertImage = function (editor, url) {
    var text = { text: "" };
    var image = { type: "image", url: url, children: [text] };
    slate_1.Transforms.insertNodes(editor, image);
};
var Image = function (_a) {
    var attributes = _a.attributes, children = _a.children, element = _a.element;
    var selected = slate_react_1.useSelected();
    var focused = slate_react_1.useFocused();
    return (react_1["default"].createElement("div", __assign({}, attributes),
        react_1["default"].createElement("div", { contentEditable: false },
            react_1["default"].createElement("img", { alt: element.url, src: element.url, className: css_1.css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n                        display: block;\n                        position: relative;\n                        width: 100%;\n                        max-width: 570px;\n                        height: auto;\n                        margin: 10px 0px 10px 0px;\n                        box-shadow: ", ";\n                    "], ["\n                        display: block;\n                        position: relative;\n                        width: 100%;\n                        max-width: 570px;\n                        height: auto;\n                        margin: 10px 0px 10px 0px;\n                        box-shadow: ",
                    ";\n                    "])), selected && focused
                    ? "0 0 0 3px #B4D5FF"
                    : "none") })),
        children));
};
var InsertImageButton = function () {
    var editor = slate_react_1.useSlateStatic();
    return (react_1["default"].createElement(comps_1.Button, { onMouseDown: function (event) {
            event.preventDefault();
            var url = window.prompt("Enter the URL of the image:");
            /*if (url && !isImageUrl(url)) {
                alert("URL is not an image");
                return;
            }*/
            insertImage(editor, url);
        } },
        react_1["default"].createElement(comps_1.Icon, null, "image")));
};
/*const isImageUrl = (url) => {
    if (!url) return false;
    if (!isUrl(url)) return false;
    const ext = new URL(url).pathname.split(".").pop();
    return imageExtensions.includes(ext);
};*/
exports["default"] = SlateEditor;
var templateObject_1;
