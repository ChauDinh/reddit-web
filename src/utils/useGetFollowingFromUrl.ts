import { useSubscribedQuery } from "../generated/graphql";
import { useGetIntegerId } from "./useGetIntegerId";

export const useGetFollowingFromUrl = () => {
  const integerId = useGetIntegerId();
  return useSubscribedQuery({
    variables: {
      subscriberId: integerId,
    },
  });
};
