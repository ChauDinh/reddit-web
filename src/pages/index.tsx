import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
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
import { BigPostCard } from "../components/BigPostCard/BigPostCard";

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
              <Flex flexDirection="column" w="100%" alignItems="center">
                <Heading className="header__title" mb={6} size="xl">
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
                <NextLink href="/login">
                  <Button
                    alignItems="center"
                    colorScheme="blackAlpha"
                    variant="outline"
                    borderColor="blackAlpha.900"
                    color="blackAlpha.900"
                    w="100%"
                    size="md"
                    mb={2}
                    className="create-post__btn"
                  >
                    Join Us
                  </Button>
                </NextLink>
                <NextLink href="/create-post">
                  <Button
                    alignItems="center"
                    colorScheme="yellow"
                    bg="yellow.400"
                    color="black"
                    variant="solid"
                    size="md"
                    w="100%"
                    className="create-post__btn"
                  >
                    Create Post
                  </Button>
                </NextLink>
              </Flex>
            </Flex>
            <Image
              className="header__img"
              w="400px"
              src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1615273378/taxi-social-distancing_oqjty9.png"
            />
          </Flex>
        </Wrapper>
        {loading && !data ? (
          <Text>Loading...</Text>
        ) : (
          <Wrapper variants="regular">
            <Flex w="100%" justifyContent="space-between">
              <Flex flexGrow={1} direction="column">
                <Heading className="recent-articles__title" mb="20px" size="md">
                  MOST RECENT
                </Heading>
                <BigPostCard />
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
                      colorScheme="blackAlpha"
                      bg="blackAlpha.900"
                      color="white"
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
                      Load More
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
