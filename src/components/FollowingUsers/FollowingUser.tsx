import React from "react";
import { Box, Text } from "@chakra-ui/core";
import { useGetUserByIdQuery } from "../../generated/graphql";

interface Props {
  id: number;
}

export const FollowingUser: React.FC<Props> = ({ id }) => {
  const { data, loading } = useGetUserByIdQuery({
    variables: {
      id: id,
    },
  });

  if (loading) return <Text>Loading...</Text>;

  if (!data?.getUserById) return null;

  return <Box>{data.getUserById.username}</Box>;
};
