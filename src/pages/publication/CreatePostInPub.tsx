import { Button } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useMembersQuery, useMeQuery } from "../../generated/graphql";

interface Props {
  publicationId: number;
}

export const CreatePostInPub: React.FC<Props> = ({ publicationId }) => {
  const { data: meData, error: meError, loading: meLoading } = useMeQuery();

  const { data, error, loading } = useMembersQuery({
    variables: {
      publicationId,
    },
  });

  if (!meData || meError || !meData.me) return null;

  if (!data || error || !data.members) return null;

  const members = data.members.map((member) => member.userId);

  return (
    <NextLink href={`/create-post?publicationId=${publicationId}`}>
      <Button
        isLoading={meLoading || loading}
        isDisabled={!members.includes(meData.me.id)}
        mt="10px"
      >
        Create Post
      </Button>
    </NextLink>
  );
};
