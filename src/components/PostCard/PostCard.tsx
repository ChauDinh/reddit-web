import { Flex, Image, Text, Heading } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

import {
  PostSnippetFragment,
  SinglePostSnippetFragment,
} from "../../generated/graphql";
import { serializedSnippet } from "../../utils/serializedAndDeserialized";
import { avatarUrlGenerator, backgroundUrl } from "../../utils/createAvatar";
import { useGetCategories } from "../../utils/useGetCategories";
import ErrorPage from "../../pages/404";

interface Props {
  post: PostSnippetFragment | SinglePostSnippetFragment;
}

export const PostCard: React.FC<Props> = ({ post }) => {
  const { data, loading, error } = useGetCategories(post.id);

  if (loading) return null;
  if (error) return <ErrorPage />;
  if (!data?.postCategoriesByPostId) return <ErrorPage />;

  return (
    <NextLink href="/post/[id]" as={`/post/${post.id}`}>
      <Flex
        direction="column"
        _hover={{
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
        }}
        cursor="pointer"
        borderRadius="12px"
        shadow="md"
      >
        <Image
          src={
            serializedSnippet(JSON.parse(post.text)).imgUrl ||
            backgroundUrl[post.id % 7]
          }
          bg="gray.200"
          borderRadius="12px 12px 0 0"
          w="100%"
          h={{ base: "56,25%", md: "256px", lg: "256px" }}
          objectFit="cover"
          mb="10px"
        />
        <Text
          fontSize="14px"
          color="gray.500"
          textTransform="uppercase"
          display="inline-block"
          mb="5px"
          padding="0 15px"
        >
          {data!.postCategoriesByPostId[0]?.categories.title || "no category"}
        </Text>
        <Heading
          as="h3"
          size="md"
          mb="10px"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
            maxWidth: "100%",
          }}
          flexGrow={1}
          padding="0 15px"
        >
          {post.title}
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
          padding="0 15px"
        >
          {serializedSnippet(JSON.parse(post.text)).text}
        </Text>
        <Flex alignItems="center" padding="15px" paddingTop="0px">
          <Image
            src={avatarUrlGenerator(post.creatorId)}
            width="40px"
            height="40px"
            borderRadius="10px"
            objectFit="cover"
            flexShrink={0}
            mr="10px"
          />
          <Flex direction="column">
            <Text fontWeight={600} fontSize="14px" mb="5px">
              By: {post.creator.username}
            </Text>
            <Text fontSize="12px" color="gray.500" fontWeight="300">
              {
                new Date(parseInt(post.createdAt))
                  .toLocaleString()
                  .split(",")[0]
              }
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </NextLink>
  );
};
