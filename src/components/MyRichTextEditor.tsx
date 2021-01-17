import isHotkey from "is-hotkey";
import React from "react";
import { createEditor, Node, Editor, Transforms } from "slate";
import {
  Slate,
  withReact,
  Editable,
  useSlate,
  useSelected,
  useFocused,
  useEditor,
} from "slate-react";
import {
  AiOutlineLineHeight,
  AiOutlineBold,
  AiOutlineItalic,
  AiOutlineUnderline,
  AiOutlineCode,
  AiOutlineUnorderedList,
  AiOutlineOrderedList,
  AiOutlineFileImage,
} from "react-icons/ai";
import { useField } from "formik";
import imageExtensions from "image-extensions";
import isUrl from "is-url";

import { initialValue } from "../utils/slateInitialValue";
import { Button, Flex } from "@chakra-ui/core";
import { css } from "emotion";

interface Props {}

const HOTKEYS: { [char: string]: string } = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};
const LIST_TYPES = ["numbered-list", "bulleted-list"];

const withImages = (editor: any) => {
  const { insertData, isVoid } = editor;
  editor.isVoid = (element: any) => {
    return element.type === "image" ? true : isVoid(element);
  };
  editor.insertData = (data: any) => {
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
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

const insertImage = (editor: any, url: any) => {
  const text = { text: "" };
  const image = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
};

const Element = ({ attributes, children, element }: any) => {
  switch (element.type) {
    case "image": {
      const selected = useSelected();
      const focused = useFocused();
      return (
        <div {...attributes}>
          <div contentEditable={false}>
            <img
              src={element.url}
              className={css`
                display: block;
                max-width: 100%;
                max-height: 20em;
                box-shadow: ${selected && focused
                  ? "0 0 0 3px #B4D5FF"
                  : "none"};
              `}
            />
          </div>
          {children}
        </div>
      );
    }
    case "bulleted-list":
      return (
        <ul
          style={{
            marginLeft: "2em",
          }}
          {...attributes}
        >
          {children}
        </ul>
      );
    case "heading":
      return (
        <h1
          style={{
            fontSize: "20px",
            fontWeight: "700",
          }}
          {...attributes}
        >
          {children}
        </h1>
      );
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "numbered-list":
      return (
        <ol style={{ marginLeft: "2em" }} {...attributes}>
          {children}
        </ol>
      );
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Leaf = ({ attributes, children, leaf }: any) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = (
      <pre
        style={{
          whiteSpace: "pre-wrap",
        }}
      >
        <code style={{ fontFamily: "'Source Code Pro', monospace" }}>
          {children}
        </code>
      </pre>
    );
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};

const isBlockActive = (editor: any, format: any) => {
  const [match]: any = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });

  return !!match;
};

const isMarkActive = (editor: any, format: any) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

const toggleMark = (editor: any, format: any) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

const toggleBlock = (editor: any, format: any) => {
  const isActive = isBlockActive(editor, format);
  const isList = LIST_TYPES.includes(format);

  Transforms.unwrapNodes(editor, {
    match: (n) => LIST_TYPES.includes(n.type as string),
    split: true,
  });

  Transforms.setNodes(editor, {
    type: isActive ? "paragraph" : isList ? "list-item" : format,
  });

  if (!isActive && isList) {
    const block = { type: format, children: [] };
    Transforms.wrapNodes(editor, block);
  }
};

const isImageUrl = (url: any) => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split(".").pop();
  return imageExtensions.includes(ext);
};

const InsertImageButton = () => {
  const editor = useEditor();
  return (
    <Button
      onMouseDown={(event) => {
        event.preventDefault();
        const url = window.prompt("Enter the URL of the image");
        if (!url) return;
        insertImage(editor, url);
      }}
      variantColor="gray"
      size="sm"
      mr={2}
      p={0}
    >
      <AiOutlineFileImage color="#c2c9d1" />
    </Button>
  );
};

const BlockButton = ({ format }: any) => {
  const editor = useSlate();
  switch (format) {
    case "heading":
      return (
        <Button
          isActive={isBlockActive(editor, format)}
          onMouseDown={(event) => {
            event.preventDefault();
            toggleBlock(editor, format);
          }}
          variantColor="gray"
          size="sm"
          color="#000"
          mr={2}
          p={0}
        >
          <AiOutlineLineHeight
            size="18px"
            color={isBlockActive(editor, format) ? "#000" : "#c2c9d1"}
          />
        </Button>
      );
    case "numbered-list":
      return (
        <Button
          isActive={isBlockActive(editor, format)}
          onMouseDown={(event) => {
            event.preventDefault();
            toggleBlock(editor, format);
          }}
          variantColor="gray"
          size="sm"
          mr={2}
          p={0}
        >
          <AiOutlineOrderedList
            size="18px"
            color={isBlockActive(editor, format) ? "#000" : "#c2c9d1"}
          />
        </Button>
      );
    case "bulleted-list":
      return (
        <Button
          isActive={isBlockActive(editor, format)}
          onMouseDown={(event) => {
            event.preventDefault();
            toggleBlock(editor, format);
          }}
          variantColor="gray"
          size="sm"
          mr={2}
          p={0}
        >
          <AiOutlineUnorderedList
            size="18px"
            color={isBlockActive(editor, format) ? "#000" : "#c2c9d1"}
          />
        </Button>
      );
    default:
      return null;
  }
};

