import React from "react";
import {
  Avatar,
  Box,
  Text,
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
  useColorModeValue,
  Switch,
  Image,
  InputRightElement,
} from "@chakra-ui/react";
import NextLink from "next/link";
import {
  BiHome,
  BiLogOut,
  BiSearch,
  BiUserCircle,
  BiCodeBlock,
  BiFile,
} from "react-icons/bi";
import {
  RiMoonClearFill,
  RiSunLine,
  RiArrowDropDownLine,
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
  const bg = useColorModeValue("#fece2f", "#fece2f");
  const color = useColorModeValue("black", "white");

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
            colorScheme="blackAlpha"
            bg="blackAlpha.900"
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
            colorScheme="blackAlpha"
            borderColor="blackAlpha.900"
            color="blackAlpha.900"
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
          colorScheme="blackAlpha"
          bg="blackAlpha.900"
          color="white"
          fontWeight={600}
        >
          <Flex justifyContent="space-between" alignItems="center">
            <Box className={navBarStyles.navbar__userNameAvatar}>
              {data.me.username.length > 12 ? (
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
            <Flex
              alignItems="center"
              ml="24px"
              mt="10px"
              mb="10px"
              fontWeight="800"
              fontSize="medium"
            >
              <Image
                w="30px"
                mr={2}
                src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1615108567/Stockholm_icons_-_Design_-_Layers_2x_bgdh8j.png"
              />
              BLOG
            </Flex>
            <Box className={navBarStyles.navbar__drawerSection}>
              <DrawerHeader className={navBarStyles.navbar__drawerHeader}>
                My Stuff
              </DrawerHeader>
              <DrawerBody className={navBarStyles.navbar__drawerBody}>
                <List spacing={5}>
                  <ListItem>
                    <ListIcon as={BiHome} />
                    <NextLink href="/" as={`/`}>
                      HOME
                    </NextLink>
                  </ListItem>
                  <ListItem>
                    <ListIcon as={BiFile} />
                    <NextLink href="/blog">BLOG</NextLink>
                  </ListItem>
                  <ListItem>
                    <ListIcon as={BiUserCircle} />
                    <NextLink href="/user/[id]" as={`/user/${data.me.id}`}>
                      MY ACCOUNT
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
                    <ListIcon as={BiCodeBlock} />
                    SOURCE CODE
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

  return (
    <Flex
      zIndex={2}
      top={0}
      position="sticky"
      fontWeight={700}
      className={navBarStyles.navbar__container}
      bg={bg}
      color={color}
    >
      <Flex
        className={navBarStyles.navbar__wrapper}
        alignItems="center"
        justifyContent="space-between"
      >
        <Box mr={2}>
          <NextLink href="/">
            <Flex cursor="pointer" fontSize="large" alignItems="center">
              <Image
                w="36px"
                mr={2}
                src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1615108567/Stockholm_icons_-_Design_-_Layers_2x_bgdh8j.png"
              />
              <Text fontWeight="800">BLOG</Text>
            </Flex>
          </NextLink>
        </Box>
        <InputGroup className={navBarStyles.navbar__searchInputGroup}>
          <Input
            // maxW=""
            flexGrow={1}
            fontSize="md"
            type="text"
            placeholder="Search for titles, authors, topics..."
            background="white"
            borderColor="blackAlpha.900"
            color="black"
            mr={2}
          />
          <InputRightElement mr={2}>
            <BiSearch color="blackAlpha" />
          </InputRightElement>
        </InputGroup>
        <Flex>{renderUser}</Flex>
      </Flex>
    </Flex>
  );
};
