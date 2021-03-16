import { Box } from "@chakra-ui/react";
import React from "react";
import { createWithApollo } from "../utils/withApollo";

interface Props {}

const About: React.FC<Props> = () => {
  return <Box>This is about page</Box>;
};

export default createWithApollo({ ssr: false })(About);
