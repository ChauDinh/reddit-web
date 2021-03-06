import { Box } from "@chakra-ui/react";
import React from "react";

interface Props {
  str: string;
}

export const RenderText: React.FC<Props> = (props) => {
  return (
    <Box
      wordBreak="break-word"
      dangerouslySetInnerHTML={{ __html: props.str }}
    ></Box>
  );
};
