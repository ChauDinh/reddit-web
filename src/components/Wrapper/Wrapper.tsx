import React from "react";
import { Flex } from "@chakra-ui/core";

import wrapperStyles from "./Wrapper.module.css";

export type WrapperVariants = "small" | "regular";

interface Props {
  variants?: WrapperVariants;
}

export const Wrapper: React.FC<Props> = ({ children, variants }) => {
  return (
    <Flex
      maxW={variants === "regular" ? "800px" : "400px"}
      className={wrapperStyles.wrapper__container}
    >
      {children}
    </Flex>
  );
};
