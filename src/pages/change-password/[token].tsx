import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { Box, Button, Text, Link } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import NextLink from "next/link";

import { Wrapper } from "../../components/Wrapper/Wrapper";
import { toErrorMap } from "../../utils/toErrorMap";
import { InputField } from "../../components/InputField";
import {
  MeDocument,
  MeQuery,
  useChangePasswordMutation,
} from "../../generated/graphql";
import { createWithApollo } from "../../utils/withApollo";

const ChangePassword: NextPage = () => {
  const [changePassword] = useChangePasswordMutation();
  const [tokenError, setTokenError] = useState("");
  const router = useRouter();
  return (
    <Wrapper variants="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await changePassword({
            variables: {
              newPassword: values.newPassword,
              token:
                typeof router.query.token === "string"
                  ? router.query.token
                  : "",
            },
            update: (cache, { data }) => {
              cache.writeQuery<MeQuery>({
                query: MeDocument,
                data: {
                  __typename: "Query",
                  me: data?.changePassword.user,
                },
              });
            },
          });
          if (response.data?.changePassword?.errors) {
            const errorMap = toErrorMap(response.data.changePassword.errors);
            if ("token" in errorMap) {
              setTokenError(errorMap.token);
            }
            setErrors(errorMap);
          } else if (response.data?.changePassword?.user) {
            // navigate to login page
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box mt={4}>
              {" "}
              <InputField
                name="newPassword"
                placeholder="New password"
                label="New password"
                type="password"
              />
            </Box>
            {tokenError ? (
              <Box>
                <Text mt={4} style={{ color: "red" }}>
                  {tokenError}
                </Text>
                <NextLink href="/forgot-password">
                  <Link>Click here send forgot password submission again</Link>
                </NextLink>
              </Box>
            ) : null}
            <Box mt={4}>
              <Button
                colorScheme="telegram"
                isLoading={isSubmitting}
                type="submit"
              >
                Change password
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Wrapper>
  );
};

export default createWithApollo({ ssr: false })(ChangePassword);
