import React from "react";
import "../styles/layout.css";
import Sidebar from "../components/Sidebar";
export default function Layout({ children }) {
  return (
    <section className="">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="main-section">{children}</div>
    </section>
  );
}
