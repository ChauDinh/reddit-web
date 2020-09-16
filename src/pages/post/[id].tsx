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
import { withUrqlClient } from "next-urql";
import React from "react";
import { Layout } from "../../components/Layout";
import { createUrqlClient } from "../../utils/createUrqlClient";
import { useGetPostFromUrl } from "../../utils/useGetPostFromUrl";
import { UpdootSection } from "../../components/UpdootSection";

interface Props {}

const Post: React.FC<Props> = () => {
  const [{ data, fetching }] = useGetPostFromUrl();
  if (fetching) {
    return (
      <Layout direction="column" variant="regular">
        ...loading
      </Layout>
    );
  }
  if (!data?.post) {
    return <Layout direction="column">Could not find post</Layout>; // 404 page
  }

  return (
    <Layout direction="column" variant="regular">
      <UpdootSection post={data?.post} />
      <Flex
        width="100%"
        p={4}
        borderRadius="3px"
        background="#fff"
        flexDirection="column"
      >
        <Flex mb={1}>
          <Text mr={2} fontSize="xs">
            Posted by {data.post.creator.username}
          </Text>
          <Text fontSize="xs"> 7 hours ago</Text>
        </Flex>
        <Heading size="md" mb={2}>
          {data.post.title}
        </Heading>
        <Text mb={3}>{data.post.text}</Text>
        <hr />
        <Flex mt={2} alignItems="center" justifyContent="flex-start">
          <Box mr={4} fontSize="sm" color="#8e9296" fontWeight={600}>
            <Icon mb="2px" mr={1} name="star" />
            Award
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
            <Button fontSize="sm" variantColor="blue">
              Send
            </Button>
          </InputGroup>
          <Text mt={10}>The post has no comment</Text>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
