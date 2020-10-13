import React, { useState } from "react";
import { Flex, IconButton, Text } from "@chakra-ui/core";
import gql from "graphql-tag";
import {
  PostSnippetFragment,
  SinglePostSnippetFragment,
  useVoteMutation,
  VoteMutation,
} from "../../generated/graphql";

import updootSectionStyles from "./UpdootSection.module.css";
import { ApolloCache } from "@apollo/client";

interface Props {
  post: PostSnippetFragment | SinglePostSnippetFragment;
}

const updateAfterVote = (value: number, postId: number, cache: ApolloCache<VoteMutation>) => {
  const data = cache.readFragment<PostSnippetFragment>(
    {
      id: "Post:" + postId,
      fragment: gql`
      fragment _ on Post {
        id
        points
        voteStatus
      }
    `,
    }
  );
  if (data) {
    if (data.voteStatus === value) {
      return;
    }
    const newPoints =
      (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
    cache.writeFragment(
      {
        id: "Post:" + postId,
        fragment: gql`
          fragment __ on Post {
            points
            voteStatus
          }
        `,
        data: { points: newPoints, voteStatus: value }
      }
    );
  }
}

export const UpdootSection: React.FC<Props> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const [vote] = useVoteMutation();
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
          await vote({variables: { postId: post.id, value: 1 }, update: (cache) => updateAfterVote(1, post.id, cache)});
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
            variables: {
            postId: post.id,
            value: -1,
          }, update: (cache) => updateAfterVote(-1, post.id, cache)});
          setLoadingState("not-loading");
        }}
        isLoading={loadingState === "downdoot-loading"}
      ></IconButton>
    </Flex>
  );
};
