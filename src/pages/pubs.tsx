import React from "react";
import {
  Box,
  Button,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import NextLink from "next/link";

import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { usePublicationsQuery } from "../generated/graphql";
import { createWithApollo } from "../utils/withApollo";
import ErrorPage from "./404";

interface Props {}

const Pubs: React.FC<Props> = () => {
  const { data, loading, error } = usePublicationsQuery();

  if (error) return <ErrorPage />;

  if (loading) return <Text>loading...</Text>;

  return (
    <Layout variant="regular" direction="column">
      <Box mt="20px" fontSize="16px">
        <Wrapper variants="regular">
          <Flex
            justifyContent="space-between"
            w="100%"
            colorScheme="yellow"
            bg="yellow.200"
            borderRadius="10px"
            padding="10px"
          >
            <Box padding="80px 50px">
              <Heading as="h2" size="xl" lineHeight="40px" mb="20px">
                Discover more posts on <br /> Publications
              </Heading>
              <Text
                fontSize="18px"
                colorScheme="blackAlpha"
                color="blackAlpha.600"
                fontWeight="600"
              >
                Wanna boost your knowledge and creative energy? <br /> Find
                inspiration for some outside-the-box-thinking.
              </Text>
            </Box>
            <Image
              w="260px"
              src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1615546674/open-doodles-reading_qmszta.png"
            />
          </Flex>
        </Wrapper>
        <Wrapper variants="regular">
          <Heading as="h3" size="md">
            Trending publications
          </Heading>
        </Wrapper>
        <Wrapper variants="regular">
          <Box w="100%">
            <Grid templateColumns="repeat(3, 1fr)" gap="40px">
              {data?.publications.map((pub, idx) => (
                <Flex
                  direction="column"
                  key={idx}
                  borderRadius="3px"
                  border="1px solid rgba(0, 0, 0, 0.2)"
                >
                  <Box position="relative">
                    <Image
                      bg="yellow.200"
                      fallbackSrc="https://res.cloudinary.com/dnlthcx1a/image/upload/v1615550914/rush-197_pk0hwi.png"
                    />
                    <NextLink
                      href="/publication/[id]"
                      as={`/publication/${pub.id}`}
                    >
                      <Box
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        colorScheme="yellow"
                        bg="yellow.100"
                        borderRadius="5px"
                        fontWeight="600"
                        fontSize="18px"
                        textTransform="capitalize"
                        color="blue.600"
                        cursor="pointer"
                      >
                        <Text textAlign="center" mt={2} mb={2}>
                          {pub.title}
                        </Text>
                        <Image
                          fallbackSrc={`https://picsum.photos/id/${idx}/200`}
                          borderRadius="0 0 5px 5px"
                        />
                      </Box>
                    </NextLink>
                  </Box>
                  <Text
                    padding="0 10px"
                    fontWeight="800"
                    textTransform="capitalize"
                    fontSize="18px"
                    mt={2}
                  >
                    {pub.title}
                  </Text>
                  <Text
                    padding="0 10px"
                    textTransform="capitalize"
                    color="gray.600"
                  >
                    Creator: {pub.creator.username}
                    <Text
                      float="right"
                      textTransform="lowercase"
                      bg={pub.isPrivate ? "gray.300" : "green.300"}
                      borderRadius="10px"
                      padding="0px 7px"
                      fontSize="14px"
                      fontWeight="600"
                    >
                      {pub.isPrivate ? "private" : "public"}
                    </Text>
                  </Text>
                  <Button
                    w="100%"
                    colorScheme="whiteAlpha"
                    bg="whiteAlpha.900"
                    color="gray.400"
                    borderTop="1px"
                    borderColor="gray.300"
                    borderRadius="0"
                    mt={2}
                  >
                    Subscribe now
                  </Button>
                </Flex>
              ))}
            </Grid>
          </Box>
        </Wrapper>
        <Wrapper variants="regular">
          <Heading as="h3" size="md">
            New
          </Heading>
        </Wrapper>
        <Wrapper variants="regular">
          <Grid templateColumns="repeat(3, 1fr)" gap="40px">
            {data?.publications
              .map((pub, idx) => (
                <Flex
                  key={idx}
                  direction="column"
                  borderRadius="3px"
                  border="1px solid rgba(0, 0, 0, 0.2)"
                >
                  <Box position="relative">
                    <Image
                      bg="yellow.200"
                      fallbackSrc="https://res.cloudinary.com/dnlthcx1a/image/upload/v1615550914/rush-197_pk0hwi.png"
                    />
                    <NextLink
                      href="/publication/[id]"
                      as={`/publication/${pub.id}`}
                    >
                      <Box
                        position="absolute"
                        top="50%"
                        left="50%"
                        transform="translate(-50%, -50%)"
                        colorScheme="yellow"
                        bg="yellow.100"
                        borderRadius="5px"
                        fontWeight="600"
                        fontSize="18px"
                        textTransform="capitalize"
                        color="blue.600"
                        cursor="pointer"
                      >
                        <Text textAlign="center" mt={2} mb={2}>
                          {pub.title}
                        </Text>
                        <Image
                          fallbackSrc={`https://picsum.photos/id/${idx}/200`}
                          borderRadius="0 0 5px 5px"
                        />
                      </Box>
                    </NextLink>
                  </Box>
                  <Text
                    padding="0 10px"
                    fontWeight="800"
                    textTransform="capitalize"
                    fontSize="18px"
                    mt={2}
                  >
                    {pub.title}
                  </Text>
                  <Text
                    padding="0 10px"
                    textTransform="capitalize"
                    color="gray.600"
                  >
                    Creator: {pub.creator.username}
                    <Text
                      float="right"
                      textTransform="lowercase"
                      bg={pub.isPrivate ? "gray.300" : "green.300"}
                      borderRadius="10px"
                      padding="0px 7px"
                      fontSize="14px"
                      fontWeight="600"
                    >
                      {pub.isPrivate ? "private" : "public"}
                    </Text>
                  </Text>
                  <Button
                    w="100%"
                    colorScheme="whiteAlpha"
                    bg="whiteAlpha.900"
                    color="gray.400"
                    borderTop="1px"
                    borderColor="gray.300"
                    borderRadius="0"
                    mt={2}
                  >
                    Subscribe now
                  </Button>
                </Flex>
              ))
              .reverse()}
          </Grid>
        </Wrapper>
      </Box>
    </Layout>
  );
};

export default createWithApollo({ ssr: true })(Pubs);
