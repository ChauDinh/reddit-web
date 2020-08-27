import React from "react";
import { Formik, Form } from "formik";
import { Box, Text, Button } from "@chakra-ui/core";
import { useRouter } from "next/router";

import { Wrapper } from "../components/Wrapper";
import { InputField } from "../components/InputField";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/toErrorMap";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";

interface Props {}

const Login: React.FC<Props> = () => {
  const [, login] = useLoginMutation();
  const router = useRouter();
  return (
    <Wrapper variants="small">
      <Formik
        initialValues={{ usernameOrEmail: "", password: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await login(values);
          if (response.data?.login?.errors) {
            setErrors(toErrorMap(response.data.login.errors));
          } else if (response.data?.login?.user) {
            // navigate to login page
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form style={styles.container}>
            <Text fontSize="2xl" fontWeight={700}>
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

            <Box mt={4}>
              <Button
                variantColor="blue"
                isLoading={isSubmitting}
                type="submit"
              >
                Login
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

export default withUrqlClient(createUrqlClient)(Login);
