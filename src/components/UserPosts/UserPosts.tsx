import { Stack, Text } from "@chakra-ui/core";
import React from "react";
import NextLink from "next/link";
import { useGetPostsByCreatorIdQuery } from "../../generated/graphql";
import {
  handleDateFromCreatedAt,
  handleMonthFromCreatedAt,
  handleYearFromCreatedAt,
} from "../../utils/handleCreatedAtAndUpdatedAtDate";
import { useGetIntegerId } from "../../utils/useGetIntegerId";
import { Error } from "../Error/Error";
import UserPostStyles from "./UserPostStyles.module.css";

interface Props {}

export const UserPosts: React.FC<Props> = () => {
  const { data, loading } = useGetPostsByCreatorIdQuery({
    variables: {
      creatorId: useGetIntegerId(),
      limit: 10,
    },
  });

  if (loading) {
    return <Text>...Loading</Text>;
  }

  if (!data?.postsByCreatorId) {
    return <Error />;
  }

  if (data.postsByCreatorId.posts.length === 0) {
    return <Text>There is still no post yet!</Text>;
  }

  return (
    <Stack spacing={8}>
      {/* {data.postsByCreatorId.posts.map((post) => (
        <Box key={post.id}>{post.title}</Box>
      ))} */}
      <table className={UserPostStyles.table}>
        <tr className={UserPostStyles.tableHeadings}>
          <th className={UserPostStyles.tableHeading}>ID</th>
          <th className={UserPostStyles.tableHeading}>Title</th>
          <th className={UserPostStyles.tableHeading}>Created at</th>
          <th className={UserPostStyles.tableHeading}>Updated at</th>
        </tr>
        {data.postsByCreatorId.posts.map((post) => (
          <tr key={post.id} className={UserPostStyles.tableItem}>
            <NextLink href="/post/[id]" as={`/post/${post.id}`}>
              <td className={UserPostStyles.itemId}>{post.id}</td>
            </NextLink>
            <NextLink href="/post/[id]" as={`/post/${post.id}`}>
              <td className={UserPostStyles.itemTitle}>{post.title}</td>
            </NextLink>
            <td className={UserPostStyles.itemCreatedAt}>
              {handleDateFromCreatedAt(parseFloat(post.createdAt))},{" "}
              {handleMonthFromCreatedAt(parseFloat(post.createdAt))},{" "}
              {handleYearFromCreatedAt(parseFloat(post.createdAt))}
            </td>
            <td className={UserPostStyles.itemUpdatedAt}>
              {handleDateFromCreatedAt(parseFloat(post.updatedAt))},{" "}
              {handleMonthFromCreatedAt(parseFloat(post.updatedAt))},{" "}
              {handleYearFromCreatedAt(parseFloat(post.updatedAt))}
            </td>
          </tr>
        ))}
      </table>
    </Stack>
  );
};
