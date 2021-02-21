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
  useColorMode,
  Switch,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { BiLogOut, BiSearch } from "react-icons/bi";
import {
  RiUser3Fill,
  RiCopperCoinFill,
  RiVipCrown2Fill,
  RiCustomerServiceFill,
  RiFileCodeFill,
  RiHome2Fill,
  RiPagesFill,
  RiArrowDropDownLine,
  RiMoonClearFill,
  RiSunLine,
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

  // color mode
  const { colorMode, toggleColorMode } = useColorMode();

  // Drawer
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      <Flex className={navBarStyles.navbar__loginRegisterBtns}>
        <NextLink href="/login">
          <Button
            colorScheme="telegram"
            alignItems={"center"}
            mr={2}
            fontSize="sm"
            fontWeight={800}
            className={navBarStyles.navbar__loginBtn}
          >
            Login
          </Button>
        </NextLink>
        <NextLink href="/register">
          <Button
            colorScheme="telegram"
            variant="outline"
            fontSize="sm"
            fontWeight={800}
            className={navBarStyles.navbar__registerBtn}
          >
            Sign Up
          </Button>
        </NextLink>
      </Flex>
    );
  } else {
    // client is logged in
    renderUser = (
      <Flex className={navBarStyles.navbar__userGroup}>
        <Button
          onClick={onOpen}
          className={navBarStyles.navbar__userBtn}
          leftIcon={<RiArrowDropDownLine />}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Box className={navBarStyles.navbar__userNameAvatar}>
              {data.me.username.length > 6 ? (
                <Text className={navBarStyles.navbar__username} mr={4}>
                  {data.me.username}
                </Text>
              ) : (
                <Text fontSize="sm" mr={2}>
                  {data.me.username}
                </Text>
              )}
            </Box>
            <Avatar
              className={navBarStyles.navbar__userAvatarImg}
              size="sm"
              name={data.me.username}
              src={avatarUrlGenerator(data.me.id)}
              mr={1}
            />
          </Flex>
        </Button>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent className={navBarStyles.navbar__drawerContainer}>
            <DrawerCloseButton />
            <Box ml="24px" mt="10px" fontWeight="900" fontSize="x-large">
              !MPLEMENT
            </Box>
            <Divider border="2px solid" />
            <Box className={navBarStyles.navbar__drawerSection}>
              <DrawerHeader className={navBarStyles.navbar__drawerHeader}>
                My Stuff
              </DrawerHeader>
              <DrawerBody className={navBarStyles.navbar__drawerBody}>
                <List spacing={5}>
                  <ListItem>
                    <ListIcon as={RiHome2Fill} />
                    <NextLink href="/" as={`/`}>
                      Home
                    </NextLink>
                  </ListItem>
                  <ListItem>
                    <ListIcon as={RiUser3Fill} />
                    <NextLink href="/user/[id]" as={`/user/${data.me.id}`}>
                      My Account
                    </NextLink>
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
                    {colorMode === "light" ? (
                      <ListIcon as={RiSunLine} />
                    ) : (
                      <ListIcon as={RiMoonClearFill} />
                    )}
                    {colorMode}
                    <Switch
                      onChange={toggleColorMode}
                      colorScheme="teal"
                      isChecked={colorMode === "dark"}
                      ml={2}
                    />
                  </ListItem>
                  <ListItem>
                    <ListIcon as={RiCopperCoinFill} />
                    Coins
                  </ListItem>
                  <ListItem>
                    <ListIcon as={RiVipCrown2Fill} />
                    Upgrade premiums
                  </ListItem>
                  <ListItem>
                    <ListIcon as={RiCustomerServiceFill} />
                    Help center
                  </ListItem>
                  <ListItem>
                    <ListIcon as={RiFileCodeFill} />
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
                <BiLogOut style={{ marginRight: "5px", fontSize: "20px" }} />
                <Text ml={1} fontWeight="bold" fontSize="20px">
                  Logout
                </Text>
              </Button>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
      </Flex>
    );
  }
  console.log("color mode: ", colorMode);
  return (
    <Flex
      zIndex={2}
      top={0}
      position="sticky"
      fontWeight={700}
      className={navBarStyles.navbar__container}
      backgroundColor="lightslategrey"
      color="white"
    >
      <Flex
        className={navBarStyles.navbar__wrapper}
        alignItems="center"
        justifyContent="space-between"
      >
        <NextLink href="/">
          <Box cursor="pointer" fontWeight="extrabold" fontSize="x-large">
            !MPLEMENT
          </Box>
        </NextLink>
        <InputGroup className={navBarStyles.navbar__searchInputGroup}>
          <Input
            maxW="500px"
            fontSize="md"
            type="text"
            placeholder="Search for titles, authors, topics..."
            background="white"
            color="black"
            mr={2}
          />
          <Button
            w="100px"
            leftIcon={<BiSearch />}
            fontSize="sm"
            px={8}
            className={navBarStyles.navbar__searchBtn}
            color="black"
          >
            Search
          </Button>
        </InputGroup>
        <NextLink href="/">
          <Flex
            className={navBarStyles.navbar__homeRoute}
            align={"center"}
            as={Link}
            mr={4}
            fontSize="sm"
          >
            <RiHome2Fill style={{ marginRight: "5px" }} /> Home
          </Flex>
        </NextLink>
        <NextLink href="/articles">
          <Flex
            className={navBarStyles.navbar__articlesRoute}
            align={"center"}
            as={Link}
            mr={4}
            fontSize="sm"
          >
            <RiPagesFill style={{ marginRight: "5px" }} /> Error
          </Flex>
        </NextLink>
        <Flex fontWeight={500}>{renderUser}</Flex>
      </Flex>
    </Flex>
  );
};
