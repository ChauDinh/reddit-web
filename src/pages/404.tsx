import React from "react";
import { Flex, Image } from "@chakra-ui/core";

interface Props {}

const ErrorPage: React.FC<Props> = () => {
  return (
    <Flex alignItems="center" justifyContent="center" w="100vw" h="100vh">
      <Image
        size="100%"
        src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1604317187/undraw_not_found_60pq_abocoa.png"
      />
    </Flex>
  );
};

export default ErrorPage;
