import React from "react";

import { WrapperVariants } from "./Wrapper/Wrapper";
import { NavBar } from "./NavBar/NavBar";
import { Box, Flex } from "@chakra-ui/core";
import { Footer } from "./Footer/Footer";

interface Props {
  variant?: WrapperVariants;
  direction?: "column" | "row";
}

export const Layout: React.FC<Props> = ({ children, direction }) => {
  return (
    <Flex flexDirection={direction}>
      <NavBar />
      <Box style={{
        minHeight: "calc(100vh - 265px)"
      }}>
        {/* <Wrapper variants={variant}>{children}</Wrapper> */}
        {children}
      </Box>
      <Footer />
    </Flex>
  );
};
