import { NavBar } from "../components/NavBar";
import { Box, Text } from "@chakra-ui/core";

import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
  const [{ data, fetching }] = usePostsQuery();
  return (
    <>
      <NavBar />
      <div>hello, world</div>
      <br />
      {fetching ? (
        <Text>Loading...</Text>
      ) : !data ? null : (
        data.posts.map((post) => <Box key={post.id}>{post.title}</Box>)
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
