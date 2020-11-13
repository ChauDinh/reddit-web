import React from "react";
import { Formik, Form } from "formik";
import { Box, Text, Button, Image, Link, Flex, theme } from "@chakra-ui/core";
import { useRouter } from "next/router";
import NextLink from "next/link";
import { AiOutlineFacebook, AiOutlineGoogle } from "react-icons/ai";

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
              <Text fontSize="23px" fontWeight={700}>
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

              <Flex
                mt={4}
                mb={4}
                justifyContent="space-between"
                alignItems="center"
              >
                <Button
                  variantColor="purple"
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
              <hr />
              <Flex mt={4} direction="column">
                <NextLink href="/register">
                  <Button
                    leftIcon={AiOutlineGoogle}
                    variant="outline"
                    variantColor="white"
                    mb={4}
                  >
                    Register with Google
                  </Button>
                </NextLink>
                <NextLink href="/register">
                  <Button
                    leftIcon={AiOutlineFacebook}
                    backgroundColor={theme.colors.blue[400]}
                    color="#fff"
                  >
                    Register with Facebook
                  </Button>
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
          padding="0 16px"
          background="#fff"
          className="register__image"
        >
          <Image
            width="inherit"
            height="250px"
            src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1604317187/undraw_welcome_cats_thqn_dcogsh.png"
          />
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
    backgroundColor: "#fff",
  },
};

export default createWithApollo({ ssr: false })(Register);
