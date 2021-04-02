/**
 * Posts from following publications
 */

import { Button, Flex, Grid, Text } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import React from "react";
import { usePostsInFollowingPublicationsQuery } from "../../generated/graphql";
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
    notifyOnNetworkStatusChange: true,
  });

  if (!data || error || !data.postsInFollowingPublications)
    return <Text>There is no data</Text>;

  if (loading) return <Wrapper variants="regular">loading...</Wrapper>;

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
            colorScheme="blackAlpha"
            bg="blackAlpha.900"
            color="white"
            size="sm"
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
