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
import {
  usePostsQuery,
  useDeletePostMutation,
  useMeQuery,
} from "../generated/graphql";
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
  const [{ data: meData }] = useMeQuery();

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
                  {post.creator.id === meData?.me?.id ? (
                    <IconButton
                      icon="delete"
                      aria-label="delete-post"
                      float="right"
                      size="xs"
                      onClick={() => deletePost({ id: post.id })}
                      ml={2}
                    />
                  ) : null}
                  {post.creator.id === meData?.me?.id ? (
                    <NextLink
                      href="/post/edit/[id]"
                      as={`/post/edit/${post.id}`}
                    >
                      <IconButton
                        icon="edit"
                        aria-label="edit-post"
                        float="right"
                        size="xs"
                        ml={2}
                      />
                    </NextLink>
                  ) : null}
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
