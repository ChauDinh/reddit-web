import { Flex, Button, Image, Text } from "@chakra-ui/react";
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
        <Text fontSize="36px" fontWeight="300">
          Page not found!
        </Text>
        <Image
          size="100%"
          src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1616595643/pixeltrue-error-1_q4ih3n.png"
        />
        <Button
          leftIcon={<BiArrowBack />}
          onClick={() => window.history.back()}
          fontSize="sm"
          variant="outline"
          colorScheme="blackAlpha"
          borderColor="blackAlpha.900"
          color="blackAlpha.900"
        >
          Go back
        </Button>
      </Flex>
    </div>
  );
};
