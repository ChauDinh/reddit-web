import React from "react";

import { Wrapper, WrapperVariants } from "./Wrapper/Wrapper";
import { NavBar } from "./NavBar/NavBar";
import { Flex } from "@chakra-ui/core";

interface Props {
  variant?: WrapperVariants;
  direction?: "column" | "row";
}

export const Layout: React.FC<Props> = ({ variant, children, direction }) => {
  return (
    <Flex flexDirection={direction}>
      <NavBar />
      <Wrapper variants={variant}>{children}</Wrapper>
    </Flex>
  );
};
