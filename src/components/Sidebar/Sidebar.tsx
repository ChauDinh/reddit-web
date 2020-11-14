import { Flex } from "@chakra-ui/core";
import React from "react";

import SidebarStyles from "./Sidebar.module.css";

interface Props {
  isSticky: boolean;
}

export const Sidebar: React.FC<Props> = ({ isSticky, children }) => {
  return (
    <Flex
      className={SidebarStyles.container}
      position={isSticky ? "sticky" : "inherit"}
      direction="column"
    >
      {children}
    </Flex>
  );
};
