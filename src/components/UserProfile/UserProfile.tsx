import React from "react";
import { Flex, List, ListIcon, ListItem, Text } from "@chakra-ui/core";
import { BsPeopleCircle } from "react-icons/bs";

import UserProfileStyles from "./UserProfileStyles.module.css";

interface Props {
  username: string;
  email: string;
}

export const UserProfile: React.FC<Props> = ({ username, email }) => {
  return (
    <Flex className={UserProfileStyles.container} direction="column">
      <Text className={UserProfileStyles.title}>Overview</Text>
      <List className={UserProfileStyles.listItems} spacing={3}>
        <ListItem>
          <ListIcon icon={BsPeopleCircle} />
          Username {username}
        </ListItem>
        <ListItem>
          <ListIcon icon="email" />
          {email !== "" ? `Email ${email}` : `You cannot see the email`}
        </ListItem>
      </List>
      <Text className={UserProfileStyles.title}>Works</Text>
    </Flex>
  );
};
