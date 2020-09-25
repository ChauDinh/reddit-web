import isHotkey from "is-hotkey";
import React from "react";
import { createEditor, Node, Editor, Transforms } from "slate";
import { Slate, withReact, Editable, useSlate } from "slate-react";
import {
  BiBold,
  BiCodeBlock,
  BiHeading,
  BiItalic,
  BiListOl,
  BiListUl,
  BiUnderline,
} from "react-icons/bi";
import { useField } from "formik";

import { initialValue } from "../utils/slateInitialValue";
import { Button, Flex } from "@chakra-ui/core";

interface Props {}

const HOTKEYS: { [char: string]: string } = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};
const LIST_TYPES = ["numbered-list", "bulleted-list"];

const Element = ({ attributes, children, element }: any) => {
  switch (element.type) {
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
        <h1 style={{ fontSize: "20px", fontWeight: "700" }} {...attributes}>
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
          backgroundColor: "#d9d9d9",
        }}
      >
        <code>{children}</code>
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
          size="sm"
          mr={2}
        >
          <BiHeading size="18px" />
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
          size="sm"
          mr={2}
        >
          <BiListOl size="18px" />
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
          size="sm"
          mr={2}
        >
          <BiListUl size="18px" />
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
          size="sm"
          mr={2}
        >
          <BiBold size="18px" />
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
          size="sm"
          mr={2}
        >
          <BiItalic size="18px" />
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
          size="sm"
          mr={2}
        >
          <BiUnderline size="18px" />
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
          size="sm"
          mr={2}
        >
          <BiCodeBlock size="18px" />
        </Button>
      );
    default:
      return null;
  }
};

export const MyRichTextEditor: React.FC<Props> = (props: any) => {
  const [field, meta, helpers] = useField<{}>(props);
  const { setValue } = helpers;

  const [slateValue, setSlateValue] = React.useState<Node[]>(
    props.value ? props.value : initialValue
  );
  const editor = React.useMemo(() => withReact(createEditor()), []);
  const renderElement = React.useCallback(
    (props) => <Element {...props} />,
    []
  );
  const renderLeaf = React.useCallback((props) => <Leaf {...props} />, []);

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
        </Flex>
        <hr />
        <Editable
          id={field.name}
          style={{
            display: "block",
            width: "100%",
            height: "360px",
            backgroundColor: "#fff",
            borderRadius: "0px 0px 3px 3px",
            boxShadow: "0 3px 10px rgba(202, 202, 202, 0.1)",
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
