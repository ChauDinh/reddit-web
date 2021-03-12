import { useApolloClient } from "@apollo/client";
import { Button } from "@chakra-ui/react";
import React from "react";
import {
  useMeQuery,
  useSubscribedQuery,
  useSubscribeMutation,
} from "../../generated/graphql";

interface Props {
  creator: {
    username: string;
    id: number;
  };
}

export const FollowButton: React.FC<Props> = ({ creator }) => {
  const { data, loading } = useMeQuery();
  const apolloClient = useApolloClient();
  const {
    data: subscribedData,
    // loading: subscribedLoading,
  } = useSubscribedQuery({
    variables: {
      subscriberId: data?.me?.id || -1,
    },
  });
  const [subscribe] = useSubscribeMutation();
  return (
    <Button
      isLoading={loading}
      isDisabled={data?.me?.username ? false : true}
      colorScheme={
        subscribedData?.subscribed?.includes(creator.id)
          ? "yellow"
          : "blackAlpha"
      }
      fontSize="65%"
      ml="20px"
      onClick={async () => {
        await subscribe({
          variables: {
            subscribedId: creator.id,
          },
        });
        await apolloClient.resetStore();
      }}
    >
      {subscribedData?.subscribed?.includes(creator.id)
        ? "Following"
        : "Follow"}
    </Button>
  );
};
