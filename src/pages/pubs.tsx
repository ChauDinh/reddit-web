import React from "react";
import { Button, Flex, Grid, Icon, Text } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { BiPlusCircle } from "react-icons/bi";
import NextLink from "next/link";

import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { usePublicationsQuery } from "../generated/graphql";
import { createWithApollo } from "../utils/withApollo";
import ErrorPage from "./404";
import { PublicationCard } from "../components/PublicationCard/PublicationCard";

interface Props {}
createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
});

const Pubs: React.FC<Props> = () => {
  const { data, loading, error } = usePublicationsQuery();

  if (error) return <ErrorPage />;

  if (loading) return <Text>loading...</Text>;

  return (
    <Layout variant="regular" direction="column">
      <Flex
        alignItems="center"
        maxW="1000px"
        margin="0 auto"
        mt="30px"
        padding="0 15px"
      >
        <Text fontWeight="800" fontSize="18px" mr="10px">
          Discover publications
        </Text>
        <NextLink href="/create-publication">
          <Button size="sm">
            <Icon as={BiPlusCircle} mr="5px" /> Create new
          </Button>
        </NextLink>
      </Flex>
      <Wrapper variants="regular">
        <Grid
          templateColumns={{
            base: "repeat(1, 1ffr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap="0 30px"
        >
          {data?.publications.map((pub) => (
            <PublicationCard key={pub.id} pub={pub} />
          ))}
        </Grid>
      </Wrapper>
    </Layout>
  );
};

export default createWithApollo({ ssr: true })(Pubs);
