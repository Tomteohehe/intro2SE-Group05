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

const PostItem = ({ data }) => {
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const date = data?.createdAt?.seconds
    ? new Date(data?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  return (
    <PostItemStyles>
      <PostImage
        url="https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt=""
      ></PostImage>
      <PostCategory type="light">Culture</PostCategory>
      <PostTitle>Universe in a single Atom</PostTitle>
      <PostMeta authorName="Andrew Tate" date="16 Mar"></PostMeta>
    </PostItemStyles>
  );
};

export default PostItem;
