import React from "react";
import { Box } from "@chakra-ui/react";

import { useCategoriesQuery } from "../../generated/graphql";
import { CategoryTag } from "./CategoryTag";

interface Props {}

export const CategoryTags: React.FC<Props> = () => {
  const { data, error, loading } = useCategoriesQuery({
    notifyOnNetworkStatusChange: true,
  });

  if (loading) return <Box>loading...</Box>;
  if (error) return null;

  console.log(data);

  return (
    <Box spacing={4}>
      {data?.categories?.map((category) => (
        <CategoryTag id={category.id} title={category.title} />
      ))}
    </Box>
  );
};
