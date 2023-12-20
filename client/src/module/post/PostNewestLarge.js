import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import PostCategory from "./PostCategory";
import PostImage from "./PostImage";
import PostMeta from "./PostMeta";
import PostTitle from "./PostTitle";
import { postContext } from "contexts/postContext";
const PostNewestLargeStyles = styled.div`
  .post {
    &-image {
      display: block;
      margin-bottom: 16px;
      height: 433px;
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

const POST_PER_PAGE = 1;

const PostNewestLarge = ({ userList = [] }) => {
  /*
  const randomNum = Math.floor(Math.random(0, 1) * 2);
  const user = userList[randomNum];
  const [posts, setPosts] = useState([]);
  const [filter] = useState("");
  const [, setLastDoc] = useState();
  const [, setTotal] = useState(0);
  const [category, setCategory] = useState("");

  const date = posts[0]?.createdAt?.seconds
    ? new Date(posts[0]?.createdAt?.seconds * 1000)
    : new Date();
  const formatDate = new Date(date).toLocaleDateString("vi-VI");
  */

  const {
    postState: { lastpost, postsLoading },
    getNewestLargePost
  } = useContext(postContext);

  useState(() => getNewestLargePost(), []);

  return (
    <>
      {lastpost.map((post) => (
        <PostNewestLargeStyles>
          <PostImage
            url={`${
              post.image ||
              `https://images.unsplash.com/photo-1678047471351-84a24c661587?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`
            }`}
            alt=""
          ></PostImage>
          <PostCategory>{post.category}</PostCategory>
          <PostTitle size="large" className="post-title">
            {post.title}
          </PostTitle>
          <PostMeta
            color="gray"
            authorName={post.user.username}
            date={post.date}
          ></PostMeta>
        </PostNewestLargeStyles>
      ))}
    </>
  );
};

export default PostNewestLarge;