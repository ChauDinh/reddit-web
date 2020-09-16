import { Box, Button, Flex } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../components/InputField";
import { Layout } from "../components/Layout";
import { MyEditor } from "../components/MyEditor";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useIsAuth } from "../utils/useIsAuth";

interface Props {}

const CreatePost: React.FC<Props> = () => {
  const router = useRouter();
  useIsAuth();
  const [, createPost] = useCreatePostMutation();

  return (
    <Layout variant="regular" direction="column">
      {/* <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          const { error } = await createPost({ input: values });
          // Our errorExchange function handles the error globally. Check the
          // createUrqlClient file
          if (!error) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form style={{ width: "100%" }}>
            <Box mt={4}>
              {" "}
              <InputField name="title" placeholder="Title" label="Title" />
            </Box>
            <Box mt={4}>
              <InputField
                textarea={true}
                name="text"
                placeholder="Text..."
                label="Body"
                height="300px"
              />
            </Box>

            <Flex mt={4} alignItems="center" justifyContent="space-between">
              <Button
                variantColor="blue"
                isLoading={isSubmitting}
                type="submit"
              >
                Create post
              </Button>
            </Flex>
          </Form>
        )}
      </Formik> */}
      <MyEditor />
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
