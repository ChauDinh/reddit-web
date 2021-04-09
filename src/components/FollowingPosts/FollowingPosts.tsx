/**
 * Posts from following publications
 */

import { Button, Flex, Grid, Text } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import React from "react";
import {
  useMeQuery,
  usePostsInFollowingPublicationsQuery,
} from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import { PostCard } from "../PostCard/PostCard";
import { Wrapper } from "../Wrapper/Wrapper";

interface Props {}

createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
});

export const FollowingPosts: React.FC<Props> = () => {
  const {
    data,
    error,
    loading,
    fetchMore,
    variables,
  } = usePostsInFollowingPublicationsQuery({
    variables: {
      limit: 3,
      cursor: null as null | string,
    },
  });

  const { data: meData, loading: meLoading, error: meError } = useMeQuery({
    skip: isServer(),
  });

  if (!meData || meError) return null;

  if (meLoading) return <Wrapper variants="regular">loading...</Wrapper>;

  // if (!meData.me) return null;

  if (error) return null;

  if (!data || !data.postsInFollowingPublications)
    return <Text>There is no data</Text>;

  if (loading) return <Wrapper variants="regular">loading...</Wrapper>;

  console.log("[PUBLICATION DATA]: ", data.postsInFollowingPublications.posts);

  return (
    <Flex direction="column" w="100%">
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={{ base: "20px", md: "20px", lg: "30px" }}
      >
        {data.postsInFollowingPublications.posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </Grid>
      {data && data.postsInFollowingPublications.hasMore ? (
        <Flex alignItems="center" justifyContent="center" mt={8}>
          <Button
            size="md"
            onClick={() => {
              fetchMore({
                variables: {
                  limit: variables?.limit,
                  cursor: data.postsInFollowingPublications!.posts[
                    data.postsInFollowingPublications!.posts.length - 1
                  ].createdAt,
                },
              });
            }}
            isLoading={loading}
          >
            Load more
          </Button>
        </Flex>
      ) : null}
    </Flex>
  );
};
