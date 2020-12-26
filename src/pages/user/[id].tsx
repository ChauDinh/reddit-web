import React from "react";
import {
  Avatar,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Button,
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
import { UserPosts } from "../../components/UserPosts/UserPosts";
import { UserFollow } from "../../components/UserFollow/UserFollow";

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
          mt="40px"
          w="100%"
          direction="column"
          alignItems="center"
          justifyContent="center"
          className={UserProfileStyles.container}
        >
          <Tabs className={UserProfileStyles.tabs}>
            <TabList className={UserProfileStyles.tabList}>
              <Tab className={UserProfileStyles.tabBtn}>
                <Avatar
                  borderRadius="full"
                  src={userAvatarUrl}
                  className={UserProfileStyles.avatar}
                ></Avatar>
                <span>PROFILE</span>
              </Tab>
              <Tab className={UserProfileStyles.tabBtn}>POSTS</Tab>
              <Tab className={UserProfileStyles.tabBtn}>READING</Tab>
              <Tab className={UserProfileStyles.tabBtn}>FOLLOWING</Tab>
            </TabList>
            <Flex className={UserProfileStyles.msgAndFollowBtn}>
              <Button
                variant="outline"
                variantColor="green"
                onClick={() => window.alert("Hi")}
                className={UserProfileStyles.followBtn}
              >
                Follow
              </Button>
              <Button
                variant="outline"
                variantColor="blue"
                onClick={() =>
                  window.alert("Sorry! This feature will coming soon :(")
                }
                className={UserProfileStyles.msgBtn}
              >
                Direct Message
              </Button>
            </Flex>
            <TabPanels mt={6}>
              <TabPanel>
                <UserProfile
                  username={data?.getUserById?.username}
                  email={data?.getUserById?.email}
                  joinDate={data.getUserById.createdAt}
                  updateDate={data.getUserById.updatedAt}
                  avatar={userAvatarUrl}
                />
              </TabPanel>
              <TabPanel>
                <UserPosts />
              </TabPanel>
              <TabPanel>
                <p>Sorry, these feature is not ready yet :( </p>
              </TabPanel>
              <TabPanel>
                <UserFollow id={data.getUserById.id} />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Wrapper>
    </Layout>
  );
};

export default createWithApollo({ ssr: true })(User);
