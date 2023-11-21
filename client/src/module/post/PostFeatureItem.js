import React, { useEffect, useState } from "react";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import styled from "styled-components";

const PostFeatureItemStyles = styled.div`
  width: 100%;
  border-radius: 16px;
  position: relative;
  height: 269px;
  .post {
    &-image {
      display: block;
      width: 100%;
      height: 269px;
      border-radius: 16px;
    }
    &-overlay {
      position: absolute;
      inset: 0;
      border-radius: 16px;
      background: linear-gradient(
        179.77deg,
        #6b6b6b 36.45%,
        rgba(163, 163, 163, 0.622265) 63.98%,
        rgba(255, 255, 255, 0) 99.8%
      );
      mix-blend-mode: multiply;
      opacity: 0.6;
    }
    &-content {
      position: absolute;
      inset: 0;
      z-index: 10;
      padding: 20px;
      color: white;
    }
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 16px;
    }
  }
  @media screen and (min-width: 1024px) {
    height: 272px;
  }
`;

const PostFeatureItem = ({ post }) => {
  const [category, setCategory] = useState();
  const [user, setUser] = useState();

  const date = post?.createdAt?.seconds
    ? new Date(post?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");

  return (
    <PostFeatureItemStyles>
      <PostImage
        url="https://images.unsplash.com/photo-1700366232028-d64ab5f6c3a8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="unsplash"
        to="/"
      ></PostImage>
      {/* <div className="post-overlay"></div> */}
      <div className="post-content">
        <div className="post-top">
          <PostCategory>Knowledge</PostCategory>
          <PostMeta
            color="inherit"
            authorName="MrWeirdo"
            date="21 Nov"
          ></PostMeta>
        </div>
        <PostTitle size="large">No room for self-doubt</PostTitle>
      </div>
    </PostFeatureItemStyles>
  );
};

export default PostFeatureItem;
