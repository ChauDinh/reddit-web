import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { usePostsQuery, Post } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { UpdootSection } from "../components/UpdootSection";
import EditAndDeleteButton from "../components/EditAndDeleteButton";
import SideBar from "../components/SideBar";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, error, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return (
      <Layout variant="regular" direction="column">
        <div>You got query failed for some reason</div>
        <div>{error}</div>
      </Layout>
    ); // render 404 page later
  }

  return (
    <Layout variant="regular" direction="column">
      <Box style={{ flexGrow: 1 }}>
        <Flex style={styles.title}>
          <Heading size="lg">All posts</Heading>
          <NextLink href="/create-post">
            <Button
              alignItems="center"
              leftIcon="edit"
              as={Link}
              variant="solid"
              variantColor="blue"
              size="sm"
            >
              Create post
            </Button>
          </NextLink>
        </Flex>
        <br />
        {fetching && !data ? (
          <Text>Loading...</Text>
        ) : (
          <Stack spacing={5} mb={data?.posts.hasMore ? 0 : "50px"}>
            {data!.posts.posts.map((post) =>
              !post ? null : (
                <Flex
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  key={post.id}
                  p={5}
                  backgroundColor="#fff"
                  borderRadius="3px"
                >
                  <UpdootSection post={post} />
                  <Box width="100%">
                    <Text fontSize="11px">
                      Posted by <span>{post.creator.username}</span>
                    </Text>
                    <NextLink href="/post/[id]" as={`/post/${post.id}`}>
                      <Link>
                        <Heading mb={2} fontSize="md">
                          {post.title}
                        </Heading>
                      </Link>
                    </NextLink>
                    <Text mt={4} mb={2}>
                      {post.textSnippet}
                    </Text>
                    <EditAndDeleteButton post={post as Post} />
                    <Button
                      leftIcon="chat"
                      size="xs"
                      fontWeight={500}
                      float="right"
                      px={3}
                    >
                      comments
                    </Button>
                  </Box>
                </Flex>
              )
            )}
          </Stack>
        )}
        {data && data.posts.hasMore ? (
          <Flex alignItems="center" justifyContent="center" mt={8} pb={8}>
            <Button
              onClick={() =>
                setVariables({
                  limit: variables.limit,
                  cursor:
                    data.posts.posts[data.posts.posts.length - 1].createdAt,
                })
              }
              isLoading={fetching}
            >
              load more
            </Button>
          </Flex>
        ) : null}
      </Box>
      <SideBar />
    </Layout>
  );
};

const styles = {
  title: {
    alignItems: "center",
    justifyContent: "space-between",
  },
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
