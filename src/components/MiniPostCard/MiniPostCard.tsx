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
      maxH={isColumn ? "500px" : "160px"}
      border="1px"
      borderColor="lightgray"
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
              "https://res.cloudinary.com/dnlthcx1a/image/upload/v1604151136/undraw_code_review_l1q9_wr2xgh.png"
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
          <Text wordBreak="break-all" cursor="pointer" mb={1} mr={1}>
            {serializedSnippet(JSON.parse(post.text)).text}
          </Text>
        </NextLink>
      </Flex>
    </Flex>
  );
};
