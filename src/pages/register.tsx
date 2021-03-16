import React from "react";
import { Formik, Form } from "formik";
import { Box, Text, Button, Link, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import NextLink from "next/link";

import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { Layout } from "../components/Layout";
import { createWithApollo } from "../utils/withApollo";
import { Wrapper } from "../components/Wrapper/Wrapper";
import { BgAndColor } from "../utils/bgAndColor";

interface Props {}

const Register: React.FC<Props> = () => {
  const [register] = useRegisterMutation();
  const router = useRouter();
  const { bg, color } = BgAndColor();
  return (
    <Layout variant="small" direction="column">
      <Wrapper variants="small">
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({
              variables: values,
              // update: (cache, { data }) => {
              //   cache.writeQuery<MeQuery>({
              //     query: MeDocument,
              //     data: {
              //       __typename: "Query",
              //       me: data?.register.user,
              //     },
              //   });
              // },
            });
            if (response.data?.register?.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register?.user) {
              // navigate to login page
              router.push("/login");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form style={styles.container}>
              <Heading size="xl">Create an account</Heading>
              <Box mt={4}>
                {" "}
                <InputField
                  name="username"
                  placeholder="Username"
                  label="Username"
                />
              </Box>
              <Box mt={4}>
                <InputField
                  name="email"
                  type="email"
                  placeholder="Email"
                  label="Email"
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
                mt={4}
                mb={4}
                justifyContent="space-between"
                alignItems="center"
              >
                <Button
                  bg={color}
                  color={bg}
                  colorScheme="gray"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Register
                </Button>
                <NextLink href="/login">
                  <Text as={Link} textAlign="right">
                    Already have an account?
                  </Text>
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

export default createWithApollo({ ssr: false })(Register);
