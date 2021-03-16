import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { BiCheckCircle } from "react-icons/bi";
import { BgAndColor } from "../../utils/bgAndColor";

import { Features } from "./Features";
import PricingStyles from "./PricingStyles.module.css";

interface Props {}

export const Pricing: React.FC<Props> = () => {
  const { bg, color } = BgAndColor();
  return (
    <Flex
      justifyContent="space-between"
      w="100%"
      className={PricingStyles.container}
    >
      <Box textAlign="center" className={PricingStyles.plans}>
        <Image
          mb="10px"
          w="250px"
          h="200px"
          src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1615397627/taxi-delivery-1_b6sotl.png"
        />
        <Heading as="h2" size="xl" mb="10px" fontWeight="800">
          Free
        </Heading>
        <Text colorScheme="gray" color="gray.600" fontSize="18px">
          For starters
        </Text>
        <Text colorScheme="gray" color={color} fontSize="36px">
          $0
        </Text>
        <Text colorScheme="gray" color="gray.600" fontSize="16px">
          per user per month
        </Text>
        <Button mt="20px" color={bg} bg={color} colorScheme="gray">
          Get Started
        </Button>
        <Features>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={BiCheckCircle} color="green.600" />
              Up to 5 posts per day
            </ListItem>
            <ListItem>
              <ListIcon as={BiCheckCircle} color="green.600" />
              Up to 5 people per room chat
            </ListItem>
          </List>
        </Features>
      </Box>
      <Box textAlign="center" className={PricingStyles.plans}>
        <Image
          mb="10px"
          w="250px"
          h="200px"
          src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1615397626/taxi-bank_ptodjb.png"
        />
        <Heading as="h2" size="xl" mb="10px" fontWeight="800">
          Premium
        </Heading>
        <Text colorScheme="gray" color="gray.600" fontSize="18px">
          For pros
        </Text>
        <Text colorScheme="gray" color={color} fontSize="36px">
          $3
        </Text>
        <Text colorScheme="gray" color="gray.600" fontSize="16px">
          per user per month
        </Text>
        <Button mt="20px" color={bg} bg={color} colorScheme="gray">
          Try for 14 days free
        </Button>
        <Features>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={BiCheckCircle} color="green.600" />
              Up to 50 posts per day
            </ListItem>
            <ListItem>
              <ListIcon as={BiCheckCircle} color="green.600" />
              Up to 30 people per room chat
            </ListItem>
            <ListItem>
              <ListIcon as={BiCheckCircle} color="green.600" />
              Reminders
            </ListItem>
            <ListItem>
              <ListIcon as={BiCheckCircle} color="green.600" />
              Productivity trends
            </ListItem>
            <ListItem>
              <ListIcon as={BiCheckCircle} color="green.600" />
              Categories upload
            </ListItem>
          </List>
        </Features>
      </Box>
      <Box textAlign="center" className={PricingStyles.plans}>
        <Image
          mb="10px"
          w="250px"
          h="200px"
          src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1615397625/taxi-805_v6qi7j.png"
        />
        <Heading as="h2" size="xl" mb="10px" fontWeight="800">
          Business
        </Heading>
        <Text colorScheme="gray" color="gray.600" fontSize="18px">
          For teams
        </Text>
        <Text colorScheme="gray" color={color} fontSize="36px">
          $5
        </Text>
        <Text colorScheme="gray" color="gray.600" fontSize="16px">
          per user per month
        </Text>
        <Button mt="20px" color={bg} bg={color} colorScheme="gray">
          Upgrade now
        </Button>
        <Features>
          <List spacing={3}>
            <ListItem>
              <ListIcon as={BiCheckCircle} color="green.600" />
              Up to 120 posts per day
            </ListItem>
            <ListItem>
              <ListIcon as={BiCheckCircle} color="green.600" />
              Up to 100 people per room chat
            </ListItem>
            <ListItem>
              <ListIcon as={BiCheckCircle} color="green.600" />
              Co-author with member
            </ListItem>
            <ListItem>
              <ListIcon as={BiCheckCircle} color="green.600" />
              Publication create
            </ListItem>
            <ListItem>
              <ListIcon as={BiCheckCircle} color="green.600" />
              Admin, member roles
            </ListItem>
            <ListItem>
              <ListIcon as={BiCheckCircle} color="green.600" />
              Priority support
            </ListItem>
          </List>
        </Features>
      </Box>
    </Flex>
  );
};
