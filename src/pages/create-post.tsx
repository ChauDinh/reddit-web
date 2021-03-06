import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Text,
  Checkbox,
} from "@chakra-ui/react";
import { Form, Formik, Field, FieldProps } from "formik";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { BiSend } from "react-icons/bi";
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
import { BgAndColor } from "../utils/bgAndColor";

interface Props {}

const CustomCheckbox: FC<FieldProps> = ({ field, form, ...props }) => {
  return (
    <Checkbox
      mr="5px"
      mt="2px"
      style={{ borderRadius: "50px" }}
      {...field}
      {...props}
    >
      {field?.value}
    </Checkbox>
  );
};

const CreatePost: React.FC<Props> = () => {
  const router = useRouter();
  useIsAuth();
  const [createPost] = useCreatePostMutation();
  const [createPostCategory] = useCreatePostCategoryMutation();
  const { data, error, loading } = useCategoriesQuery();
  const publicationId = router.query;
  const { color } = BgAndColor();

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
              variables: {
                input: {
                  text: values.text,
                  title: values.title,
                  publicationId: publicationId
                    ? parseInt(publicationId.publicationId as string)
                    : null,
                },
              },
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
                          postTitle: response.data!.createPost.post!.title,
                          categoryTitle: selectedCategory.title,
                          creator: response.data?.createPost.post?.creator
                            .username as string,
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
                  <FormControl as="fieldset" textAlign="left">
                    <FormLabel fontWeight={600}>Category (optional)</FormLabel>
                    <FormHelperText mb={6}>
                      You can choose multiple categories. Attached categories to
                      your post would help people discover it easier.
                    </FormHelperText>
                    {data?.categories?.map((category) => (
                      <label
                        key={category.id}
                        style={{
                          marginRight: "20px",
                          marginBottom: "10px",
                          cursor: "pointer",
                          fontSize: "16px",
                          fontWeight: "normal",
                          textTransform: "capitalize",
                          display: "inline-flex",
                          color: "gray",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "3px 10px",
                          paddingLeft: "0",
                          borderRadius: "50px",
                        }}
                      >
                        <Field
                          as={CustomCheckbox}
                          name="category"
                          value={category.title}
                        />
                        {category.title}
                      </label>
                    ))}
                  </FormControl>
                </Box>
                <Box mt={6}>
                  <FormControl>
                    <Field name="text" as={MyRichTextEditor} />
                  </FormControl>
                </Box>

                <Flex mt={4} alignItems="center" justifyContent="flex-start">
                  <Button
                    color={color}
                    isLoading={isSubmitting}
                    type="submit"
                    rightIcon={<BiSend />}
                    padding="0 20px"
                  >
                    Create
                  </Button>
                  <Button color={color} variant="outline" ml={5}>
                    Cancel
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
