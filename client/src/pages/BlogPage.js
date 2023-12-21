import { Dropdown } from "components/dropdown";
import { Field } from "components/field";
import { Label } from "components/label";
import Layout from "components/layout/Layout";
import { postContext } from "contexts/postContext";
import React, { useContext, useState } from "react";
import styled from "styled-components";
import { categories } from "utils/constants";

const BlogPageStyles = styled.div``;

const blogPosts = [
  { id: 1, title: "Abc", date: "2023-01-15", category: "Technology" },
  { id: 2, title: "Huynh Vinh Do", date: "2023-02-20", category: "Travel" },
  { id: 3, title: "I love u", date: "2023-03-10", category: "Science" },
  { id: 4, title: "Coffee khum", date: "2023-03-17", category: "Lifestyle" },
  { id: 5, title: "Mr Weirdoo", date: "2023-09-20", category: "Fitness" },
  {
    id: 6,
    title: "Pham Huynh Tan Dat",
    date: "2023-11-11",
    category: "Travel",
  },
  // ... other posts
];

const BlogPage = () => {
  const {
    postState: { allposts, postsLoading },
    getAllPostsEver,
  } = useContext(postContext);

  useState(() => getAllPostsEver(), []);
  console.log(allposts);

  const [filters, setFilters] = useState({ date: "", category: "" });
  const [selectCategory, setSelectCategory] = useState("");

  const filteredPosts = allposts.filter((post) => {
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

  const handleClickOption = (item) => {
    setSelectCategory(item);
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
              {categories.map((item) =>
                item.name === "All Categories" ? (
                  <option value="">{item.name}</option>
                ) : (
                  <option value={item.name}>{item.name}</option>
                )
              )}
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
