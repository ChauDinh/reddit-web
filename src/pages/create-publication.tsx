import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { Box, Button, Text } from "@chakra-ui/react";

import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { useCreatePublicationMutation } from "../generated/graphql";
import { InputField } from "../components/InputField";
import { createWithApollo } from "../utils/withApollo";
import { useIsAuth } from "../utils/useIsAuth";

interface Props {}

const CreatePublication: React.FC<Props> = () => {
  useIsAuth();
  const [createPublication] = useCreatePublicationMutation();
  const router = useRouter();
  return (
    <Layout variant="small" direction="column">
      <Wrapper variants="small">
        <Formik
          initialValues={{ title: "" }}
          onSubmit={async (values) => {
            const response = await createPublication({
              variables: values,
            });
            if (!response.data?.createPublication) {
              router.push("/articles");
            } else {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Text fontSize="23px" fontWeight={700}>
                Create new publication
              </Text>
              <Box mt={4}>
                <InputField
                  name="title"
                  placeholder="Publication name"
                  label="Publication Name"
                />
              </Box>
              <Button
                colorScheme="telegram"
                isLoading={isSubmitting}
                type="submit"
                mt={4}
              >
                Create
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default createWithApollo({ ssr: false })(CreatePublication);
