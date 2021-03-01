import { Box, Button } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../../components/Layout";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import { useGetPostsFromPubUrl } from "../../utils/useGetPostsFromPubUrl";

import {
  useMembersQuery,
  useCreateMemberMutation,
  useMeQuery,
} from "../../generated/graphql";
import { createWithApollo } from "../../utils/withApollo";
import { useGetIntegerId } from "../../utils/useGetIntegerId";
import { useApolloClient } from "@apollo/client";

interface Props {}

const Publication: React.FC<Props> = () => {
  const paramId = useGetIntegerId();
  const apolloClient = useApolloClient();
  const { data, loading, error } = useGetPostsFromPubUrl();
  const { data: membersData } = useMembersQuery({
    variables: {
      publicationId: paramId,
    },
  });
  const [createMember] = useCreateMemberMutation();
  const { data: meData, loading: meLoading } = useMeQuery();

  if (loading)
    return (
      <Layout direction="column" variant="regular">
        loading...
      </Layout>
    );
  if (error) return null;

  console.log(data?.postsByPublicationId?.posts);

  if (!membersData) return null;

  const members = membersData.members.map((member) => member.userId);
  return (
    <Layout direction="column" variant="regular">
      <Wrapper variants="regular">
        <Button
          isLoading={meLoading}
          colorScheme={members.includes(meData!.me!.id) ? "green" : "gray"}
          onClick={async () => {
            await createMember({
              variables: {
                publicationId: paramId,
              },
            });
            await apolloClient.resetStore();
          }}
        >
          {members.includes(meData!.me!.id) ? "Joined" : "Join"}
        </Button>
        <Box>This is publication page</Box>
      </Wrapper>
    </Layout>
  );
};

export default createWithApollo({ ssr: true })(Publication);
