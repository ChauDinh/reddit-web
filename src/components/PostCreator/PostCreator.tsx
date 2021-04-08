import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

import { avatarUrlGenerator } from "../../utils/createAvatar";
import {
  handleMonthFromCreatedAt,
  handleYearFromCreatedAt,
} from "../../utils/handleCreatedAtAndUpdatedAtDate";
import PostCreatorStyles from "./PostCreator.module.css";
import { FollowButton } from "../FollowButton/FollowButton";

interface Props {
  creator: {
    username: string;
    id: number;
  };
  createdAt: string;
}

export const PostCreator: React.FC<Props> = ({ creator, createdAt }) => {
  return (
    <Flex className={PostCreatorStyles.postCreator__container}>
      <Box className={PostCreatorStyles.postCreator__avatar}>
        <Avatar
          size="md"
          name={creator.username}
          src={avatarUrlGenerator(creator.id)}
          borderRadius="6px"
        />
      </Box>
      <Flex direction="column" className={PostCreatorStyles.postCreator__name}>
        <Text fontSize="14px">
          Posted on {handleMonthFromCreatedAt(parseInt(createdAt))},{" "}
          {handleYearFromCreatedAt(parseInt(createdAt))} by:
        </Text>
        <NextLink href="/user/[id]" as={`/user/${creator.id}`}>
          <Text cursor="pointer" fontWeight={600}>
            {creator.username}
          </Text>
        </NextLink>
      </Flex>
      <FollowButton creator={creator} />
    </Flex>
  );
};
