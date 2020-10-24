import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Box, Flex, Button, Text } from "@chakra-ui/core";

import { InputField } from "../components/InputField";
import { useForgotPasswordMutation } from "../generated/graphql";
import { Layout } from "../components/Layout";
import { createWithApollo } from "../utils/withApollo";
import { Wrapper } from "../components/Wrapper/Wrapper";

interface Props {}

const ForgotPassword: React.FC<Props> = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const [isComplete, setIsComplete] = useState(false);
  return (
    <Layout variant="regular" direction="column">
      <Wrapper variants="regular">
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
              <Form style={styles.container}>
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
                    variantColor="purple"
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
      </Wrapper>
    </Layout>
  );
};

const styles = {
  container: {
    borderRadius: "3px",
    padding: "16px 16px",
    width: "100%",
    background: "#fff",
  },
};

export default createWithApollo({ssr: false})(ForgotPassword);
