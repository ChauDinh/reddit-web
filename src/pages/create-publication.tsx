import { Field, Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { Box, Button, Text, useDisclosure, Fade } from "@chakra-ui/react";

import { Layout } from "../components/Layout";
import { Wrapper } from "../components/Wrapper/Wrapper";
import {
  useCreateMemberMutation,
  useCreatePublicationMutation,
} from "../generated/graphql";
import { InputField } from "../components/InputField";
import { createWithApollo } from "../utils/withApollo";
import { useIsAuth } from "../utils/useIsAuth";
import { toErrorMap } from "../utils/toErrorMap";

interface Props {}

const CreatePublication: React.FC<Props> = () => {
  useIsAuth();
  const [createPublication] = useCreatePublicationMutation();
  const [createMember] = useCreateMemberMutation();
  const router = useRouter();
  const { onToggle } = useDisclosure();

  return (
    <Layout variant="small" direction="column">
      <Wrapper variants="small">
        <Formik
          initialValues={{ title: "", isPrivate: false }}
          onSubmit={async (values, { setErrors }) => {
            console.log("[create publication]: ", values);
            const response = await createPublication({
              variables: values,
            });
            if (!response.data?.createPublication) {
              router.push("/articles");
            }

            if (response.data?.createPublication?.errors) {
              setErrors(toErrorMap(response.data.createPublication!.errors));
            } else {
              await createMember({
                variables: {
                  publicationId: response.data!.createPublication.publication!
                    .id,
                },
              });
              router.push("/");
            }
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <Text fontSize="23px" fontWeight={700} marginTop="20px">
                Create new publication
              </Text>
              <Box mt={4}>
                <InputField name="title" placeholder="Title" label="Title" />
              </Box>
              <Box mt={6} fontSize="16px" fontWeight="600">
                <Field
                  onClick={onToggle}
                  type="checkbox"
                  name="isPrivate"
                  style={{
                    marginRight: "5px",
                    cursor: "pointer",
                    width: "16px",
                    height: "16px",
                  }}
                />
                <Text display="inline">
                  Click to toggle between <span>Public</span> and{" "}
                  <span>Private</span>
                </Text>
                <Fade in={true}>
                  {values.isPrivate ? (
                    <Box
                      p="10px"
                      color="white"
                      mt="4"
                      bg="yellow.400"
                      rounded="md"
                      shadow="md"
                    >
                      This publication is private. Only members can see it
                    </Box>
                  ) : (
                    <Box
                      p="10px"
                      color="teal.500"
                      mt="4"
                      border="1px solid teal"
                      rounded="md"
                      shadow="xs"
                      fontSize="15px"
                    >
                      This publication is public. Everybody can see it
                    </Box>
                  )}
                </Fade>
              </Box>
              <Button
                colorScheme="telegram"
                isLoading={isSubmitting}
                type="submit"
                mt={10}
              >
                Create
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Layout>
  );
};

export default createWithApollo({ ssr: false })(CreatePublication);
