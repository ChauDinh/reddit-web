import React from "react";
import {
  Box,
  Text,
  Link,
  Flex,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  InputGroup,
  InputLeftElement,
  Input,
  Image,
} from "@chakra-ui/core";
import NextLink from "next/link";

import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface Props {}

export const NavBar: React.FC<Props> = () => {
  const [{ data, fetching }] = useMeQuery({ pause: isServer() }); // if the typeof window is server, we don't send the query
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let renderUser = null; // the html rendered in user link component

  /**
   * There are 3 states:
   * data is loading
   * client does not log in
   * client is logged in
   */
  if (fetching) {
    // data is loading
  } else if (!data?.me) {
    // client does not log in
    renderUser = (
      <>
        <NextLink href="/register">
          <Link mr={4}>Sign Up</Link>
        </NextLink>
        <NextLink href="/login">
          <Link>Log In</Link>
        </NextLink>
      </>
    );
  } else {
    // client is logged in
    renderUser = (
      <Flex>
        <Text mr={4}>{data.me.username}</Text>
        <Button
          variant="link"
          onClick={() => logout()}
          isLoading={logoutFetching}
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex
      zIndex={2}
      top={0}
      position="sticky"
      style={styles.container}
      fontWeight={700}
    >
      <NextLink href="/">
        <Link textDecoration="none">
          <Image
            alt="logo"
            htmlHeight="50px"
            htmlWidth="150px"
            objectFit="contain"
            src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1598938922/reddit-logo_ekhcyg.png"
          />
        </Link>
      </NextLink>
      <Box style={styles.homeButton} mx={4}>
        <Menu>
          <MenuButton width="100%" justifyContent="space-between" as={Button}>
            Home
            <Icon name="chevron-down" />
          </MenuButton>
          <MenuList width="230px">
            <MenuItem>Popular</MenuItem>
            <MenuItem>All</MenuItem>
            <MenuItem>Create post</MenuItem>
            <MenuItem>User setting</MenuItem>
            <MenuItem>Messages</MenuItem>
            <MenuItem>Premium member</MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <InputGroup style={styles.searchInputGroup} mr={4}>
        <InputLeftElement children={<Icon name="search" color="gray.300" />} />
        <Input type="text" placeholder="Search" />
      </InputGroup>
      <Box mr={4} style={styles.navBarIconGroup}>
        <Icon name="star" mx={2} />

        <Icon name="chat" mx={2} />

        <Icon name="sun" mx={2} color="blue.500" />

        <Icon name="moon" mx={2} />

        <Icon name="settings" mx={2} />
      </Box>
      <Box style={styles.userLink} fontWeight={500}>
        {renderUser}
      </Box>
    </Flex>
  );
};

const styles = {
  container: {
    backgroundColor: "#fff",
    boxShadow: "0 1px 3px rgba(212, 212, 212, 0.5)",
    color: "#000",
    width: "100%",
    padding: "16px 24px",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userLink: {
    display: "flex",
  },
  homeButton: {
    width: "230px",
    justifyContent: "space-between",
  },
  searchInputGroup: {
    flexGrow: 1,
  },
  navBarIconGroup: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
};
