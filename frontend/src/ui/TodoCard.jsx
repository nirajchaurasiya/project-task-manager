import React, { useState, useEffect } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function TodoCard({ globalToggle }) {
  const [showCheckListToggle, setShowCheckListToggle] = useState(false);

  useEffect(() => {
    setShowCheckListToggle(false);
  }, [globalToggle]);

  return (
    <div className="todo-list-container">
      <div className="todo-list-container-header">
        <div className="left-text">
          <div className="alert-circle"></div>
          <p>HIGH PRIORITY</p>
        </div>
        <BiDotsHorizontalRounded />
      </div>
      <p className="title">Go to Gym</p>
      <div className="check-list-container">
        <div className="todo-list-checklist-count">
          <p>
            Checklist <span>(1/2)</span>
          </p>
        </div>
        <button
          onClick={() => setShowCheckListToggle(!showCheckListToggle)}
          className="btn-collapse-expand"
        >
          <MdKeyboardArrowDown />
        </button>
      </div>
      {showCheckListToggle && (
        <div className="checklist-tasks">
          <div className="checklist-task">
            <input type="checkbox" className="checkbox" checked="" />
            <p className="task">do 1 hour exercise daily</p>
          </div>
          <div className="checklist-task">
            <input type="checkbox" className="checkbox" />
            <p className="task">do 2 hour exercise daily</p>
          </div>
        </div>
      )}
      <div className="all-important-details">
        <p className="due-date">Jun 24</p>
        <div className="other-details">
          {["TO DO", "IN PROGRESS", "DONE"].map((e) => (
            <p key={e}>{e}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
