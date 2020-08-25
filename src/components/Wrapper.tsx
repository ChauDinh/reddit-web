import React from "react";
import { Box } from "@chakra-ui/core";

interface Props {
  variants?: "small" | "regular";
}

export const Wrapper: React.FC<Props> = ({ children, variants }) => {
  return (
    <Box
      maxW={variants === "regular" ? "800px" : "400px"}
      w="100%"
      mt={10}
      mx="auto"
    >
      {children}
    </Box>
  );
};
