import { Grid, Flex, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { avatarUrlGenerator } from "../../utils/createAvatar";

interface Props {}

export const FeaturedPost: React.FC<Props> = () => {
  return (
    <Grid
      padding="15px"
      border="1px solid rgba(200, 200, 200, 0.4)"
      borderRadius="12px"
      w="100%"
      templateColumns={{
        base: "repeat(1, 1fr)",
        md: "1.5fr 1fr",
        lg: "1.5fr 1fr",
      }}
      gridGap={{ base: "0 20px", md: "0 20px", lg: "0 60px" }}
    >
      <Image
        bg="gray.200"
        borderRadius="12px"
        w="100%"
        h="296px"
        objectFit="cover"
        mb={{ base: "10px", md: "0px", lg: "0px" }}
        src="https://res.cloudinary.com/dnlthcx1a/image/upload/v1616422016/crayon-waiting-3_xlr4rh.png"
      />

      <Flex direction="column">
        <Text
          fontSize="14px"
          color="gray.500"
          textTransform="uppercase"
          display="inline-block"
          mb="5px"
        >
          JavaScript
        </Text>
        <Heading
          as="h2"
          size="lg"
          fontWeight={800}
          mb="10px"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
            maxWidth: "100%",
          }}
          flexGrow={1}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Veritatis
          sit delectus voluptate explicabo perspiciatis? Nam animi quae sed esse
          atque iste et suscipit dicta nesciunt neque eos laborum commodi qui
          est ullam deleniti aliquid tenetur aspernatur, amet eveniet, id velit
          mollitia iure. Impedit, nostrum ullam quod dolores consectetur
          voluptate rerum.
        </Heading>
        <Text
          fontWeight="400"
          fontSize="14px"
          mb="20px"
          color="gray.500"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "100%",
            maxWidth: "100%",
          }}
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Doloremque
          earum, tempora maxime iure reiciendis fuga sint. Quibusdam ut labore
          vitae eveniet autem sed, distinctio cumque quam? Explicabo
          necessitatibus ut ipsum.
        </Text>
        <Flex alignItems="center">
          <Image
            src={avatarUrlGenerator(1)}
            width="50px"
            height="50px"
            borderRadius="10px"
            objectFit="cover"
            flexShrink={0}
            mr="10px"
          />
          <Flex direction="column">
            <Text fontWeight={600} fontSize="14px" mb="5px">
              By: Ben Awad
            </Text>
            <Text fontSize="12px" color="gray.500" fontWeight="300">
              3/1/2021
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Grid>
  );
};
