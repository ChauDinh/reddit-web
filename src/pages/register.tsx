import React from "react";
import { Formik, Form } from "formik";
import { Box, Text, Button } from "@chakra-ui/core";
import { useRouter } from "next/router";

import { InputField } from "../components/InputField";
import { useRegisterMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { Layout } from "../components/Layout";

interface Props {}

const Register: React.FC<Props> = () => {
  const [, register] = useRegisterMutation();
  const router = useRouter();
  return (
    <Layout variant="small" direction="column">
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await register(values);
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

            <Box mt={4}>
              <Button
                variantColor="blue"
                isLoading={isSubmitting}
                type="submit"
              >
                Register
              </Button>
            </Box>
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
    backgroundColor: "#fff",
  },
};

export default withUrqlClient(createUrqlClient)(Register);
