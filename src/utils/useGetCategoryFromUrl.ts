import { useCategoryQuery } from "../generated/graphql";
import { useGetIntegerId } from "./useGetIntegerId";
export const useGetCategoryFromUrl = () => {
  const categoryId = useGetIntegerId();
  return useCategoryQuery({
    variables: { id: categoryId },
  });
};
