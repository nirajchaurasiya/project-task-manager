import React from "react";
import "../styles/auth-style.css";
export default function AuthLayout({ children }) {
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
