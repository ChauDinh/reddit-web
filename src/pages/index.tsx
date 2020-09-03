import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useState } from "react";
import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

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
        <Button leftIcon="edit" variantColor="blue" variant="solid">
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
          {data!.posts.posts.map((post) => (
            <Box key={post.id} p={5} shadow="md" borderWidth="1px">
              <Heading mb={2} fontSize="xl">
                {post.title}
              </Heading>
              <Text mt={4}>{post.textSnippet}</Text>
            </Box>
          ))}
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
