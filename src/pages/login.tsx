import React from "react";
import { Formik, Form } from "formik";
import { Box, Text, Button, Flex, Link, Image, Heading } from "@chakra-ui/core";
import { useRouter } from "next/router";
import NextLink from "next/link";

import { InputField } from "../components/InputField";
import { MeDocument, MeQuery, useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { Layout } from "../components/Layout";
import { createWithApollo } from "../utils/withApollo";
import { Wrapper } from "../components/Wrapper/Wrapper";

interface Props {}

const Login: React.FC<Props> = () => {
  const [login] = useLoginMutation();
  const router = useRouter();
  return (
    <Layout variant="regular" direction="column">
      <Wrapper variants="regular">
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
              router.push(`${router.query.next || "/"}`);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form style={styles.container}>
              <Text fontSize="23px" fontWeight={700}>
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
                  variantColor="purple"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Login
                </Button>
                <NextLink href="/forgot-password">
                  <Link>Forgot password?</Link>
                </NextLink>
              </Flex>
              <hr style={{ margin: "20px 0" }} />
              <Flex>
                <NextLink href="/register">
                  <Button flexGrow={1}>Create new account</Button>
                </NextLink>
              </Flex>
            </Form>
          )}
        </Formik>
        <Flex
          w="100%"
          direction="column"
          alignItems="flex-end"
          justifyContent="flex-end"
          background="#fff"
          padding="0 16px"
          className="login__image"
        >
          <Image
            height="280px"
            src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1604317187/undraw_Login_re_4vu2_p5gchx.png"
          />
          <Heading size="md">amanlearnscode</Heading>
          <Text textAlign="right" fontSize="md" mb={3}>
            Collaboration platform for modern bloggers
          </Text>
        </Flex>
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

export default createWithApollo({ ssr: false })(Login);
