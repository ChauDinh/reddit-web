import { avatarUrlGenerator } from "./createAvatar";
import { useGetUserByIdQuery } from "../generated/graphql";
import { useGetIntegerId } from "./useGetIntegerId";

export const useGetUserFromUrl = () => {
  const integerId = useGetIntegerId();

  return useGetUserByIdQuery({
    skip: integerId === -1,
    variables: {
      id: integerId,
    },
  });
};

export const useGetUserAvatarFromUrl = () => {
  const integerId = useGetIntegerId();

  return avatarUrlGenerator(integerId);
};
