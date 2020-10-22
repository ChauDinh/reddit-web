import { Box, Button, Flex, FormControl, FormLabel } from "@chakra-ui/core";
import { Node } from "slate";
import { Form, Formik, Field } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";
import { MyRichTextEditor } from "../components/MyRichTextEditor";
import { serialized } from "../utils/serializedAndDeserialized";
import { createWithApollo } from "../utils/withApollo";

interface Props {}

const CreatePost: React.FC<Props> = () => {
  const router = useRouter();
  useIsAuth();
  const [createPost] = useCreatePostMutation();

  return (
    <Layout variant="regular" direction="column">
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          const { errors } = await createPost({ variables: { input: values}, update: (cache) => {
            cache.evict({fieldName: "posts:{}"})
          }});
          // Our errorExchange function handles the error globally. Check the
          // createUrqlClient file
          // console.log(JSON.parse(values.text)[0]);
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
                    label="Post title"
                    name="title"
                    placeholder="Enter the title for post..."
                  />
                </FormControl>
              </Box>
              <Box mt="4px">
                <FormControl>
                  <FormLabel>Story</FormLabel>
                  <Field name="text" as={MyRichTextEditor} />
                </FormControl>
              </Box>

              <Flex mt={4} alignItems="center" justifyContent="space-between">
                <Button
                  variantColor="purple"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Create post
                </Button>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Layout>
  );
};

export default createWithApollo({ssr: false})(CreatePost);
