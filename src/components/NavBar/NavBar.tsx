import React from "react";
import {
  Avatar,
  Box,
  Text,
  Link,
  Flex,
  Button,
  InputGroup,
  Input,
  Image,
  Drawer,
  DrawerBody,
  Divider,
  DrawerHeader,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  List,
  ListItem,
  ListIcon,
  DrawerOverlay,
} from "@chakra-ui/core";
import NextLink from "next/link";
import { BiChevronDown } from "react-icons/bi";
import {
  RiSettings5Fill,
  RiUser3Fill,
  RiCopperCoinFill,
  RiVipCrown2Fill,
  RiCustomerServiceFill,
  RiFileCodeFill,
} from "react-icons/ri";
import { useApolloClient } from "@apollo/client";

import { useMeQuery, useLogoutMutation } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import { avatarUrlGenerator } from "../../utils/createAvatar";
import navBarStyles from "./NavBar.module.css";

interface Props {}

export const NavBar: React.FC<Props> = () => {
  const { data, loading } = useMeQuery({ skip: isServer() }); // if the typeof window is server, we don't send the query
  const [logout, { loading: logoutFetching }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  let renderUser = null; // the html rendered in user link component

  // Drawer
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  /**
   * There are 3 states:
   * data is loading
   * client does not log in
   * client is logged in
   */
  if (loading) {
    // data is loading
  } else if (!data?.me) {
    // client does not log in
    renderUser = (
      <>
        <NextLink href="/login">
          <Button alignItems={"center"} mr={4}>
            Login
          </Button>
        </NextLink>
        <NextLink href="/register">
          <Button variantColor="purple" color="#fff" fontSize="sm">
            Sign Up
          </Button>
        </NextLink>
      </>
    );
  } else {
    // client is logged in
    renderUser = (
      <Flex className={navBarStyles.navbar__userGroup}>
        <Button
          onClick={onOpen}
          ref={btnRef}
          className={navBarStyles.navbar__userBtn}
          rightIcon={BiChevronDown}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Avatar
              size="sm"
              name={data.me.username}
              src={avatarUrlGenerator(data.me.id)}
              mr={1}
            />
            <Box className={navBarStyles.navbar__userNameAvatar}>
              {data.me.username.length > 6 ? (
                <Text className={navBarStyles.navbar__username} mr={4}>
                  {data.me.username}
                </Text>
              ) : (
                <Text mr={4}>{data.me.username}</Text>
              )}
            </Box>
          </Flex>
        </Button>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent className={navBarStyles.navbar__drawerContainer}>
            <DrawerCloseButton backgroundColor="red" />
            <Image
              width="200px"
              mt="10px"
              ml="24px"
              alt="logo"
              src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1604317326/Group_7_2x_v0bqkz.png"
            />
            <Box className={navBarStyles.navbar__drawerSection}>
              <DrawerHeader className={navBarStyles.navbar__drawerHeader}>
                My Stuff
              </DrawerHeader>
              <DrawerBody className={navBarStyles.navbar__drawerBody}>
                <List spacing={5}>
                  <ListItem>
                    <ListIcon icon={RiUser3Fill} />
                    My profile
                  </ListItem>
                  <ListItem>
                    <ListIcon icon={RiSettings5Fill} />
                    User settings
                  </ListItem>
                </List>
              </DrawerBody>
            </Box>
            <Box className={navBarStyles.navbar__drawerSection}>
              <DrawerHeader className={navBarStyles.navbar__drawerHeader}>
                More Stuff
              </DrawerHeader>
              <DrawerBody className={navBarStyles.navbar__drawerBody}>
                <List spacing={5}>
                  <ListItem>
                    <ListIcon icon={RiCopperCoinFill} />
                    Reddit coins
                  </ListItem>
                  <ListItem>
                    <ListIcon icon={RiVipCrown2Fill} />
                    Reddit premiums
                  </ListItem>
                  <ListItem>
                    <ListIcon icon={RiCustomerServiceFill} />
                    Help center
                  </ListItem>
                  <ListItem>
                    <ListIcon icon={RiFileCodeFill} />
                    Source code
                  </ListItem>
                </List>
              </DrawerBody>
            </Box>
            <Divider mb={0} />
            <DrawerHeader className={navBarStyles.navbar__drawerHeader}>
              <Button
                variant="link"
                onClick={async () => {
                  await logout();
                  await apolloClient.resetStore();
                }}
                isLoading={logoutFetching}
              >
                <Text ml={1} color="#000" fontWeight="bold" fontSize="20px">
                  Logout
                </Text>
              </Button>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
        <Button
          className={navBarStyles.navbar__logoutBtn}
          // variant="link"
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
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
      fontWeight={700}
      className={navBarStyles.navbar__container}
    >
      <NextLink href="/">
        <Link textDecoration="none">
          <Image
            className={navBarStyles.navbar__logo}
            alt="logo"
            src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1604317326/Group_7_2x_v0bqkz.png"
          />
        </Link>
      </NextLink>
      <InputGroup className={navBarStyles.navbar__searchInputGroup}>
        <Input
          maxW="500px"
          fontSize="md"
          type="text"
          placeholder="Search for titles, authors, topics..."
          mr={2}
        />
        <Button className={navBarStyles.navbar__searchBtn} px={8}>
          Search
        </Button>
      </InputGroup>
      <NextLink href="/">
        <Flex
          className={navBarStyles.navbar__homeRoute}
          align={"center"}
          as={Link}
          mr={4}
        >
          Home
        </Flex>
      </NextLink>
      <NextLink href="/articles">
        <Flex
          className={navBarStyles.navbar__articlesRoute}
          align={"center"}
          as={Link}
          mr={4}
        >
          Articles
        </Flex>
      </NextLink>
      <Flex fontWeight={500}>{renderUser}</Flex>
    </Flex>
  );
};
