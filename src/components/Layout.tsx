import React from "react";

import { Wrapper, WrapperVariants } from "./Wrapper";
import { NavBar } from "./NavBar";

interface Props {
  variant?: WrapperVariants;
}

export const Layout: React.FC<Props> = ({ variant, children }) => {
  return (
    <>
      <NavBar />
      <Wrapper variants={variant}>{children}</Wrapper>
    </>
  );
};
