import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Box, Flex, Button, Text } from "@chakra-ui/core";

import { InputField } from "../components/InputField";
import { useForgotPasswordMutation } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { createWithApollo } from "../utils/withApollo";

interface Props {}

const ForgotPassword: React.FC<Props> = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const [isComplete, setIsComplete] = useState(false);
  return (
    <Layout variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          await forgotPassword({variables: values});
          setIsComplete(true);
        }}
      >
        {({ isSubmitting }) =>
          isComplete ? (
            <Box>
              We've sent you a change password message to your email address,
              please go and check it.
            </Box>
          ) : (
            <Form>
              <Text fontSize="2xl" fontWeight={700}>
                Change password
              </Text>

              <Box mt={4}>
                <InputField
                  name="email"
                  placeholder="Email"
                  label="Email"
                  type="email"
                />
              </Box>

              <Flex mt={4} alignItems="center" justifyContent="space-between">
                <Button
                  variantColor="blue"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Send submission
                </Button>
              </Flex>
            </Form>
          )
        }
      </Formik>
    </Layout>
  );
};

export default createWithApollo({ssr: false})(ForgotPassword);
