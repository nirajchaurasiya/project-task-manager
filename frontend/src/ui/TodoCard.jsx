import React from "react";

export default function TodoCard() {
  return (
    <div className="todo-list-container">
      <div className="todo-list-container-header">
        <div className="left-text">
          <div className="alert-circle"></div>
          <p>HIGH PRIORITY</p>
        </div>
        <p className="right-menu"></p>
      </div>
    </div>
  );
}
