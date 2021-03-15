import { Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import {
  PostSnippetFragment,
  SinglePostSnippetFragment,
} from "../../generated/graphql";
import { serializedSnippet } from "../../utils/serializedAndDeserialized";

interface Props {
  post: PostSnippetFragment | SinglePostSnippetFragment;
}

export const PublicationPost: React.FC<Props> = ({ post }) => {
  return (
    <Flex
      direction="column"
      justifyContent="space-between"
      borderRadius="3px"
      w="100%"
      h="100%"
      border="1px solid rgba(200, 200, 200, 0.6)"
      _hover={{
        boxShadow: "0 6px 10px rgba(153, 180, 206, 0.3);",
        border: "none",
      }}
    >
      <Image
        src={
          serializedSnippet(JSON.parse(post.text)).imgUrl ||
          "https://res.cloudinary.com/dnlthcx1a/image/upload/v1615276978/undraw_Code_review_re_woeb_jfaoij.png"
        }
      />
      <NextLink href="/post/[id]" as={`/post/${post.id}`}>
        <Text
          cursor="pointer"
          textTransform="capitalize"
          fontWeight="800"
          boxShadow="0 -1px 3px rgba(200, 200, 200, 0.5)"
          padding="5px"
          overflow="hidden"
          textOverflow="ellipsis"
          width="100%"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2,
          }}
        >
          {post.title}
        </Text>
      </NextLink>
    </Flex>
  );
};
