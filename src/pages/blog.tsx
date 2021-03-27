import { Box, Button, Flex, Text, Fade, Grid, Icon } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import NextLink from "next/link";
import { BiPlusCircle } from "react-icons/bi";

import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import ErrorPage from "./404";
import { createWithApollo } from "../utils/withApollo";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { PostCard } from "../components/PostCard/PostCard";
import { BgAndColor } from "../utils/bgAndColor";
import { FeaturedPost } from "../components/FeaturedPost/FeaturedPost";
import { FollowingPosts } from "../components/FollowingPosts/FollowingPosts";

createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
});

const Blog = () => {
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 6,
      cursor: null as null | string,
    },
    notifyOnNetworkStatusChange: true,
  });

  const { bg, color } = BgAndColor();

  if (!loading && !data) {
    console.error("Error: ", error?.message);
    return <ErrorPage />;
  }

  console.log("[display new post length]: ", data?.posts.posts.length);

  return (
    <Fade in={true}>
      <Layout variant="regular" direction="column">
        <Box style={{ flexGrow: 1 }}>
          <Wrapper variants="regular">
            <NextLink href="/create-post">
              <Button mt="30px" color={bg} bg={color} colorScheme="black">
                <Icon as={BiPlusCircle} mr="5px" /> Create post
              </Button>
            </NextLink>
          </Wrapper>
          <Wrapper variants="regular">
            <Flex direction="column" w="100%" maxW="1000px">
              <Text fontSize="18px" fontWeight={800} mb="20px">
                Following publications
              </Text>
              <FollowingPosts />
            </Flex>
          </Wrapper>
          <Wrapper variants="regular">
            <Flex direction="column" w="100%" maxW="1000px">
              <Text fontSize="18px" fontWeight="800" mb="20px">
                Featured
              </Text>
              <FeaturedPost />
            </Flex>
          </Wrapper>
          {loading && !data ? (
            <Text>Loading...</Text>
          ) : (
            <Flex direction="column">
              <Flex
                maxW="1000px"
                w="100%"
                alignItems="center"
                margin="0 auto"
                mt="20px"
                p={{ base: "0 15px", md: "0 15px", lg: "0" }}
              >
                <Text fontSize="18px" fontWeight="800" mr="15px">
                  New posts
                </Text>
                <Button size="sm">Create post</Button>
              </Flex>
              <Wrapper variants="regular">
                <Flex direction="column" w="100%">
                  <Grid
                    w="100%"
                    templateColumns={{
                      base: "repeat(1, 1fr)",
                      md: "repeat(2, 1fr)",
                      lg: "repeat(3, 1fr)",
                    }}
                    gap={{ base: "20px", md: "20px", lg: "30px" }}
                  >
                    {data!.posts.posts.map((post) => (
                      <PostCard key={post.id} post={post} />
                    ))}
                  </Grid>
                  {data && data.posts.hasMore ? (
                    <Flex
                      alignItems="center"
                      justifyContent="center"
                      mt={8}
                      pb={8}
                    >
                      <Button
                        colorScheme="blackAlpha"
                        bg="blackAlpha.900"
                        color="white"
                        size="sm"
                        onClick={() => {
                          console.log(
                            "[NEW POSTS CURSOR]: ",
                            data.posts.posts[data.posts.posts.length - 1].title
                          );
                          fetchMore({
                            variables: {
                              limit: variables?.limit,
                              cursor:
                                data.posts.posts[data.posts.posts.length - 1]
                                  .createdAt,
                            },
                          });
                          console.log("new post is coming...");
                        }}
                        isLoading={loading}
                      >
                        Load more
                      </Button>
                    </Flex>
                  ) : null}
                </Flex>
              </Wrapper>
            </Flex>
          )}
        </Box>
      </Layout>
    </Fade>
  );
};

export default createWithApollo({ ssr: true })(Blog);
