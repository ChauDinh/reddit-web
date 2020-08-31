import { Box, Text, Button, Link } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";

import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [{ data, fetching }] = usePostsQuery();
  return (
    <Layout variant="regular">
      <NextLink href="/create-post">
        <Link as="button">Create post</Link>
      </NextLink>
      <br />
      {fetching ? (
        <Text>Loading...</Text>
      ) : !data ? null : (
        data.posts.map((post) => <Box key={post.id}>{post.title}</Box>)
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
