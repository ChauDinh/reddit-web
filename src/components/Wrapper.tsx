import React from "react";
import { Box } from "@chakra-ui/core";

export type WrapperVariants = "small" | "regular";

interface Props {
  variants?: WrapperVariants;
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
