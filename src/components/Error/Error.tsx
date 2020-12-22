import { Flex, Button, Image } from "@chakra-ui/core";
import React from "react";
import { BiArrowBack } from "react-icons/bi";

interface Props {}

export const Error: React.FC<Props> = () => {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        w="600px"
      >
        <Image
          size="100%"
          src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1608352687/undraw_marilyn_v73y_ecoisd.png"
        />
        <Button
          leftIcon={BiArrowBack}
          onClick={() => window.history.back()}
          fontSize="sm"
        >
          Go back
        </Button>
      </Flex>
    </div>
  );
};
