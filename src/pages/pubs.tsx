import React from "react";
import {
  Box,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import NextLink from "next/link";

import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { usePublicationsQuery } from "../generated/graphql";
import { createWithApollo } from "../utils/withApollo";
import ErrorPage from "./404";
import { Sidebar } from "../components/Sidebar/Sidebar";

interface Props {}

const Pubs: React.FC<Props> = () => {
  const { data, loading, error } = usePublicationsQuery();

  if (error) return <ErrorPage />;

  if (loading) return <Text>loading...</Text>;

  return (
    <Layout variant="regular" direction="column">
      <Box mt="20px" fontSize="16px">
        <Wrapper variants="regular">
          <Heading size="sm">All Publications</Heading>
        </Wrapper>
        <Wrapper variants="regular">
          <Table variant="simple" colorScheme="gray">
            <Thead>
              <Tr display="flex">
                <Th pl="0" pr="0">
                  No.
                </Th>
                <Th flexGrow={1}>Title</Th>
                <Th pl="0">Created By</Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.publications.map((pub, idx) => (
                <Tr display="flex">
                  <Td pl="">{idx + 1}</Td>
                  <Td flexGrow={1} fontWeight="bold">
                    <NextLink
                      href="/publication/[id]"
                      as={`publication/${pub.id}`}
                    >
                      {pub.title}
                    </NextLink>
                  </Td>
                  <Td pl="0">{pub.creator.username}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Sidebar isSticky={false}>This is pub sidebar</Sidebar>
        </Wrapper>
      </Box>
    </Layout>
  );
};

export default createWithApollo({ ssr: true })(Pubs);
