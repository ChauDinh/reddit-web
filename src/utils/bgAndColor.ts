import { useColorModeValue } from "@chakra-ui/react";

export const BgAndColor = () => {
  const bg = useColorModeValue("white", "gray.800");
  const color = useColorModeValue("black", "white");
  return {
    bg,
    color,
  };
};
