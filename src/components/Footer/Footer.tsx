import {
  Box,
  Flex,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  Text,
} from "@chakra-ui/core";
import React from "react";
import { Wrapper } from "../Wrapper/Wrapper";
import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiYoutubeFill,
} from "react-icons/ri";

import footerStyles from "./Footer.module.css";

interface Props {}

export const Footer: React.FC<Props> = () => {
  return (
    <Box className={footerStyles.footer__container}>
      <Wrapper variants="regular">
        <Flex
          className={footerStyles.footer__body}
          justifyContent="space-between"
          w="100%"
        >
          <Flex flexDirection="column">
            <Heading size="md">blog.amanlearnscode</Heading>
            <Text color="rgba(0, 0, 0, 0.8)" mt={2} fontSize="16px">
              Collaboration platform for modern <br /> IT bloggers
            </Text>
            <Box className={footerStyles.social__icons}>
              <RiFacebookCircleFill className={footerStyles.social__icon} />
              <RiInstagramFill className={footerStyles.social__icon} />
              <RiLinkedinBoxFill className={footerStyles.social__icon} />
              <RiYoutubeFill className={footerStyles.social__icon} />
            </Box>
          </Flex>
          <Flex className={footerStyles.menu}>
            <List spacing={3}>
              <ListItem className={footerStyles.menu__heading}>
                Features
              </ListItem>
              <ListItem className={footerStyles.menu__item}>
                Feature #1
              </ListItem>
              <ListItem className={footerStyles.menu__item}>
                Feature #2
              </ListItem>
              <ListItem className={footerStyles.menu__item}>
                Feature #3
              </ListItem>
              <ListItem className={footerStyles.menu__item}>
                Feature #4
              </ListItem>
            </List>
            <List spacing={3}>
              <ListItem className={footerStyles.menu__heading}>
                Contact Us
              </ListItem>
              <ListItem className={footerStyles.menu__item}>Product</ListItem>
            </List>
            <List className={footerStyles.subscribe} spacing={3}>
              <ListItem className={footerStyles.menu__heading}>
                Stay Up To Date
              </ListItem>
              <ListItem className={footerStyles.menu__item}>
                Subscribe our newsletter
              </ListItem>
              <ListItem className={footerStyles.menu__item}>
                <InputGroup color="#333">
                  <InputLeftElement
                    children={<Icon name="email" color="gray.300" />}
                  />
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
