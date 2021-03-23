import { Button, Flex, Heading, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { BiLockAlt, BiLockOpenAlt } from "react-icons/bi";

import { PublicationSnippetFragment } from "../../generated/graphql";
import { backgroundUrl } from "../../utils/createAvatar";

interface Props {
  pub: PublicationSnippetFragment;
}

export const PublicationCard: React.FC<Props> = ({ pub }) => {
  return (
    <NextLink href="/publication/[id]" as={`/publication/${pub.id}`}>
      <Flex
        direction="column"
        _hover={{
          boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
        }}
        cursor="pointer"
        borderRadius="12px"
        padding="15px"
      >
        <Image
          src={backgroundUrl[pub.id % 7]}
          bg="gray.200"
          w="100%"
          objectFit="cover"
          h="256px"
          mb="10px"
          borderRadius="12px"
        />
        <Heading
          as="h3"
          size="md"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
            maxWidth: "100%",
          }}
          mb="10px"
        >
          {pub.title}
        </Heading>
        <Flex
          fontWeight="400"
          fontSize="14px"
          mb="10px"
          justifyContent="space-between"
          color="gray.500"
        >
          <Text>By: {pub.creator.username}</Text>
          <Text>members</Text>
        </Flex>
        <Flex
          color={pub.isPrivate ? "gray.600" : "green.400"}
          fontWeight="500"
          fontSize="14px"
          justifyContent="space-between"
          alignItems="center"
        >
          {pub.isPrivate ? (
            <Text>
              <Icon as={BiLockAlt} /> Private
            </Text>
          ) : (
            <Text>
              <Icon as={BiLockOpenAlt} /> Public
            </Text>
          )}
          <Button size="sm" color="gray.600">
            Join now
          </Button>
        </Flex>
      </Flex>
    </NextLink>
  );
};
