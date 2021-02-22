import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import TypeWriter from "typewriter-effect";
import NextLink from "next/link";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import ErrorPage from "./404";
import { createWithApollo } from "../utils/withApollo";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { ReadingList } from "../components/ReadingList/ReadingList";
import { MiniPostCard } from "../components/MiniPostCard/MiniPostCard";

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

  return (
    <Layout variant="regular" direction="column">
      <Box style={{ flexGrow: 1 }}>
        <Wrapper variants="regular">
          <Flex
            className="header__content"
            alignItems="flex-start"
            justifyContent="space-between"
            w="100%"
          >
            <Flex
              flexGrow={1}
              w="100%"
              alignItems="center"
              justifyContent="space-between"
            >
              <Flex flexDirection="column">
                <Heading className="header__title" mb={2} size="lg">
                  What's new technologies for
                  <TypeWriter
                    onInit={(typewriter) => {
                      typewriter.pauseFor(1000).deleteAll().start();
                    }}
                    options={{
                      strings: [
                        "Developers",
                        "DevOps",
                        "Designers",
                        "and YOU!",
                      ],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </Heading>
                <Text mb={4} fontWeight="medium" fontSize="md">
                  Our latest web design tips, insights and resources hot off the
                  presses
                </Text>
                <NextLink href="/create-post">
                  <Button
                    alignItems="center"
                    colorScheme="telegram"
                    bg="telegram.500"
                    color="white"
                    variant="solid"
                    size="md"
                    className="create-post__btn"
                  >
                    Create post
                  </Button>
                </NextLink>
              </Flex>
            </Flex>
          </Flex>
        </Wrapper>
        {loading && !data ? (
          <Text>Loading...</Text>
        ) : (
          <Wrapper variants="regular">
            <Flex w="100%" justifyContent="space-between">
              <Flex flexGrow={1} direction="column">
                <Heading className="recent-articles__title" mb="20px" size="md">
                  RECENT ARTICLES
                </Heading>
                {data?.posts.posts.map((post) =>
                  !post ? null : <MiniPostCard key={post.id} post={post} />
                )}
                {data && data.posts.hasMore ? (
                  <Flex
                    alignItems="center"
                    justifyContent="center"
                    mt={8}
                    pb={8}
                  >
                    <Button
                      colorScheme="telegram"
                      size="sm"
                      onClick={() => {
                        fetchMore({
                          variables: {
                            limit: variables?.limit,
                            cursor:
                              data.posts.posts[data.posts.posts.length - 1]
                                .createdAt,
                          },
                        });
                      }}
                      isLoading={loading}
                    >
                      load more
                    </Button>
                  </Flex>
                ) : null}
              </Flex>
              <Sidebar isSticky={false}>
                <ReadingList></ReadingList>
              </Sidebar>
            </Flex>
          </Wrapper>
        )}
      </Box>
    </Layout>
  );
};

export default createWithApollo({ ssr: true })(Index);
