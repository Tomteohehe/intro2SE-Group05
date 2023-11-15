import HomePage from "./pages/HomePage";
import SignInPage from "./pages/SignIn";
import SignUpPage from "./pages/SignUp";
import { Route, Routes } from "react-router-dom";
import AuthContextProvider from "./contexts/authContext";

function App() {
  return (
    <AuthContextProvider>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
          <Route path="/sign-in" element={<SignInPage />}></Route>
        </Routes>
      </div>
    </AuthContextProvider>
  );
}

export default App;
