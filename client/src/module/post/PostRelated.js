import Heading from "components/layout/Heading";
import React, { useEffect, useState } from "react";
import PostItem from "./PostItem";

const PostRelated = ({ userId = "", slug = "" }) => {
  // const [posts, setPosts] = useState([]);
  console.log(slug);
  // if (!slug || posts.length <= 0) return null;
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
