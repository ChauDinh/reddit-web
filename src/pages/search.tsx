import React from "react";
import { useRouter } from "next/router";
import { Flex, Heading, Icon, Text } from "@chakra-ui/react";
import { BiArrowBack } from "react-icons/bi";

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
        <Flex direction="column" mt="30px">
          <Flex
            onClick={() => router.back()}
            alignItems="center"
            cursor="pointer"
            mb="20px"
            color="blue.400"
            maxW="100px"
          >
            <Icon as={BiArrowBack} mr={2} />
            <Text fontSize="16px">Go back</Text>
          </Flex>
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
