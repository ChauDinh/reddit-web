import { Avatar, Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import {
  PostSnippetFragment,
  SinglePostSnippetFragment,
} from "../../generated/graphql";
import { avatarUrlGenerator } from "../../utils/createAvatar";
import { serializedSnippet } from "../../utils/serializedAndDeserialized";
import MiniPostCardStyles from "./MiniPostCard.module.css";
import { useGetCategories } from "../../utils/useGetCategories";
import ErrorPage from "../../pages/404";

interface Props {
  isColumn?: boolean;
  post: PostSnippetFragment | SinglePostSnippetFragment;
}

export const MiniPostCard: React.FC<Props> = ({ post, isColumn }) => {
  const { data, loading, error } = useGetCategories(post.id);

  if (loading) return null;
  if (error) return <ErrorPage />;
  if (!data?.postCategoriesByPostId) return <ErrorPage />;

  return (
    <Flex
      direction="column"
      className={MiniPostCardStyles.container}
      maxH={isColumn ? "500px" : "160px"}
      borderRadius="none"
      position="relative"
    >
      <Box
        height={isColumn ? "180px" : ""}
        className={MiniPostCardStyles.imgPostSize}
        display={isColumn ? "flex" : "block"}
        justifyContent={isColumn ? "center" : "normal"}
        marginRight={isColumn ? "0px" : "10px"}
      >
        <NextLink href="/post/[id]" as={`/post/${post.id}`}>
          <Image
            height="100%"
            maxHeight={isColumn ? "none" : "150px"}
            width="100%"
            cursor="pointer"
            src={
              serializedSnippet(JSON.parse(post.text)).imgUrl ||
              "https://res.cloudinary.com/dnlthcx1a/image/upload/v1615276978/undraw_Code_review_re_woeb_jfaoij.png"
            }
          />
        </NextLink>
      </Box>
      <Flex
        direction="column"
        mt={isColumn ? "10px" : "0"}
        className={MiniPostCardStyles.postInfo}
      >
        <Flex
          className={MiniPostCardStyles.postCreator}
          alignItems="center"
          mb={2}
        >
          <NextLink href="/user/[id]" as={`/user/${post.creator.id}`}>
            <Avatar
              cursor="pointer"
              mr={2}
              size="xs"
              src={avatarUrlGenerator(post.creator.id)}
            />
          </NextLink>
          <NextLink href="/user/[id]" as={`/user/${post.creator.id}`}>
            <Text fontWeight={600} fontSize="15px" cursor="pointer">
              {post.creator.username}
            </Text>
          </NextLink>
          {","}
          <Text
            className={MiniPostCardStyles.postDate}
            fontSize="15px"
            color="#8a8a8a"
            ml={2}
          >
            {new Date(parseInt(post.createdAt)).toLocaleString().split(",")[0]}
          </Text>
        </Flex>
        <NextLink href="/post/[id]" as={`/post/${post.id}`}>
          <Heading
            size="md"
            cursor="pointer"
            flexGrow={1}
            className={MiniPostCardStyles.postTitle}
          >
            {post.title}
          </Heading>
        </NextLink>
        <NextLink href="/post/[id]" as={`/post/${post.id}`}>
          <Text
            wordBreak="break-all"
            cursor="pointer"
            mb={1}
            mr={1}
            colorScheme="gray"
            color="gray.500"
          >
            {serializedSnippet(JSON.parse(post.text)).text}
          </Text>
        </NextLink>
      </Flex>
      <Box
        position="absolute"
        left="10px"
        bottom="16px"
        colorScheme="blackAlpha"
        bg="blackAlpha.900"
        color="white"
        padding="0 10px"
        paddingTop={data.postCategoriesByPostId.length === 0 ? "" : "3px"}
        paddingBottom={data.postCategoriesByPostId.length === 0 ? "" : "3px"}
        borderRadius="3px"
        fontSize="10px"
        fontWeight="600"
      >
        {data!.postCategoriesByPostId[0]?.categories.title}
      </Box>
    </Flex>
  );
};
