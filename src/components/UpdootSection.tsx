import React, { useState } from "react";
import { Flex, IconButton, Text } from "@chakra-ui/core";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface Props {
  post: PostSnippetFragment;
}

export const UpdootSection: React.FC<Props> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();
  return (
    <Flex alignItems="center" flexDirection="column" mr={4}>
      <IconButton
        aria-label="upvote"
        icon="chevron-up"
        size="xs"
        variantColor={post.voteStatus === 1 ? "green" : undefined}
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState("updoot-loading");
          await vote({ postId: post.id, value: 1 });
          setLoadingState("not-loading");
        }}
        isLoading={loadingState === "updoot-loading"}
      ></IconButton>
      <Text my={1}>{post.points}</Text>
      <IconButton
        aria-label="down-vote"
        icon="chevron-down"
        size="xs"
        variantColor={post.voteStatus === -1 ? "red" : undefined}
        onClick={async () => {
          if (post.voteStatus === -1) {
            return;
          }
          setLoadingState("downdoot-loading");
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState("not-loading");
        }}
        isLoading={loadingState === "downdoot-loading"}
      ></IconButton>
    </Flex>
  );
};