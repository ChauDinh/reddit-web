import {
  Heading,
  Text,
  Flex,
  Box,
  Icon,
  Button,
  TagLabel,
  Tag,
} from "@chakra-ui/react";
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
import {
  handleDateFromCreatedAtAndUpdatedAt,
  isToday,
} from "../../utils/handleCreatedAtAndUpdatedAtDate";
import {
  FaAngry,
  FaGrinSquintTears,
  FaGrinStars,
  FaSadTear,
  FaSurprise,
  FaGrinHearts,
} from "react-icons/fa";
import { RiFireFill, RiExternalLinkLine } from "react-icons/ri";

import { PostCreator } from "../../components/PostCreator/PostCreator";
import { useGetCategories } from "../../utils/useGetCategories";

interface Props {}

const Post: React.FC<Props> = () => {
  const [createComment] = useCreateCommentMutation();
  const apolloClient = useApolloClient();

  const { data, loading } = useGetPostFromUrl();
  const {
    data: postCategoriesData,
    loading: postCategoriesLoading,
  } = useGetCategories(data?.post ? data.post.id : -1);

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

  if (!postCategoriesData || postCategoriesLoading) return null;

  const htmlString = JSON.parse(data.post.text)
    .map((n: Node) => serialized(n))
    .join("\n");

  return (
    <Layout direction="column" variant="regular">
      <Wrapper variants="regular">
        <div className={SinglePostStyles.leftSidebarButtons}>
          <Flex
            position="sticky"
            top="120px"
            direction="column"
            alignItems="flex-start"
          >
            <UpdootSection post={data?.post} direction="column" />
            <EditAndDeleteButton post={data.post} direction="column" top={4} />
          </Flex>
        </div>
        <Flex mt="30px" width="100%" flexDirection="column">
          <Text mr={2} mb={2} fontSize="xs">
            {isToday(parseInt(data.post.createdAt, 10))
              ? isToday(parseInt(data.post.createdAt, 10)) +
                "," +
                handleDateFromCreatedAtAndUpdatedAt(
                  parseInt(data.post.createdAt, 10)
                ).split(",")[1]
              : handleDateFromCreatedAtAndUpdatedAt(
                  parseInt(data.post.createdAt, 10)
                )}
          </Text>
          <Heading className={SinglePostStyles.post__title} mb={4}>
            {data.post.title}
          </Heading>
          <Box mb={2}>
            {postCategoriesData?.postCategoriesByPostId?.map((category) => (
              <Tag
                borderRadius="full"
                size="lg"
                fontWeight="bold"
                colorScheme="telegram"
                mr={1}
                mb={1}
                key={category.categories.id}
                cursor="pointer"
              >
                <TagLabel># {category.categories.title}</TagLabel>
              </Tag>
            ))}
          </Box>
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
                <Icon mb="2px" mr={1} as={RiFireFill} />
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
                <Icon mb="2px" mr={1} as={RiExternalLinkLine} />
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
                      colorScheme="gray"
                      type="submit"
                      isLoading={isSubmitting}
                      ml={2}
                      fontSize="sm"
                    >
                      Comment
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
