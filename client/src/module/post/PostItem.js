import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";

const PostItemStyles = styled.div`
  padding: 1em;
  background-color: ${(props) => props.theme.grayF3};
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
  .post {
    &-image {
      height: 202px;
      margin-bottom: 20px;
      display: block;
      width: 100%;
      border-radius: inherit;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 20px;
    }
  }
  @media screen and (max-width: 1023.98px) {
    .post {
      &-image {
        aspect-ratio: 16/9;
        height: auto;
      }
    }
  }
`;

const PostItem = ({ post }) => {
  const navigate = useNavigate();
  return (
    <PostItemStyles>
      <PostImage url={post?.image} alt="PostImage"></PostImage>
      <PostCategory type="light">{post?.category}</PostCategory>
      <PostTitle>{post?.title}</PostTitle>
      <PostMeta authorName="Andrew Tate" date={post?.date}></PostMeta>
    </PostItemStyles>
  );
};

export default PostItem;
