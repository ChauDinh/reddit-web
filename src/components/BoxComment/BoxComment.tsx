import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useCommentQuery } from "../../generated/graphql";
import {
  handleDateFromCreatedAtAndUpdatedAt,
  isToday,
} from "../../utils/handleCreatedAtAndUpdatedAtDate";
import BoxCommentStyles from "./BoxComment.module.css";

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
      <Flex className={BoxCommentStyles.container} direction="column" mt={6}>
        {data.comments?.comments.map((comment) => (
          <Flex
            key={comment.id}
            alignItems="flex-start"
            justifyContent="flex-start"
            mb="20px"
            fontSize="16px"
          >
            <Flex direction="column" w="100%">
              <Flex alignItems="center" justifyContent="space-between" w="100%">
                <NextLink href="/user/[id]" as={`/user/${comment.creatorId}`}>
                  <Text fontWeight={600} mr={2} cursor="pointer">
                    {comment.commentCreator.username}:
                  </Text>
                </NextLink>
                <Text fontSize="13px" fontWeight={500}>
                  {isToday(parseInt(comment.createdAt, 10))
                    ? isToday(parseInt(comment.createdAt, 10))
                    : handleDateFromCreatedAtAndUpdatedAt(
                        parseInt(comment.createdAt, 10)
                      ).split(",")[0]}
                </Text>
              </Flex>
              <Text className={BoxCommentStyles.text} flexGrow={1}>
                {comment.text}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    )
  ) : (
    <Text mt={10}>The post has no comment</Text>
  );
};
