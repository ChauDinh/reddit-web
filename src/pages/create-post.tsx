import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { Node } from "slate";
import { Form, Formik, Field } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { BiSend } from "react-icons/bi";
import { RiDraftLine } from "react-icons/ri";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import {
  useCategoriesQuery,
  useCreatePostMutation,
} from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";
import { MyRichTextEditor } from "../components/MyRichTextEditor/MyRichTextEditor";
import { serialized } from "../utils/serializedAndDeserialized";
import { createWithApollo } from "../utils/withApollo";
import { Wrapper } from "../components/Wrapper/Wrapper";

interface Props {}

const CreatePost: React.FC<Props> = () => {
  const router = useRouter();
  useIsAuth();
  const [createPost] = useCreatePostMutation();
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
            category: "",
          }}
          onSubmit={async (values) => {
            console.log("[Submitted values]: ", values);
            const { errors } = await createPost({
              variables: { input: values },
              update: (cache) => {
                cache.evict({ fieldName: "posts:{}" });
              },
            });
            console.log(
              "this is content: ",
              JSON.parse(values.text)
                .map((n: Node) => serialized(n))
                .join("\n")
            );
            if (!errors) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => {
            return (
              <Form style={{ width: "100%" }}>
                <Box>
                  <FormControl>
                    <InputField
                      label="Title"
                      name="title"
                      placeholder="Enter the title for post..."
                    />
                  </FormControl>
                </Box>
                <Box mt={6}>
                  <FormControl as="fieldset">
                    <FormLabel>Category</FormLabel>
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
                    <FormLabel fontWeight={600} color="gray.600">
                      Content
                    </FormLabel>
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
