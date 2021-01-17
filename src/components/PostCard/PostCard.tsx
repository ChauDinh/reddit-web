import React from "react";
import NextLink from "next/link";
import { Avatar, Box, Flex, Heading, Text, Image, Link } from "@chakra-ui/core";
import {
  PostSnippetFragment,
  SinglePostSnippetFragment,
} from "../../generated/graphql";
import { serializedSnippet } from "../../utils/serializedAndDeserialized";
import PostCardStyles from "./PostCard.module.css";
import { avatarUrlGenerator } from "../../utils/createAvatar";

interface Props {
  post: PostSnippetFragment | SinglePostSnippetFragment;
}

export const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <Box className={PostCardStyles.post__container}>
      <Text className={PostCardStyles.post__tech}>General</Text>
      <NextLink href="/post/[id]" as={`/post/${post.id}`}>
        <Image
          className={PostCardStyles.post__img}
          src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1604317187/undraw_video_influencer_9oyy_kod7oy.png"
        />
      </NextLink>
      <NextLink href="/post/[id]" as={`/post/${post.id}`}>
        <Flex className={PostCardStyles.postTitle__container}>
          <Heading className={PostCardStyles.post__title}>{post.title}</Heading>
          <Box className={PostCardStyles.fullyPost__title}>{post.title}</Box>
        </Flex>
      </NextLink>
      <NextLink href="/post/[id]" as={`/post/${post.id}`}>
        <Text className={PostCardStyles.post__text}>
          {serializedSnippet(post.text)}
        </Text>
      </NextLink>
      <Flex className={PostCardStyles.post__author}>
        <Avatar size="sm" src={avatarUrlGenerator(post.creator.id)} />
        <Text as={Link} ml={2}>
          {post.creator.username}
        </Text>
        <Text ml={1}>
          {new Date(parseInt(post.updatedAt)).toLocaleString().split(",")[0]}
        </Text>
      </Flex>
    </Box>
  );
};
