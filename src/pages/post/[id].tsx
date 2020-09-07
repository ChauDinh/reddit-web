import { Heading } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";

interface Props {}

const Post: React.FC<Props> = () => {
  const [{ data, fetching }] = useGetPostFromUrl();
  if (fetching) {
    return <Layout variant="regular">...loading</Layout>;
  }
  if (!data?.post) {
    return <Layout>Could not find post</Layout>; // 404 page
  }
  return (
    <Layout variant="regular">
      <Heading>{data.post.title}</Heading>
      {data.post.text}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
