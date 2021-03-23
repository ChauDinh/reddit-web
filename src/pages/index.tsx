import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { BiCheckCircle } from "react-icons/bi";
import { createBreakpoints } from "@chakra-ui/theme-tools";

import { createWithApollo } from "../utils/withApollo";
import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { Pricing } from "../components/Pricing/Pricing";
import { BiChevronRight } from "react-icons/bi";
import { useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";
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

const Index: React.FC<Props> = () => {
  const { data, loading, error } = useMeQuery({ skip: isServer() });
  const { bg, color } = BgAndColor();

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
              fontSize={{ base: "30px", sm: "40px", md: "60px", lg: "80px" }}
              fontWeight="600"
              textAlign="center"
              mb={6}
              lineHeight={{ base: "45px", md: "90px", lg: "90px" }}
            >
              <span>Write</span> to be understood,
              <br />
              <span>Speak</span> to be heart,
              <br />
              <span>Read</span> to grow.
            </Heading>
            <Heading
              as="h5"
              colorScheme="gray"
              color={color}
              size="md"
              fontWeight="800"
              textAlign="center"
              mb={6}
            >
              We'll help you find great things to read.
            </Heading>
            <NextLink href="/blog">
              <Button color={bg} bg={color} colorScheme="gray">
                Get Started
              </Button>
            </NextLink>
          </Flex>
        </Wrapper>
        <Flex
          mt="20px"
          mb="40px"
          w="100%"
          justifyContent="center"
          className="homePage__headerBackgroundImage"
        >
          <Image
            w="800px"
            mb="40px"
            src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1615933451/pablo-815_bso4ux.png"
          />
        </Flex>

        <Wrapper variants="regular">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            w="100%"
            mt="40px"
            position="relative"
            direction={{ base: "column", md: "column", lg: "row" }}
          >
            <Image
              position="absolute"
              right={{ base: "30%", md: "0", lg: "-110px" }}
              top="-120px"
              height={{ base: "140px", md: "200px", lg: "200px" }}
              src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1616313203/scribbles-scribbles-73_2x_iyabmg.png"
            />
            <Image
              w="450px"
              src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1616247102/Group_3_2x_coyohk.png"
            />
            <Flex direction="column" flexGrow={1} alignItems="center">
              <Heading as="h2" size="2xl" mb={4} mt="20px" textAlign="center">
                The power of{" "}
                <span
                  style={{
                    fontFamily: "'Patrick Hand', cursive",
                    color: "#ff8181",
                  }}
                >
                  text editor
                </span>
                .
              </Heading>
              <Text color="gray.500" mb={4}>
                Our platform supports WYSIWYG text editor
              </Text>
              <List spacing={3}>
                <ListItem>
                  <ListIcon as={BiCheckCircle} color="green.600" />
                  Enhance writer productivity & retention
                </ListItem>
                <ListItem>
                  <ListIcon as={BiCheckCircle} color="green.600" />
                  Build your brand reputation and trust
                </ListItem>
                <ListItem>
                  <ListIcon as={BiCheckCircle} color="green.600" />
                  Improve your writing skills
                </ListItem>
              </List>
            </Flex>
          </Flex>
        </Wrapper>
        <Wrapper variants="regular">
          <Flex
            direction="column"
            alignItems="center"
            w="100%"
            mb="40px"
            mt="40px"
            position="relative"
          >
            <Image
              top={{ base: "-100px", md: "-100px", lg: "-150px" }}
              left={{ base: "30%", md: "40%", lg: "-50px" }}
              height={{ base: "120px", md: "120px", lg: "200px" }}
              position="absolute"
              src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1616313201/scribbles-scribbles-88_2x_u1m30r.png"
            />
            <Heading as="h2" size="2xl" mt="10px" mb="16px" textAlign="center">
              Find the{" "}
              <span
                style={{
                  fontFamily: "'Patrick Hand', cursive",
                  color: "#7fd6c2",
                }}
              >
                plan
              </span>{" "}
              that's{" "}
              <span
                style={{
                  fontFamily: "'Patrick Hand', cursive",
                  color: "#ffc016",
                }}
              >
                right
              </span>{" "}
              for you
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
              mb="40px"
            >
              Billed monthly. Cancel anytime
            </Text>
            <Button
              color={bg}
              bg={color}
              size="md"
              mb="40px"
              colorScheme="gray"
            >
              Get Premium
            </Button>
            <Pricing />
          </Flex>
        </Wrapper>
        <Wrapper variants="regular">
          <Flex
            w="100%"
            justifyContent="center"
            alignItems="flex-start"
            className="homePage__customerReview"
            position="relative"
          >
            <Image
              height={{ base: "150px", md: "150px", lg: "200px" }}
              top={{ base: "-130px", md: "-110px", lg: "-130px" }}
              right={{ base: "0px", md: "40%", lg: "-50px" }}
              position="absolute"
              src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1616313203/scribbles-scribbles-73_2x_iyabmg.png"
            />
            <Box
              boxShadow="0px 3px 10px rgba(220, 220, 220, 0.1)"
              padding="10px 16px"
              borderRadius="3px"
              mt="20px"
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
              w="480px"
              src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1616246522/Group_1_2x_jua0zp.png"
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
              color={bg}
              bg={color}
              size="md"
              colorScheme="gray"
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
