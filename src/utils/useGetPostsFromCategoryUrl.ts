import { usePostCategoriesByCategoryIdQuery } from "../generated/graphql";
import { useGetIntegerId } from "./useGetIntegerId";

export const useGetPostsFromCategoryUrl = () => {
  const integerId = useGetIntegerId();
  return usePostCategoriesByCategoryIdQuery({
    skip: integerId === -1,
    variables: {
      categoryId: integerId,
    },
  });
};
