import { Box, Stack, Text } from "@chakra-ui/core";
import React from "react";
import { useGetPostsByCreatorIdQuery } from "../../generated/graphql";
import { useGetIntegerId } from "../../utils/useGetIntegerId";
import { Error } from "../Error/Error";

interface Props {}

export const UserPosts: React.FC<Props> = () => {
  const { data, loading } = useGetPostsByCreatorIdQuery({
    variables: {
      creatorId: useGetIntegerId(),
      limit: 10,
    },
  });

  if (loading) {
    return <Text>...Loading</Text>;
  }

  if (!data?.postsByCreatorId) {
    return <Error />;
  }

  return (
    <Stack spacing={8}>
      {data.postsByCreatorId.posts.map((post) => (
        <Box key={post.id}>{post.title}</Box>
      ))}
    </Stack>
  );
};
