import { Button, Flex, FormControl, Text } from "@chakra-ui/core";
import { Form, Formik, Field } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { VscSaveAs } from "react-icons/vsc";
import { ImCancelCircle } from "react-icons/im";
import { InputField } from "../../../components/InputField";
import { Layout } from "../../../components/Layout";
import { MyRichTextEditor } from "../../../components/MyRichTextEditor";
import { Wrapper } from "../../../components/Wrapper/Wrapper";
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

  console.log(JSON.parse(data?.post?.text as string));

  return (
    <Layout direction="column" variant="regular">
      <Wrapper variants="regular">
        <Formik
          initialValues={{
            title: data?.post?.title,
            text: JSON.parse(data?.post?.text as string),
          }}
          onSubmit={async (values) => {
            await updatePost({ variables: { id: integerId, ...values } });
            router.back();
          }}
        >
          {({ isSubmitting }) => (
            <Form style={{ width: "100%" }}>
              <FormControl mt={4}>
                {" "}
                <InputField name="title" placeholder="Title" label="Title" />
              </FormControl>
              <FormControl mt={4}>
                {/* <InputField
                  textarea={true}
                  name="text"
                  placeholder="Text..."
                  label="Body"
                  height="300px"
                /> */}
                <Field name="text" as={MyRichTextEditor} />
              </FormControl>

              <Flex mt={4} alignItems="center" justifyContent="flex-start">
                <Button
                  rightIcon={VscSaveAs}
                  variantColor="#000"
                  variant="outline"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Update post
                </Button>
                <Button
                  ml={5}
                  rightIcon={ImCancelCircle}
                  variant="outline"
                  variantColor="#000"
                  onClick={() => window.history.back()}
                >
                  Cancel
                </Button>
              </Flex>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default createWithApollo({ ssr: false })(EditPost);
