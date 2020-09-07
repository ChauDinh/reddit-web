import React from "react";
import { Formik, Form } from "formik";
import { Box, Text, Button, Flex, Link } from "@chakra-ui/core";
import { useRouter } from "next/router";
import NextLink from "next/link";

import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";

interface Props {}

const Login: React.FC<Props> = () => {
  const [, login] = useLoginMutation();
  const router = useRouter();
  return (
    <Layout variant="small" direction="column">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login?.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login?.user) {
            // navigate to login page
            router.push(`${router.query.next || "/"}`);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form style={styles.container}>
            <Text fontSize="20px" fontWeight={700}>
              Sign In
            </Text>
            <Box mt={4}>
              {" "}
              <InputField
                name="usernameOrEmail"
                placeholder="Username or email"
                label="Username or email"
              />
            </Box>
            <Box mt={4}>
              <InputField
                name="password"
                placeholder="Password"
                label="Password"
                type="password"
              />
            </Box>

            <Flex
              flex={1}
              mt={4}
              alignItems="center"
              justifyContent="space-between"
            >
              <Button
                variantColor="blue"
                isLoading={isSubmitting}
                type="submit"
              >
                Login
              </Button>
              <NextLink href="/forgot-password">
                <Link>Forgot password?</Link>
              </NextLink>
            </Flex>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

const styles = {
  container: {
    borderRadius: "3px",
    padding: "16px 16px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    boxShadow: "0px 3px 6px rgba(212, 212, 212, 0.2)",
    width: "100%",
    background: "#fff",
  },
};

export default withUrqlClient(createUrqlClient)(Login);
