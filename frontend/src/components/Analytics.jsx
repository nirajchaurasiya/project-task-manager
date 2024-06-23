import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { CiLock } from "react-icons/ci";
import { CgEye } from "react-icons/cg";
import "../styles/analytics.css";
import { FaRegUser } from "react-icons/fa6";
export default function Analytics() {
  return (
    <div className="analytics-container">
      <p className="analytics-header">Analytics</p>
      <div className="analytics-cards">
        <div className="analytics-card"></div>
        <div className="analytics-card"></div>
      </div>
    </div>
  );
}
