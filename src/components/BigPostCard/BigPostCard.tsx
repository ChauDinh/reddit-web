import { Box, Flex, Heading, Icon, Image, Text } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { BiChevronRight } from "react-icons/bi";

interface Props {}

export const BigPostCard: React.FC<Props> = () => {
  return (
    <Flex direction="column" w="100%" mb="20px">
      <Box w="100%" position="relative">
        <Image
          w="100%"
          src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1615275231/taxi-591_tcwccx.png"
          mb={2}
        />
        <Box
          position="absolute"
          left="10px"
          top="16px"
          colorScheme="blackAlpha"
          bg="blackAlpha.900"
          color="white"
          padding="3px 10px"
          borderRadius="3px"
          fontSize="10px"
          fontWeight="600"
        >
          hello, world
        </Box>
      </Box>
      <Text fontSize="sm" colorScheme="gray" color="gray.400">
        Nov 23, 2021
      </Text>
      <Heading fontSize="2xl" mb={2}>
        How Procore's Culture Academy is Helping Companies Create A Substainable
        Competitive Advantage
      </Heading>
      <Text colorScheme="gray" color="gray.500" mb={2}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione modi
        eos molestiae voluptates reprehenderit quibusdam minima, incidunt iste
      </Text>
      <NextLink href="/" as="/">
        <Text fontSize="16px" fontWeight="600" cursor="pointer">
          Read post <Icon as={BiChevronRight} />
        </Text>
      </NextLink>
    </Flex>
  );
};
