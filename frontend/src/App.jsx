import React from "react";
import "./styles/home.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import AuthLayout from "./AuthLayout/AuthLayout";
import Login from "./AuthLayout/Login";
import Register from "./AuthLayout/Register";
import Settings from "./components/Settings";
import Analytics from "./components/Analytics";
import Board from "./components/Board";
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

          <Route path="/home" element={<Layout children={<Board />} />} />

          <Route
            path="/analytics"
            element={<Layout children={<Analytics />} />}
          />

          <Route
            path="/settings"
            element={<Layout children={<Settings />} />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}
