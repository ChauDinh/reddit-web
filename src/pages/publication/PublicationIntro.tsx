import { useApolloClient } from "@apollo/client";
import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import React from "react";
import { useCreateMemberMutation } from "../../generated/graphql";

interface Props {
  publicationId: number;
}

createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
});

export const PublicationIntro: React.FC<Props> = ({ publicationId }) => {
  const [createMember] = useCreateMemberMutation();
  const apolloClient = useApolloClient();

  return (
    <Flex
      direction="column"
      w="100%"
      h="calc(100vh - 265px)"
      justifyContent="center"
      alignItems="center"
    >
      <Image
        w="256px"
        src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1616664361/crayon-2088_vvv0fe.png"
        mb="20px"
      />
      <Text fontSize="28px" fontWeight="300" mb="10px" textAlign="center">
        This is a private publication. Please subscribe to see the content
      </Text>
      <Button
        mb="10px"
        onClick={async () => {
          await createMember({
            variables: {
              publicationId,
            },
          });
          await apolloClient.resetStore();
        }}
      >
        Subscribe
      </Button>
    </Flex>
  );
};
