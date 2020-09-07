import { useGetIntegerId } from "./useGetIntegerId";
import { usePostQuery } from "../generated/graphql";

export const useGetPostFromUrl = () => {
  const integerId = useGetIntegerId();
  return usePostQuery({
    pause: integerId === -1,
    variables: {
      id: integerId,
    },
  });
};
