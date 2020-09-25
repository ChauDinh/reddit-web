import React from "react";
import { Box, IconButton } from "@chakra-ui/core";
import {
  useMeQuery,
  useDeletePostMutation,
  PostSnippetFragment,
  SinglePostSnippetFragment,
} from "../generated/graphql";
import NextLink from "next/link";

interface Props {
  post: PostSnippetFragment | SinglePostSnippetFragment;
}
const EditAndDeleteButton: React.FC<Props> = ({ post }) => {
  const [{ data: meData }] = useMeQuery();
  const [, deletePost] = useDeletePostMutation();
  return post.creator.id === meData?.me?.id ? (
    <Box>
      <IconButton
        icon="delete"
        aria-label="delete-post"
        float="right"
        size="xs"
        onClick={() => deletePost({ id: post.id })}
        ml={2}
      />
      <NextLink href="/post/edit/[id]" as={`/post/edit/${post.id}`}>
        <IconButton
          icon="edit"
          aria-label="edit-post"
          float="right"
          size="xs"
          ml={2}
        />
      </NextLink>
    </Box>
  ) : null;
};

export default EditAndDeleteButton;
