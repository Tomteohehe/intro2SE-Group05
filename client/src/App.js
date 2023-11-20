import DashboardLayout from "module/dashboard/DashboardLayout";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import { Route, Routes } from "react-router-dom";
import DashboardPage from "pages/DashboardPage";
import PostManage from "module/post/PostManage";
import PostAddNew from "module/post/PostAddNew";
import UserProfile from "module/user/UserProfile";
import DetailPage from "pages/DetailPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
        <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
        <Route path="/abc" element={<DetailPage></DetailPage>}></Route>
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
