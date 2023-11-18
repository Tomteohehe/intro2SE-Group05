import DashboardLayout from "module/dashboard/DashboardLayout";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "pages/DashboardPage";
import UserProfile from "module/user/UserProfile";
import PostManage from "module/post/PostManage";
import PostAddNew from "module/post/PostAddNew";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
        <Route element={<DashboardLayout></DashboardLayout>}>
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
          {/* <Route
            path="/manage/update-post"
            element={<PostUpdate></PostUpdate>}
          ></Route> */}
          {/* <Route
            path="/manage/category"
            element={<CategoryManage></CategoryManage>}
          ></Route> */}
          {/* <Route
            path="/manage/add-category"
            element={<CategoryAddNew></CategoryAddNew>}
          ></Route> */}
          {/* <Route
            path="/manage/update-category"
            element={<CategoryUpdate></CategoryUpdate>}
          ></Route> */}
          {/* <Route
            path="/manage/user"
            element={<UserManage></UserManage>}
          ></Route> */}
          {/* <Route
            path="/manage/add-user"
            element={<UserAddNew></UserAddNew>}
          ></Route> */}
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
