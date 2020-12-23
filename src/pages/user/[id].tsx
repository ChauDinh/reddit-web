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

import { Wrapper } from "../../components/Wrapper/Wrapper";
import { Layout } from "../../components/Layout";
import { createWithApollo } from "../../utils/withApollo";
import UserProfileStyles from "./UserProfile.module.css";
import { UserProfile } from "../../components/UserProfile/UserProfile";
import { Error } from "../../components/Error/Error";
import {
  useGetUserAvatarFromUrl,
  useGetUserFromUrl,
} from "../../utils/useGetUserFromUrl";

interface Props {}

const User: React.FC<Props> = () => {
  const { data, loading } = useGetUserFromUrl();
  const userAvatarUrl = useGetUserAvatarFromUrl();

  if (loading) {
    return (
      <Layout direction="column" variant="regular">
        ...Loading
      </Layout>
    );
  }

  if (!data?.getUserById) {
    return <Error />;
  }

  return (
    <Layout direction="column" variant="regular">
      <Wrapper variants="regular">
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
              src={userAvatarUrl}
              className={UserProfileStyles.avatar}
            >
              <AvatarBadge size="1.25em" backgroundColor="#E2E8F0" />
            </Avatar>
          </Box>

          <Text className={UserProfileStyles.username}>
            {data?.getUserById?.username}
          </Text>
          {data?.getUserById?.email !== "" ? (
            <Text className={UserProfileStyles.email}>
              <Icon name="email" /> {data?.getUserById?.email}
            </Text>
          ) : null}
          <Divider w="100%" />
          <Tabs className={UserProfileStyles.tabs} isFitted variant="enclosed">
            <TabList>
              <Tab className={UserProfileStyles.tabBtn}>Profile</Tab>
              <Tab className={UserProfileStyles.tabBtn}>Posts</Tab>
              <Tab className={UserProfileStyles.tabBtn}>Reading</Tab>
              <Tab className={UserProfileStyles.tabBtn}>Following</Tab>
            </TabList>

            <TabPanels mt={6}>
              <TabPanel>
                <UserProfile
                  username={data?.getUserById?.username}
                  email={data?.getUserById?.email}
                />
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
        )
      </Wrapper>
    </Layout>
  );
};

export default createWithApollo({ ssr: true })(User);
