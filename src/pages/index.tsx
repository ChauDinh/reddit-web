import { Box, Button, Flex, Heading, Text, Image, Grid } from "@chakra-ui/core";
import NextLink from "next/link";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import ErrorPage from "./404";
import { createWithApollo } from "../utils/withApollo";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { PostCard } from "../components/PostCard/PostCard";
import { PopularPost } from "../components/PopularPost/PopularPost";

const Index = () => {
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 9,
      cursor: null as null | string,
    },
    notifyOnNetworkStatusChange: true,
  });

  if (!loading && !data) {
    console.error("Error: ", error?.message);
    return <ErrorPage />;
  }

  const popularPosts = data?.posts.posts.slice(0, variables?.limit);
  popularPosts?.sort((a, b) => b.points - a.points);

  return (
    <Layout variant="regular" direction="column">
      <Box style={{ flexGrow: 1 }}>
        <Wrapper variants="regular">
          <Flex justifyContent="space-between" w="100%">
            <Flex flexDirection="column">
              <Heading mb={2} size="xl">
                Blog
              </Heading>
              <Text mb={4} fontWeight="medium">
                Our latest web design tips, insights and resources <br /> hot
                off the presses
              </Text>
              <NextLink href="/create-post">
                <Button
                  alignItems="center"
                  leftIcon="edit"
                  variantColor="purple"
                  color="#fff"
                  size="md"
                >
                  Create post
                </Button>
              </NextLink>
            </Flex>
            <Image
              float="right"
              height="250px"
              src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1603176949/undraw_researching_22gp_r0go0r.png"
            />
          </Flex>
        </Wrapper>
        <PopularPost popular={popularPosts ? popularPosts.slice(0, 6) : []} />
        {loading && !data ? (
          <Text>Loading...</Text>
        ) : (
          <Wrapper variants="regular">
            <Flex direction="column">
              <Heading size="md" mb={3}>
                Recent articles
              </Heading>
              <Grid
                templateColumns="repeat(3, 1fr)"
                gap={4}
                mb={data?.posts.hasMore ? 0 : "50px"}
              >
                {data!.posts.posts.map((post) =>
                  !post ? null : <PostCard post={post} />
                )}
              </Grid>
            </Flex>
          </Wrapper>
        )}
        {data && data.posts.hasMore ? (
          <Flex alignItems="center" justifyContent="center" mt={8} pb={8}>
            <Button
              onClick={() => {
                fetchMore({
                  variables: {
                    limit: variables?.limit,
                    cursor:
                      data.posts.posts[data.posts.posts.length - 1].createdAt,
                  },
                });
              }}
              isLoading={loading}
            >
              load more
            </Button>
          </Flex>
        ) : null}
      </Box>
    </Layout>
  );
};

export default createWithApollo({ ssr: true })(Index);
