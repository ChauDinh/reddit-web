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
} from "@chakra-ui/react";
import {
  useMeQuery,
  useDeletePostMutation,
  PostSnippetFragment,
  SinglePostSnippetFragment,
} from "../generated/graphql";
import NextLink from "next/link";
import { RiEditBoxLine, RiDeleteBinLine } from "react-icons/ri";

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
        as={RiDeleteBinLine}
        height="24px"
        padding="3px 0"
        aria-label="delete-post"
        color="#8e8e8e"
        float="right"
        size="xs"
        onClick={() => setIsOpen(true)}
        mt={top}
        mr={right}
        cursor="pointer"
      />
      <NextLink href="/post/edit/[id]" as={`/post/edit/${post.id}`}>
        <IconButton
          as={RiEditBoxLine}
          aria-label="edit-post"
          height="24px"
          padding="3px 0"
          color="#8e8e8e"
          float="right"
          size="xs"
          mt={top}
          mr={right}
          cursor="pointer"
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
              <Button onClick={onClose}>Cancel</Button>
              <Button
                colorScheme="red"
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
