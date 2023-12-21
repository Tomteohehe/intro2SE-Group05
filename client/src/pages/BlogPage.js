import Layout from "components/layout/Layout";
import { postContext } from "contexts/postContext";
import React, { useContext, useState } from "react";
import styled from "styled-components";

const BlogPageStyles = styled.div``;

const BlogPage = ({ data }) => {
  const {
    postState: { posts, postsLoading },
    getAllPosts,
  } = useContext(postContext);

  useState(() => getAllPosts(), []);
  console.log(posts);

  const [filters, setFilters] = useState({ date: "", category: "" });

  const filteredPosts = posts.filter((post) => {
    // Filter by date
    const isDateMatch =
      !filters.date || new Date(post.date) >= new Date(filters.date);

    // Filter by category
    const isCategoryMatch =
      !filters.category || post.category === filters.category;

    // Return true only if both date and category match
    return isDateMatch && isCategoryMatch;
  });

  const handleDateChange = (event) => {
    setFilters({ ...filters, date: event.target.value });
  };

  const handleCategoryChange = (event) => {
    setFilters({ ...filters, category: event.target.value });
  };

  return (
    <BlogPageStyles>
      <Layout>
        <div className="container">
          <label>
            Filter by Date:
            <input
              type="date"
              value={filters.date}
              onChange={handleDateChange}
            />
          </label>

          <label>
            Filter by Category:
            <select value={filters.category} onChange={handleCategoryChange}>
              <option value="">All Categories</option>
              <option value="Technology">Technology</option>
              <option value="Travel">Travel</option>
              {/* Add other categories as needed */}
            </select>
          </label>

          <ul>
            {filteredPosts.map((post) => (
              <li key={post.id}>
                {post.title} - {post.date} - {post.category}
              </li>
            ))}
          </ul>
        </div>
      </Layout>
    </BlogPageStyles>
  );
};

export default BlogPage;