const MarkButton = ({ format }: any) => {
  const editor = useSlate();
  switch (format) {
    case "bold":
      return (
        <Button
          isActive={isMarkActive(editor, format)}
          onMouseDown={(event) => {
            event.preventDefault();
            toggleMark(editor, format);
          }}
          variantColor="gray"
          size="sm"
          mr={2}
          p={0}
        >
          <AiOutlineBold
            size="18px"
            color={isMarkActive(editor, format) ? "#000" : "#c2c9d1"}
          />
        </Button>
      );
    case "italic":
      return (
        <Button
          isActive={isMarkActive(editor, format)}
          onMouseDown={(event) => {
            event.preventDefault();
            toggleMark(editor, format);
          }}
          variantColor="gray"
          size="sm"
          mr={2}
          p={0}
        >
          <AiOutlineItalic
            size="18px"
            color={isMarkActive(editor, format) ? "#000" : "#c2c9d1"}
          />
        </Button>
      );
    case "underline":
      return (
        <Button
          isActive={isMarkActive(editor, format)}
          onMouseDown={(event) => {
            event.preventDefault();
            toggleMark(editor, format);
          }}
          variantColor="gray"
          size="sm"
          mr={2}
          p={0}
        >
          <AiOutlineUnderline
            size="18px"
            color={isMarkActive(editor, format) ? "#000" : "#c2c9d1"}
          />
        </Button>
      );
    case "code":
      return (
        <Button
          isActive={isMarkActive(editor, format)}
          onMouseDown={(event) => {
            event.preventDefault();
            toggleMark(editor, format);
          }}
          variantColor="gray"
          size="sm"
          mr={2}
          p={0}
        >
          <AiOutlineCode
            size="18px"
            color={isMarkActive(editor, format) ? "#000" : "#c2c9d1"}
          />
        </Button>
      );
    default:
      return null;
  }
};

export const MyRichTextEditor: React.FC<Props> = (props: any) => {
  const [field, , helpers] = useField<{}>(props);
  const { setValue } = helpers;

  const [slateValue, setSlateValue] = React.useState<Node[]>(
    props.value ? props.value : initialValue
  );
  const editor = React.useMemo(() => withImages(withReact(createEditor())), []);
  const renderElement = React.useCallback(
    (props) => <Element {...props} />,
    []
  );
  const renderLeaf = React.useCallback((props) => <Leaf {...props} />, []);

  console.log("slate value: ", slateValue);
  return (
    <Slate
      editor={editor}
      value={slateValue}
      onChange={(value: Node[]) => {
        setSlateValue(value);
        setValue(JSON.stringify(value));
      }}
    >
      <Flex flexDirection="column" width="100%">
        <Flex
          style={{
            width: "100%",
            backgroundColor: "#EDF2F7",
            borderRadius: "3px 3px 0 0",
            padding: "10px 15px",
          }}
        >
          <MarkButton format="bold" />
          <MarkButton format="italic" />
          <MarkButton format="underline" />
          <MarkButton format="code" />
          <BlockButton format="heading" />
          <BlockButton format="numbered-list" />
          <BlockButton format="bulleted-list" />
          <InsertImageButton />
        </Flex>
        <hr />
        <Editable
          id={field.name}
          style={{
            display: "block",
            width: "100%",
            height: "500px",
            backgroundColor: "#fff",
            borderRadius: "0px 0px 3px 3px",
            border: "1px solid #e2e8f0",
            borderTop: "none",
            padding: "15px 15px",
            scrollBehavior: "smooth",
            overflowY: "scroll",
          }}
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          placeholder="Tell a story..."
          spellCheck
          autoFocus
          onKeyDown={(event) => {
            for (let hotkey in HOTKEYS) {
              if (isHotkey(hotkey, event as any)) {
                event.preventDefault();
                const mark = HOTKEYS[hotkey];
                toggleMark(editor, mark);
              }
            }
          }}
        />
      </Flex>
    </Slate>
  );
};
