import React, { useCallback, useMemo } from "react";
import isHotkey from "is-hotkey";
//import imageExtensions from "image-extensions";
//import isUrl from "is-url";
import {
    Editable,
    withReact,
    useSlate,
    Slate,
    useSlateStatic,
    useSelected,
    useFocused,
    ReactEditor,
} from "slate-react";
import {
    Editor,
    Transforms,
    createEditor,
    Element as SlateElement,
    Descendant,
    BaseEditor,
    BaseElement,
} from "slate";
import { HistoryEditor, withHistory } from "slate-history";
import { Button, Icon, Toolbar } from "./comps";
import { css } from "@emotion/css";
import "./SlateEditor.css";

const HOTKEYS = {
    "mod+b": "bold",
    "mod+i": "italic",
    "mod+u": "underline",
    "mod+`": "code",
};

const LIST_TYPES = ["numbered-list", "bulleted-list"];

declare module "slate" {
    interface CustomTypes {
        Editor: BaseEditor & ReactEditor & HistoryEditor;
        Element: BaseElement & { type: string };
        //Element: CustomElement;
        //Text: CustomText;
    }
}

const SlateEditor = (props: {
    readOnly: boolean;
    value: Descendant[];
    placeholder: string;
    onChange: (a: Descendant[]) => void;
}) => {
    //console.log("value", props.value);
    const renderElement = useCallback((props) => <Element {...props} />, []);
    const renderLeaf = useCallback((props) => <Leaf {...props} />, []);
    const editor = useMemo(
        () => withImages(withHistory(withReact(createEditor()))),
        []
    );

    return props ? (
        <div className={props.readOnly ? "" : "slate"}>
            <Slate
                editor={editor}
                value={props.value ? props.value : initialValue}
                onChange={(value) => {
                    if (!props.readOnly) {
                        props.onChange(value);
                    }
                }}
            >
                {props.readOnly ? (
                    <></>
                ) : (
                    <Toolbar>
                        <MarkButton format="bold" icon="format_bold" />
                        <MarkButton format="italic" icon="format_italic" />
                        <MarkButton
                            format="underline"
                            icon="format_underlined"
                        />
                        <MarkButton format="code" icon="code" />
                        <BlockButton format="heading-one" icon="looks_one" />
                        <BlockButton format="heading-two" icon="looks_two" />
                        <BlockButton format="heading-three" icon="looks_3" />
                        <BlockButton format="block-quote" icon="format_quote" />
                        <BlockButton
                            format="numbered-list"
                            icon="format_list_numbered"
                        />
                        <BlockButton
                            format="bulleted-list"
                            icon="format_list_bulleted"
                        />
                        <InsertImageButton />
                    </Toolbar>
                )}
                {props.readOnly ? (
                    <Editable
                        readOnly
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                    />
                ) : (
                    <Editable
                        className="slate__editable"
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        placeholder={
                            props.placeholder ? props.placeholder : "Type here…"
                        }
                        spellCheck
                        autoFocus
                        //TODO
                        onKeyDown={(event: any) => {
                            for (const hotkey in HOTKEYS) {
                                if (isHotkey(hotkey, event)) {
                                    event.preventDefault();
                                    const mark = HOTKEYS[hotkey];
                                    toggleMark(editor, mark);
                                }
                            }
                        }}
                    />
                )}
            </Slate>
        </div>
    ) : (
        <></>
    );
};

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
        match: (n) =>
            LIST_TYPES.includes(
                !Editor.isEditor(n) && SlateElement.isElement(n) && n.type
            ),
        split: true,
    });
    const newProperties = {
        type: isActive ? "paragraph" : isList ? "list-item" : format,
    };
    Transforms.setNodes(editor, newProperties);

    if (!isActive && isList) {
        const block = { type: format, children: [] };
        Transforms.wrapNodes(editor, block);
    }
};

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: (n) =>
            !Editor.isEditor(n) &&
            SlateElement.isElement(n) &&
            n.type === format,
    });

    return !!match;
};

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

