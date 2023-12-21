import React, { useContext, useState } from "react";
import { Button } from "components/button";
import { Table } from "components/table";
import DashboardHeading from "module/dashboard/DashboardHeading";
import styled from "styled-components";
import PostTable from "./PostTable";
import { categories } from "utils/constants";
import { postContext } from "contexts/postContext";

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
  const {
    postState: { posts },
    getAllPosts,
  } = useContext(postContext);

  useState(() => getAllPosts(), []);

  const [filters, setFilters] = useState({
    title: "",
    category: "",
    author: "",
  });
  const filteredPosts = posts.filter((post) => {
    // Filter by category
    const isCategoryMatch =
      !filters.category || post.category === filters.category;

    // Filter by title
    const isTitleMatch =
      !filters.title ||
      post.title.toLowerCase().includes(filters.title.toLowerCase());

    // Return true only if both date and category match
    return isCategoryMatch && isTitleMatch;
  });

  const handleCategoryChange = (e) => {
    setFilters({ ...filters, category: e.target.value });
  };

  const handleTitleChange = (e) => {
    setFilters({ ...filters, title: e.target.value });
  };

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
        <div className="w-full max-w-[200px] dropdown flex items-center justify-center">
          <label className="p-3 text-black bg-gray-200 rounded-md">
            <select
              className="bg-inherit"
              value={filters.category}
              onChange={handleCategoryChange}
            >
              {categories.map((item) =>
                item.name === "All Categories" ? (
                  <option value="">{item.name}</option>
                ) : (
                  <option value={item.name}>{item.name}</option>
                )
              )}
            </select>
          </label>
        </div>
        <div className="w-full max-w-[300px] search-post">
          <input
            type="text"
            className="w-full p-4 border border-gray-500 border-solid rounded-lg shadow-sm"
            placeholder="Search post..."
            onChange={handleTitleChange}
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
          <PostTable filterposts={filteredPosts}></PostTable>
        </tbody>
      </Table>
      <div className="mt-10 text-center">
        <Button kind="ghost" className="mx-auto w-[200px]">
          See more +
        </Button>
      </div>
    </PostManageStyles>
  );
};

export default PostManage;
