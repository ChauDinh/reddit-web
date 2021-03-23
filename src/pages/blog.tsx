import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  Fade,
  Grid,
  Heading,
  Icon,
} from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import NextLink from "next/link";
import { BiPlusCircle } from "react-icons/bi";

import { Layout } from "../components/Layout";
import { usePostsQuery } from "../generated/graphql";
import ErrorPage from "./404";
import { createWithApollo } from "../utils/withApollo";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { PostCard } from "../components/PostCard/PostCard";
import { avatarUrlGenerator } from "../utils/createAvatar";
import { BgAndColor } from "../utils/bgAndColor";

createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
});

const Blog = () => {
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 9,
      cursor: null as null | string,
    },
    notifyOnNetworkStatusChange: true,
  });

  const { bg, color } = BgAndColor();

  if (!loading && !data) {
    console.error("Error: ", error?.message);
    return <ErrorPage />;
  }

  return (
    <Fade in={true}>
      <Layout variant="regular" direction="column">
        <Box style={{ flexGrow: 1 }}>
          <Wrapper variants="regular">
            <NextLink href="/create-post">
              <Button mt="30px" color={bg} bg={color} colorScheme="black">
                <Icon as={BiPlusCircle} mr="5px" /> Create post
              </Button>
            </NextLink>
          </Wrapper>
          <Wrapper variants="regular">
            <Grid
              padding="15px"
              border="1px solid rgba(200, 200, 200, 0.4)"
              borderRadius="12px"
              w="100%"
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "1.5fr 1fr",
                lg: "1.5fr 1fr",
              }}
              gridGap={{ base: "0 20px", md: "0 20px", lg: "0 60px" }}
            >
              <Image
                bg="gray.200"
                borderRadius="12px"
                w="100%"
                h="296px"
                objectFit="cover"
                mb={{ base: "10px", md: "0px", lg: "0px" }}
                src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1616422016/crayon-waiting-3_xlr4rh.png"
              />

              <Flex direction="column">
                <Text
                  fontSize="14px"
                  color="gray.500"
                  textTransform="uppercase"
                  display="inline-block"
                  mb="5px"
                >
                  JavaScript
                </Text>
                <Heading
                  as="h2"
                  size="lg"
                  fontWeight={800}
                  mb="10px"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "100%",
                    maxWidth: "100%",
                  }}
                  flexGrow={1}
                >
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Veritatis sit delectus voluptate explicabo perspiciatis? Nam
                  animi quae sed esse atque iste et suscipit dicta nesciunt
                  neque eos laborum commodi qui est ullam deleniti aliquid
                  tenetur aspernatur, amet eveniet, id velit mollitia iure.
                  Impedit, nostrum ullam quod dolores consectetur voluptate
                  rerum.
                </Heading>
                <Text
                  fontWeight="400"
                  fontSize="14px"
                  mb="20px"
                  color="gray.500"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    width: "100%",
                    maxWidth: "100%",
                  }}
                >
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Doloremque earum, tempora maxime iure reiciendis fuga sint.
                  Quibusdam ut labore vitae eveniet autem sed, distinctio cumque
                  quam? Explicabo necessitatibus ut ipsum.
                </Text>
                <Flex alignItems="center">
                  <Image
                    src={avatarUrlGenerator(1)}
                    width="50px"
                    height="50px"
                    borderRadius="10px"
                    objectFit="cover"
                    flexShrink={0}
                    mr="10px"
                  />
                  <Flex direction="column">
                    <Text fontWeight={600} fontSize="14px" mb="5px">
                      By: Ben Awad
                    </Text>
                    <Text fontSize="12px" color="gray.500" fontWeight="300">
                      3/1/2021
                    </Text>
                  </Flex>
                </Flex>
              </Flex>
            </Grid>
          </Wrapper>
          {loading && !data ? (
            <Text>Loading...</Text>
          ) : (
            <Wrapper variants="regular">
              <Grid
                w="100%"
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                }}
                gap={{ base: "20px", md: "20px", lg: "30px" }}
              >
                {data!.posts.posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </Grid>
              {data && data.posts.hasMore ? (
                <Flex alignItems="center" justifyContent="center" mt={8} pb={8}>
                  <Button
                    colorScheme="blackAlpha"
                    bg="blackAlpha.900"
                    color="white"
                    size="sm"
                    onClick={() => {
                      fetchMore({
                        variables: {
                          limit: variables?.limit,
                          cursor:
                            data.posts.posts[data.posts.posts.length - 1]
                              .createdAt,
                        },
                      });
                    }}
                    isLoading={loading}
                  >
                    Load more
                  </Button>
                </Flex>
              ) : null}
            </Wrapper>
          )}
        </Box>
      </Layout>
    </Fade>
  );
};

export default createWithApollo({ ssr: true })(Blog);
