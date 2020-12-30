import { useSubscriberQuery } from "../generated/graphql";
import { useGetIntegerId } from "./useGetIntegerId";
export const useGetFollowerFromUrl = () => {
  const integerId = useGetIntegerId();
  return useSubscriberQuery({
    variables: {
      subscribedId: integerId,
    },
  });
};
