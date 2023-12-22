import Layout from "components/layout/Layout";
import PostCategory from "module/post/PostCategory";
import PostImage from "module/post/PostImage";
import PostMeta from "module/post/PostMeta";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PostRelated from "module/post/PostRelated";
import { postContext } from "contexts/postContext";
import HTMLReactParser from "html-react-parser";

// import PostRelated from "module/post/PostRelated";
const PostDetailsPageStyles = styled.div`
  padding-bottom: 100px;
  .post {
    &-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 40px;
      margin: 40px 0;
    }
    &-feature {
      width: 100%;
      max-width: 640px;
      height: 466px;
      border-radius: 20px;
    }
    &-heading {
      font-weight: bold;
      font-size: 36px;
      margin-bottom: 16px;
    }
    &-info {
      flex: 1;
    }
    &-content {
      max-width: 700px;
      margin: 80px auto;
    }
  }
  .author {
    width: fit-content;
    margin-top: 40px;
    margin-bottom: 80px;
    display: flex;
    align-items: center;
    padding: 1em;
    border-radius: 20px;
    background-color: ${(props) => props.theme.grayF3};
    cursor: pointer;
    &-image {
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      border-radius: 100%;
      margin-right: 1em;
    }
    &-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: inherit;
    }
    &-content {
      flex: 1;
    }
    &-name {
      font-weight: bold;
      font-size: calc(0.5em + 0.5vw);
    }
    &-desc {
      font-size: calc(0.3em + 0.5vw);
      line-height: 2;
    }
  }
  @media screen and (max-width: 1023.98px) {
    padding-bottom: 40px;
    .post {
      &-header {
        flex-direction: column;
      }
      &-feature {
        height: auto;
      }
      &-heading {
        font-size: 26px;
      }
      &-content {
        margin: 40px 0;
      }
    }
  }
`;

const DetailPage = () => {
  const { slug } = useParams();

  const {
    postState: { detailpost },
    getDetailedPost,
  } = useContext(postContext);
  const id = slug;
  const detailid = { id };
  useState(() => getDetailedPost(detailid), []);
  console.log(detailpost);

  return (
    <>
      {detailpost.map((post) => (
        <PostDetailsPageStyles>
          <Layout>
            <div className="container">
              <div className="post-header">
                <PostImage
                  url={post.image}
                  className="post-feature"
                ></PostImage>
                <div className="post-info">
                  <PostCategory className="mb-6">{post.category}</PostCategory>
                  <h1 className="post-heading">{post.title}</h1>
                  <PostMeta
                    date={post.date}
                    authorName={post.user.username}
                  ></PostMeta>
                </div>
              </div>
              <div className="post-content">
                <div className="entry-content">
                  {HTMLReactParser(post?.content || "")}
                </div>
                <div className="author">
                  <div className="author-image">
                    <img
                      src="https://images.unsplash.com/photo-1637768285073-6af669cd65bd?q=80&w=1944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt=""
                    />
                  </div>
                  <div className="author-content">
                    <h3 className="author-name">Ho Vinh Dinh</h3>
                    <p className="author-desc">huynhvinhdo1603@gmail.com</p>
                  </div>
                </div>
              </div>
              {/* <PostRelated></PostRelated> */}
            </div>
          </Layout>
        </PostDetailsPageStyles>
      ))}
    </>
  );
};

export default DetailPage;
