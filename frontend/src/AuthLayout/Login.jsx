import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { TfiLock } from "react-icons/tfi";
import { CgEye } from "react-icons/cg";
import { userCommonRoute } from "../routes/userCommonRoute";
import { isValidEmail } from "../utils/emailValidation";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    let newErrors = { email: "", password: "" };

    if (!email) {
      newErrors.email = "This field is required";
      valid = false;
    }

    if (!password) {
      newErrors.password = "This field is required";
      valid = false;
    }

    setErrors(newErrors);

    // Set focus after setting errors
    if (!email) {
      emailRef.current.focus();
    } else if (!password) {
      passwordRef.current.focus();
    }

    if (valid) {
      console.log(userCommonRoute);
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    let emailError = "";
    if (value === "") {
      emailError = "This field is required";
    } else if (!isValidEmail(value)) {
      emailError = "Invalid email format";
    }
    setErrors((prevErrors) => ({ ...prevErrors, email: emailError }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    let passwordError = "";
    if (value === "") {
      passwordError = "This field is required";
    } else if (value.length < 8) {
      passwordError = "Password should be of minimum 8 characters";
    }
    setErrors((prevErrors) => ({ ...prevErrors, password: passwordError }));
  };

  return (
    <div className="auth-container">
      <div className="auth-mid-container">
        <div className="auth-heading-text">
          <p>Login</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-field-error-wrapper">
            <div
              className={`input-field ${errors.email ? "error-border" : ""}`}
            >
              <label htmlFor="email">
                <HiOutlineMail />
              </label>
              <input
                ref={emailRef}
                placeholder="Email"
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            {errors.email && (
              <span className="error-message">{errors.email}</span>
            )}
          </div>
          <div className="input-field-error-wrapper">
            <div
              className={`input-field ${errors.password ? "error-border" : ""}`}
            >
              <label htmlFor="password">
                <TfiLock fill="rgb(166, 157, 157)" />
              </label>
              <input
                ref={passwordRef}
                placeholder="Password"
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={handlePasswordChange}
              />
              <CgEye className="eye-icon" />
            </div>
            {errors.password && (
              <span className="error-message">{errors.password}</span>
            )}
          </div>
          <div className="click-button">
            <button type="submit">Login</button>
          </div>
        </form>
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
