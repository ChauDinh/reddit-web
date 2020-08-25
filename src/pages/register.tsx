import React from "react";
import { Formik, Form } from "formik";
import { Box, Text, Button } from "@chakra-ui/core";
import { useMutation } from "urql";

import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";

const REGISTER_MUTATION = `mutation RegisterMutation ($username: String!, $email: String!, $password: String!) {
  register(options: {username: $username, email: $email, password: $password}) {
    errors {
      field
      message
    }
    user {
      username
      email
    }
  }
}`;

interface Props {}

const Register: React.FC<Props> = () => {
  const [, register] = useMutation(REGISTER_MUTATION);
  return (
    <Wrapper variants="small">
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        onSubmit={(values) => {
          // console.log(values);
          return register(values);
        }}
      >
        {({ isSubmitting }) => (
          <Form style={styles.container}>
            <Text fontSize="2xl" fontWeight={700}>
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
    </Wrapper>
  );
};

const styles = {
  container: {
    borderRadius: "3px",
    padding: "16px 16px",
    border: "1px solid rgba(0, 0, 0, 0.1)",
    boxShadow: "0px 3px 6px rgba(212, 212, 212, 0.2)",
  },
};

export default Register;
