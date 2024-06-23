import React from "react";
import "./styles/home.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import AuthLayout from "./AuthLayout/AuthLayout";
import Login from "./AuthLayout/Login";
import Register from "./AuthLayout/Register";
export default function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route
            path="/register"
            element={<AuthLayout children={<Register />} />}
          />

          <Route path="/" element={<AuthLayout children={<Login />} />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
