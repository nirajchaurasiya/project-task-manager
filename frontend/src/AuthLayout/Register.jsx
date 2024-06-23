import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { CiLock } from "react-icons/ci";
import { CgEye } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa6";
export default function Register() {
  return (
    <div className="auth-container">
      <div className="auth-mid-container">
        <div className="auth-heading-text">
          <p>Register</p>
        </div>
        <div className="auth-form">
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
          <div className="input-field">
            <label htmlFor="cpassword">
              <CiLock fill="rgb(166, 157, 157)" />
            </label>
            <input
              placeholder="Confirm password"
              type="password"
              name="cpassword"
              id="cpassword"
            />
            <CgEye className="eye-icon" />
          </div>
          <div className="click-button">
            <button>Register</button>
          </div>
        </div>
        <div className="auth-options">
          <p>Have an Account</p>
          <Link to="/">
            <button>Log In</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
