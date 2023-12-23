import React, { Fragment } from "react";
import Header from "./Header";

const Layout = ({ children, isAdmin = false }) => {
  return (
    <Fragment>
      <Header isAdmin={isAdmin}></Header>
      {children}
    </Fragment>
  );
};

export default Layout;
