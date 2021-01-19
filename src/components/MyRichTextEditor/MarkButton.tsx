import React from "react";
import { Button } from "@chakra-ui/core";
import { useSlate } from "slate-react";
import { Editor } from "slate";
import {
  AiOutlineBold,
  AiOutlineCode,
  AiOutlineItalic,
  AiOutlineUnderline,
} from "react-icons/ai";

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

export const MarkButton = ({ format }: any) => {
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
