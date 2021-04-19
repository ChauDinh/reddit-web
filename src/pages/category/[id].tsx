import { Box, Flex, Grid } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import React from "react";
import { Layout } from "../../components/Layout";
import { PostCard } from "../../components/PostCard/PostCard";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import { useGetCategoryFromUrl } from "../../utils/useGetCategoryFromUrl";

import { useGetPostsFromCategoryUrl } from "../../utils/useGetPostsFromCategoryUrl";
import { createWithApollo } from "../../utils/withApollo";

createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
});

interface Props {}

const Category: React.FC<Props> = () => {
  const { data, loading, error } = useGetPostsFromCategoryUrl();
  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useGetCategoryFromUrl();

  if (!data || error) return null;
  if (!categoryData || categoryError) return null;

  if (categoryLoading) return null;

  if (loading)
    return (
      <Layout variant="regular" direction="column">
        loading...
      </Layout>
    );

  return (
    <Layout direction="column" variant="regular">
      <Wrapper variants="regular">
        <Box mt="30px" fontSize="20px" fontWeight="800">
          # {categoryData.category?.title}
        </Box>
      </Wrapper>
      <Wrapper variants="regular">
        <Flex direction="column" w="100%">
          <Grid
            w="100%"
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={{
              base: "20px",
              md: "20px",
              lg: "30px",
            }}
          >
            {data.postCategoriesByCategoryId?.map((post) => (
              <PostCard key={post.post.id} post={post.post} />
            ))}
          </Grid>
        </Flex>
      </Wrapper>
    </Layout>
  );
};

export default createWithApollo({ ssr: false })(Category);
