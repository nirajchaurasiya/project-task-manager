import React, { useEffect } from "react";
import "../styles/auth-style.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AuthLayout({ children }) {
  const loggedInUser = useSelector((state) => state.loggedInUser.loggedInUser);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loggedInUser) {
      navigate("/home");
    }
  }, [loggedInUser, navigate]);

  return (
    <div className="auth-layout-container">
      {/* Side Image */}
      <div className="side-image">
        <div className="side-background">
          <div className="robot-image">
            <img src="/robo.png" />
          </div>
          <div className="rounded-circle"></div>
        </div>
        <div className="side-text">
          <p>Welcome aboard my friend</p>
          <span>just a couple of clicks and we start</span>
        </div>
      </div>
      {/* Login / Register Form */}
      {children}
    </div>
  );
}
