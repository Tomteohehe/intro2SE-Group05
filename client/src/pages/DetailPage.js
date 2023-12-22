import Layout from "components/layout/Layout";
import PostCategory from "module/post/PostCategory";
import PostImage from "module/post/PostImage";
import PostMeta from "module/post/PostMeta";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import PostRelated from "module/post/PostRelated";
import { postContext } from "contexts/postContext";

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
    postState: { post },
    getDetailedPost,
  } = useContext(postContext);
  const id = { slug };

  useState(() => getDetailedPost(id), {});
  console.log(post);
  // const getPost = async (postId) => {
  //   const id = postId;
  //   const idPostInfo = { id };
  //   try {
  //     const content = await getDetailedPost(idPostInfo);
  //     return content.posts[0];
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  //   const data = getPost(slug);
  //   console.log(data);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <>
      <PostDetailsPageStyles>
        <Layout>
          <div className="container">
            <div className="post-header">
              <PostImage url="" className="post-feature"></PostImage>
              <div className="post-info">
                <PostCategory className="mb-6">Lifestyle</PostCategory>
                <h1 className="post-heading">
                  It's all seem impossible until it's done
                </h1>
                <PostMeta date="20 Nov" authorName="Ho Vinh Dinh"></PostMeta>
              </div>
            </div>
            <div className="post-content">
              <div className="entry-content">
                {/* {parse(postInfo?.content || "")} */}
                <p className="text-lg">Chapter 1</p>
                <i>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Odit
                  sit quas, architecto error, sed fuga ea a nisi saepe esse
                  doloremque soluta facere suscipit, quae repellat molestias
                  iste consectetur aliquid laudantium nulla earum dolor?
                  Incidunt, cumque vitae eius ullam, cum quibusdam quis iusto
                  debitis eos, expedita ex? Nisi repellendus similique nam
                  ratione vero, possimus, vel commodi natus pariatur, sint iusto
                  non! Vel maiores provident recusandae vitae id corrupti
                  consequuntur reprehenderit deleniti quibusdam cum doloribus
                  assumenda odio temporibus exercitationem doloremque, soluta
                  quos magnam voluptas sint tenetur cupiditate. Blanditiis
                  veniam laboriosam, maiores porro, sit reiciendis deleniti
                  obcaecati cupiditate, ea perspiciatis ad omnis?
                </i>
                <div className="mb-5"></div>
                <p className="text-lg">Chapter 2</p>
                <b>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Labore adipisci nulla perferendis quasi quam enim rem
                  voluptate perspiciatis eos corporis nihil dolorem atque id
                  esse magni totam sint, aperiam suscipit quos itaque. Nemo sunt
                  accusantium sint. Magnam, commodi maxime aliquam ipsam ea
                  doloremque, beatae quia assumenda quidem quisquam eligendi
                  optio nesciunt dolorem sit iusto totam, voluptas id nam enim
                  tempore ipsa quo! Dolore ea optio nisi suscipit excepturi
                  nobis iure rerum recusandae architecto aut sunt velit iusto
                  incidunt mollitia officia qui, libero necessitatibus ducimus.
                  Reprehenderit adipisci tempora ullam culpa non, at dicta
                  pariatur molestiae et omnis ipsum ducimus iste modi fugiat.
                  Eaque nulla vel similique, velit nemo ullam nisi illum ipsam
                  ea eveniet, recusandae delectus et architecto assumenda.
                  Deleniti repellat aliquid cum. Placeat sunt aliquam
                  reprehenderit excepturi at ut culpa, iusto eaque optio eum
                  cupiditate facilis ea, nam quam est laboriosam odio
                  repudiandae illo. Consequatur, assumenda modi! Adipisci,
                  possimus eum!
                </b>
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
            <PostRelated></PostRelated>
          </div>
        </Layout>
      </PostDetailsPageStyles>
    </>
  );
};

export default DetailPage;
