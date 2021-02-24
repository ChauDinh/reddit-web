import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { Wrapper } from "../Wrapper/Wrapper";
import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiYoutubeFill,
  RiMailFill,
} from "react-icons/ri";

import footerStyles from "./Footer.module.css";

interface Props {}

export const Footer: React.FC<Props> = () => {
  const bg = useColorModeValue("gray.200", "gray.800");
  const color = useColorModeValue("black", "white");
  return (
    <Box className={footerStyles.footer__container} color={color} bg={bg}>
      <Wrapper variants="regular">
        <Flex
          className={footerStyles.footer__body}
          justifyContent="space-between"
          w="100%"
        >
          <Flex
            className={footerStyles.footerLogoContainer}
            flexDirection="column"
          >
            <Heading size="xl">!MPLEMENT</Heading>
            <Box className={footerStyles.social__icons}>
              <RiFacebookCircleFill className={footerStyles.social__icon} />
              <RiInstagramFill className={footerStyles.social__icon} />
              <RiLinkedinBoxFill className={footerStyles.social__icon} />
              <RiYoutubeFill className={footerStyles.social__icon} />
            </Box>
            <List spacing={3}>
              <ListItem className={footerStyles.menu__item}>
                Design © 2020 by{" "}
                <a
                  href="https://www.facebook.com/dinh.leslie.71/"
                  target="__blank"
                >
                  Chau Dinh
                </a>
              </ListItem>
            </List>
          </Flex>
          <Flex className={footerStyles.menu}>
            <List spacing={3}>
              <ListItem className={footerStyles.menu__heading}>
                Features
              </ListItem>
              <ListItem className={footerStyles.menu__item}>Help</ListItem>
              <ListItem className={footerStyles.menu__item}>
                Premium Member
              </ListItem>
              <ListItem className={footerStyles.menu__item}>
                Top Topics
              </ListItem>
              <ListItem className={footerStyles.menu__item}>Advertise</ListItem>
            </List>
            <List spacing={3}>
              <ListItem className={footerStyles.menu__heading}>
                About Us
              </ListItem>
              <ListItem className={footerStyles.menu__item}>Our team</ListItem>
              <ListItem className={footerStyles.menu__item}>Careers</ListItem>
              <ListItem className={footerStyles.menu__item}>Press</ListItem>
              <ListItem className={footerStyles.menu__item}>Terms</ListItem>
              <ListItem className={footerStyles.menu__item}>
                Privacy Policy
              </ListItem>
            </List>
            <List className={footerStyles.subscribe} spacing={3}>
              <ListItem className={footerStyles.menu__heading}>
                Stay Up To Date
              </ListItem>
              <ListItem className={footerStyles.menu__item}>
                Subscribe our newsletter
              </ListItem>
              <ListItem className={footerStyles.menu__item}>
                <InputGroup borderRadius="3px" color="#333" background="white">
                  <InputLeftElement children={<RiMailFill />} />
                  <Input
                    className={footerStyles.menu__subscribeInput}
                    placeholder="email"
                  />
                </InputGroup>
              </ListItem>
            </List>
          </Flex>
        </Flex>
      </Wrapper>
    </Box>
  );
};
