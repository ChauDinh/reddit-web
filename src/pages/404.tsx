import React from "react";
import { Button, Flex, Image } from "@chakra-ui/core";
import { BiArrowBack } from "react-icons/bi";

interface Props {}

const ErrorPage: React.FC<Props> = () => {
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

export default ErrorPage;
