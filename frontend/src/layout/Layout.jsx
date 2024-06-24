import React, { useEffect } from "react";
import "../styles/layout.css";
import Sidebar from "../components/Sidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export default function Layout({ children }) {
  const loggedInUser = useSelector((state) => state.loggedInUser.loggedInUser);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (!loggedInUser) {
      navigate("/");
    }
  }, [location.pathname]);
  return (
    <section className="dashboard-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-section">{children}</div>
    </section>
  );
}
