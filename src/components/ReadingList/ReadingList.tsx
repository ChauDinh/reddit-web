import { Avatar, Flex, Heading, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";
import { usePostsQuery } from "../../generated/graphql";
import ErrorPage from "../../pages/404";
import { avatarUrlGenerator } from "../../utils/createAvatar";
import {
  handleMonthFromCreatedAt,
  handleYearFromCreatedAt,
} from "../../utils/handleCreatedAtAndUpdatedAtDate";

import ReadingListStyles from "./ReadingList.module.css";

interface Props {}

export const ReadingList: React.FC<Props> = () => {
  const { data, error, loading } = usePostsQuery({
    variables: {
      limit: 9,
      cursor: null as null | string,
    },
    notifyOnNetworkStatusChange: true,
  });
  if (!loading && !data) {
    console.error("Error: ", error?.message);
    return <ErrorPage />;
  }
  return (
    <Flex direction="column">
      <Heading className={ReadingListStyles.title} mb="20px" size="md">
        READING LIST
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
          <NextLink href="/post/[id]" as={`/post/${post.id}`}>
            <Heading className={ReadingListStyles.content} size="sm">
              {post.title}
            </Heading>
          </NextLink>
          <Text className={ReadingListStyles.date}>
            {handleMonthFromCreatedAt(parseFloat(post.createdAt))},{" "}
            {handleYearFromCreatedAt(parseFloat(post.createdAt))}
          </Text>
        </Flex>
      ))}
    </Flex>
  );
};
