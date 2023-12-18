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

function App() {
  const data = [
    {
      id: 1,
      title: "No room for self doubt",
    },
    {
      id: 2,
      title: "Huynh Vinh Do",
    },
    {
      id: 3,
      title: "A whole universe in a single atom",
    },
    {
      id: 4,
      title: "Fuck you I am great",
    },
  ];
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/sign-in" element={<Auth authRoute="sign-in" />} />
        <Route path="/sign-up" element={<Auth authRoute="sign-up" />} />
        <Route path="/abc" element={<DetailPage></DetailPage>}></Route>
        <Route path="/admin" element={<DetailPage></DetailPage>}></Route>
        <Route
          path="/user-info"
          element={<UserInfo data={data}></UserInfo>}
        ></Route>
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
