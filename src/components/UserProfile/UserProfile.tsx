import React from "react";
import {
  Flex,
  List,
  ListIcon,
  ListItem,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Box,
  Text,
  Textarea,
  Button,
  Avatar,
} from "@chakra-ui/core";
import {
  BsPeopleCircle,
  BsFillCursorFill,
  BsFillStarFill,
} from "react-icons/bs";

import UserProfileStyles from "./UserProfileStyles.module.css";
import {
  handleDateFromCreatedAtAndUpdatedAt,
  handleMonthFromCreatedAt,
  handleYearFromCreatedAt,
} from "../../utils/handleCreatedAtAndUpdatedAtDate";

interface Props {
  username: string;
  email: string;
  joinDate: string;
  updateDate: string;
  avatar: string;
}

export const UserProfile: React.FC<Props> = ({
  username,
  email,
  joinDate,
  updateDate,
  avatar,
}) => {
  return (
    <Flex className={UserProfileStyles.container}>
      <Box className={UserProfileStyles.avatar}>
        <Avatar width="100px" height="100px" src={avatar} />
        <Button width="100%" variant="outline" variantColor="green" mt={6}>
          Follow
        </Button>
      </Box>
      <Box className={UserProfileStyles.overview}>
        <Text className={UserProfileStyles.title}>Overview</Text>
        <List className={UserProfileStyles.listItems} spacing={3}>
          <ListItem>
            <ListIcon icon={BsPeopleCircle} />
            Username:{" "}
            <span style={{ fontSize: "20px", fontWeight: 800 }}>
              {username}
            </span>
          </ListItem>
          <ListItem>
            <ListIcon icon="email" />
            {email !== "" ? `Email ${email}` : `You cannot see the email`}
          </ListItem>
          <ListItem>
            <ListIcon icon="phone" />
            Phone:
          </ListItem>
          <ListItem>
            <ListIcon icon={BsFillCursorFill} />
            Country:
          </ListItem>
          <ListItem>
            <Button w="100%">Edit</Button>
          </ListItem>
        </List>
      </Box>
      <Box className={UserProfileStyles.aboutMe}>
        <Text className={UserProfileStyles.title}>About me</Text>
        <Textarea />
        <Button float="right" mt={3}>
          Edit
        </Button>
      </Box>
      <Box className={UserProfileStyles.member}>
        <Text className={UserProfileStyles.title}>Member</Text>
        <Stat>
          <StatLabel>Become member since</StatLabel>
          <StatNumber>
            {handleMonthFromCreatedAt(parseFloat(joinDate))},{" "}
            {handleYearFromCreatedAt(parseFloat(joinDate))}
          </StatNumber>
          <StatHelpText>
            Latest update:{" "}
            {handleDateFromCreatedAtAndUpdatedAt(parseFloat(updateDate))}
          </StatHelpText>
        </Stat>
        <Button leftIcon={BsFillStarFill} mt={3} variantColor="green">
          Upgrade account
        </Button>
      </Box>
    </Flex>
  );
};
