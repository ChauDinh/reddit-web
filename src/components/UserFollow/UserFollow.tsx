import { Flex } from "@chakra-ui/core";
import React from "react";
import { FollowerUsers } from "../FollowerUsers/FollowerUsers";
import { FollowingUsers } from "../FollowingUsers/FollowingUsers";

interface Props {
  id: number;
}

export const UserFollow: React.FC<Props> = ({ id }) => {
  return (
    <Flex direction="column">
      <FollowerUsers id={id} />
      <FollowingUsers id={id} />
    </Flex>
  );
};
