import React from "react";
import { Box } from "@chakra-ui/core";

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
    <Box
      maxW={variants === "regular" ? "1000px" : "400px"}
      className={wrapperStyles.wrapper__container}
      backgroundColor={background}
      borderRadius={borderRadius}
      boxShadow={boxShadow}
    >
      {children}
    </Box>
  );
};
