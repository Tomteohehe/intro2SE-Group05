import React, { useEffect, useState } from "react";
import PostFeatureItem from "./PostFeatureItem";
import { SwiperSlide } from "swiper/react";
import "swiper/css";

const PostFeature = ({ filter = "", user }) => {
  return (
    <>
      <PostFeatureItem></PostFeatureItem>
      <PostFeatureItem></PostFeatureItem>
      <PostFeatureItem></PostFeatureItem>
    </>
  );
};

export default PostFeature;
