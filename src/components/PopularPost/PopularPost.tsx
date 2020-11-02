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
import { Wrapper } from "../Wrapper/Wrapper";

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
        background: "#000",
        justifyContent: "center",
        borderRadius: "50%",
        zIndex: "1",
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
        paddingTop: "2.69px",
        right: "-7px",
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
        background: "#000",
        zIndex: "1",
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
        paddingTop: "2.69px",
        left: "-7px",
      }}
      onClick={onClick}
    />
  );
};

export const PopularPost: React.FC<Props> = ({ popular }) => {
  const { width } = useWindowDimensions();

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
      <Wrapper variants="regular">
        <Heading color="#333" size="md">
          #Popular articles
        </Heading>
      </Wrapper>
      {width > 767 ? (
        <Slider {...settings}>
          <Wrapper variants="regular">
            <Box className={PopularPostStyles.slick__item}>
              {popular.slice(0, 3).map((post) => (
                <PostCard post={post} />
              ))}
            </Box>
          </Wrapper>
          <Wrapper variants="regular">
            <Box className={PopularPostStyles.slick__item}>
              {popular.slice(3, 6).map((post) => (
                <PostCard post={post} />
              ))}
            </Box>
          </Wrapper>
        </Slider>
      ) : (
        <Slider {...settings}>
          {popular.map((pop) => (
            <Wrapper variants="regular">
              <Box>
                <PostCard post={pop}></PostCard>
              </Box>
            </Wrapper>
          ))}
        </Slider>
      )}
    </div>
  );
};
