import { useGetPostsByCreatorIdQuery } from "../generated/graphql";
import { useGetIntegerId } from "./useGetIntegerId";
export const useGetPostsFromUrl = () => {
  const integerId = useGetIntegerId();
  return useGetPostsByCreatorIdQuery({
    variables: {
      creatorId: integerId,
      limit: 10,
    },
  });
};
