import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";

const PostTitleStyles = styled.h3`
  a {
    font-weight: 600;
    line-height: 1.5;
    display: block;
    ${(props) =>
      props.size === "normal" &&
      css`
        font-size: 18px;
      `};
    ${(props) =>
      props.size === "large" &&
      css`
        font-size: 22px;
      `};
  }
`;

const PostTitle = ({ children, className = "", size = "normal", to = "/" }) => {
  const navigate = useNavigate();
  return (
    <PostTitleStyles size={size} className={`post-title ${className}`}>
      <NavLink onClick={()=>{navigate(to); window.location.reload()}}>{children}</NavLink>
    </PostTitleStyles>
  );
};

export default PostTitle;
