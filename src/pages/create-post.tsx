import { Box, Button, Flex, FormControl, FormLabel } from "@chakra-ui/core";
import { Node } from "slate";
import { Form, Formik, Field } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { BiSend } from "react-icons/bi";
import { RiDraftLine } from "react-icons/ri";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { useCreatePostMutation } from "../generated/graphql";
import { useIsAuth } from "../utils/useIsAuth";
import { MyRichTextEditor } from "../components/MyRichTextEditor";
import { serialized } from "../utils/serializedAndDeserialized";
import { createWithApollo } from "../utils/withApollo";
import { Wrapper } from "../components/Wrapper/Wrapper";

interface Props {}

const CreatePost: React.FC<Props> = () => {
  const router = useRouter();
  useIsAuth();
  const [createPost] = useCreatePostMutation();

  return (
    <Layout variant="regular" direction="column">
      <Wrapper variants="regular">
        <Formik
          initialValues={{ title: "", text: "" }}
          onSubmit={async (values) => {
            const { errors } = await createPost({
              variables: { input: values },
              update: (cache) => {
                cache.evict({ fieldName: "posts:{}" });
              },
            });
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
                      label="Title"
                      name="title"
                      placeholder="Enter the title for post..."
                    />
                  </FormControl>
                </Box>
                <Box mt={4}>
                  <FormControl>
                    <FormLabel fontWeight={600}>Content</FormLabel>
                    <Field name="text" as={MyRichTextEditor} />
                  </FormControl>
                </Box>

                <Flex mt={4} alignItems="center" justifyContent="flex-start">
                  <Button
                    variantColor="#000"
                    variant="outline"
                    isLoading={isSubmitting}
                    type="submit"
                    rightIcon={BiSend}
                  >
                    Create
                  </Button>
                  <Button
                    rightIcon={RiDraftLine}
                    variant="outline"
                    variantColor="#000"
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
