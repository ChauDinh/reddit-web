import { Box, Button, Flex, Grid, Image, Text } from "@chakra-ui/react";
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
import { PublicationPost } from "./PublicationPost";

interface Props {}

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
        <Flex w="100%">
          <Flex direction="column" w="160px" mt="20px">
            <Image
              w="160px"
              minW="160px"
              borderRadius="3px"
              src={`https://picsum.photos/id/${
                publicationByIdData.publicationById.publication!.id
              }/200`}
              mb="10px"
            />
            <Text fontSize="20px" fontWeight="600" textTransform="capitalize">
              {publicationByIdData!.publicationById.publication!.title}
            </Text>
            <Text fontSize="16px" mt="10px" color="gray.600">
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
          <Box flexGrow={1} mt="20px" ml="70px">
            {/* {data?.postsByPublicationId?.posts.map((post) => (
            <MiniPostCard post={post} isColumn={true} key={post.id} />
          ))} */}
            <Grid templateColumns="repeat(3, 1fr)" gap={6}>
              {data?.postsByPublicationId?.posts.map((post) => (
                <PublicationPost post={post} />
              ))}
            </Grid>
          </Box>
        </Flex>
      </Wrapper>
    </Layout>
  );
};

export default createWithApollo({ ssr: true })(Publication);
