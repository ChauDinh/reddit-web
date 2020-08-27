import React from "react";
import { Box, Text, Link, Flex, Badge, Button } from "@chakra-ui/core";
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
        <Badge
          mr={4}
          variant="outline"
          display="flex"
          alignItems="center"
          padding="5px 16px"
        >
          {data.me.username}
        </Badge>
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
    <Flex style={styles.container} fontWeight={700}>
      <Text>Reddit</Text>
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
  userLink: {},
};
