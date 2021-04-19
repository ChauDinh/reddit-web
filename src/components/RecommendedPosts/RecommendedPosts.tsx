import { Box } from "@chakra-ui/react";
import React from "react";
import { usePostCategoriesQuery } from "../../generated/graphql";
import { mappingPosts } from "../../utils/mappingPosts";

interface Props {}

export const RecommendedPosts: React.FC<Props> = () => {
  const { data, error, loading } = usePostCategoriesQuery();

  if (!data) return null;
  if (error) {
    console.error(error);
    return null;
  }
  if (loading) return <Box>loading...</Box>;

  let responses = mappingPosts(data!.postCategories!);

  console.log("[DATA]: ", responses);
  return <Box>Hello, this is recommended posts</Box>;
};
