import Layout from "components/layout/Layout";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

const UserInfoStyles = styled.div`
  padding-bottom: 100px;
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
        <div>
          <ul>
            {filteredData.map((item, index) => (
              <li key={index}>{item.title}</li>
            ))}
          </ul>
        </div>
      </Layout>
    </UserInfoStyles>
  );
};

export default UserInfo;
