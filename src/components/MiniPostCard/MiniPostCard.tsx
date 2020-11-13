import { Avatar, Flex, Heading, Image, Text } from "@chakra-ui/core";
import React from "react";
import {
  PostSnippetFragment,
  SinglePostSnippetFragment,
} from "../../generated/graphql";
import { avatarUrlGenerator } from "../../utils/createAvatar";
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
        <Heading mb={2} size="md" className={MiniPostCardStyles.postTitle}>
          {post.title}
        </Heading>
        <Text
          className={MiniPostCardStyles.postDate}
          fontSize="16px"
          color="#707070"
        >
          {new Date(parseInt(post.updatedAt)).toLocaleString().split(",")[0]}
        </Text>
      </Flex>
      <Image
        className={MiniPostCardStyles.postImg}
        width="200px"
        height="150px"
        src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1604317187/undraw_video_influencer_9oyy_kod7oy.png"
      />
    </Flex>
  );
};
