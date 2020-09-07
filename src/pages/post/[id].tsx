import { Heading, Text, Flex } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";

interface Props {}

const Post: React.FC<Props> = () => {
  const [{ data, fetching }] = useGetPostFromUrl();
  if (fetching) {
    return (
      <Layout direction="column" variant="regular">
        ...loading
      </Layout>
    );
  }
  if (!data?.post) {
    return <Layout direction="column">Could not find post</Layout>; // 404 page
  }
  return (
    <Layout direction="column" variant="regular">
      <Flex flexDirection="column">
        <Heading mb={6}>{data.post.title}</Heading>
        <Text>{data.post.text}</Text>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
