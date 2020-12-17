import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogHeader,
  Flex,
  IconButton,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/core";
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
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef();

  return post.creator.id === meData?.me?.id ? (
    <Flex direction={direction}>
      <IconButton
        icon="delete"
        aria-label="delete-post"
        float="right"
        size="xs"
        onClick={() => setIsOpen(true)}
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
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef as any}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="md" fontWeight="bold">
              Delete article
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure? You can't do this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                variantColor="red"
                onClick={() =>
                  deletePost({
                    variables: { id: post.id },
                    update: (cache) => {
                      cache.evict({ id: "Post:" + post.id }); // Post:78
                    },
                  })
                }
                ml={3}
              >
                Delete permanently
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Flex>
  ) : null;
};

export default EditAndDeleteButton;
