import React, { useState } from "react";
import { Flex, IconButton, Text } from "@chakra-ui/core";
import {
  PostSnippetFragment,
  SinglePostSnippetFragment,
  useVoteMutation,
} from "../../generated/graphql";

import updootSectionStyles from "./UpdootSection.module.css";

interface Props {
  post: PostSnippetFragment | SinglePostSnippetFragment;
}

export const UpdootSection: React.FC<Props> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [, vote] = useVoteMutation();
  return (
    <Flex
      className={updootSectionStyles.updootSectionContainer}
      flexDirection="column"
      pr={4}
    >
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
