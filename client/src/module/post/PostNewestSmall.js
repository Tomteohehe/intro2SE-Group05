import React from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
const PostNewestSmallStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 16px;
      height: 250px;
      border-radius: 16px;
    }
    &-category {
      margin-bottom: 10px;
    }
    &-title {
      margin-bottom: 10px;
    }
  }
`;

const truncateTitle = (title, maxLength) => {
  if (title.length <= maxLength) {
    return title;
  } else {
    return title.slice(0, maxLength) + "...";
  }
};

const PostNewestSmall = ({ post }) => {
  const truncatedTitle = truncateTitle(post.title, 60);
  return (
    <PostNewestSmallStyles>
      <PostImage
        url={`${
          post?.image ||
          `https://images.unsplash.com/photo-1678047471351-84a24c661587?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
        }`}
        alt=""
      ></PostImage>
      <PostCategory>{post?.category}</PostCategory>
      <PostTitle size="medium" className="post-title" to={`/post/${post._id}`}>
        {truncatedTitle}
      </PostTitle>
      <PostMeta color="gray" authorName="MrWeirdo" date={post?.date}></PostMeta>
    </PostNewestSmallStyles>
  );
};

export default PostNewestSmall;
