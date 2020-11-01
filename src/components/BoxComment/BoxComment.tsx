import { Flex, Text } from "@chakra-ui/core";
import React from "react";
import { useCommentQuery } from "../../generated/graphql";

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
      <Flex direction="column" mt={4}>
        {data.comments?.comments.map((comment) => (
          <Flex
            key={comment.id}
            alignItems="center"
            justifyContent="flex-start"
          >
            <Text fontWeight={600} mr={2}>
              {comment.commentCreator.username}:
            </Text>
            <Text flexGrow={1}>{comment.text}</Text>
          </Flex>
        ))}
      </Flex>
    )
  ) : (
    <Text mt={10}>The post has no comment</Text>
  );
};
