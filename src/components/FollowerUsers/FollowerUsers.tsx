import { Stack, Heading, Text } from "@chakra-ui/core";
import React from "react";
import { useSubscriberQuery } from "../../generated/graphql";
import { FollowingUser } from "../FollowingUsers/FollowingUser";

interface Props {
  id: number;
}

export const FollowerUsers: React.FC<Props> = ({ id }) => {
  const { data, loading } = useSubscriberQuery({
    variables: {
      subscribedId: id,
    },
  });

  if (loading) return <Text>Loading...</Text>;

  if (!data?.subscriber) return null;

  return (
    <Stack spacing={3}>
      <Heading size="md">Follower</Heading>
      {data.subscriber.map((id) => (
        <FollowingUser id={id} />
      ))}
    </Stack>
  );
};
