import Layout from "components/layout/Layout";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import BackgroundImage from "../../assets/banner.jpg";
import { theme } from "utils/constants";
import Heading from "components/layout/Heading";
import { Navigate } from "react-router-dom";
import PostFeature from "module/post/PostFeature";
import PostNewestItem from "module/post/PostNewestItem";
import PostNewestSmall from "module/post/PostNewestSmall";

const UserInfoStyles = styled.div`
  padding-bottom: 100px;

  .bg_container {
  }

  .small_container {
    top: 90%;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    width: 65vw;
    margin: 0 auto;
    transition: width 0.1s;
  }
  .background {
    width: 100%;
    height: 600px;
    object-fit: cover;
  }

  .background_blur {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.5;
  }

  .user_avt {
    width: 200px;
    height: 200px;
    border-radius: 100%;
    transform: translateX(-20%);

    img {
      width: 100%;
      height: 100%;
      border-radius: inherit;
      object-fit: cover;
    }
  }
  .fl_button {
    color: white;
    transform: translateY(220%);
    background-color: ${theme.primary};
    cursor: pointer;
    padding: calc(0.7em + 0.5vw);
    line-height: 1;
    border-radius: calc(0.1em + 0.4vw);
    font-weight: 600;
    height: 20px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .fullname {
    text-align: center;
  }
`;

const UserInfo = ({ data }) => {
  const searchTerm = useSelector((state) => state);

  const searchTitle = (data, searchTerm) => {
    return data.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredData = searchTitle(data, searchTerm);

  return (
    <UserInfoStyles>
      <Layout>
        {/* <div>
          <ul>
            {filteredData.map((item, index) => (
              <li key={index}>{item.title}</li>
            ))}
          </ul>
        </div> */}

        <div className="relative bg_container">
          <img
            src={BackgroundImage}
            alt="Background"
            className="background"
          ></img>
          <div className="absolute background_blur"></div>
          <div className="small_container">
            <div className="mb-20 profile_container">
              <div className="flex w-full justify-evenly">
                <div className="flex items-center gap-4 justify-evenly follow_info">
                  <div>
                    <p className="font-bold text-center text-black">10M</p>
                    <span className="text-sm text-gray-500">Followers</span>
                  </div>
                  <div>
                    <p className="font-bold text-center text-black">0</p>
                    <span className="text-sm text-gray-500">Following</span>
                  </div>
                  <div>
                    <p className="font-bold text-center text-black">69</p>
                    <span className="text-sm text-gray-500">Posts</span>
                  </div>
                </div>
                <div className="user_avt">
                  <img src={BackgroundImage} alt="Avatar" />
                </div>
                <div>
                  <button className="fl_button">Follow</button>
                </div>
              </div>

              <div className="fullname">
                <p>Andrew Tate</p>
              </div>
              <div className="posts">
                <div className="small_container">
                  <div className="flex items-center justify-between">
                    <Heading>Posts</Heading>
                  </div>
                  <div className="grid-layout">
                    <PostNewestSmall></PostNewestSmall>
                    <PostNewestSmall></PostNewestSmall>
                    <PostNewestSmall></PostNewestSmall>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </UserInfoStyles>
  );
};

export default UserInfo;
