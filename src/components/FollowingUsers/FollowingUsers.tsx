import { Heading, Stack, Text } from "@chakra-ui/core";
import React from "react";
import { useSubscribedQuery } from "../../generated/graphql";
import { FollowingUser } from "./FollowingUser";

interface Props {
  id: number;
}

export const FollowingUsers: React.FC<Props> = ({ id }) => {
  const { data, loading } = useSubscribedQuery({
    variables: {
      subscriberId: id,
    },
  });

  if (loading) return <Text>Loading...</Text>;

  if (!data?.subscribed) return <Text>Something went wrong!</Text>;

  return (
    <Stack spacing={3}>
      <Heading size="md">Following</Heading>
      {data.subscribed.map((id) => (
        <FollowingUser id={id} />
      ))}
    </Stack>
  );
};
