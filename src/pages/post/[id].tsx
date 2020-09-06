import { Heading } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { Layout } from "../../components/Layout";
import { usePostQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

interface Props {}

const Post: React.FC<Props> = () => {
  const router = useRouter();
  const integerId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;

  const [{ data, fetching }] = usePostQuery({
    pause: integerId === -1,
    variables: {
      id: integerId,
    },
  });
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
