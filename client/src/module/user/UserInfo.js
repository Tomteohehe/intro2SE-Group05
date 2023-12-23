import Layout from "components/layout/Layout";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import BackgroundImage from "../../assets/banner.jpg";
import { theme } from "utils/constants";
import Heading from "components/layout/Heading";
import PostNewestSmall from "module/post/PostNewestSmall";
import { useParams } from "react-router-dom";
import { authContext } from "contexts/authContext";

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

  .profile_container {
    transform: translateX(-6%);
  }
  .user_avt {
    width: 200px;
    height: 200px;
    border-radius: 100%;

    img {
      width: 100%;
      height: 100%;
      border-radius: inherit;
      object-fit: cover;
    }
  }
  .fl_button {
    color: white;
    background-color: ${theme.primary};
    cursor: pointer;
    padding: calc(1em + 0.5vw);
    line-height: 1;
    border-radius: calc(0.1em + 0.4vw);
    font-weight: 600;
    height: 20px;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .user_info {
    text-align: center;
  }

  .fullname {
    font-size: 24px;
  }
`;

const UserInfo = () => {
  const { slug } = useParams();
  const {
    authState: { alluser },
    allUser,
  } = useContext(authContext);
  useState(() => allUser(), []);

  const getUser = (id) => {
    const user = alluser.filter((u) => {
      return u._id === id;
    });
    return user[0];
  };

  const user = getUser(slug);
  console.log(user);

  return (
    <UserInfoStyles>
      <Layout>
        <div className="relative bg_container">
          <img
            src={BackgroundImage}
            alt="Background"
            className="background"
          ></img>
          <div className="absolute background_blur"></div>
          <div className="small_container">
            <div className="flex items-center justify-center gap-16 mb-10 profile_container">
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
                <img src={user?.avatar} alt="Avatar" />
              </div>
              <div className="">
                <button className="fl_button">Follow</button>
              </div>
            </div>

            <div className="mb-20 user_info">
              <p className="text-lg font-bold fullname">{user?.username}</p>
              <div className="flex justify-center gap-3 mt-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  width="16"
                  viewBox="0 0 512 512"
                  className="text-gray-400"
                >
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                </svg>
                <span className="text-xs font-semibold text-gray-400 location">
                  {user?.email}
                </span>
              </div>
              <div className="mt-5">
                <span className="text-sm desc">
                  {user?.description || "This user has not left any traces"}
                </span>
              </div>
            </div>
            <div className="posts">
              <div className="small_container">
                <div className="flex items-center justify-between">
                  <Heading>Posts</Heading>
                </div>
                {/* <div className="grid-layout">
                  <PostNewestSmall></PostNewestSmall>
                  <PostNewestSmall></PostNewestSmall>
                  <PostNewestSmall></PostNewestSmall>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </UserInfoStyles>
  );
};

export default UserInfo;
