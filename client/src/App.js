import DashboardLayout from "module/dashboard/DashboardLayout";
import HomePage from "./pages/HomePage";
import { Route, Routes } from "react-router-dom";
import Auth from "./views/Auth";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import DashboardPage from "pages/DashboardPage";
import PostManage from "module/post/PostManage";
import PostAddNew from "module/post/PostAddNew";
import UserProfile from "module/user/UserProfile";
import DetailPage from "pages/DetailPage";
import UserInfo from "module/user/UserInfo";
import BlogPage from "pages/BlogPage";
import AdminPage from "pages/AdminPage";

function App() {
  const mock_data = [
    /* your array of objects goes here */
    {
      id: 1,
      title: "Introduction to React",
      category: "Technology",
      author: "John Doe",
      date: "2023-01-15",
      isAdmin: false,
    },
    {
      id: 2,
      title: "Exploring JavaScript ES6 Features",
      category: "Programming",
      author: "Jane Smith",
      date: "2023-02-02",
      isAdmin: true,
    },
    {
      id: 3,
      title: "Healthy Eating Habits",
      category: "Lifestyle",
      author: "Alex Johnson",
      date: "2023-03-10",
      isAdmin: false,
    },
    {
      id: 4,
      title: "Healthy Eating Habits",
      category: "Knowledge",
      author: "Mr Weirdo",
      date: "2023-03-10",
      isAdmin: false,
    },
    {
      id: 5,
      title: "Healthy Eating Habits",
      category: "Fitness",
      author: "Alex Johnson",
      date: "2023-03-10",
      isAdmin: true,
    },
    // Add mo
  ];
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/sign-in" element={<Auth authRoute="sign-in" />} />
        <Route path="/sign-up" element={<Auth authRoute="sign-up" />} />
        <Route path="/abc" element={<DetailPage></DetailPage>}></Route>
        <Route path="/admin" element={<AdminPage></AdminPage>}></Route>
        <Route
          path="/blog"
          element={<BlogPage data={mock_data}></BlogPage>}
        ></Route>
        <Route path="/user-info" element={<UserInfo></UserInfo>}></Route>
        <Route element={<ProtectedRoute Component={DashboardLayout} />}>
          <Route
            path="/dashboard"
            element={<DashboardPage></DashboardPage>}
          ></Route>
          <Route
            path="/manage/posts"
            element={<PostManage></PostManage>}
          ></Route>
          <Route
            path="/manage/add-post"
            element={<PostAddNew></PostAddNew>}
          ></Route>
          <Route
            path="/manage/update-user"
            element={<UserProfile></UserProfile>}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
