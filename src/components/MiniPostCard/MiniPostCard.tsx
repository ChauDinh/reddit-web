import { Avatar, Box, Flex, Heading, Image, Text } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link";
import {
  PostSnippetFragment,
  SinglePostSnippetFragment,
} from "../../generated/graphql";
import { avatarUrlGenerator } from "../../utils/createAvatar";
import { serializedSnippet } from "../../utils/serializedAndDeserialized";
import MiniPostCardStyles from "./MiniPostCard.module.css";

interface Props {
  post: PostSnippetFragment | SinglePostSnippetFragment;
}

export const MiniPostCard: React.FC<Props> = ({ post }) => {
  return (
    <Flex className={MiniPostCardStyles.container}>
      <Flex direction="column" className={MiniPostCardStyles.postInfo}>
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
            <Text
              fontWeight={600}
              color="#000"
              fontSize="15px"
              cursor="pointer"
            >
              {post.creator.username}
            </Text>
          </NextLink>
        </Flex>
        <NextLink href="/post/[id]" as={`/post/${post.id}`}>
          <Heading
            size="md"
            cursor="pointer"
            className={MiniPostCardStyles.postTitle}
          >
            {post.title}
          </Heading>
        </NextLink>
        <NextLink href="/post/[id]" as={`/post/${post.id}`}>
          <Text flexGrow={1} cursor="pointer" mb={1} mr={1}>
            {serializedSnippet(JSON.parse(post.text)).text}
          </Text>
        </NextLink>
        <Text
          className={MiniPostCardStyles.postDate}
          fontSize="14px"
          color="#8a8a8a"
        >
          {new Date(parseInt(post.updatedAt)).toLocaleString().split(",")[0]}
        </Text>
      </Flex>
      <Box className={MiniPostCardStyles.imgPostSize}>
        <NextLink href="/post/[id]" as={`/post/${post.id}`}>
          <Image
            cursor="pointer"
            backgroundSize="cover"
            className={MiniPostCardStyles.postImg}
            height="100%"
            width="100%"
            src={serializedSnippet(JSON.parse(post.text)).imgUrl || ""}
          />
        </NextLink>
      </Box>
    </Flex>
  );
};
