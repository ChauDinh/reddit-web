import React from "react";
import { Flex } from "@chakra-ui/core";

import wrapperStyles from "./Wrapper.module.css";

export type WrapperVariants = "small" | "regular";

interface Props {
  variants?: WrapperVariants;
  background?: string;
  borderRadius?: string;
  boxShadow?: string;
}

export const Wrapper: React.FC<Props> = ({
  children,
  variants,
  background,
  borderRadius,
  boxShadow,
}) => {
  return (
    <Flex
      maxW={variants === "regular" ? "800px" : "400px"}
      className={wrapperStyles.wrapper__container}
      backgroundColor={background}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
    >
      {children}
    </Flex>
  );
};
