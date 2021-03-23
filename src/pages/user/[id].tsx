import React from "react";
import { Avatar, Text, Flex, Button, Box } from "@chakra-ui/react";
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
import { useGetFollowingFromUrl } from "../../utils/useGetFollowingFromUrl";
import { useGetFollowerFromUrl } from "../../utils/useGetFollowerFromUrl";
import { FollowButton } from "../../components/FollowButton/FollowButton";
import { BgAndColor } from "../../utils/bgAndColor";
import { PostCard } from "../../components/PostCard/PostCard";

interface Props {}

const User: React.FC<Props> = () => {
  const { data, loading } = useGetUserFromUrl();
  const userAvatarUrl = useGetUserAvatarFromUrl();
  const { data: postsData, loading: postsLoading } = useGetPostsFromUrl();
  const {
    data: followingData,
    loading: followingLoading,
  } = useGetFollowingFromUrl();
  const {
    data: followerData,
    loading: followerLoading,
  } = useGetFollowerFromUrl();
  const { color } = BgAndColor();

  if (loading) {
    return (
      <Layout direction="column" variant="regular">
        ...Loading
      </Layout>
    );
  }

  if (postsLoading) return null;

  if (followingLoading) return null;

  if (followerLoading) return null;

  if (!data?.getUserById) {
    return <Error />;
  }

  if (!postsData?.postsByCreatorId) return null;

  if (!followingData?.subscribed) return null;

  if (!followerData?.subscriber) return null;

  if (data.getUserById === undefined) {
    return null;
  }

  return (
    <Layout variant="regular" direction="column">
      <Wrapper variants="regular">
        <Box className={userProfileStyles.header}>
          <Flex className={userProfileStyles.usernameAndAvatar}>
            <Avatar
              className={userProfileStyles.avatar}
              src={`${userAvatarUrl}`}
            />
            <Text className={userProfileStyles.username}>
              {data.getUserById.username}
            </Text>
          </Flex>
          <Flex className={userProfileStyles.userInfo}>
            <Flex
              className={userProfileStyles.userNameAndBtn}
              alignItems="center"
            >
              <Button
                colorScheme="gray"
                borderColor={color}
                border="1px"
                variant="outline"
                color={color}
                mr={4}
                size="md"
              >
                Message
              </Button>
              <FollowButton
                creator={{
                  username: data.getUserById.username,
                  id: data.getUserById.id,
                }}
              />
            </Flex>
            <Flex className={userProfileStyles.userData}>
              <Text className={userProfileStyles.postsData}>
                <span> {postsData.postsByCreatorId.posts.length}</span>
                {postsData.postsByCreatorId.posts.length > 1
                  ? " posts"
                  : " post"}
              </Text>
              <Text className={userProfileStyles.followersData}>
                <span> {followerData.subscriber.length}</span>
                {followerData.subscriber.length > 1
                  ? " followers"
                  : " follower"}
              </Text>
              <Text className={userProfileStyles.followingData}>
                <span> {followingData.subscribed.length}</span> following
              </Text>
            </Flex>
          </Flex>
          {postsData.postsByCreatorId.posts.map((post) => (
            <PostCard post={post} />
          ))}
        </Box>
      </Wrapper>
    </Layout>
  );
};

export default createWithApollo({ ssr: true })(User);
