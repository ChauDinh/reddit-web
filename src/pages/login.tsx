import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";

import { InputField } from "../components/InputField";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { Layout } from "../components/Layout";
import { createWithApollo } from "../utils/withApollo";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { BgAndColor } from "../utils/bgAndColor";

interface Props {}

const Login: React.FC<Props> = () => {
  const [login] = useLoginMutation();
  const router = useRouter();
  const { bg, color } = BgAndColor();
  return (
    <Layout variant="small" direction="column">
      <Wrapper variants="small">
        <Formik
          initialValues={{ usernameOrEmail: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({
              variables: values,
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: "Query",
                    me: data?.login?.user,
                  },
                });
                cache.evict({ fieldName: "posts:{}" });
              },
            });
            if (response.data?.login?.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login?.user) {
              // navigate to login page
              router.push(`${router.query.next || "/blog"}`);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form style={styles.container}>
              <Heading size="xl">Sign In</Heading>
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
                  bg={color}
                  color={bg}
                  colorScheme="gray"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Login
                </Button>
                <NextLink href="/forgot-password">
                  <a>Forgot password?</a>
                </NextLink>
              </Flex>
              <hr style={{ margin: "20px 0" }} />
              <Flex direction="column">
                <NextLink href="/register">
                  <Button
                    borderColor={color}
                    color={color}
                    variant="outline"
                    flexGrow={1}
                  >
                    Create new account
                  </Button>
                </NextLink>
              </Flex>
            </Form>
          )}
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
  },
};

export default createWithApollo({ ssr: false })(Login);
