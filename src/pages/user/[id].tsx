import React from "react";
import {
  Text,
  AvatarBadge,
  Avatar,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Divider,
  Icon,
  Box,
} from "@chakra-ui/core";
import { useRouter } from "next/router";

import { Wrapper } from "../../components/Wrapper/Wrapper";
import { useGetUserByIdQuery } from "../../generated/graphql";
import { avatarUrlGenerator } from "../../utils/createAvatar";
import { Layout } from "../../components/Layout";
import { createWithApollo } from "../../utils/withApollo";
import UserProfileStyles from "./UserProfile.module.css";
import { UserProfile } from "../../components/UserProfile/UserProfile";
import { Error } from "../../components/Error/Error";

interface Props {}

const User: React.FC<Props> = () => {
  const router = useRouter();
  const userId: number = parseInt(router.query.id as string);
  const [userData, setUserData] = React.useState({} as any);

  if (!userId) {
    return <Error />;
  }

  const { data, loading } = useGetUserByIdQuery({
    variables: {
      id: userId,
    },
  });

  React.useEffect(() => {
    if (data?.getUserById?.username) {
      setUserData(data);
    } else if (!data?.getUserById?.username) {
      setUserData(null);
    }

    return () => {
      console.log("unmounted!");
    };
  }, [userData?.getUserById, userId]);

  return (
    <Layout direction="column" variant="regular">
      {userData ? (
        <Wrapper variants="regular">
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <Flex
              w="100%"
              direction="column"
              alignItems="center"
              justifyContent="center"
              className={UserProfileStyles.container}
            >
              <Box className={UserProfileStyles.header}>
                <Avatar
                  height="130px"
                  width="130px"
                  borderRadius="full"
                  src={avatarUrlGenerator(userId)}
                  className={UserProfileStyles.avatar}
                >
                  <AvatarBadge size="1.25em" backgroundColor="#E2E8F0" />
                </Avatar>
              </Box>

              <Text className={UserProfileStyles.username}>
                {userData.getUserById?.username}
              </Text>
              {userData.getUserById?.email !== "" ? (
                <Text className={UserProfileStyles.email}>
                  <Icon name="email" /> {userData.getUserById?.email}
                </Text>
              ) : null}
              <Divider w="100%" />
              <Tabs
                className={UserProfileStyles.tabs}
                isFitted
                variant="enclosed"
              >
                <TabList>
                  <Tab className={UserProfileStyles.tabBtn}>Profile</Tab>
                  <Tab className={UserProfileStyles.tabBtn}>Posts</Tab>
                  <Tab className={UserProfileStyles.tabBtn}>Reading</Tab>
                  <Tab className={UserProfileStyles.tabBtn}>Following</Tab>
                </TabList>

                <TabPanels mt={6}>
                  <TabPanel>
                    <UserProfile />
                  </TabPanel>
                  <TabPanel>
                    <p>two!</p>
                  </TabPanel>
                  <TabPanel>
                    <p>three!</p>
                  </TabPanel>
                  <TabPanel>four</TabPanel>
                </TabPanels>
              </Tabs>
            </Flex>
          )}
        </Wrapper>
      ) : (
        <Error />
      )}
      {/* <br />
        <ul>
          <li>username</li>
          <li>email</li>
          <li>avatar</li>
          <li>posts by userId</li>
          <li>points per post</li>
          <li>following (username, email)</li>
          <li>followers (username, email)</li>
          <li>reading list (one-one to user, many-many to post)</li>
          <li>realtime chatting (graphql subscription)</li>
          <li>edit profile: changing password (generate a token)</li>
          <li>edit profile: upload avatar</li>
          <li>edit profile: change username</li>
          <li>
            edit profile: change email (including validate the new one exists on
            db or not)
          </li>
          <li>upgrade premium member (with visa/master card)</li>
        </ul> */}
    </Layout>
  );
};

export default createWithApollo({ ssr: true })(User);
