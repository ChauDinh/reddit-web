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
          <Avatar mr={2} size="xs" src={avatarUrlGenerator(post.creator.id)} />
          <Text fontSize="16px">{post.creator.username}</Text>
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
          <Text flexGrow={1} cursor="pointer" mb={2}>
            {serializedSnippet(JSON.parse(post.text))}
          </Text>
        </NextLink>
        <Text
          className={MiniPostCardStyles.postDate}
          fontSize="16px"
          color="#707070"
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
            src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1604317187/undraw_video_influencer_9oyy_kod7oy.png"
          />
        </NextLink>
      </Box>
    </Flex>
  );
};
