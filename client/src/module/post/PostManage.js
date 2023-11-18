import React, { useEffect, useState } from "react";
import { Button } from "components/button";
import { Dropdown } from "components/dropdown";
import { Table } from "components/table";
import DashboardHeading from "module/dashboard/DashboardHeading";
import styled from "styled-components";
import PostTable from "./PostTable";

const PostManageStyles = styled.div`
  @media screen and (max-width: 800px) {
    .dropdown {
      display: none;
    }
  }
  @media screen and (max-width: 593px) {
    .search-post {
      display: none;
    }
    .heading {
      margin-bottom: 3.5em;
    }
  }
`;

const PostManage = () => {
  // const handleLoadMorePost = async () => {
  //   const nextRef = query(
  //     collection(db, "users", userInfo?.uid, "posts"),
  //     startAfter(lastDoc || 0),
  //     limit(POST_PER_PAGE)
  //   );

  //   onSnapshot(nextRef, (snapshot) => {
  //     let results = [];
  //     snapshot.forEach((doc) => {
  //       results.push({
  //         id: doc.id,
  //         ...doc.data(),
  //       });
  //     });
  //     setPosts([...posts, ...results]);
  //   });
  //   const documentSnapshots = await getDocs(nextRef);
  //   const lastVisible =
  //     documentSnapshots.docs[documentSnapshots.docs.length - 1];
  //   setLastDoc(lastVisible);
  // };

  // console.log(posts);

  return (
    <PostManageStyles>
      <div className="heading">
        <DashboardHeading
          title="All posts"
          desc="Manage all your posts easily here"
          responsive={true}
        ></DashboardHeading>
      </div>
      <div className="flex justify-end gap-5 mb-10">
        <div className="w-full max-w-[200px] dropdown">
          <Dropdown>
            <Dropdown.Select placeholder="Category"></Dropdown.Select>
          </Dropdown>
        </div>
        <div className="w-full max-w-[300px] search-post">
          <input
            type="text"
            className="w-full p-4 border border-gray-300 border-solid rounded-lg"
            placeholder="Search post..."
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Post</th>
            <th>Category</th>
            <th>Author</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <PostTable></PostTable>
          </tr>
        </tbody>
      </Table>
      <div className="mt-10 text-center">
        <Button
          kind="ghost"
          className="mx-auto w-[200px]"
          // onClick={handleLoadMorePost}
        >
          See more +
        </Button>
      </div>
    </PostManageStyles>
  );
};

export default PostManage;
