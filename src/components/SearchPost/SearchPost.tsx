import { Grid } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import React from "react";
import { PostCard } from "../PostCard/PostCard";

interface Props {
  posts: any;
}

createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
});

export const SearchPost: React.FC<Props> = ({ posts }) => {
  let mapResults = new Map();

  for (let i = 0; i < posts.length; i++) {
    mapResults.set(`${posts[i].postId}`, posts[i]);
  }
  console.log("[MAP RESULTS]: ", mapResults);

  const results = [];

  for (let [key, value] of mapResults as any) {
    results.push({
      postId: key,
      post: value.post,
    });
  }

  return (
    <Grid
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(3, 1fr)",
      }}
      gap={{ base: "20px", md: "20px", lg: "30px" }}
    >
      {results.map((result) => (
        <PostCard key={result.postId} post={result.post} />
      ))}
    </Grid>
  );
};
