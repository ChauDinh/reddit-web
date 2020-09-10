import React from "react";

import { Wrapper, WrapperVariants } from "./Wrapper";
import { NavBar } from "./NavBar";
import { Flex } from "@chakra-ui/core";

interface Props {
  variant?: WrapperVariants;
  direction?: "column" | "row";
}

export const Layout: React.FC<Props> = ({ variant, children, direction }) => {
  return (
    <Flex background="#DAE0E6" flexDirection={direction}>
      <NavBar />
      <Wrapper variants={variant}>{children}</Wrapper>
    </Flex>
  );
};
