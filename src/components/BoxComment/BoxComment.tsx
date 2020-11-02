import { Avatar, Flex, Text } from "@chakra-ui/core";
import React from "react";
import { useCommentQuery } from "../../generated/graphql";
import { avatarUrlGenerator } from "../../utils/createAvatar";
import { handleDateFromCreatedAtAndUpdatedAt } from "../../utils/handleCreatedAtAndUpdatedAtDate";

interface Props {
  postId: number;
}

export const BoxComment: React.FC<Props> = ({ postId }) => {
  const { data, loading } = useCommentQuery({
    variables: {
      postId: postId,
    },
  });
  return data ? (
    loading ? (
      <Text>Loading comment...</Text>
    ) : (
      <Flex direction="column" mt={6}>
        {data.comments?.comments.map((comment) => (
          <Flex
            key={comment.id}
            alignItems="flex-start"
            justifyContent="flex-start"
            mb={4}
          >
            <Avatar
              size="sm"
              name={comment.commentCreator.username}
              src={avatarUrlGenerator(comment.creatorId)}
              mr={2}
            />
            <Flex direction="column" w="100%">
              <Flex alignItems="center" justifyContent="space-between" w="100%">
                <Text color="#4c609a" fontWeight={600} mr={2}>
                  {comment.commentCreator.username}:
                </Text>
                <Text fontSize="12px" fontWeight={600}>
                  {handleDateFromCreatedAtAndUpdatedAt(
                    parseInt(comment.createdAt, 10)
                  )}
                </Text>
              </Flex>
              <Text flexGrow={1}>{comment.text}</Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    )
  ) : (
    <Text mt={10}>The post has no comment</Text>
  );
};
