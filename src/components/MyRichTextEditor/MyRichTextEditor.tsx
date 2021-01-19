import isHotkey from "is-hotkey";
import React from "react";
import {
  createEditor,
  Node,
  Editor,
  Transforms,
  Range,
  Element as SlateElement,
  Text,
} from "slate";
import {
  Slate,
  withReact,
  Editable,
  useSelected,
  useFocused,
  useEditor,
} from "slate-react";
import { AiOutlineFileImage, AiOutlineLink } from "react-icons/ai";
import { useField } from "formik";
import imageExtensions from "image-extensions";
import isUrl from "is-url";

import { initialValue } from "../../utils/slateInitialValue";
import { Button, Flex, Select } from "@chakra-ui/core";
import { css } from "emotion";
import { MarkButton } from "./MarkButton";
import { BlockButton } from "./BlockButton";
import Prism from "prismjs";

interface Props {}

const HOTKEYS: { [char: string]: string } = {
  "mod+b": "bold",
  "mod+i": "italic",
  "mod+u": "underline",
  "mod+`": "code",
};

const getLength = (token: string | any) => {
  if (typeof token === "string") {
    return token.length;
  } else if (typeof token.content === "string") {
    return token.content.length;
  } else {
    return token.content.reduce((l: any, t: any) => l + getLength(t), 0);
  }
};

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

const withLinks = (editor: Editor) => {
  const { insertData, insertText, isInline } = editor;

  editor.isInline = (element) => {
    return element.type === "link" ? true : isInline(element);
  };

  editor.insertText = (text) => {
    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      insertText(text);
    }
  };

  editor.insertData = (data: any) => {
    const text = data.getData("text/plain");

    if (text && isUrl(text)) {
      wrapLink(editor, text);
    } else {
      // @ts-expect-error
      insertData(data);
    }
  };

  return editor;
};

const insertImage = (editor: Editor, url: any) => {
  const text = { text: "" };
  const image = { type: "image", url, children: [text] };
  Transforms.insertNodes(editor, image);
};

const insertLink = (editor: Editor, url: any) => {
  if (editor.selection) {
    wrapLink(editor, url);
  }
};

const wrapLink = (editor: Editor, url: any) => {
  if (isLinkActive(editor)) {
    unwrapLink(editor);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);
  const link = {
    type: "link",
    url,
    children: isCollapsed ? [{ text: url }] : [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, link);
  } else {
    Transforms.wrapNodes(editor, link, { split: true });
    Transforms.collapse(editor, { edge: "end" });
  }
};

const unwrapLink = (editor: Editor) => {
  Transforms.unwrapNodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });
};

const isLinkActive = (editor: Editor) => {
  const [link]: any = Editor.nodes(editor, {
    match: (n) =>
      !Editor.isEditor(n) && SlateElement.isElement(n) && n.type === "link",
  });

  return !!link;
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

const Element = ({ attributes, children, element }: any) => {
  switch (element.type) {
    case "link":
      return (
        <a {...attributes} href={element.url} style={{ color: "blue" }}>
          {children}
        </a>
      );
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
      <span
        className={css`
          font-family: monospace;
          background: hsla(0, 0%, 100%, 0.5);
          ${leaf.comment &&
          css`
            color: slategray;
          `}
          ${(leaf.operator || leaf.url) &&
          css`
            color: #9a6e3a;
          `}
        ${leaf.keyword &&
          css`
            color: #07a;
          `}
        ${(leaf.variable || leaf.regex) &&
          css`
            color: #e90;
          `}
        ${(leaf.number ||
            leaf.boolean ||
            leaf.tag ||
            leaf.constant ||
            leaf.symbol ||
            leaf.attr ||
            leaf.selector) &&
          css`
            color: #905;
          `}
        ${leaf.punctuation &&
          css`
            color: #999;
          `}
        ${(leaf.string || leaf.char) &&
          css`
            color: #690;
          `}
        ${(leaf.function || leaf.class) &&
          css`
            color: #dd4a68;
          `}
        `}
      >
        {children}
      </span>
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

const InsertLinkButton = () => {
  const editor = useEditor();
  return (
    <Button
      onMouseDown={(e) => {
        e.preventDefault();
        const url = window.prompt("Enter the URL of the link:");
        if (!url) return;
        insertLink(editor, url);
      }}
      variantColor="gray"
      size="sm"
      mr={2}
      p={0}
    >
      <AiOutlineLink color="#c2c9d1" />
    </Button>
  );
};

export const MyRichTextEditor: React.FC<Props> = (props: any) => {
  const [field, , helpers] = useField<{}>(props);
  const { setValue } = helpers;

  const [slateValue, setSlateValue] = React.useState<Node[]>(
    props.value ? props.value : initialValue
  );

  // slate editor state for code highlighting
  const [language, setLanguage] = React.useState("html");

  // decorate function depends on programming language selected
  const decorate = React.useCallback(
    ([node, path]) => {
      const ranges: any = [];
      if (!Text.isText(node)) {
        return ranges;
      }

      const tokens = Prism.tokenize(node.text, Prism.languages[language]);
      let start = 0;

      for (const token of tokens) {
        const length = getLength(token);
        const end = start + length;

        if (typeof token !== "string") {
          ranges.push({
            [token.type]: true,
            anchor: { path, offset: start },
            focus: { path, offset: end },
          });
        }

        start = end;
      }
      return ranges;
    },
    [language]
  );

  const editor = React.useMemo(
    () => withImages(withLinks(withReact(createEditor()))),
    []
  );
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
            position: "relative",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div>
            <MarkButton format="bold" />
            <MarkButton format="italic" />
            <MarkButton format="underline" />
            <MarkButton format="code" />
            <BlockButton format="heading" />
            <BlockButton format="numbered-list" />
            <BlockButton format="bulleted-list" />
            <InsertImageButton />
            <InsertLinkButton />
          </div>

          <div>
            <Select
              value={language}
              onChange={(e) => {
                console.log(e.target.value);
                setLanguage(e.target.value);
              }}
              isDisabled={false}
              contentEditable={false}
              cursor="pointer"
            >
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="javascript">JavaScript</option>
            </Select>
          </div>
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
          decorate={decorate}
        />
      </Flex>
    </Slate>
  );
};
