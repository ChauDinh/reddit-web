import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/core";
import React from "react";
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
  return (
    <Flex className={PostCreatorStyles.postCreator__container}>
      <Box className={PostCreatorStyles.postCreator__avatar}>
        <Avatar
          size="lg"
          name={creator.username}
          src={avatarUrlGenerator(creator.id)}
        />
      </Box>
      <Flex direction="column" className={PostCreatorStyles.postCreator__name}>
        <Text fontSize="14px" color="rgba(0, 0, 0, 0.8)">
          Posted on {handleMonthFromCreatedAt(parseInt(createdAt))},{" "}
          {handleYearFromCreatedAt(parseInt(createdAt))} by:
        </Text>
        <Text fontWeight={600}>{creator.username}</Text>
        <Text fontSize="18px">@social__account | position</Text>
      </Flex>
      <Button
        variantColor="green"
        variant="outline"
        className={PostCreatorStyles.postCreator__followBtn}
      >
        Follow
      </Button>
    </Flex>
  );
};
