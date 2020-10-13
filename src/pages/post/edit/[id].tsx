import { Box, Button, Flex, Text } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { useGetIntegerId } from "../../../utils/useGetIntegerId";
import { createWithApollo } from "../../../utils/withApollo";

interface Props {}

const EditPost: React.FC<Props> = () => {
  const router = useRouter();
  const integerId = useGetIntegerId();
  const { data, loading } = usePostQuery({
    skip: integerId === -1,
    variables: {
      id: integerId,
    },
  });
  const [updatePost] = useUpdatePostMutation();
  if (loading) {
    return (
      <Layout direction="column">
        <Text>Loading...</Text>
      </Layout>
    );
  }

  return (
    <Layout direction="column" variant="regular">
      <Formik
        initialValues={{ title: data?.post?.title, text: data?.post?.text }}
        onSubmit={async (values) => {
          await updatePost({ variables: { id: integerId, ...values }});
          router.back();
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
                Update post
              </Button>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default createWithApollo({ssr: false})(EditPost);
