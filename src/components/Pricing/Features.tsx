import React from "react";
import { Box, Heading } from "@chakra-ui/react";

interface Props {}

export const Features: React.FC<Props> = ({ children }) => {
  return (
    <Box textAlign="left" mt="40px">
      <Heading as="h5" size="md" fontWeight="800" mb="10px">
        Top features
      </Heading>
      {children}
    </Box>
  );
};
