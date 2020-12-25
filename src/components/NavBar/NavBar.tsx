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
import { BiChevronDown, BiLogOut } from "react-icons/bi";
import { BsHouseDoor, BsFileRichtext } from "react-icons/bs";
import {
  RiSettings5Fill,
  RiUser3Fill,
  RiCopperCoinFill,
  RiVipCrown2Fill,
  RiCustomerServiceFill,
  RiFileCodeFill,
  RiChatFollowUpFill,
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
      <Flex className={navBarStyles.navbar__loginRegisterBtns}>
        <NextLink href="/login">
          <Button
            variantColor="blue"
            alignItems={"center"}
            mr={4}
            fontSize="sm"
            className={navBarStyles.navbar__loginBtn}
          >
            Login
          </Button>
        </NextLink>
        <NextLink href="/register">
          <Button
            variantColor="green"
            fontSize="sm"
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
          ref={btnRef}
          className={navBarStyles.navbar__userBtn}
          leftIcon={BiChevronDown}
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
            <Image
              maxW="169px"
              mt="10px"
              ml="24px"
              alt="logo"
              height="40px"
              src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1608787243/Group_14_2x_ky51ky.png"
            />
            <Divider border="2px solid" />
            <Box className={navBarStyles.navbar__drawerSection}>
              <DrawerHeader className={navBarStyles.navbar__drawerHeader}>
                My Stuff
              </DrawerHeader>
              <DrawerBody className={navBarStyles.navbar__drawerBody}>
                <List spacing={5}>
                  <ListItem>
                    <ListIcon icon={RiUser3Fill} />
                    <NextLink href="/user/[id]" as={`/user/${data.me.id}`}>
                      Dashboard
                    </NextLink>
                  </ListItem>
                  <ListItem>
                    <ListIcon icon={RiSettings5Fill} />
                    Reading list
                  </ListItem>
                  <ListItem>
                    <ListIcon icon={RiChatFollowUpFill} />
                    Following
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
                    Coins
                  </ListItem>
                  <ListItem>
                    <ListIcon icon={RiVipCrown2Fill} />
                    Upgrade premiums
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
                <BiLogOut style={{ marginRight: "5px" }} />
                <Text ml={1} color="#000" fontWeight="bold" fontSize="16px">
                  Logout
                </Text>
              </Button>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
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
      <Flex
        className={navBarStyles.navbar__wrapper}
        alignItems="center"
        justifyContent="space-between"
      >
        <NextLink href="/">
          <Link textDecoration="none">
            <Image
              className={navBarStyles.navbar__logo}
              alt="logo"
              src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1608787243/Group_14_2x_ky51ky.png"
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
          <Button
            w="100px"
            leftIcon="search"
            variantColor="gray"
            fontSize="sm"
            px={8}
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
            <BsHouseDoor style={{ marginRight: "5px" }} /> Home
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
            <BsFileRichtext style={{ marginRight: "5px" }} /> Articles
          </Flex>
        </NextLink>
        <Flex fontWeight={500}>{renderUser}</Flex>
      </Flex>
    </Flex>
  );
};
