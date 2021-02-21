import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { Form, Formik, Field } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { BiSend } from "react-icons/bi";
import { RiDraftLine } from "react-icons/ri";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import {
  useCategoriesQuery,
  useCreatePostCategoryMutation,
  useCreatePostMutation,
} from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";
import { MyRichTextEditor } from "../components/MyRichTextEditor/MyRichTextEditor";
import { createWithApollo } from "../utils/withApollo";
import { Wrapper } from "../components/Wrapper/Wrapper";

interface Props {}

const CreatePost: React.FC<Props> = () => {
  const router = useRouter();
  useIsAuth();
  const [createPost] = useCreatePostMutation();
  const [createPostCategory] = useCreatePostCategoryMutation();
  const { data, error, loading } = useCategoriesQuery();

  if (loading) return <Text>loading...</Text>;
  if (error) return null;

  return (
    <Layout variant="regular" direction="column">
      <Wrapper variants="regular">
        <Formik
          initialValues={{
            title: "",
            text: "",
            category: [] as string[],
          }}
          onSubmit={async (values) => {
            console.log("[Submitted values]: ", values);

            await createPost({
              variables: { input: { text: values.text, title: values.title } },
              update: (cache) => {
                cache.evict({ fieldName: "posts:{}" });
              },
            })
              .then((response) => {
                // create post-category
                values.category.map((category) => {
                  const selectedCategories = data?.categories?.filter(
                    (c) => c.title === category
                  );
                  selectedCategories?.map(
                    async (selectedCategory) =>
                      await createPostCategory({
                        variables: {
                          postId: response.data!.createPost.post!.id,
                          categoryId: selectedCategory.id,
                        },
                      })
                  );
                });
                router.push("/");
              })
              .catch((err) => {
                if (err) {
                  router.push("/");
                }
              });
          }}
        >
          {({ isSubmitting }) => {
            return (
              <Form style={{ width: "100%" }}>
                <Box>
                  <FormControl>
                    <InputField
                      fontSize="20px"
                      label="Title"
                      name="title"
                      placeholder="Enter the title for post..."
                    />
                  </FormControl>
                </Box>
                <Box mt={6}>
                  <FormControl as="fieldset">
                    <FormLabel fontWeight={600}>Category</FormLabel>
                    {data?.categories?.map((category) => (
                      <label
                        key={category.id}
                        style={{
                          marginRight: "14px",
                          cursor: "pointer",
                          textTransform: "uppercase",
                          fontSize: "15px",
                          color: "#0088CC",
                          fontWeight: "bold",
                        }}
                      >
                        <Field
                          type="checkbox"
                          name="category"
                          value={category.title}
                        />{" "}
                        {category.title}
                      </label>
                    ))}
                  </FormControl>
                </Box>
                <Box mt={6}>
                  <FormControl>
                    <FormLabel fontWeight={600}>Content</FormLabel>
                    <Field name="text" as={MyRichTextEditor} />
                  </FormControl>
                </Box>

                <Flex mt={4} alignItems="center" justifyContent="flex-start">
                  <Button
                    colorScheme="telegram"
                    isLoading={isSubmitting}
                    type="submit"
                    rightIcon={<BiSend />}
                    padding="0 20px"
                  >
                    Create
                  </Button>
                  <Button
                    rightIcon={<RiDraftLine />}
                    colorScheme="telegram"
                    variant="outline"
                    ml={5}
                  >
                    Save Draft
                  </Button>
                </Flex>
              </Form>
            );
          }}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default createWithApollo({ ssr: false })(CreatePost);
