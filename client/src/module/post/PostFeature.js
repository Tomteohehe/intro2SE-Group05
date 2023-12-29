import React, { useEffect, useState } from "react";
import PostFeatureItem from "./PostFeatureItem";

function getRandomElementsFromArray(arr, numElements) {
  const shuffledArray = arr.sort(() => Math.random() - 0.5);
  return shuffledArray.slice(0, numElements);
}

const PostFeature = ({ posts }) => {
  const numRandomPosts = 3;
  const randomPosts = getRandomElementsFromArray(posts, numRandomPosts);
  // console.log(randomPosts);

  return (
    <>
      {randomPosts.map((post) => (
        <PostFeatureItem post={post}></PostFeatureItem>
      ))}
    </>
  );
};

export default PostFeature;
