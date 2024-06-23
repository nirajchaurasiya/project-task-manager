import React from "react";
import { HiOutlineMail } from "react-icons/hi";
import { CiLock } from "react-icons/ci";
import { CgEye } from "react-icons/cg";
import "../styles/settings.css";
import { FaRegUser } from "react-icons/fa6";
export default function Settings() {
  return (
    <div className="settings-container">
      <p className="settings-header">Settings</p>
      <div className="auth-form settings-form">
        <div className="input-field">
          <label htmlFor="email">
            <FaRegUser className="user-svg" fill="rgb(166, 157, 157)" />
          </label>
          <input placeholder="Name" type="email" name="email" id="email" />
        </div>
        <div className="input-field">
          <label htmlFor="email">
            <HiOutlineMail />
          </label>
          <input placeholder="Email" type="email" name="email" id="email" />
        </div>
        <div className="input-field">
          <label htmlFor="oldPassword">
            <CiLock fill="rgb(166, 157, 157)" />
          </label>
          <input
            placeholder="Old password"
            type="oldPassword"
            name="oldPassword"
            id="oldPassword"
          />
          <CgEye className="eye-icon" />
        </div>
        <div className="input-field">
          <label htmlFor="password">
            <CiLock fill="rgb(166, 157, 157)" />
          </label>
          <input
            placeholder="Password"
            type="password"
            name="password"
            id="password"
          />
          <CgEye className="eye-icon" />
        </div>

        <div className="click-button">
          <button>Update</button>
        </div>
      </div>
    </div>
  );
}
