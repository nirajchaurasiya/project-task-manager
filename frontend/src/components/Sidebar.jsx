import React, { useState } from "react";
import "../styles/sidebar.css";
import { CiSettings } from "react-icons/ci";
import { GoDatabase } from "react-icons/go";
import { NavLink } from "react-router-dom";
export default function Sidebar() {
  const [toggleLogout, setTogglelogout] = useState(false);
  return (
    <div className="sidebar-container">
      <div className="">
        <div className="sidebar-heading">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <script xmlns="" />
            <path
              d="M21 15.9999V7.9999C20.9996 7.64918 20.9071 7.30471 20.7315 7.00106C20.556 6.69742 20.3037 6.44526 20 6.2699L13 2.2699C12.696 2.09437 12.3511 2.00195 12 2.00195C11.6489 2.00195 11.304 2.09437 11 2.2699L4 6.2699C3.69626 6.44526 3.44398 6.69742 3.26846 7.00106C3.09294 7.30471 3.00036 7.64918 3 7.9999V15.9999C3.00036 16.3506 3.09294 16.6951 3.26846 16.9987C3.44398 17.3024 3.69626 17.5545 4 17.7299L11 21.7299C11.304 21.9054 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9054 13 21.7299L20 17.7299C20.3037 17.5545 20.556 17.3024 20.7315 16.9987C20.9071 16.6951 20.9996 16.3506 21 15.9999Z"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.5 4.20996L12 6.80996L16.5 4.20996"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M7.5 19.79V14.6L3 12"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M21 12L16.5 14.6V19.79"
              stroke="black"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3.27002 6.95996L12 12.01L20.73 6.95996"
              stroke="#1A87D7"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M12 22.08V12"
              stroke="#1A87D7"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p>Pro Manage</p>
        </div>

        <div className="side-nav-links">
          <NavLink to="/home" className="sidebar-link">
            <img src="/board.svg" alt="" />
            <p>Board</p>
          </NavLink>
          <NavLink to="/analytics" className="sidebar-link">
            <GoDatabase />
            <p>Analytics</p>
          </NavLink>
          <NavLink to="/settings" className="sidebar-link">
            <CiSettings />
            <p>Settings</p>
          </NavLink>
        </div>
      </div>
      <div
        className="logout-button"
        onClick={() => setTogglelogout(!toggleLogout)}
      >
        <img src="/logout.svg" alt="" />
        <p>Logout</p>
      </div>
      {/* For logut */}
      {toggleLogout && (
        <div
          className="logout-container"
          onClick={() => {
            setTogglelogout(!toggleLogout);
          }}
        >
          <div className="logout-mid-container">
            <div
              className="main-content"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <p>Are you sure you want to, Logout?</p>
              <button>Yes, Logout</button>
              <button
                onClick={() => {
                  setTogglelogout(!toggleLogout);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
