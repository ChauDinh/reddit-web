import { Box } from "@chakra-ui/react";
import React from "react";
import { createWithApollo } from "../utils/withApollo";

interface Props {}

const Team: React.FC<Props> = () => {
  return <Box>This is Team page</Box>;
};

export default createWithApollo({ ssr: false })(Team);
