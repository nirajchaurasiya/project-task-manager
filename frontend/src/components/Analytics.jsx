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
        <div className="analytics-card">
          <div className="analytics-card-option">
            <div className="analytics-card-option-header">
              <div className="blue-dot"></div>
              <p>Backlog Tasks</p>
            </div>
            <span>0</span>
          </div>
          <div className="analytics-card-option">
            <div className="analytics-card-option-header">
              <div className="blue-dot"></div>
              <p>To-do Tasks</p>
            </div>
            <span>0</span>
          </div>
          <div className="analytics-card-option">
            <div className="analytics-card-option-header">
              <div className="blue-dot"></div>
              <p>In-Progress Tasks</p>
            </div>
            <span>0</span>
          </div>
          <div className="analytics-card-option">
            <div className="analytics-card-option-header">
              <div className="blue-dot"></div>
              <p>Completed Tasks</p>
            </div>
            <span>0</span>
          </div>
        </div>
        <div className="analytics-card">
          <div className="analytics-card-option">
            <div className="analytics-card-option-header">
              <div className="blue-dot"></div>
              <p>Low Priority</p>
            </div>
            <span>0</span>
          </div>
          <div className="analytics-card-option">
            <div className="analytics-card-option-header">
              <div className="blue-dot"></div>
              <p>High Priority</p>
            </div>
            <span>0</span>
          </div>
          <div className="analytics-card-option">
            <div className="analytics-card-option-header">
              <div className="blue-dot"></div>
              <p>Moderate Priority</p>
            </div>
            <span>0</span>
          </div>
          <div className="analytics-card-option">
            <div className="analytics-card-option-header">
              <div className="blue-dot"></div>
              <p>Due Date Tasks</p>
            </div>
            <span>0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
