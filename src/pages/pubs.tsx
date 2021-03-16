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
import { createBreakpoints } from "@chakra-ui/theme-tools";
import NextLink from "next/link";

import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { usePublicationsQuery } from "../generated/graphql";
import { createWithApollo } from "../utils/withApollo";
import ErrorPage from "./404";
import { BgAndColor } from "../utils/bgAndColor";

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
  const { bg, color } = BgAndColor();

  if (error) return <ErrorPage />;

  if (loading) return <Text>loading...</Text>;

  return (
    <Layout variant="regular" direction="column">
      <Box mt="20px" fontSize="16px">
        <Wrapper variants="regular">
          <Flex
            justifyContent="space-between"
            w="100%"
            bg={color}
            borderRadius="10px"
            padding="10px"
            display={{ base: "none", md: "flex", lg: "flex" }}
            boxShadow="0px 3px 6px rgba(200, 200, 200, 0.4)"
          >
            <Box padding="80px 50px">
              <Heading color={bg} as="h2" size="xl" lineHeight="40px" mb="20px">
                Discover more posts on <br /> Publications
              </Heading>
              <Text
                fontSize="18px"
                colorScheme="gray"
                color="gray.600"
                fontWeight="600"
              >
                Wanna boost your knowledge and creative energy? <br /> Find
                inspiration for some outside-the-box-thinking.
              </Text>
            </Box>
            <Image
              display={{ base: "none", md: "inline-block", lg: "inline-block" }}
              w="260px"
              src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1615546674/open-doodles-reading_qmszta.png"
            />
          </Flex>
        </Wrapper>
        <Wrapper variants="regular">
          <Heading
            fontSize={{ base: "36px", md: "28px", lg: "28px" }}
            fontWeight={{ base: "800", md: "700", lg: "700" }}
          >
            Trending publications
          </Heading>
        </Wrapper>
        <Wrapper variants="regular">
          <Box w="100%">
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(2, 1fr)",
                lg: "repeat(3, 1fr)",
              }}
              gap="40px"
            >
              {data?.publications.map((pub, idx) => (
                <Flex direction="column" key={idx} borderRadius="3px" bg={bg}>
                  <Box position="relative">
                    <Image
                      borderRadius="5px"
                      bg="gray.200"
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
                        bg={color}
                        borderRadius="5px"
                        fontWeight="600"
                        fontSize="18px"
                        textTransform="capitalize"
                        color={bg}
                        cursor="pointer"
                      >
                        <Text textAlign="center" mt={2} mb={2}>
                          {pub.title}
                        </Text>
                        <Image
                          fallbackSrc={`https://picsum.photos/id/${pub.id}/200`}
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
                      color={bg}
                      borderRadius="10px"
                      padding="0px 7px"
                      fontSize="14px"
                      fontWeight="600"
                    >
                      {pub.isPrivate ? "private" : "public"}
                    </Text>
                  </Text>
                  <NextLink
                    href="/publication/[id]"
                    as={`/publication/${pub.id}`}
                  >
                    <Button w="100%" borderRadius="3px" mt={2}>
                      Checkout
                    </Button>
                  </NextLink>
                </Flex>
              ))}
            </Grid>
          </Box>
        </Wrapper>
        <Wrapper variants="regular">
          <Heading
            fontSize={{ base: "36px", md: "28px", lg: "28px" }}
            fontWeight={{ base: "800", md: "700", lg: "700" }}
          >
            New
          </Heading>
        </Wrapper>
        <Wrapper variants="regular">
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap="40px"
          >
            {data?.publications
              .map((pub, idx) => (
                <Flex key={idx} direction="column" borderRadius="3px" bg={bg}>
                  <Box position="relative">
                    <Image
                      borderRadius="5px"
                      bg="gray.200"
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
                        bg={color}
                        borderRadius="5px"
                        fontWeight="600"
                        fontSize="18px"
                        textTransform="capitalize"
                        color={bg}
                        cursor="pointer"
                      >
                        <Text textAlign="center" mt={2} mb={2}>
                          {pub.title}
                        </Text>
                        <Image
                          fallbackSrc={`https://picsum.photos/id/${pub.id}/200`}
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
                      color={bg}
                      borderRadius="10px"
                      padding="0px 7px"
                      fontSize="14px"
                      fontWeight="600"
                    >
                      {pub.isPrivate ? "private" : "public"}
                    </Text>
                  </Text>
                  <NextLink
                    href="/publication/[id]"
                    as={`/publication/${pub.id}`}
                  >
                    <Button
                      w="100%"
                      border="1px"
                      borderColor="gray.300"
                      borderRadius="3px"
                      mt={2}
                    >
                      Checkout
                    </Button>
                  </NextLink>
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
