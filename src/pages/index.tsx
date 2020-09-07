import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { usePostsQuery, Post } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { UpdootSection } from "../components/UpdootSection";
import EditAndDeleteButton from "../components/EditAndDeleteButton";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return <div>You got query failed for some reason</div>; // render 404 page later
  }

  return (
    <Layout variant="regular">
      <Flex style={styles.title}>
        <Heading size="lg">Latest posts</Heading>
        <NextLink href="/create-post">
          <Button alignItems="center" leftIcon="edit" as={Link}>
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
                shadow="md"
                borderWidth="1px"
              >
                <UpdootSection post={post} />
                <Box width="100%">
                  <Text fontSize="11px">
                    Posted by <span>{post.creator.username}</span>
                  </Text>
                  <NextLink href="/post/[id]" as={`/post/${post.id}`}>
                    <Link>
                      <Heading mb={2} fontSize="xl">
                        {post.title}
                      </Heading>
                    </Link>
                  </NextLink>
                  <Text mt={4}>{post.textSnippet}</Text>
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
        <Flex alignItems="center" justifyContent="center" my={8}>
          <Button
            onClick={() =>
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              })
            }
            isLoading={fetching}
          >
            load more
          </Button>
        </Flex>
      ) : null}
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
