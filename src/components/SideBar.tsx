import React from "react";
import { Flex, Box, Heading, List, ListItem, Button } from "@chakra-ui/core";

interface Props {}

const SideBar: React.FC<Props> = () => {
  return (
    <Flex flexDirection="column" ml={8} maxW="230px" w="100%">
      <Heading fontSize="12" mb={3}>
        Today's Top Growing
      </Heading>
      <Box background="#fff" p={2} borderRadius="3px">
        <List fontSize="sm" as="ol" styleType="decimal">
          <ListItem mt={2} pb={2} borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            Lorem ipsum dolor sit amet
          </ListItem>
          <ListItem mt={2} pb={2} borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            Consectetur adipiscing elit
          </ListItem>
          <ListItem mt={2} pb={2} borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            Integer molestie lorem
          </ListItem>
          <ListItem mt={2} pb={2} borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            Facilisis in pretium nisl aliquet
          </ListItem>
        </List>
        <Button
          w="100%"
          fontSize="sm"
          h="30px"
          variant="solid"
          variantColor="blue"
        >
          View all
        </Button>
      </Box>
      <Heading fontSize="12" mt="30px" mb={3}>
        Trending Today
      </Heading>
      <Box background="#fff" p={2} borderRadius="3px">
        <List fontSize="sm" as="ol" styleType="decimal">
          <ListItem mt={2} pb={2} borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            Lorem ipsum dolor sit amet
          </ListItem>
          <ListItem mt={2} pb={2} borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            Consectetur adipiscing elit
          </ListItem>
          <ListItem mt={2} pb={2} borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            Integer molestie lorem
          </ListItem>
          <ListItem mt={2} pb={2} borderBottom="1px solid rgba(0, 0, 0, 0.08)">
            Facilisis in pretium nisl aliquet
          </ListItem>
        </List>
        <Button
          w="100%"
          fontSize="sm"
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
        fontSize="xs"
      >
        Reddit Redesign Inc ⓒ 2020. All rights reserved
      </Box>
    </Flex>
  );
};

export default SideBar;
