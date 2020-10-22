import React from 'react';
import Slider from "react-slick";
import { PostSnippetFragment, SinglePostSnippetFragment } from '../../generated/graphql';

import PopularPostStyles from "./PopularPost.module.css";
import {PostCard} from "../PostCard/PostCard";
import { Box, Heading } from '@chakra-ui/core';

interface Props {
  popular: PostSnippetFragment[] | SinglePostSnippetFragment[]
}

export const PopularPost: React.FC<Props> = ({popular}) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
  };

  return (
    <div className={PopularPostStyles.slick__container}>
      <Heading mb={2} color="#FFF" size="md">Popular articles</Heading>
      <Slider {...settings}>
        <Box className={PopularPostStyles.slick__item}>
          {popular.slice(0, 3).map(post => <PostCard post={post}/>)}
        </Box>
        <Box className={PopularPostStyles.slick__item}>
          {popular.slice(3, 6).map(post => <PostCard post={post}/>)}
        </Box>
      </Slider>      
    </div>
  );
}