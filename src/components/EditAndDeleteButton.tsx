import React from "react";
import { Flex, IconButton } from "@chakra-ui/core";
import {
  useMeQuery,
  useDeletePostMutation,
  PostSnippetFragment,
  SinglePostSnippetFragment,
} from "../generated/graphql";
import NextLink from "next/link";

interface Props {
  post: PostSnippetFragment | SinglePostSnippetFragment;
  direction?: "column" | "row";
  top?: number;
  right?: number;
}
const EditAndDeleteButton: React.FC<Props> = ({
  post,
  direction,
  top,
  right = 0,
}) => {
  const { data: meData } = useMeQuery();
  const [deletePost] = useDeletePostMutation();
  return post.creator.id === meData?.me?.id ? (
    <Flex direction={direction}>
      <IconButton
        icon="delete"
        aria-label="delete-post"
        float="right"
        size="xs"
        onClick={() =>
          deletePost({
            variables: { id: post.id },
            update: (cache) => {
              cache.evict({ id: "Post:" + post.id }); // Post:78
            },
          })
        }
        mt={top}
        mr={right}
      />
      <NextLink href="/post/edit/[id]" as={`/post/edit/${post.id}`}>
        <IconButton
          icon="edit"
          aria-label="edit-post"
          float="right"
          size="xs"
          mt={top}
          mr={right}
        />
      </NextLink>
    </Flex>
  ) : null;
};

export default EditAndDeleteButton;
