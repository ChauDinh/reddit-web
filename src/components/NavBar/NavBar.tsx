import React from "react";
import {
  Avatar,
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
import { BiLogOut, BiChevronDown } from "react-icons/bi";
import {
  RiSettings5Fill,
  RiUser3Fill,
  RiMoonClearFill,
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
import { DarkModeSwitch } from "../DarkMode/DarkModeSwitch";

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
        <NextLink href="/register">
          <Button variantColor="blue" fontSize="sm" mr={4} as={Link}>
            Sign Up
          </Button>
        </NextLink>
        <NextLink href="/login">
          <Button variantColor="orange" fontSize="sm" as={Link}>
            Login
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
              width="100px"
              mt="10px"
              ml="24px"
              alt="logo"
              src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1598938922/reddit-logo_ekhcyg.png"
            />
            <Box className={navBarStyles.navbar__drawerSection}>
              <DrawerHeader className={navBarStyles.navbar__drawerHeader}>
                My Stuff
              </DrawerHeader>
              <DrawerBody className={navBarStyles.navbar__drawerBody}>
                <List spacing={3}>
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
                View option
              </DrawerHeader>
              <DrawerBody className={navBarStyles.navbar__drawerBody}>
                <List spacing={3}>
                  <ListItem>
                    <ListIcon icon={RiMoonClearFill} />
                    Night mode
                  </ListItem>
                </List>
              </DrawerBody>
            </Box>
            <Box className={navBarStyles.navbar__drawerSection}>
              <DrawerHeader className={navBarStyles.navbar__drawerHeader}>
                More Stuff
              </DrawerHeader>
              <DrawerBody className={navBarStyles.navbar__drawerBody}>
                <List spacing={3}>
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
              <BiLogOut color="#333" />{" "}
              <Text ml={1} color="#333" fontWeight="medium">
                Logout
              </Text>
            </DrawerHeader>
          </DrawerContent>
        </Drawer>
        <Button
          className={navBarStyles.navbar__logoutBtn}
          variant="link"
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
            src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1598938922/reddit-logo_ekhcyg.png"
          />
        </Link>
      </NextLink>
      <Box className={navBarStyles.navbar__homeBtn} mx={4}>
        <Menu>
          <MenuButton className={navBarStyles.navbar__homeMenuBtn} as={Button}>
            Home
            <Icon name="chevron-down" />
          </MenuButton>
          <MenuList className={navBarStyles.navbar__homeMenuList}>
            <MenuItem className={navBarStyles.navbar__homeMenuItem}>
              Popular
            </MenuItem>
            <MenuItem className={navBarStyles.navbar__homeMenuItem}>
              All
            </MenuItem>
            <MenuItem className={navBarStyles.navbar__homeMenuItem}>
              Create post
            </MenuItem>
            <MenuItem className={navBarStyles.navbar__homeMenuItem}>
              User setting
            </MenuItem>
            <MenuItem className={navBarStyles.navbar__homeMenuItem}>
              Messages
            </MenuItem>
            <MenuItem className={navBarStyles.navbar__homeMenuItem}>
              Premium member
            </MenuItem>
          </MenuList>
        </Menu>
      </Box>
      <InputGroup className={navBarStyles.navbar__searchInputGroup} mr={4}>
        <InputLeftElement children={<Icon name="search" color="gray.300" />} />
        <Input fontSize="sm" type="text" placeholder="Search" mr={2} />
        <Button className={navBarStyles.navbar__searchBtn} px={8}>
          Search
        </Button>
      </InputGroup>
      <Box mr={4} className={navBarStyles.navbar__iconGroup}>
        <DarkModeSwitch />
        <Icon name="email" mx={2} />
      </Box>
      <Flex fontWeight={500}>{renderUser}</Flex>
    </Flex>
  );
};
