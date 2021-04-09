import React from "react";
import { useRouter } from "next/router";
import { Flex, Heading } from "@chakra-ui/react";

import { SearchPost } from "../components/SearchPost/SearchPost";
import { createWithApollo } from "../utils/withApollo";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { useSearchQuery } from "../generated/graphql";

interface Props {}

const Search: React.FC<Props> = () => {
  const router = useRouter();
  const { search } = router.query;
  const { data, loading, error } = useSearchQuery({
    variables: {
      tokens: router.query.search as string,
    },
  });

  if (!data || error) return null;

  if (loading)
    return (
      <Layout direction="column" variant="regular">
        <Wrapper variants="regular">loading...</Wrapper>
      </Layout>
    );

  return (
    <Layout direction="column" variant="regular">
      <Wrapper variants="regular">
        <Flex direction="column" mt="20px">
          <Heading size="xl" mb="20px">
            # {search}
          </Heading>
          <SearchPost posts={data.search} />
        </Flex>
      </Wrapper>
    </Layout>
  );
};

export default createWithApollo({ ssr: false })(Search);
