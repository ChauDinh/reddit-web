import React, { useState } from "react";
import { Flex, IconButton, Text } from "@chakra-ui/core";
import gql from "graphql-tag";
import {
  PostSnippetFragment,
  SinglePostSnippetFragment,
  useMeQuery,
  useVoteMutation,
  VoteMutation,
} from "../../generated/graphql";
import { FaLongArrowAltUp, FaLongArrowAltDown } from "react-icons/fa";

import updootSectionStyles from "./UpdootSection.module.css";
import { ApolloCache } from "@apollo/client";

interface Props {
  post: PostSnippetFragment | SinglePostSnippetFragment;
  direction?: "column" | "row";
}

const updateAfterVote = (
  value: number,
  postId: number,
  cache: ApolloCache<VoteMutation>
) => {
  const data = cache.readFragment<PostSnippetFragment>({
    id: "Post:" + postId,
    fragment: gql`
      fragment _ on Post {
        id
        points
        voteStatus
      }
    `,
  });
  if (data) {
    if (data.voteStatus === value) {
      return;
    }
    const newPoints =
      (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
    cache.writeFragment({
      id: "Post:" + postId,
      fragment: gql`
        fragment __ on Post {
          points
          voteStatus
        }
      `,
      data: { points: newPoints, voteStatus: value },
    });
  }
};

export const UpdootSection: React.FC<Props> = ({ post, direction }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");
  const { data, loading } = useMeQuery();
  const [vote] = useVoteMutation();
  return (
    <Flex
      className={updootSectionStyles.updootSectionContainer}
      flexDirection={direction}
      pr={4}
    >
      <IconButton
        isDisabled={!data?.me && !loading ? true : false}
        aria-label="upvote"
        icon={FaLongArrowAltUp}
        fontSize="16px"
        color={post.voteStatus === 1 ? "#fff" : "#8e8e8e"}
        size="xs"
        variantColor={post.voteStatus === 1 ? "green" : undefined}
        onClick={async () => {
          if (post.voteStatus === 1) {
            return;
          }
          setLoadingState("updoot-loading");
          await vote({
            variables: { postId: post.id, value: 1 },
            update: (cache) => updateAfterVote(1, post.id, cache),
          });
          setLoadingState("not-loading");
        }}
        isLoading={loadingState === "updoot-loading"}
      ></IconButton>
      <Text className={updootSectionStyles.point} my={1}>
        {post.points}
      </Text>
      <IconButton
        isDisabled={!data?.me && !loading ? true : false}
        aria-label="down-vote"
        icon={FaLongArrowAltDown}
        fontSize="16px"
        color={post.voteStatus === -1 ? "#fff" : "#8e8e8e"}
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
            },
            update: (cache) => updateAfterVote(-1, post.id, cache),
          });
          setLoadingState("not-loading");
        }}
        isLoading={loadingState === "downdoot-loading"}
      ></IconButton>
    </Flex>
  );
};
