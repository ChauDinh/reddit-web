import React from "react";
import { Formik, Form } from "formik";
import { Box, Text, Button, Image, Link, Flex } from "@chakra-ui/core";
import { useRouter } from "next/router";
import NextLink from "next/link";

import { InputField } from "../components/InputField";
import { MeDocument, MeQuery, useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { Layout } from "../components/Layout";
import { createWithApollo } from "../utils/withApollo";
import { Wrapper } from "../components/Wrapper/Wrapper";

interface Props {}

const Register: React.FC<Props> = () => {
  const [register] = useRegisterMutation();
  const router = useRouter();
  return (
    <Layout variant="regular" direction="column">
      <Wrapper variants="regular">
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({
              variables: values,
              update: (cache, { data }) => {
                cache.writeQuery<MeQuery>({
                  query: MeDocument,
                  data: {
                    __typename: "Query",
                    me: data?.register.user,
                  },
                });
              },
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
              <Text fontSize="20px" fontWeight={700}>
                Sign Up
              </Text>
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

              <Flex mt={4} justifyContent="space-between" alignItems="center">
                <Button
                  variantColor="purple"
                  isLoading={isSubmitting}
                  type="submit"
                >
                  Register
                </Button>
                <NextLink href="/login">
                  <Text as={Link}>Already have an account?</Text>
                </NextLink>
              </Flex>
            </Form>
          )}
        </Formik>
        <Image
          height="250px"
          src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1604151137/undraw_welcome_cats_thqn_w9shsx.png"
        />
      </Wrapper>
    </Layout>
  );
};

const styles = {
  container: {
    borderRadius: "3px",
    padding: "16px 16px",
    width: "100%",
    backgroundColor: "#fff",
  },
};

export default createWithApollo({ ssr: false })(Register);
