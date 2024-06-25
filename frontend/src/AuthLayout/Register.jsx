import React, { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMail } from "react-icons/hi";
import { CiLock } from "react-icons/ci";
import { CgEye } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa6";
import { isValidEmail } from "../utils/emailValidation";
import { registerUser } from "../apis/auth";
import { ToastContext } from "../context/ToastContext";
import { toast } from "react-toastify";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const setToastText = useContext(ToastContext);

  const displayToast = (text, success) => {
    if (success) {
      setToastText(text);
      toast.success(text);
      navigate("/");
    } else {
      setToastText(text);
      toast.error(text);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    let newErrors = { name: "", email: "", password: "", confirmPassword: "" };

    if (!name) {
      newErrors.name = "This field is required";
      valid = false;
    }

    if (!email) {
      newErrors.email = "This field is required";
      valid = false;
    } else if (!isValidEmail(email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!password) {
      newErrors.password = "This field is required";
      valid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password should be of minimum 8 characters";
      valid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "This field is required";
      valid = false;
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);

    // Set focus after setting errors
    if (!name) {
      nameRef.current.focus();
    } else if (!email) {
      emailRef.current.focus();
    } else if (!password) {
      passwordRef.current.focus();
    } else if (!confirmPassword || confirmPassword !== password) {
      confirmPasswordRef.current.focus();
    }

    if (valid) {
      const response = await registerUser(name, email, password);
      displayToast(response.msg, response.success);
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    let nameError = "";
    if (value === "") {
      nameError = "This field is required";
    }
    setErrors((prevErrors) => ({ ...prevErrors, name: nameError }));
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

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    let confirmPasswordError = "";
    if (value === "") {
      confirmPasswordError = "This field is required";
    } else if (value !== password) {
      confirmPasswordError = "Passwords do not match";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword: confirmPasswordError,
    }));
  };

  return (
    <div className="auth-container">
      <div className="auth-mid-container">
        <div className="auth-heading-text">
          <p>Register</p>
        </div>
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="input-field-error-wrapper">
            <div className={`input-field ${errors.name ? "error-border" : ""}`}>
              <label htmlFor="name">
                <FaRegUser className="user-svg" fill="rgb(166, 157, 157)" />
              </label>
              <input
                ref={nameRef}
                placeholder="Name"
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            {errors.name && (
              <span className="error-message">{errors.name}</span>
            )}
          </div>
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
                <CiLock fill="rgb(166, 157, 157)" />
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
          <div className="input-field-error-wrapper">
            <div
              className={`input-field ${
                errors.confirmPassword ? "error-border" : ""
              }`}
            >
              <label htmlFor="cpassword">
                <CiLock fill="rgb(166, 157, 157)" />
              </label>
              <input
                ref={confirmPasswordRef}
                placeholder="Confirm password"
                type="password"
                name="cpassword"
                id="cpassword"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              <CgEye className="eye-icon" />
            </div>
            {errors.confirmPassword && (
              <span className="error-message">{errors.confirmPassword}</span>
            )}
          </div>
          <div className="click-button">
            <button type="submit">Register</button>
          </div>
        </form>
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
