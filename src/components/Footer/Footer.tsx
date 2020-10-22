import { Box, Flex, Heading, Input, List, ListItem, Text } from '@chakra-ui/core';
import React from 'react';
import { Wrapper } from '../Wrapper/Wrapper';
import {RiFacebookCircleFill, RiInstagramFill, RiLinkedinBoxFill, RiYoutubeFill} from "react-icons/ri";

import footerStyles from "./Footer.module.css";


interface Props {

}

export const Footer: React.FC<Props> = () => {
    return (
      <Box className={footerStyles.footer__container}>
        <Wrapper variants="regular">
          <Flex className={footerStyles.footer__body} justifyContent="space-between" w="100%">
            <Flex flexDirection="column">
              <Heading size="md">blog.amanlearnscode</Heading>
              <Text mt={2}>Collaboration platform for modern <br /> IT bloggers</Text>
              <Box className={footerStyles.social__icons}>
                <RiFacebookCircleFill className={footerStyles.social__icon}/>
                <RiInstagramFill className={footerStyles.social__icon}/>
                <RiLinkedinBoxFill className={footerStyles.social__icon}/>
                <RiYoutubeFill className={footerStyles.social__icon}/>
              </Box>
            </Flex>
            <Flex className={footerStyles.menu}>
              <List spacing={3}>
                <ListItem className={footerStyles.menu__heading}>
                  Company
                </ListItem>
                <ListItem>
                  Product
                </ListItem>
                <ListItem>
                  Product
                </ListItem>
              </List>
              <List spacing={3}>
                <ListItem className={footerStyles.menu__heading}>
                  Features
                </ListItem>
                <ListItem>
                  Product
                </ListItem>
                <ListItem>
                  Product
                </ListItem>
                <ListItem>
                  Product
                </ListItem>
                <ListItem>
                  Product
                </ListItem>
              </List>
              <List spacing={3}>
                <ListItem className={footerStyles.menu__heading}>
                  Contact Us
                </ListItem>
                <ListItem>
                  Product
                </ListItem>
              </List>
              <List className={footerStyles.subscribe} spacing={3}>
                <ListItem className={footerStyles.menu__heading}>
                  Stay Up To Date
                </ListItem>
                <ListItem>
                  Subscribe our newsletter
                </ListItem>
                <ListItem>
                  <Input className={footerStyles.menu__subscribeInput} placeholder="email"/>
                </ListItem>
              </List>
            </Flex>
          </Flex>
        </Wrapper>
      </Box>
    );
}