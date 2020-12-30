import React from "react";
import { Avatar, Text, Flex, Button } from "@chakra-ui/core";
import { createWithApollo } from "../../utils/withApollo";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import { Layout } from "../../components/Layout";
import {
  useGetUserAvatarFromUrl,
  useGetUserFromUrl,
} from "../../utils/useGetUserFromUrl";
import { Error } from "../../components/Error/Error";
import userProfileStyles from "./UserProfile.module.css";
import { useGetPostsFromUrl } from "../../utils/useGetPostsFromUrl";

interface Props {}

const User: React.FC<Props> = () => {
  const { data, loading } = useGetUserFromUrl();
  const userAvatarUrl = useGetUserAvatarFromUrl();
  const { data: postsData, loading: postsLoading } = useGetPostsFromUrl();

  if (loading) {
    return (
      <Layout direction="column" variant="regular">
        ...Loading
      </Layout>
    );
  }

  if (postsLoading) return null;

  if (!data?.getUserById) {
    return <Error />;
  }

  if (!postsData?.postsByCreatorId) return null;

  if (data.getUserById === undefined) {
    return null;
  }

  return (
    <Layout variant="regular" direction="column">
      <Wrapper variants="regular">
        <Flex>
          <Avatar
            className={userProfileStyles.avatar}
            src={`${userAvatarUrl}`}
          />
          <Flex className={userProfileStyles.userInfo}>
            <Flex>
              <Text className={userProfileStyles.username}>
                {data.getUserById.username}
              </Text>
              <Button size="xs">Following</Button>
            </Flex>
            <Flex>
              <Text>{postsData?.postsByCreatorId?.posts.length}</Text>
            </Flex>
          </Flex>
        </Flex>
      </Wrapper>
    </Layout>
  );
};

export default createWithApollo({ ssr: true })(User);
