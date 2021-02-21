import { usePostCategoriesByPostIdQuery } from "../generated/graphql";

export const useGetCategories = (postId: number) => {
  return usePostCategoriesByPostIdQuery({
    variables: {
      postId: postId,
    },
  });
};
