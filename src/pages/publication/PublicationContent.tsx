import { Flex, Image, Text, Box, Grid } from "@chakra-ui/react";
import React from "react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

import { Wrapper } from "../../components/Wrapper/Wrapper";
import { backgroundUrl } from "../../utils/createAvatar";
import { PublicationSnippetFragment } from "../../generated/graphql";
import { useGetPostsFromPubUrl } from "../../utils/useGetPostsFromPubUrl";
import { PostCard } from "../../components/PostCard/PostCard";
import { SubscribeBtn } from "./SubscribeBtn";
import { CreatePostInPub } from "./CreatePostInPub";

interface Props {
  publication: PublicationSnippetFragment | undefined;
}

createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
});

export const PublicationContent: React.FC<Props> = ({ publication }) => {
  const { data, loading, error } = useGetPostsFromPubUrl();

  if (!data || error || !data.postsByPublicationId) return null;
  if (loading) return <Wrapper variants="small">loading...</Wrapper>;

  return (
    <Wrapper variants="regular">
      <Flex direction={{ base: "column", md: "column", lg: "row" }} w="100%">
        <Flex
          direction="column"
          w="100%"
          maxW={{ base: "100%", md: "100%", lg: "160px" }}
          mt="30px"
        >
          <Image
            w="100%"
            minW="100%"
            h={{ base: "200px", md: "200px", lg: "160px" }}
            objectFit="cover"
            borderRadius="12px"
            boxShadow="0px 1px 3px rgba(0, 0, 0, 0.1)"
            src={backgroundUrl[publication!.id % 7]}
            mb="10px"
          />
          <Text
            fontSize="20px"
            fontWeight="600"
            textTransform="capitalize"
            mb="10px"
          >
            {publication!.title}
          </Text>
          <Text fontSize="14px" color="gray.600" mb="20px">
            <Text fontWeight="600" display="inline-block">
              Description:{" "}
            </Text>{" "}
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Enim,
            amet.
          </Text>
          <SubscribeBtn publicationId={publication!.id} />
          <CreatePostInPub publicationId={publication!.id} />
        </Flex>
        <Box
          mt="30px"
          flexGrow={1}
          ml={{ base: "0px", md: "0px", lg: "70px" }}
          w="100%"
        >
          <Text fontWeight="800" fontSize="18px" mb="20px">
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
            {data.postsByPublicationId.posts.map((post) => (
              <PostCard post={post} />
            ))}
          </Grid>
        </Box>
      </Flex>
    </Wrapper>
  );
};
