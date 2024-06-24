import React, { useState, useRef, useContext } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { CiLock } from "react-icons/ci";
import { CgEye } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import "../styles/settings.css";
import { isValidEmail } from "../utils/emailValidation";
import { ToastContext } from "../context/ToastContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Settings() {
  const loggedInUser = useSelector((state) => state.loggedInUser.loggedInUser);

  const [fullName, setFullName] = useState(loggedInUser?.fullName || "");
  const [email, setEmail] = useState(loggedInUser?.email || "");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    oldPassword: "",
    password: "",
  });

  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const oldPasswordRef = useRef(null);
  const passwordRef = useRef(null);

  const setToastText = useContext(ToastContext);
  const displayToast = (text, success) => {
    if (success) {
      setToastText(text);
      toast.success(text);
    } else {
      setToastText(text);
      toast.error(text);
    }
  };
  const navigate = useNavigate();

  const handleFullNameChange = (e) => {
    const value = e.target.value;
    setFullName(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      fullName: value === "" ? "This field is required" : "",
    }));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email:
        value === ""
          ? "This field is required"
          : !isValidEmail(value)
          ? "Invalid email format"
          : "",
    }));
  };

  const handleOldPasswordChange = (e) => {
    const value = e.target.value;
    setOldPassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      oldPassword: value === "" ? "This field is required" : "",
    }));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      password:
        value === ""
          ? "This field is required"
          : value.length < 8
          ? "Password should be of minimum 8 characters"
          : "",
    }));
  };
  const initialFormValues = useRef({
    fullName: loggedInUser?.fullName || "",
    email: loggedInUser?.email || "",
    oldPassword: "",
    password: "",
  }).current;
  const handleSubmit = (e) => {
    e.preventDefault();

    let valid = true;
    let newErrors = { fullName: "", email: "", oldPassword: "", password: "" };

    if (!fullName) {
      newErrors.fullName = "This field is required";
      valid = false;
    }
    if (!email) {
      newErrors.email = "This field is required";
      valid = false;
    } else if (!isValidEmail(email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }
    if (!oldPassword) {
      newErrors.oldPassword = "This field is required";
      valid = false;
    }
    if (!password) {
      newErrors.password = "This field is required";
      valid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password should be of minimum 8 characters";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      if (!fullName) {
        fullNameRef.current.focus();
      } else if (!email || newErrors.email === "Invalid email format") {
        emailRef.current.focus();
      } else if (!oldPassword) {
        oldPasswordRef.current.focus();
      } else if (!password || password.length < 8) {
        passwordRef.current.focus();
      }
    }
    const changes = {
      fullName: fullName !== initialFormValues.fullName,
      email: email !== initialFormValues.email,
      oldPassword: oldPassword !== initialFormValues.oldPassword,
      password: password !== initialFormValues.password,
    };
    const changesMade = Object.values(changes).some((change) => change);

    if (!changesMade) {
      displayToast("No changes have been made", false);
      return;
    }
    if (valid) {
      console.log(changesMade);
      console.log(changes);
    }
  };

  return (
    <div className="settings-container">
      <p className="settings-header">Settings</p>
      <form className="auth-form settings-form" onSubmit={handleSubmit}>
        <div className="input-field-error-wrapper">
          <div
            className={`input-field ${errors.fullName ? "error-border" : ""}`}
          >
            <label htmlFor="fullName">
              <FaRegUser className="user-svg" fill="rgb(166, 157, 157)" />
            </label>
            <input
              ref={fullNameRef}
              placeholder="Name"
              value={fullName}
              type="text"
              name="fullName"
              id="fullName"
              onChange={handleFullNameChange}
            />
          </div>
          {errors.fullName && (
            <span className="error-message">{errors.fullName}</span>
          )}
        </div>
        <div className="input-field-error-wrapper">
          <div className={`input-field ${errors.email ? "error-border" : ""}`}>
            <label htmlFor="email">
              <HiOutlineMail />
            </label>
            <input
              ref={emailRef}
              placeholder="Email"
              type="email"
              value={email}
              name="email"
              id="email"
              onChange={handleEmailChange}
            />
          </div>
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        <div className="input-field-error-wrapper">
          <div
            className={`input-field ${
              errors.oldPassword ? "error-border" : ""
            }`}
          >
            <label htmlFor="oldPassword">
              <CiLock fill="rgb(166, 157, 157)" />
            </label>
            <input
              ref={oldPasswordRef}
              placeholder="Old password"
              type="password"
              name="oldPassword"
              id="oldPassword"
              onChange={handleOldPasswordChange}
            />
            <CgEye className="eye-icon" />
          </div>
          {errors.oldPassword && (
            <span className="error-message">{errors.oldPassword}</span>
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
              onChange={handlePasswordChange}
            />
            <CgEye className="eye-icon" />
          </div>
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>
        <div className="click-button">
          <button type="submit">Update</button>
        </div>
      </form>
    </div>
  );
}
