import { Heading, Text, Flex, Box, Icon, Button } from "@chakra-ui/core";
import React from "react";
import { Node } from "slate";
import { useApolloClient } from "@apollo/client";
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
import { handleDateFromCreatedAtAndUpdatedAt } from "../../utils/handleCreatedAtAndUpdatedAtDate";
import {
  FaAngry,
  FaGrinSquintTears,
  FaGrinStars,
  FaSadTear,
  FaSurprise,
  FaGrinHearts,
} from "react-icons/fa";
import { PostCreator } from "../../components/PostCreator/PostCreator";

interface Props {}

const Post: React.FC<Props> = () => {
  const [createComment] = useCreateCommentMutation();
  const apolloClient = useApolloClient();

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
        <div className={SinglePostStyles.leftSidebarButtons}>
          <Flex
            position="sticky"
            top="90px"
            direction="column"
            alignItems="flex-start"
          >
            <UpdootSection post={data?.post} direction="column" />
            <EditAndDeleteButton post={data.post} direction="column" top={4} />
          </Flex>
        </div>
        <Flex
          width="100%"
          borderRadius="3px"
          background="#fff"
          flexDirection="column"
          // marginRight="30px"
        >
          <Text mr={2} mb={2} fontSize="xs">
            Posted by{" "}
            <span style={{ fontWeight: "bolder" }}>
              {data.post.creator.username}
            </span>{" "}
            {handleDateFromCreatedAtAndUpdatedAt(parseInt(data.post.createdAt))}
          </Text>
          <Heading className={SinglePostStyles.post__title} mb={2}>
            {data.post.title}
          </Heading>
          <Box mb={3}>
            <RenderText str={htmlString} />
          </Box>
          <hr />
          <Flex mt={2} alignItems="center" justifyContent="space-between">
            <Flex alignItems="center">
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
                    <FaGrinStars color="rgb(87 147 243)" fontSize="28px" />
                    <Text className={SinglePostStyles.reaction__label}>
                      Like
                    </Text>
                  </Box>
                  <Box className={SinglePostStyles.reaction__icon}>
                    <FaGrinHearts color="rgb(212 105 204)" fontSize="28px" />
                    <Text className={SinglePostStyles.reaction__label}>
                      Love
                    </Text>
                  </Box>
                  <Box className={SinglePostStyles.reaction__icon}>
                    <FaGrinSquintTears
                      color="rgb(239 180 90)"
                      fontSize="28px"
                    />
                    <Text className={SinglePostStyles.reaction__label}>
                      Haha
                    </Text>
                  </Box>
                  <Box className={SinglePostStyles.reaction__icon}>
                    <FaSurprise color="rgb(75 181 177)" fontSize="28px" />
                    <Text className={SinglePostStyles.reaction__label}>
                      Wow
                    </Text>
                  </Box>
                  <Box className={SinglePostStyles.reaction__icon}>
                    <FaSadTear color="rgb(51 82 132)" fontSize="28px" />
                    <Text className={SinglePostStyles.reaction__label}>
                      Sad
                    </Text>
                  </Box>
                  <Box className={SinglePostStyles.reaction__icon}>
                    <FaAngry color="rgb(210 71 27)" fontSize="28px" />
                    <Text className={SinglePostStyles.reaction__label}>
                      Angry
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Box mr={4} fontSize="sm" color="#8e9296" fontWeight={600}>
                <Icon mb="2px" mr={1} name="external-link" />
                Share
              </Box>
            </Flex>
            <div>
              <div className={SinglePostStyles.editDeleteWrapper}>
                <EditAndDeleteButton
                  direction="row"
                  post={data?.post}
                  right={3}
                />
              </div>
              <div className={SinglePostStyles.updootWrapper}>
                <UpdootSection direction="row" post={data?.post} />
              </div>
            </div>
          </Flex>
          <PostCreator
            creator={data.post.creator}
            createdAt={data.post.createdAt}
          />
        </Flex>
        <div className={SinglePostStyles.commentWrapper}>
          <Flex
            className={SinglePostStyles.commentContainer}
            flexDirection="column"
          >
            <Formik
              initialValues={{ comment: "" }}
              onSubmit={async (values, { resetForm }) => {
                console.log(values);
                const { errors } = await createComment({
                  variables: {
                    input: { text: values.comment, postId: data.post!.id },
                  },
                });
                if (errors) {
                  console.error(errors);
                }
                resetForm({ values: { comment: "" } });
                await apolloClient.resetStore();
              }}
            >
              {({ isSubmitting, values }) => (
                <Form>
                  <Flex alignItems="flex-end" justifyContent="space-between">
                    <Flex alignItems="center" h="100%" flexGrow={1}>
                      <InputField
                        value={values.comment}
                        name="comment"
                        placeholder="Create comment"
                      />
                    </Flex>
                    <Button
                      variantColor="gray"
                      type="submit"
                      isLoading={isSubmitting}
                      ml={2}
                      fontSize="sm"
                    >
                      Send
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
            <BoxComment postId={data.post.id} />
          </Flex>
        </div>
      </Wrapper>
    </Layout>
  );
};

export default createWithApollo({ ssr: true })(Post);
