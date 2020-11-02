import { Heading, Text, Flex, Box, Icon, Button } from "@chakra-ui/core";
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
import { InputField } from "../../components/InputField";
import { Form, Formik } from "formik";
import { useCreateCommentMutation } from "../../generated/graphql";
import { BoxComment } from "../../components/BoxComment/BoxComment";
import { useRouter } from "next/router";

interface Props {}

const Post: React.FC<Props> = () => {
  const router = useRouter();
  const [createComment] = useCreateCommentMutation();

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
        <Flex direction="column" alignItems="flex-start">
          <UpdootSection post={data?.post} />
          <EditAndDeleteButton post={data.post} />
        </Flex>
        <Flex
          width="100%"
          p={4}
          borderRadius="3px"
          background="#fff"
          flexDirection="column"
        >
          <Text mr={2} fontSize="xs">
            Posted by {data.post.creator.username} 7 hours ago
          </Text>
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
          <Flex mt={0} flexDirection="column">
            <Formik
              initialValues={{ comment: "" }}
              onSubmit={async (values) => {
                console.log(values);
                const { errors } = await createComment({
                  variables: {
                    input: { text: values.comment, postId: data.post!.id },
                  },
                });
                if (errors) {
                  console.error(errors);
                }
                router.reload();
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Flex alignItems="flex-end" justifyContent="space-between">
                    <Flex alignItems="center" h="100%" flexGrow={1}>
                      <InputField name="comment" placeholder="Create comment" />
                    </Flex>
                    <Button
                      variantColor="purple"
                      type="submit"
                      isLoading={isSubmitting}
                      ml={4}
                    >
                      Send
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
            <BoxComment postId={data.post.id} />
          </Flex>
        </Flex>
      </Wrapper>
    </Layout>
  );
};

export default createWithApollo({ ssr: true })(Post);
