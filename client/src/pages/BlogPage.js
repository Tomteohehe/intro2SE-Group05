import Heading from "components/layout/Heading";
import Layout from "components/layout/Layout";
import { postContext } from "contexts/postContext";
import PostNewestSmall from "module/post/PostNewestSmall";
import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { categories } from "utils/constants";
import ReactPaginate from "react-paginate";

const itemsPerPage = 6; // Number of items to display per page

const BlogPageStyles = styled.div`
  .small_container {
    width: 65vw;
    margin: 0 auto;
    margin-top: 2rem;
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem 0;
    ul {
      display: flex;
      gap: 1rem;
    }
    .active {
      background-color: black;
      color: #fff;
      border-radius: 4px;
      padding: 5px 10px;
    }
  }
`;

const BlogPage = () => {
  const {
    postState: { allposts },
    getAllPostsEver,
  } = useContext(postContext);

  useState(() => getAllPostsEver(), []);

  const [filters, setFilters] = useState({ date: "", category: "" });

  const searchTerm = useSelector((state) => state);

  const filteredPosts = allposts.filter((post) => {
    // Filter by date
    const isDateMatch =
      !filters.date || new Date(post.date) >= new Date(filters.date);

    // Filter by category
    const isCategoryMatch =
      !filters.category || post.category === filters.category;

    // Filter by title
    const isTitleMatch = post.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    console.log("isTitleMatch", isTitleMatch);

    // Return true only if both date and category match
    return isDateMatch && isCategoryMatch && isTitleMatch;
  });

  const handleDateChange = (event) => {
    setFilters({ ...filters, date: event.target.value });
  };

  const handleCategoryChange = (event) => {
    setFilters({ ...filters, category: event.target.value });
  };

  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentPageData = filteredPosts.slice(offset, offset + itemsPerPage);

  return (
    <BlogPageStyles>
      <Layout>
        <div className="small_container">
          <div className="flex justify-between mb-10 filter_bar">
            <label className="flex items-center gap-3">
              <p>Search by Date:</p>
              <input
                type="date"
                value={filters.date}
                onChange={handleDateChange}
              />
            </label>
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

          <div className="posts">
            <div className="flex items-center justify-between">
              <Heading>Posts</Heading>
            </div>
            <div className="grid-layout">
              {currentPageData?.map((post) => (
                <PostNewestSmall post={post}></PostNewestSmall>
              ))}
            </div>
            <div className="pagination">
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={Math.ceil(filteredPosts.length / itemsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
        </div>
      </Layout>
    </BlogPageStyles>
  );
};

export default BlogPage;
