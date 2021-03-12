import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { createWithApollo } from "../utils/withApollo";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { Pricing } from "../components/Pricing/Pricing";
import { BiChevronRight } from "react-icons/bi";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
import ErrorPage from "./404";

interface Props {}

const Index: React.FC<Props> = () => {
  const { data, loading, error } = useMeQuery({ skip: isServer() });

  if (loading) return null;
  if (error) return <ErrorPage />;
  if (data?.me) {
    const router = useRouter();
    router.push("/blog");
    return null;
  } else {
    return (
      <Layout variant="regular" direction="column">
        <Wrapper variants="regular">
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="flex-start"
            w="100%"
            pt="30px"
          >
            <Heading
              as="h2"
              size="2xl"
              fontWeight="800"
              textAlign="center"
              mb={6}
            >
              Get smatter about what
              <br /> matters to you
            </Heading>
            <Heading
              as="h5"
              colorScheme="gray"
              color="gray.600"
              size="md"
              fontWeight="800"
              textAlign="center"
              mb={6}
            >
              We'll help you find great things to read.
            </Heading>
            <NextLink href="/blog">
              <Button colorScheme="yellow" bg="yellow.400">
                Get Started
              </Button>
            </NextLink>
          </Flex>
        </Wrapper>
        <Flex
          mt="20px"
          w="100%"
          justifyContent="center"
          className="homePage__headerBackgroundImage"
        >
          <Image
            w="500px"
            mb="40px"
            src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1615381423/taxi-no-comments_opqyfr.png"
          />
        </Flex>
        <Flex
          justifyContent="center"
          w="100%"
          mb="80px"
          mt="40px"
          className="homePage__backgroundImage"
        >
          <Image
            w="800px"
            borderRadius="3px"
            boxShadow="0px 3px 5px rgba(0, 0, 0, 0.2)"
            src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1615381837/Screen_Shot_2021-03-10_at_20.10.22_iimvnd.png"
          />
        </Flex>
        <Wrapper variants="regular">
          <Flex direction="column" alignItems="center" w="100%" mb="40px">
            <Heading as="h2" size="2xl" mb="20px" textAlign="center">
              Find the plan that's right for you
            </Heading>
            <Heading
              as="h5"
              size="md"
              mb="10px"
              colorScheme="gray"
              color="gray.600"
              fontWeight="800"
              textAlign="center"
            >
              with Reasonable pricing
            </Heading>
            <Text
              colorScheme="gray"
              color="gray.500"
              fontSize="16px"
              fontWeight="600"
            >
              Only US$3 / month
            </Text>
            <Text
              fontSize="16px"
              colorScheme="gray"
              color="gray.500"
              fontWeight="600"
              mb="20px"
            >
              Billed monthly. Cancel anytime
            </Text>
            <Button
              colorScheme="blackAlpha"
              bg="blackAlpha.900"
              color="white"
              size="md"
              mb="20px"
            >
              Get Premium
            </Button>
            <Pricing />
          </Flex>
        </Wrapper>
        <Wrapper variants="regular">
          <Flex w="100%" justifyContent="center" alignItems="center">
            <Box
              boxShadow="0px 3px 60px rgba(200, 200, 200, 0.5)"
              padding="10px 16px"
              borderRadius="3px"
            >
              <Text textAlign="justify">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
                exercitationem quae hic dicta fugiat itaque cupiditate aliquam,
                laboriosam sapiente amet harum, dolore quisquam debitis facere,
                corrupti tempore.
              </Text>
              <Flex
                w="100%"
                justifyContent="space-between"
                mt="10px"
                fontWeight="600"
              >
                <Text>John Doe</Text>
                <Text>
                  Read more <Icon as={BiChevronRight} />
                </Text>
              </Flex>
              <Text fontSize="sm" colorScheme="gray" color="gray.600">
                Software engineering{" "}
              </Text>
            </Box>
            <Image
              w="500px"
              src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1615454437/taxi-599_akjzgx.png"
            />
          </Flex>
        </Wrapper>
        <Wrapper variants="regular">
          <Flex
            direction="column"
            w="100%"
            alignItems="center"
            mb="20px"
            textAlign="center"
          >
            <Heading as="h2" size="xl">
              Expand your reading.
            </Heading>
            <Heading as="h2" size="xl">
              Expand your mind.
            </Heading>
            <Button
              mt="20px"
              mb="80px"
              colorScheme="yellow"
              bg="yellow.400"
              size="md"
            >
              <NextLink href="/blog">Get Started</NextLink>
            </Button>
          </Flex>
        </Wrapper>
      </Layout>
    );
  }
};

export default createWithApollo({ ssr: true })(Index);
