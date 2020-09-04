import React from "react";
import { Flex, IconButton, Text } from "@chakra-ui/core";
import { PostsQuery } from "../generated/graphql";

interface Props {
  post: PostsQuery["posts"]["posts"][0];
}

export const UpdootSection: React.FC<Props> = ({ post }) => {
  return (
    <Flex alignItems="center" flexDirection="column" mr={4}>
      <IconButton
        aria-label="upvote"
        icon="chevron-up"
        size="xs"
        onClick={() => console.log("up vote")}
      ></IconButton>
      <Text my={1}>{post.points}</Text>
      <IconButton
        aria-label="down-vote"
        icon="chevron-down"
        size="xs"
        onClick={() => console.log("down vote")}
      ></IconButton>
    </Flex>
  );
};
