import React, { useEffect } from "react";
import "../styles/layout.css";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Layout({ children, loader }) {
  const loggedInUser = useSelector((state) => state.loggedInUser.loggedInUser);
  const navigate = useNavigate();
  const isCookieFromProManage = localStorage.getItem("isCookieFromProManage");
  useEffect(() => {
    if (!isCookieFromProManage) {
      if (!loader) if (!loggedInUser) navigate("/");
    }
  }, [loggedInUser, isCookieFromProManage, loader]);
  return (
    <section className="dashboard-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-section">{children}</div>
    </section>
  );
}
