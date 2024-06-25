import React, { useState, useEffect } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function TodoCard({ globalToggle, task }) {
  const [showCheckListToggle, setShowCheckListToggle] = useState(false);
  console.log(task);
  useEffect(() => {
    setShowCheckListToggle(false);
  }, [globalToggle]);

  return (
    <div className="todo-list-container">
      <div className="todo-list-container-header">
        <div className="left-text">
          {task?.priority === "low" && <div className="alert-circle"></div>}
          {task?.priority === "moderate" && (
            <div className="alert-circle"></div>
          )}
          {task?.priority === "high" && <div className="alert-circle"></div>}
          <p>{task?.priority} PRIORITY</p>
        </div>
        <BiDotsHorizontalRounded />
      </div>
      <p className="title">{task?.title}</p>
      <div className="check-list-container">
        <div className="todo-list-checklist-count">
          <p>
            Checklist <span>(0/{task?.checklist?.length})</span>
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
          {task?.checklist?.map((e) => (
            <div key={e?.id} className="checklist-task">
              <input type="checkbox" className="checkbox" checked="" />
              <p className="task">{e?.title}</p>
            </div>
          ))}
        </div>
      )}
      <div className="all-important-details">
        {task?.dueData && (
          <p className="due-date">{task?.dueData && "Jun 24"}</p>
        )}
        <div className="other-details">
          {["TO DO", "IN PROGRESS", "DONE"].map((e) => (
            <p key={e}>{e}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
