import Layout from "components/layout/Layout";
import React, { useState } from "react";
import styled from "styled-components";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const VISIBLE_FIELDS = ["title", "category", "author", "date", "isAdmin"];

const BlogPageStyles = styled.div``;

const BlogPage = ({ data }) => {
  // const {
  //   postState: { posts, postsLoading },
  //   getAllPosts,
  //   deletePost,
  //   getDetailedPost,
  // } = useContext(postContext);

  const [filterValue, setFilterValue] = useState("");
  const filteredData = data.filter((row) =>
    VISIBLE_FIELDS.some((field) =>
      row[field].toString().toLowerCase().includes(filterValue.toLowerCase())
    )
  );
  const columns = VISIBLE_FIELDS.map((field) => ({
    field,
    headerName: field,
    width: 150,
  }));

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  // useState(() => getAllPosts(), []);

  return (
    <BlogPageStyles>
      <Layout>
        <div className="container">
          <input
            type="text"
            placeholder="Filter data..."
            value={filterValue}
            onChange={handleFilterChange}
          />
          <Box sx={{ height: 400, width: 1 }}>
            <DataGrid
              rows={filteredData}
              columns={columns}
              disableColumnFilter
              disableColumnSelector
              disableDensitySelector
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                },
              }}
            />
          </Box>
        </div>
      </Layout>
    </BlogPageStyles>
  );
};

export default BlogPage;
