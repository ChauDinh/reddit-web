import { Button } from "@chakra-ui/react";
import React from "react";
import { Editor, Transforms } from "slate";
import { useSlate } from "slate-react";
import {
  AiOutlineLineHeight,
  AiOutlineOrderedList,
  AiOutlineUnorderedList,
} from "react-icons/ai";

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const isBlockActive = (editor: any, format: any) => {
  const [match]: any = Editor.nodes(editor, {
    match: (n) => n.type === format,
  });

  return !!match;
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

export const BlockButton = ({ format }: any) => {
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
          colorScheme="gray"
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
          colorScheme="gray"
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
          colorScheme="gray"
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
