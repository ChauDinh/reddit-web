import {
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
  Text,
  IconButton,
} from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { usePostsQuery, useDeletePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { UpdootSection } from "../components/UpdootSection";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });
  const [{ data, fetching }] = usePostsQuery({
    variables,
  });
  const [, deletePost] = useDeletePostMutation();

  if (!fetching && !data) {
    return <div>You got query failed for some reason</div>; // render 404 page later
  }

  return (
    <Layout variant="regular">
      <Flex style={styles.title}>
        <Heading size="lg">Latest posts</Heading>
        <Button leftIcon="edit" variant="solid">
          <NextLink href="/create-post">
            <Link>Create post</Link>
          </NextLink>
        </Button>
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
                  <IconButton
                    icon="delete"
                    aria-label="delete-post"
                    float="right"
                    size="xs"
                    onClick={() => deletePost({ id: post.id })}
                  />
                  <IconButton
                    icon="edit"
                    aria-label="edit-post"
                    float="right"
                    size="xs"
                    mr={2}
                  />
                  <Button
                    leftIcon="chat"
                    size="xs"
                    fontWeight={500}
                    float="right"
                    mr={2}
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
