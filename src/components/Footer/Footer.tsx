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
  Image,
} from "@chakra-ui/core";
import React from "react";
import { Wrapper } from "../Wrapper/Wrapper";
import {
  RiFacebookCircleFill,
  RiInstagramFill,
  RiLinkedinBoxFill,
  RiYoutubeFill,
} from "react-icons/ri";
import { GoMarkGithub } from "react-icons/go";

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
          <Flex
            className={footerStyles.footerLogoContainer}
            flexDirection="column"
          >
            <Heading size="md" color="#000">
              <Image
                height="38px"
                src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1612622235/black-white_2x_gkchbf.png"
              />
            </Heading>
            <Box className={footerStyles.social__icons}>
              <RiFacebookCircleFill className={footerStyles.social__icon} />
              <RiInstagramFill className={footerStyles.social__icon} />
              <RiLinkedinBoxFill className={footerStyles.social__icon} />
              <RiYoutubeFill className={footerStyles.social__icon} />
            </Box>
            <List spacing={3}>
              <ListItem className={footerStyles.menu__item}>
                <a
                  href="https://github.com/ChauDinh/reddit-web"
                  target="__blank"
                >
                  <Icon height="24px" width="24px" as={GoMarkGithub} />
                  Source Code
                </a>
              </ListItem>
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
