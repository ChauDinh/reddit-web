import React from "react";
import { Flex, List, ListIcon, ListItem, Text } from "@chakra-ui/core";
import { BsPeopleCircle } from "react-icons/bs";

import UserProfileStyles from "./UserProfileStyles.module.css";

interface Props {}

export const UserProfile: React.FC<Props> = () => {
  return (
    <Flex className={UserProfileStyles.container} direction="column">
      <Text className={UserProfileStyles.title}>Overview</Text>
      <List className={UserProfileStyles.listItems} spacing={3}>
        <ListItem>
          <ListIcon icon={BsPeopleCircle} />
          Username
        </ListItem>
        <ListItem>
          <ListIcon icon="email" />
          Email
        </ListItem>
      </List>
      <Text className={UserProfileStyles.title}>Works</Text>
    </Flex>
  );
};
