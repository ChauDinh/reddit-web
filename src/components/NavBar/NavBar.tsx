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
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
} from "@chakra-ui/core";
import NextLink from "next/link";
import { useRouter } from "next/router";

import { useMeQuery, useLogoutMutation } from "../../generated/graphql";
import { isServer } from "../../utils/isServer";
import { avatarUrlGenerator } from "../../utils/createAvatar";
import navBarStyles from "./NavBar.module.css";

interface Props {}

export const NavBar: React.FC<Props> = () => {
  const [{ data, fetching }] = useMeQuery({ pause: isServer() }); // if the typeof window is server, we don't send the query
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  let renderUser = null; // the html rendered in user link component
  const router = useRouter();

  // Drawer
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

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
          <DrawerContent>
            <DrawerCloseButton />
            <Box>
              <DrawerHeader>My Stuff</DrawerHeader>
              <DrawerBody>
                <Text>Something...</Text>
              </DrawerBody>
            </Box>
            <Box>
              <DrawerHeader>View option</DrawerHeader>
              <DrawerBody>
                <Text>Something...</Text>
              </DrawerBody>
            </Box>
            <DrawerHeader>More Stuff</DrawerHeader>
            <DrawerBody>
              <Text>Something...</Text>
            </DrawerBody>
            <DrawerHeader>Logout</DrawerHeader>
          </DrawerContent>
        </Drawer>
        <Button
          className={navBarStyles.navbar__logoutBtn}
          variant="link"
          onClick={async () => {
            await logout();
            router.reload();
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
        <Icon name="sun" mx={2} />

        <Icon name="moon" mx={2} />

        <Icon name="email" mx={2} />
      </Box>
      <Flex fontWeight={500}>{renderUser}</Flex>
    </Flex>
  );
};
