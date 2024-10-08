import React, { useState, useEffect, useContext, useRef } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { formatDueDate } from "../utils/formatDate";
import { taskPhase } from "../utils/tasksPhases";
import {
  deleteTaskWithId,
  updateChecklist,
  updateTaskPhase,
} from "../apis/tasks";
import { useDispatch, useSelector } from "react-redux";
import { ToastContext } from "../context/ToastContext";
import { toast } from "react-toastify";
import {
  removeSingleTaskById,
  updateCheckListInStore,
  updateTaskState,
} from "../features/tasks/formattedTasksSlice";
import { isDueDateMissed } from "../utils/taskUtils";
import { EditTaskContext } from "../context/EditProfileContext";
import { TempSingleTask } from "../context/TempSingleTask";

export default function TodoCard({ globalToggle, task, setGlobalToggle }) {
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showCheckListToggle, setShowCheckListToggle] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [checkedCount, setCheckedCount] = useState(0);
  const [optionsToggle, setOptionsToggle] = useState(false);
  const menuRef = useRef(null);
  const dueDateMissed = isDueDateMissed(task?.dueDate)
  const { tempSingleTaskData, setTempSingleTaskData } =
    useContext(TempSingleTask);
  const { showEditTaskBox, setShowEditTaskBox } = useContext(EditTaskContext);
  const loggedInUser = useSelector(state=>state.loggedInUser.loggedInUser)
  // console.log(task);
  useEffect(() => {
    setOptionsToggle(false);
    const initialCheckedItems = {};
    let initialCount = 0;
    task?.checklist?.forEach((item) => {
      initialCheckedItems[item._id] = item.isChecked;
      if (item.isChecked) {
        initialCount++;
      }
    });

    setCheckedItems(initialCheckedItems);
    setCheckedCount(initialCount);
  }, [task]);

  useEffect(() => {
    console.log(globalToggle);
    if (globalToggle) {
      localStorage.removeItem("expandedCheckList");
      setShowCheckListToggle(false);
    } else {
      const expandedCheckList =
        JSON.parse(localStorage.getItem("expandedCheckList")) || [];
      setShowCheckListToggle(expandedCheckList.includes(task._id));
    }
  }, [globalToggle, task]);
  const handleToggleChecklist = () => {
    setOptionsToggle(false);
    setShowCheckListToggle(!showCheckListToggle);

    const expandedCheckList = new Set(
      JSON.parse(localStorage.getItem("expandedCheckList")) || []
    );

    if (showCheckListToggle) {
      expandedCheckList.delete(task._id);
    } else {
      expandedCheckList.add(task._id);
      setGlobalToggle(false);
    }

    localStorage.setItem(
      "expandedCheckList",
      JSON.stringify(Array.from(expandedCheckList))
    );
  };

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

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.accessToken.accessToken);

  const handleChangeTaskPhase = async (phase) => {
    setOptionsToggle(false);
    const taskToUpdateWithPhase = {
      state: phase,
      taskId: task._id,
    };
    const response = await updateTaskPhase(taskToUpdateWithPhase, accessToken);

    const { success, msg } = response;
    const updatedTask = response.task;
    if (success) {
      dispatch(updateTaskState(updatedTask));
    }

    displayToast(msg, success);
  };

  const handleCheckboxChange = async (itemId) => {
    setOptionsToggle(false);
    const updatedCheckedItems = {
      ...checkedItems,
      [itemId]: !checkedItems[itemId],
    };
    setCheckedItems(updatedCheckedItems);

    const newCheckedCount = Object.values(updatedCheckedItems).filter(
      (isChecked) => isChecked
    ).length;
    setCheckedCount(newCheckedCount);

    const dataToSend = {
      taskId: task._id,
      changedItems: task.checklist.map((item) => ({
        itemId: item._id,
        isChecked: updatedCheckedItems[item._id] || false,
      })),
    };

    const response = await updateChecklist(dataToSend, accessToken);

    const { msg, success } = response;
    const updatedTask = response.task;

    if (success) {
      dispatch(updateCheckListInStore(updatedTask));
    }

    displayToast(msg, success);
  };

  const handleShareButtonTask = () => {
    setOptionsToggle(false);
    const mainUrl = new URL(window.location.href);
    const shareUrl = `${mainUrl.origin}/share/${task._id}`;

    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        displayToast("Share link copied", true);
      })
      .catch((error) => {
        displayToast("Failed to copy share link", false);
        console.error("Clipboard write failed:", error);
      });
  };

  const handleDeleteTask = async () => {
    setOptionsToggle(false);
    const response = await deleteTaskWithId(task._id, accessToken);

    const { msg, success } = response;

    if (success) {
      dispatch(removeSingleTaskById({ taskId: task?._id, state: task?.state }));
    }
    displayToast(msg, success);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        !globalToggle &&
        !optionsToggle
      ) {
        setOptionsToggle(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <div
      className="todo-list-container"
      onClick={() => {
        setOptionsToggle(false);
      }}
    >
      <div
        className="todo-list-container-header"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="left-text">
          {task?.priority === "low" && <div className="alert-circle low"></div>}
          {task?.priority === "moderate" && (
            <div className="alert-circle moderate"></div>
          )}
          {task?.priority === "high" && (
            <div className="alert-circle high"></div>
          )}
          <p>
            {task?.priority} PRIORITY{" "}
            {task?.assignedTo && task?.assignedTo?.toLowerCase() !== loggedInUser?.email && (
              <span data-tooltip={task?.assignedTo} className="assigned-to-people tooltip-title">
                {task?.assignedTo?.slice(0, 2)}
              </span>
            )}
          </p>
        </div>
        <BiDotsHorizontalRounded
          onClick={() => setOptionsToggle(!optionsToggle)}
        />
        {optionsToggle && (
          <div
            className="menu-container"
            ref={menuRef}
            onClick={() => {
              setOptionsToggle(false);
            }}
            style={{
              top: `${menuRef.current?.offsetTop}px`,
              left: `${menuRef.current?.offsetLeft}px`,
            }}
          >
            <p
              onClick={() => {
                setTempSingleTaskData(task);
                setShowEditTaskBox(!showEditTaskBox);
              }}
            >
              Edit
            </p>
            <p onClick={handleShareButtonTask}>Share</p>
            <p
              onClick={() => {
                setShowDeleteAlert(!showDeleteAlert);
              }}
            >
              Delete
            </p>
          </div>
        )}
      </div>

      <p className="tooltip-title" data-tooltip={task?.title}>
        {task?.title?.length >= 9
          ? task?.title?.slice(0, 9) + "..."
          : task?.title}
      </p>

      <div className="check-list-container">
        <div className="todo-list-checklist-count">
          <p>
            Checklist{" "}
            <span>
              ({checkedCount}/{task?.checklist?.length})
            </span>
          </p>
        </div>
        <button onClick={handleToggleChecklist} className="btn-collapse-expand">
          {showCheckListToggle ||
          JSON.parse(localStorage.getItem("expandedCheckList"))?.includes(
            task._id
          ) ? (
            <MdKeyboardArrowUp />
          ) : (
            <MdKeyboardArrowDown />
          )}
        </button>
      </div>
      {(showCheckListToggle ||
        JSON.parse(localStorage.getItem("expandedCheckList"))?.includes(
          task._id
        )) && (
        <div className="checklist-tasks">
          {task?.checklist?.map((e) => (
            <div key={e?._id} className="checklist-task">
              <input
                type="checkbox"
                className="checkbox"
                checked={!!checkedItems[e._id]}
                onChange={() => handleCheckboxChange(e._id)}
              />
              <p className="task">{e?.title}</p>
            </div>
          ))}
        </div>
      )}
      <div
        className={`all-important-details ${
          task?.dueDate ? "" : " justify-end "
        }`}
      >
        {task?.dueDate && (
          <p
            className={`due-date ${
              task?.state === "done"
                ? "due-date-fulfill-in-time"
                : dueDateMissed
                ? "due-date-missed"
                : ""
            }  `}
          >
            {formatDueDate(task?.dueDate)}
          </p>
        )}
        <div className="other-details">
          {taskPhase
            .filter((e) => e.value !== task?.state)
            .map((phase) => (
              <p
                key={phase.value}
                onClick={() => handleChangeTaskPhase(phase.value)}
              >
                {phase.title}
              </p>
            ))}
        </div>
      </div>
      {showDeleteAlert && (
        <div
          className="overflow-container"
          onClick={() => {
            setShowDeleteAlert(!showDeleteAlert);
          }}
        >
          <div className="overflow-mid-container">
            <div
              className="main-content"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <p>Are you sure you want to, delete?</p>
              <button onClick={handleDeleteTask}>Yes, Delete</button>
              <button
                onClick={() => {
                  setShowDeleteAlert(!showDeleteAlert);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
