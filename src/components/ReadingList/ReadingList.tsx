import { Avatar, Flex, Heading, Text } from "@chakra-ui/core";
import React from "react";
import { usePostsQuery } from "../../generated/graphql";
import ErrorPage from "../../pages/404";
import { avatarUrlGenerator } from "../../utils/createAvatar";

import ReadingListStyles from "./ReadingList.module.css";

interface Props {}

export const ReadingList: React.FC<Props> = () => {
  const { data, error, loading } = usePostsQuery({
    notifyOnNetworkStatusChange: true,
  });
  if (!loading && !data) {
    console.error("Error: ", error?.message);
    return <ErrorPage />;
  }
  return (
    <Flex direction="column">
      <Heading mb={4} size="sm">
        📘 READING LIST
      </Heading>
      {data?.posts.posts.map((post) => (
        <Flex
          className={ReadingListStyles.container}
          key={post.id}
          direction="column"
        >
          <Flex alignItems="center">
            <Avatar
              mr={2}
              size="2xs"
              src={avatarUrlGenerator(post.creator.id)}
            />
            <Text className={ReadingListStyles.author}>
              {post.creator.username}
            </Text>
          </Flex>
          <Heading className={ReadingListStyles.content} size="sm">
            {post.title}
          </Heading>
          <Text className={ReadingListStyles.date}>{post.createdAt}</Text>
        </Flex>
      ))}
    </Flex>
  );
};
