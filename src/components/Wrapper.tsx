import React from "react";
import { Flex } from "@chakra-ui/core";

export type WrapperVariants = "small" | "regular";

interface Props {
  variants?: WrapperVariants;
}

export const Wrapper: React.FC<Props> = ({ children, variants }) => {
  return (
    <Flex
      maxW={variants === "regular" ? "800px" : "400px"}
      w="100%"
      mt={10}
      mx="auto"
      flex={1}
    >
      {children}
    </Flex>
  );
};
