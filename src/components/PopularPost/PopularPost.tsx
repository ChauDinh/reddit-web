import React from "react";
import Slider from "react-slick";
import {
  PostSnippetFragment,
  SinglePostSnippetFragment,
} from "../../generated/graphql";

import PopularPostStyles from "./PopularPost.module.css";
import { PostCard } from "../PostCard/PostCard";
import { Box, Heading } from "@chakra-ui/react";
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
        background: "#0933dd",
        justifyContent: "center",
        borderRadius: "50%",
        zIndex: "1",
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
        paddingTop: "2.69px",
        right: "0px",
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
        background: "#0933dd",
        zIndex: "1",
        boxShadow: "0 3px 6px rgba(0, 0, 0, 0.1)",
        paddingTop: "2.69px",
        left: "0px",
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
      <Heading size="md" className={PopularPostStyles.title}>
        POPULAR ARTICLES
      </Heading>

      {width > 600 ? (
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
