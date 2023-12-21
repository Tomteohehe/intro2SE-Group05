import Heading from "components/layout/Heading";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";

const PostRelated = () => {
  return (
    <div className="post-related">
      <Heading>Related Posts</Heading>
      <div className="grid-layout grid-layout--primary">
        <PostItem key="1"></PostItem>
        <PostItem key="1"></PostItem>
        <PostItem key="1"></PostItem>
        <PostItem key="1"></PostItem>
      </div>
    </div>
  );
};

export default PostRelated;
