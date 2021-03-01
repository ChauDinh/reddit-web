import { useGetIntegerId } from "./useGetIntegerId";
import { usePostsByPublicationIdQuery } from "../generated/graphql";

export const useGetPostsFromPubUrl = () => {
  const integerId = useGetIntegerId();
  return usePostsByPublicationIdQuery({
    variables: {
      publicationId: integerId,
      limit: 10,
    },
  });
};
