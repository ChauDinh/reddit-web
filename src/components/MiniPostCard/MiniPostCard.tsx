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

interface Props {
  isColumn?: boolean;
  post: PostSnippetFragment | SinglePostSnippetFragment;
}

export const MiniPostCard: React.FC<Props> = ({ post, isColumn }) => {
  return (
    <Flex
      direction={isColumn ? "column-reverse" : "row"}
      className={MiniPostCardStyles.container}
    >
      <Box
        height={isColumn ? "180px" : ""}
        className={MiniPostCardStyles.imgPostSize}
      >
        <NextLink href="/post/[id]" as={`/post/${post.id}`}>
          <Image
            cursor="pointer"
            backgroundSize="cover"
            className={MiniPostCardStyles.postImg}
            height="100%"
            width="100%"
            src={
              serializedSnippet(JSON.parse(post.text)).imgUrl ||
              "https://res.cloudinary.com/dnlthcx1a/image/upload/v1604151138/undraw_static_assets_rpm6_vjnmqf.png"
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
          <Text
            wordBreak="break-all"
            flexGrow={1}
            cursor="pointer"
            mb={1}
            mr={1}
          >
            {serializedSnippet(JSON.parse(post.text)).text}
          </Text>
        </NextLink>
        <Text
          className={MiniPostCardStyles.postDate}
          fontSize="14px"
          color="#8a8a8a"
        >
          {new Date(parseInt(post.createdAt)).toLocaleString().split(",")[0]}
        </Text>
      </Flex>
    </Flex>
  );
};
