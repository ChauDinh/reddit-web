import {
  Heading,
  Text,
  Flex,
  Box,
  Icon,
  Input,
  InputGroup,
  Button,
} from "@chakra-ui/core";
import React from "react";
import { Node } from "slate";
import { Layout } from "../../components/Layout";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import { UpdootSection } from "../../components/UpdootSection/UpdootSection";
import EditAndDeleteButton from "../../components/EditAndDeleteButton";
import { serialized } from "../../utils/serializedAndDeserialized";
import { RenderText } from "../../components/RenderText";
import { createWithApollo } from "../../utils/withApollo";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import SinglePostStyles from "./SinglePost.module.css";

interface Props {}

const Post: React.FC<Props> = () => {
  const { data, loading } = useGetPostFromUrl();
  if (loading) {
    return (
      <Layout direction="column" variant="regular">
        ...loading
      </Layout>
    );
  }
  if (!data?.post) {
    return (
      <Layout variant="regular" direction="column">
        Could not find post
      </Layout>
    ); // 404 page
  }

  const htmlString = JSON.parse(data.post.text)
    .map((n: Node) => serialized(n))
    .join("\n");

  return (
    <Layout direction="column" variant="regular">
      <Wrapper variants="regular">
        <UpdootSection post={data?.post} />
        <Flex
          width="100%"
          p={4}
          borderRadius="3px"
          background="#fff"
          flexDirection="column"
        >
          <Flex mb={1} alignItems="center" justifyContent="space-between">
            <Text mr={2} fontSize="xs">
              Posted by {data.post.creator.username} 7 hours ago
            </Text>
            <EditAndDeleteButton post={data.post} />
          </Flex>
          <Heading fontSize="36px" mb={2}>
            {data.post.title}
          </Heading>
          <Box mb={3}>
            <RenderText str={htmlString} />
          </Box>
          <hr />
          <Flex mt={2} alignItems="center" justifyContent="flex-start">
            <Box
              className={SinglePostStyles.award__btn}
              mr={4}
              fontSize="sm"
              color="#8e9296"
              fontWeight={600}
            >
              <Icon mb="2px" mr={1} name="star" />
              Award
              <Box className={SinglePostStyles.reaction__box}>
                <Box className={SinglePostStyles.reaction__icon}>
                  👍
                  <Text className={SinglePostStyles.reaction__label}>Like</Text>
                </Box>
                <Box className={SinglePostStyles.reaction__icon}>
                  ❤️
                  <Text className={SinglePostStyles.reaction__label}>Love</Text>
                </Box>
                <Box className={SinglePostStyles.reaction__icon}>
                  🐸
                  <Text className={SinglePostStyles.reaction__label}>Haha</Text>
                </Box>
                <Box className={SinglePostStyles.reaction__icon}>
                  🙊
                  <Text className={SinglePostStyles.reaction__label}>Wow</Text>
                </Box>
                <Box className={SinglePostStyles.reaction__icon}>
                  😿
                  <Text className={SinglePostStyles.reaction__label}>Sad</Text>
                </Box>
                <Box className={SinglePostStyles.reaction__icon}>
                  👿
                  <Text className={SinglePostStyles.reaction__label}>
                    Angry
                  </Text>
                </Box>
              </Box>
            </Box>
            <Box mr={4} fontSize="sm" color="#8e9296" fontWeight={600}>
              <Icon mr={1} name="chat" />
              Comments
            </Box>
            <Box mr={4} fontSize="sm" color="#8e9296" fontWeight={600}>
              <Icon mb="2px" mr={1} name="external-link" />
              Share
            </Box>
          </Flex>
          <Flex mt={4} flexDirection="column">
            <InputGroup>
              <Input fontSize="sm" placeholder="Create comments" mr={2} />
              <Button fontSize="sm" variantColor="purple">
                Send
              </Button>
            </InputGroup>
            <Text mt={10}>The post has no comment</Text>
          </Flex>
        </Flex>
      </Wrapper>
    </Layout>
  );
};

export default createWithApollo({ ssr: true })(Post);
