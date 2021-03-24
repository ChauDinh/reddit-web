import { Button, Flex, Image, Text } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import React from "react";

import { Layout } from "../../components/Layout";
import { Wrapper } from "../../components/Wrapper/Wrapper";
import { useGetPostsFromPubUrl } from "../../utils/useGetPostsFromPubUrl";
import NextLink from "next/link";

import {
  useMembersQuery,
  useMeQuery,
  usePublicationByIdQuery,
} from "../../generated/graphql";
import { createWithApollo } from "../../utils/withApollo";
import { useGetIntegerId } from "../../utils/useGetIntegerId";
import ErrorPage from "../404";
import { PublicationIntro } from "./PublicationIntro";
import { PublicationContent } from "./PublicationContent";

interface Props {}

createBreakpoints({
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
});

const Publication: React.FC<Props> = () => {
  const paramId = useGetIntegerId();
  const { data, loading, error } = useGetPostsFromPubUrl();
  const { data: membersData } = useMembersQuery({
    variables: {
      publicationId: paramId,
    },
  });
  const { data: meData, loading: meLoading } = useMeQuery();
  const {
    data: publicationByIdData,
    loading: publicationByIdLoading,
    error: publicationByIdError,
  } = usePublicationByIdQuery({
    variables: {
      publicationId: paramId,
    },
  });

  if (loading)
    return (
      <Layout direction="column" variant="regular">
        loading...
      </Layout>
    );

  if (error) return <Wrapper>{error.message}</Wrapper>;

  if (!membersData) return null;

  if (publicationByIdLoading) return null;

  if (!publicationByIdData || !publicationByIdData.publicationById)
    return <ErrorPage />;

  if (
    publicationByIdData.publicationById.publication === null &&
    publicationByIdData!.publicationById!.errors!.length === 0
  )
    return <ErrorPage />;

  if (publicationByIdError) return <ErrorPage />;

  /**
   * TODO: Authentication logic for PUBLIC and PRIVATE publications
   *
   * - Not logged in user
   *    - Public publication: allowed see
   *    - Private publication: display error and login button
   * - Logged in user
   *      - Private publication:
   *          - User is NOT a member ? display publication's intro (title, subscribe button)
   *          - User is a member ? display publication's content
   *      - Public publication:
   *          - display publication's content
   */
  if (!meData || !meData.me) {
    if (publicationByIdData.publicationById.publication === null) {
      // this publication is private
      return (
        <Layout direction="column" variant="regular">
          <Wrapper variants="regular">
            <Flex direction="column" alignItems="center" w="100%">
              <Image
                src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1616595853/karlsson-fatal-error_fgfkea.png
              "
                w="300px"
                borderRadius="12px"
              />
              {publicationByIdData.publicationById.errors?.map((err) => (
                <Text mb="10px">{err.message}</Text>
              ))}
              <NextLink href="/login">
                <Button>Login</Button>
              </NextLink>
            </Flex>
          </Wrapper>
        </Layout>
      );
    } else {
      // this publication is public
      console.log(
        "[public publication]: ",
        publicationByIdData.publicationById.publication
      );
      return (
        <Layout direction="column" variant="regular">
          <PublicationContent
            publication={publicationByIdData.publicationById.publication}
          />
        </Layout>
      );
    }
  } else {
    if (publicationByIdData.publicationById.publication === null) {
      return (
        <Layout direction="column" variant="regular">
          <Wrapper variants="regular">
            <PublicationIntro publicationId={paramId} />
          </Wrapper>
        </Layout>
      );
    } else {
      console.log(
        "[public publication]: ",
        publicationByIdData.publicationById.publication
      );
      return (
        <Layout direction="column" variant="regular">
          <PublicationContent
            publication={publicationByIdData.publicationById.publication}
          />
        </Layout>
      );
    }
  }
};

export default createWithApollo({ ssr: true })(Publication);
