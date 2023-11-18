import DashboardLayout from "module/dashboard/DashboardLayout";
import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/sign-up" element={<SignUpPage></SignUpPage>}></Route>
        <Route path="/sign-in" element={<SignInPage></SignInPage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
