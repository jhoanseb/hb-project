import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Layout from "./components/Layout";
import ProfilePage from "./pages/ProfilePage";

const initialAuth = {
  user: {},
};

function App() {
  const [auth, setAuth] = useState(initialAuth);

  const isAuthorized = () => (auth.user.username ? true : false);

  useEffect(() => {
    const value = localStorage.getItem("auth");
    setAuth(value ? { user: JSON.parse(value) } : initialAuth);
  }, []);

  const logIn = (user) => {
    localStorage.setItem("auth", JSON.stringify(user));
    setAuth({ user });
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setAuth(initialAuth);
  };

  return (
    <BrowserRouter>
      <Routes>
        {isAuthorized() ? (
          <>
            <Route
              path="/home"
              element={
                <Layout logout={logout}>
                  <Home user={auth.user} />
                </Layout>
              }
            />
            <Route
              path="/user/profile"
              element={
                <Layout logout={logout}>
                  <ProfilePage user={auth.user} />
                </Layout>
              }
            />
          </>
        ) : (
          <>
            <Route path="/auth/login" element={<LoginPage logIn={logIn} />} />
            <Route path="/auth/signup" element={<SignUp />} />
            <Route path="*" element={<Navigate to="/auth/login" />} />
          </>
        )}

        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
