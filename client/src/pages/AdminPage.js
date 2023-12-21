import React, {useContext, useState} from "react";
import styled from "styled-components";
import { authContext } from "contexts/authContext";

const AdminPage = () => {
  const {
    authState: { alluser },
    allUser
  } = useContext(authContext)

  useState(() => allUser(), []);

  console.log(alluser)

  return (
    <>
      {alluser.map((user) => (
        <>
          {user.username}
          {user.email}
        </>
          
      ))}
    </>
  );
};

export default AdminPage;
