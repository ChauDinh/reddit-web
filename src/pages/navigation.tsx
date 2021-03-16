import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { createWithApollo } from "../utils/withApollo";

interface Props {}

const Navigation: React.FC<Props> = () => {
  return (
    <Layout direction="column" variant="regular">
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
        >
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
            }}
          >
            <Flex direction="column" justifyContent="flex-end">
              <Text mb={2} fontWeight={800}>
                ABOUT US
              </Text>
              <Heading as="h2" size="lg" mb={2} fontWeight={500}>
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
          <Flex
            d="inline-flex"
            justifyContent="space-between"
            w="100%"
            mb={4}
            bg="orange.200"
            padding="10px"
            paddingTop="100px"
            borderRadius="10px"
          >
            <Flex direction="column" justifyContent="flex-end">
              <Text mb={2} fontWeight={800}>
                PUBLICATIONS
              </Text>
              <Heading as="h2" size="lg" mb={2} fontWeight={500}>
                Our reason
              </Heading>
              <Text fontSize="15px" color="gray.800">
                We're proud of having a rich of category-defining technologies
              </Text>
            </Flex>
            <Image
              w="200px"
              h="300px"
              src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1615901213/cherry-searching-1_prbv6x.png"
            />
          </Flex>
          <Box bg="yellow.200">
            <Text>Team</Text>
          </Box>
          <Box bg="gray.200">
            <Text>Blog</Text>
          </Box>
          <Box bg="blue.200">
            <Text>Premium member</Text>
          </Box>
        </Box>
      </Wrapper>
    </Layout>
  );
};

export default createWithApollo({ ssr: false })(Navigation);
