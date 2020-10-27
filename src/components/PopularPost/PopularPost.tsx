import React from "react";
import Slider from "react-slick";
import {
  PostSnippetFragment,
  SinglePostSnippetFragment,
} from "../../generated/graphql";

import PopularPostStyles from "./PopularPost.module.css";
import { PostCard } from "../PostCard/PostCard";
import { Box, Heading } from "@chakra-ui/core";
import { useWindowDimensions } from "../../utils/useWindowDimensions";

interface Props {
  popular: PostSnippetFragment[] | SinglePostSnippetFragment[];
}

const NextArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        height: "46px",
        width: "46px",
        display: "flex",
        alignItems: "center",
        background: "#8404e1",
        justifyContent: "center",
        borderRadius: "50%",
        zIndex: "1",
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
        paddingTop: "2.69px",
        right: "3px",
      }}
      onClick={onClick}
    />
  );
};

const PrevArrow = (props: any) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        height: "46px",
        width: "46px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        background: "#8404e1",
        zIndex: "1",
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
        paddingTop: "2.69px",
        left: "3px",
      }}
      onClick={onClick}
    />
  );
};

export const PopularPost: React.FC<Props> = ({ popular }) => {
  const { width } = useWindowDimensions();
  console.log(width);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <div className={PopularPostStyles.slick__container}>
      <Heading mb={2} color="#FFF" size="md">
        Popular articles
      </Heading>
      {width > 767 ? (
        <Slider {...settings}>
          <Box className={PopularPostStyles.slick__item}>
            {popular.slice(0, 3).map((post) => (
              <PostCard post={post} />
            ))}
          </Box>
          <Box className={PopularPostStyles.slick__item}>
            {popular.slice(3, 6).map((post) => (
              <PostCard post={post} />
            ))}
          </Box>{" "}
        </Slider>
      ) : (
        <Slider {...settings}>
          {popular.map((pop) => (
            <Box>
              <PostCard post={pop}></PostCard>
            </Box>
          ))}
        </Slider>
      )}
    </div>
  );
};
