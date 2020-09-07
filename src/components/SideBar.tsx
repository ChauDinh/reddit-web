import React from "react";
import { Flex, Box, Heading, List, ListItem, Button } from "@chakra-ui/core";

interface Props {}

const SideBar: React.FC<Props> = () => {
  return (
    <Flex flexDirection="column" ml={8} maxW="230px" w="100%">
      <Box background="#fff" p={2}>
        <Heading fontSize="12" mb={8}>
          Today's Top Growing Posts
        </Heading>
        <List fontSize="12px" fontWeight="semibold" as="ol" styleType="decimal">
          <ListItem mt={2} pb={2} borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            Lorem ipsum dolor sit amet
          </ListItem>
          <ListItem mt={2} pb={2} borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            Consectetur adipiscing elit
          </ListItem>
          <ListItem mt={2} pb={2} borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            Integer molestie lorem at massa
          </ListItem>
          <ListItem mt={2} pb={2} borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            Facilisis in pretium nisl aliquet
          </ListItem>
        </List>
        <Button
          w="100%"
          fontSize="12px"
          h="30px"
          variant="solid"
          variantColor="blue"
        >
          View all
        </Button>
      </Box>
      <Box background="#fff" p={2} mt="20px">
        <Heading fontSize="12" mb={8}>
          Trending Posts
        </Heading>
        <List fontSize="12px" fontWeight="semibold" as="ol" styleType="decimal">
          <ListItem mt={2} pb={2} borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            Lorem ipsum dolor sit amet
          </ListItem>
          <ListItem mt={2} pb={2} borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            Consectetur adipiscing elit
          </ListItem>
          <ListItem mt={2} pb={2} borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            Integer molestie lorem at massa
          </ListItem>
          <ListItem mt={2} pb={2} borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            Facilisis in pretium nisl aliquet
          </ListItem>
        </List>
        <Button
          w="100%"
          fontSize="12px"
          h="30px"
          variant="solid"
          variantColor="blue"
        >
          View all
        </Button>
      </Box>
      <Box
        top="90px"
        position="sticky"
        zIndex={3}
        mt="20px"
        background="#fff"
        p={2}
      >
        Advertisement
      </Box>
    </Flex>
  );
};

export default SideBar;
