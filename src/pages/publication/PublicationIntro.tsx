import { useApolloClient } from "@apollo/client";
import { Button, Flex, Text } from "@chakra-ui/react";
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
    <Flex direction="column" w="100%" mt="30px">
      <Text>
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
