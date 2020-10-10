import { useGetIntegerId } from "./useGetIntegerId";
import { usePostQuery } from "../generated/graphql";

export const useGetPostFromUrl = () => {
  const integerId = useGetIntegerId();
  return usePostQuery({
    skip: integerId === -1,
    variables: {
      id: integerId,
    },
  });
};