const Element = (props) => {
    const { attributes, children, element } = props;
    switch (element.type) {
        case "block-quote":
            return <blockquote {...attributes}>{children}</blockquote>;
        case "bulleted-list":
            return <ul {...attributes}>{children}</ul>;
        case "heading-one":
            return <h1 {...attributes}>{children}</h1>;
        case "heading-two":
            return <h2 {...attributes}>{children}</h2>;
        case "heading-three":
            return <h3 {...attributes}>{children}</h3>;
        case "list-item":
            return <li {...attributes}>{children}</li>;
        case "numbered-list":
            return <ol {...attributes}>{children}</ol>;
        case "image":
            return <Image {...props} />;
        default:
            return <p {...attributes}>{children}</p>;
    }
};

const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <code>{children}</code>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
        <Button
            active={isBlockActive(editor, format)}
            onMouseDown={(event) => {
                event.preventDefault();
                toggleBlock(editor, format);
            }}
        >
            {/*<Icon icon={icon} />*/}
            <Icon>{icon}</Icon>
        </Button>
    );
};

const MarkButton = ({ format, icon }) => {
    const editor = useSlate();
    return (
        <>
            <Button
                active={isMarkActive(editor, format)}
                onMouseDown={(event) => {
                    event.preventDefault();
                    toggleMark(editor, format);
                }}
            >
                {/*<Icon icon={icon} />*/}
                <Icon>{icon}</Icon>
            </Button>
        </>
    );
};

const initialValue = [
    {
        type: "paragraph",
        children: [{ text: "This is editable " }],
    },
];

const withImages = (editor) => {
    const { insertData, isVoid } = editor;

    editor.isVoid = (element) => {
        return element.type === "image" ? true : isVoid(element);
    };

    editor.insertData = (data) => {
        const text = data.getData("text/plain");
        const { files } = data;

        if (files && files.length > 0) {
            for (const file of files) {
                const reader = new FileReader();
                const [mime] = file.type.split("/");

                if (mime === "image") {
                    reader.addEventListener("load", () => {
                        const url = reader.result;
                        insertImage(editor, url);
                    });

                    reader.readAsDataURL(file);
                }
            }
        } //TODO
        else insertImage(editor, text);
        /*if (isImageUrl(text)) {
            insertImage(editor, text);
        } else {
            insertData(data);
        }*/
    };

    return editor;
};

const insertImage = (editor, url) => {
    const text = { text: "" };
    const image = { type: "image", url, children: [text] };
    Transforms.insertNodes(editor, image);
};

const Image = ({ attributes, children, element }) => {
    const selected = useSelected();
    const focused = useFocused();
    return (
        <div {...attributes}>
            <div contentEditable={false}>
                <img
                    alt={element.url}
                    src={element.url}
                    className={css`
                        display: block;
                        position: relative;
                        width: 100%;
                        max-width: 570px;
                        height: auto;
                        margin: 10px 0px 10px 0px;
                        box-shadow: ${selected && focused
                            ? "0 0 0 3px #B4D5FF"
                            : "none"};
                    `}
                />
            </div>
            {children}
        </div>
    );
};

const InsertImageButton = () => {
    const editor = useSlateStatic();
    return (
        <Button
            onMouseDown={(event) => {
                event.preventDefault();
                const url = window.prompt("Enter the URL of the image:");
                /*if (url && !isImageUrl(url)) {
                    alert("URL is not an image");
                    return;
                }*/
                insertImage(editor, url);
            }}
        >
            <Icon>image</Icon>
        </Button>
    );
};

/*const isImageUrl = (url) => {
    if (!url) return false;
    if (!isUrl(url)) return false;
    const ext = new URL(url).pathname.split(".").pop();
    return imageExtensions.includes(ext);
};*/

export default SlateEditor;
