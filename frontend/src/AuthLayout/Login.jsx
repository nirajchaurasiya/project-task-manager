import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { TfiLock } from "react-icons/tfi";
import { CgEye } from "react-icons/cg";
export default function Login() {
  return (
    <div className="auth-container">
      <div className="auth-mid-container">
        <div className="auth-heading-text">
          <p>Login</p>
        </div>
        <div className="auth-form">
          <div className="input-field">
            <label htmlFor="email">
              <HiOutlineMail />
            </label>
            <input placeholder="Email" type="email" name="email" id="email" />
          </div>
          <div className="input-field">
            <label htmlFor="password">
              <TfiLock fill="rgb(166, 157, 157)" />
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
            <button>Login</button>
          </div>
        </div>
        <div className="auth-options">
          <p>Have no Account yet?</p>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
