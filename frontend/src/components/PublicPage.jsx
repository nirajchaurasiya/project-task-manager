import React, { useContext, useEffect, useState } from "react";
import "../styles/public-page.css";
import { ToastContext } from "../context/ToastContext";
import { toast } from "react-toastify";
import { getTaskWithId } from "../apis/tasks";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import { formatDueDate } from "../utils/formatDate";
export default function PublicPage() {
  const [task, setTask] = useState(null);
  const setToastText = useContext(ToastContext);
  const [loader, setLoader] = useState(false);
  const displayToast = (text, success) => {
    if (success) {
      setToastText(text);
      toast.success(text);
    } else {
      setToastText(text);
      toast.error(text);
    }
  };

  const { taskId } = useParams();

  const handleInputCheck = () => {
    displayToast("Public page, Read only", false);
  };

  useEffect(() => {
    const getTask = async () => {
      setLoader(true);
      const response = await getTaskWithId(taskId);
      const { msg, success, fetchedTask } = response;
      if (success) {
        setTask(fetchedTask);
      }
      if (!success) {
        displayToast(msg, success);
      }
      setLoader(false);
    };
    getTask();
  }, []);

  return (
    <div className="public-page-container">
      <div className="public-page-heading">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <script xmlns="" />
          <path
            d="M21 15.9999V7.9999C20.9996 7.64918 20.9071 7.30471 20.7315 7.00106C20.556 6.69742 20.3037 6.44526 20 6.2699L13 2.2699C12.696 2.09437 12.3511 2.00195 12 2.00195C11.6489 2.00195 11.304 2.09437 11 2.2699L4 6.2699C3.69626 6.44526 3.44398 6.69742 3.26846 7.00106C3.09294 7.30471 3.00036 7.64918 3 7.9999V15.9999C3.00036 16.3506 3.09294 16.6951 3.26846 16.9987C3.44398 17.3024 3.69626 17.5545 4 17.7299L11 21.7299C11.304 21.9054 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9054 13 21.7299L20 17.7299C20.3037 17.5545 20.556 17.3024 20.7315 16.9987C20.9071 16.6951 20.9996 16.3506 21 15.9999Z"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 4.20996L12 6.80996L16.5 4.20996"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M7.5 19.79V14.6L3 12"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 12L16.5 14.6V19.79"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.27002 6.95996L12 12.01L20.73 6.95996"
            stroke="#1A87D7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 22.08V12"
            stroke="#1A87D7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <p>Pro Manage</p>
      </div>
      {loader ? (
        <div className="loader-container">
          <Spinner />
        </div>
      ) : (
        <div className="public-task-container">
          <div className="public-task-mid-container">
            <div className="todo-list-container">
              <div className="todo-list-container-header">
                <div className="left-text">
                  {task?.priority === "low" && (
                    <div className="alert-circle low"></div>
                  )}
                  {task?.priority === "moderate" && (
                    <div className="alert-circle moderate"></div>
                  )}
                  {task?.priority === "high" && (
                    <div className="alert-circle high"></div>
                  )}
                  <p>{task?.priority} PRIORITY</p>
                </div>
              </div>
              <p className="title">{task?.title}</p>
              <div className="check-list-container">
                <div className="todo-list-checklist-count">
                  <p>
                    Checklist
                    <span>
                      ({task?.checklist?.filter((e) => e?.isChecked)?.length}/
                      {task?.checklist?.length})
                    </span>
                  </p>
                </div>
              </div>

              <div className="checklist-tasks">
                {task?.checklist?.map((e) => (
                  <div key={e} className="checklist-task">
                    <input
                      checked={false}
                      onClick={handleInputCheck}
                      type="checkbox"
                      readOnly
                      className="checkbox"
                    />
                    <p className="task">{e?.title}</p>
                  </div>
                ))}
              </div>

              {task?.dueDate && (
                <div className="all-important-details">
                  <div>
                    <p className="due-date-public">Due Date</p>
                    <button>{formatDueDate(task?.dueDate)}</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
