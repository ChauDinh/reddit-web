import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { createWithApollo } from "../utils/withApollo";

interface Props {}

const Navigation: React.FC<Props> = () => {
  return (
    <Layout direction="column" variant="regular">
      <Wrapper variants="regular">
        <Heading
          mt="20px"
          w="100%"
          fontFamily="'Viaoda Libre', cursive"
          fontSize="80px"
          fontWeight={500}
          textAlign="center"
        >
          Reading in happiness.
        </Heading>
      </Wrapper>
      <Wrapper variants="regular">
        <Box
          padding={4}
          px={0}
          w="100%"
          mx="auto"
          sx={{
            columnCount: [1, 2],
            columnGap: "10px",
          }}
          mt="30px"
        >
          <NextLink href="/about">
            <Flex
              d="inline-flex"
              justifyContent="space-between"
              bg="blue.700"
              borderRadius="10px"
              padding="10px"
              w="100%"
              color="white"
              mb={4}
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/dnlthcx1a/image/upload/v1615899066/flamenco-187_ozwvgq.png')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right",
                transition: "transform .5s",
                cursor: "pointer",
              }}
              _hover={{
                transform: "scale(1.1)",
              }}
            >
              <Flex direction="column" justifyContent="flex-end">
                <Text mb={2} fontWeight={800}>
                  ABOUT
                </Text>
                <Heading
                  as="h2"
                  size="lg"
                  mb={2}
                  fontWeight={600}
                  fontFamily="'Viaoda Libre', cursive"
                >
                  100% technical blog
                </Heading>
                <Text fontSize="15px">Specialization drives success</Text>
              </Flex>
              <Image
                w="150px"
                h="100%"
                src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1615899061/pablo-13_bue1pk.png"
              />
            </Flex>
          </NextLink>
          <NextLink href="/pubs">
            <Flex
              d="inline-flex"
              justifyContent="space-between"
              w="100%"
              mb={4}
              bg="orange.200"
              color="orange.800"
              padding="10px"
              paddingTop="120px"
              borderRadius="10px"
              _hover={{
                transform: "scale(1.1)",
              }}
              style={{
                transition: "transform .5s",
                cursor: "pointer",
              }}
            >
              <Flex direction="column" justifyContent="flex-end">
                <Text mb={2} fontWeight={800}>
                  PUBLICATIONS
                </Text>
                <Heading
                  as="h2"
                  size="lg"
                  mb={2}
                  fontWeight={600}
                  fontFamily="'Viaoda Libre', cursive"
                >
                  Our reason
                </Heading>
                <Text fontSize="15px">
                  We're proud of having a rich of category-defining technologies
                </Text>
              </Flex>
              <Image
                w="220px"
                h="300px"
                src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1615901213/cherry-searching-1_prbv6x.png"
              />
            </Flex>
          </NextLink>
          <NextLink href="/blog">
            <Flex
              bg="gray.200"
              d="inline-flex"
              padding="10px"
              w="100%"
              paddingTop="150px"
              borderRadius="10px"
              mb={4}
              color="gray.800"
              justifyContent="space-between"
              alignItems="flex-end"
              _hover={{
                transform: "scale(1.1)",
              }}
              style={{
                transition: "transform .5s",
                cursor: "pointer",
              }}
            >
              <Flex direction="column" justifyContent="flex-start">
                <Text mb={2} fontWeight={800}>
                  BLOG
                </Text>
                <Heading
                  as="h2"
                  size="lg"
                  mb={2}
                  fontWeight={600}
                  fontFamily="'Viaoda Libre', cursive"
                >
                  Making people happy
                </Heading>
                <Text fontSize="15px">
                  We try to create more and more technical blogs to
                  re-enchanting the world through technology
                </Text>
              </Flex>
              <Image
                w="235px"
                h="300px"
                src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1615911988/clip-reading-books_xowwzy.png"
              />
            </Flex>
          </NextLink>
          <NextLink href="/team">
            <Flex
              d="inline-flex"
              justifyContent="space-between"
              alignItems="flex-end"
              w="100%"
              padding="10px"
              paddingTop="50px"
              borderRadius="10px"
              bg="yellow.200"
              color="yellow.800"
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/dnlthcx1a/image/upload/v1615550914/rush-197_pk0hwi.png')",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right",
                transition: "transform .5s",
                cursor: "pointer",
              }}
              _hover={{
                transform: "scale(1.1)",
              }}
            >
              <Flex direction="column" justifyContent="flex-end">
                <Text mb={2} fontWeight={800}>
                  TEAM
                </Text>
                <Heading
                  as="h2"
                  size="lg"
                  mb={2}
                  fontWeight={600}
                  fontFamily="'Viaoda Libre', cursive"
                >
                  Global at heart
                </Heading>
                <Text fontSize="15px">
                  A group of engineer in love with our business and passionate
                  about technologies
                </Text>
              </Flex>
              <Image
                w="220px"
                h="100px"
                src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1615911015/crayon-925_tdu1rs.png"
              />
            </Flex>
          </NextLink>
        </Box>
      </Wrapper>
    </Layout>
  );
};

export default createWithApollo({ ssr: false })(Navigation);
