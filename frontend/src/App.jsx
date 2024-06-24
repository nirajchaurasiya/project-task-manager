import React, { useEffect, useState } from "react";
import "./styles/home.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import AuthLayout from "./AuthLayout/AuthLayout";
import Login from "./AuthLayout/Login";
import Register from "./AuthLayout/Register";
import Settings from "./components/Settings";
import Analytics from "./components/Analytics";
import Board from "./components/Board";
import { accessToken, setCookie } from "./utils/cookieActions";
import { saveLoggedInUser } from "./features/auth/authSlice";
import { useDispatch } from "react-redux";
import { loginUserWithToken } from "./apis/auth";
import HomeLoader from "./components/HomeLoader";
import { saveAccessToken } from "./features/accessToken/accessTokenSlice";

export default function App() {
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoader(true);
      if (accessToken) {
        const loginUser = await loginUserWithToken();
        const { user, success } = loginUser;
        if (success) {
          setCookie("accessToken", user.accessToken, 1);
          setCookie("refreshToken", user.refreshToken, 7);
          dispatch(saveLoggedInUser(user.user));
          dispatch(saveAccessToken(user.accessToken));
          localStorage.setItem("isCookieFromProManage", true);
        }
      }
      setLoader(false);
    };
    fetchUser();
  }, [dispatch]);

  if (loader) {
    return <HomeLoader />;
  }

  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route
            path="/register"
            element={
              <AuthLayout>
                <Register />
              </AuthLayout>
            }
          />
          <Route
            path="/"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />
          <Route
            path="/home"
            element={
              <Layout loader={loader}>
                <Board />
              </Layout>
            }
          />
          <Route
            path="/analytics"
            element={
              <Layout loader={loader}>
                <Analytics />
              </Layout>
            }
          />
          <Route
            path="/settings"
            element={
              <Layout loader={loader}>
                <Settings />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
