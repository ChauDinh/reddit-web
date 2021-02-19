import React from "react";
import { Tag, TagCloseButton } from "@chakra-ui/react";

interface Props {
  id: number;
  title: string;
}

export const CategoryTag: React.FC<Props> = ({ title, id }) => {
  const [isSelect, setIsSelect] = React.useState(false);

  return (
    <Tag
      mr={1}
      color="telegram.500"
      fontWeight={600}
      cursor="pointer"
      borderRadius="3px"
      fontSize="13px"
      key={id}
      onClick={() => setIsSelect(!isSelect)}
      colorScheme={isSelect ? "green" : undefined}
      textTransform="uppercase"
    >
      {title}
      {isSelect ? <TagCloseButton /> : null}
    </Tag>
  );
};
