import Heading from "components/layout/Heading";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";

const PostRelated = ({ posts }) => {
  return (
    <div className="post-related">
      <Heading>Related Posts</Heading>
      <div className="grid-layout grid-layout--primary">
        {/* <PostItem key="1"></PostItem>
        <PostItem key="1"></PostItem>
        <PostItem key="1"></PostItem>
        <PostItem key="1"></PostItem> */}
        {posts.map((post) => (
          <PostItem post={post}></PostItem>
        ))}
      </div>
    </div>
  );
};

export default PostRelated;
