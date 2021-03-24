import { Button } from "@chakra-ui/react";
import React from "react";
import { useApolloClient } from "@apollo/client";
import {
  useCreateMemberMutation,
  useMembersQuery,
  useMeQuery,
} from "../../generated/graphql";

interface Props {
  publicationId: number;
}

export const SubscribeBtn: React.FC<Props> = ({ publicationId }) => {
  const apolloClient = useApolloClient();

  const { data, loading, error } = useMembersQuery({
    variables: {
      publicationId,
    },
  });

  const { data: meData, loading: meLoading, error: meError } = useMeQuery();

  const [createMember] = useCreateMemberMutation();

  if (!data || error || !data.members) return null;

  if (!meData || meError || !meData.me) return null;

  if (meLoading) return null;

  const members = data.members.map((member) => member.userId);

  return (
    <Button
      isLoading={loading}
      colorScheme={members.includes(meData.me.id) ? "green" : "gray"}
      onClick={async () => {
        await createMember({
          variables: {
            publicationId,
          },
        });
        await apolloClient.resetStore();
      }}
    >
      {members.includes(meData.me.id) ? "Subscribed" : "Subscribe"}
    </Button>
  );
};
