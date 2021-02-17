import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useApolloClient } from "@apollo/client";
import {
  useMeQuery,
  useSubscribedQuery,
  useSubscribeMutation,
} from "../../generated/graphql";
import { avatarUrlGenerator } from "../../utils/createAvatar";
import {
  handleMonthFromCreatedAt,
  handleYearFromCreatedAt,
} from "../../utils/handleCreatedAtAndUpdatedAtDate";
import PostCreatorStyles from "./PostCreator.module.css";

interface Props {
  creator: {
    username: string;
    id: number;
  };
  createdAt: string;
}

export const PostCreator: React.FC<Props> = ({ creator, createdAt }) => {
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

  console.log(subscribedData?.subscribed);

  return (
    <Flex className={PostCreatorStyles.postCreator__container}>
      <Box className={PostCreatorStyles.postCreator__avatar}>
        <Avatar
          size="md"
          name={creator.username}
          src={avatarUrlGenerator(creator.id)}
        />
      </Box>
      <Flex direction="column" className={PostCreatorStyles.postCreator__name}>
        <Text fontSize="14px" color="rgba(0, 0, 0, 0.8)">
          Posted on {handleMonthFromCreatedAt(parseInt(createdAt))},{" "}
          {handleYearFromCreatedAt(parseInt(createdAt))} by:
        </Text>
        <NextLink href="/user/[id]" as={`/user/${creator.id}`}>
          <Text cursor="pointer" fontWeight={600}>
            {creator.username}
          </Text>
        </NextLink>
      </Flex>
      <Button
        isLoading={loading}
        isDisabled={data?.me?.username ? false : true}
        colorScheme={
          subscribedData?.subscribed?.includes(creator.id) ? "green" : "gray"
        }
        fontSize="65%"
        className={PostCreatorStyles.postCreator__followBtn}
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
    </Flex>
  );
};
