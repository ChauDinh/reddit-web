import { Box, Button, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import React from "react";

import { Layout } from "../../components/Layout";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import { useGetPostsFromPubUrl } from "../../utils/useGetPostsFromPubUrl";
import NextLink from "next/link";

import {
  useMembersQuery,
  useCreateMemberMutation,
  useMeQuery,
  usePublicationByIdQuery,
} from "../../generated/graphql";
import { createWithApollo } from "../../utils/withApollo";
import { useGetIntegerId } from "../../utils/useGetIntegerId";
import { useApolloClient } from "@apollo/client";
import ErrorPage from "../404";
import { useIsAuth } from "../../utils/useIsAuth";
import { backgroundUrl } from "../../utils/createAvatar";
import { PostCard } from "../../components/PostCard/PostCard";

interface Props {}

createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
});

const Publication: React.FC<Props> = () => {
  const paramId = useGetIntegerId();
  const apolloClient = useApolloClient();
  const { data, loading, error } = useGetPostsFromPubUrl();
  const { data: membersData } = useMembersQuery({
    variables: {
      publicationId: paramId,
    },
  });
  const { data: meData, loading: meLoading } = useMeQuery();
  const {
    data: publicationByIdData,
    loading: publicationByIdLoading,
    error: publicationByIdError,
  } = usePublicationByIdQuery({
    variables: {
      publicationId: paramId,
    },
  });
  const [createMember] = useCreateMemberMutation();

  if (loading)
    return (
      <Layout direction="column" variant="regular">
        loading...
      </Layout>
    );
  if (error) return <ErrorPage />;

  if (!membersData) return null;
  const members = membersData.members.map((member) => member.userId);

  if (publicationByIdLoading) return null;

  if (!publicationByIdData) return <ErrorPage />;

  if (
    publicationByIdData.publicationById.publication === null &&
    publicationByIdData.publicationById.errors === null
  )
    return <ErrorPage />;

  if (publicationByIdError) return <ErrorPage />;

  // render private publication page for not member (login user and guess)
  if (publicationByIdData.publicationById.errors !== null) {
    // if user is guess
    if (meData?.me === null) {
      useIsAuth();
    } else {
      // if login user is not member
      return (
        <Layout direction="column" variant="regular">
          <Wrapper variants="regular">
            Welcome to our publication. Please join with us to see all posts
            <Button
              isLoading={meLoading}
              colorScheme={members.includes(meData!.me!.id) ? "green" : "gray"}
              onClick={async () => {
                await createMember({
                  variables: {
                    publicationId: paramId,
                  },
                });
                await apolloClient.resetStore();
              }}
            >
              {members.includes(meData!.me!.id) ? "Joined" : "Join"}
            </Button>
          </Wrapper>
        </Layout>
      );
    }
  }

  // render publication page for members
  return (
    <Layout direction="column" variant="regular">
      <Wrapper variants="regular">
        <Flex w="100%" direction={{ base: "column", md: "column", lg: "row" }}>
          <Flex
            direction="column"
            w="100%"
            maxW={{ base: "100%", md: "100%", lg: "160px" }}
            mt="30px"
            // display={{ base: "none", md: "none", lg: "inline-flex" }}
          >
            <Image
              w="100%"
              minW="100%"
              h={{ base: "200px", md: "200px", lg: "160px" }}
              objectFit="cover"
              borderRadius="12px"
              boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1)"
              src={
                backgroundUrl[
                  publicationByIdData!.publicationById!.publication!.id % 7
                ]
              }
              mb="10px"
            />
            <Text fontSize="20px" fontWeight="600" textTransform="capitalize">
              {publicationByIdData!.publicationById.publication!.title}
            </Text>
            <Text fontSize="14px" mt="10px" color="gray.600">
              <Text fontWeight="600">Description: </Text>Lorem ipsum dolor sit
              amet consectetur adipisicing elit. Distinctio, dolorum.
            </Text>
            <Button
              mt="20px"
              isLoading={meLoading}
              colorScheme={members.includes(meData!.me!.id) ? "green" : "gray"}
              onClick={async () => {
                await createMember({
                  variables: {
                    publicationId: paramId,
                  },
                });
                await apolloClient.resetStore();
              }}
            >
              {members.includes(meData!.me!.id) ? "Subscribed" : "Subscribe"}
            </Button>
            <NextLink href={`/create-post?publicationId=${paramId}`}>
              <Button mt="10px">Create Post</Button>
            </NextLink>
          </Flex>
          <Box
            flexGrow={1}
            mt="30px"
            ml={{ base: "0px", md: "0px", lg: "70px" }}
            w="100%"
          >
            <Text fontWeight={800} fontSize="18px" mb="20px">
              All posts
            </Text>
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
                md: "repeat(1, 1fr)",
                lg: "repeat(2, 1fr)",
              }}
              gap="30px"
              w="100%"
            >
              {data?.postsByPublicationId?.posts.map((post) => (
                <PostCard post={post} />
              ))}
            </Grid>
          </Box>
        </Flex>
      </Wrapper>
    </Layout>
  );
};

export default createWithApollo({ ssr: true })(Publication);
