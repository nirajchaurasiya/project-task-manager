import React, { useState, useEffect, useContext } from "react";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { formatDueDate } from "../utils/formatDate";
import { taskPhase } from "../utils/tasksPhases";
import { updateChecklist } from "../apis/tasks";
import { useDispatch, useSelector } from "react-redux";
import { ToastContext } from "../context/ToastContext";
import { toast } from "react-toastify";
import { updateCheckListInStore } from "../features/tasks/formattedTasksSlice";

export default function TodoCard({ globalToggle, task }) {
  const [showCheckListToggle, setShowCheckListToggle] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [checkedCount, setCheckedCount] = useState(0);

  useEffect(() => {
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
    const expandedCheckList =
      JSON.parse(localStorage.getItem("expandedCheckList")) || [];
    setShowCheckListToggle(expandedCheckList.includes(task._id));
  }, [task]);

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
    const changedItems = Object.keys(checkedItems).filter(
      (itemId) =>
        checkedItems[itemId] !==
        task.checklist.find((e) => e._id === itemId)?.isChecked
    );
    console.log(phase);
    console.log(task);
    console.log("Changed items:", changedItems);
  };

  const handleCheckboxChange = async (itemId) => {
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

  const handleToggleChecklist = () => {
    setShowCheckListToggle(!showCheckListToggle);

    const expandedCheckList = new Set(
      JSON.parse(localStorage.getItem("expandedCheckList")) || []
    );

    if (showCheckListToggle) {
      expandedCheckList.delete(task._id);
    } else {
      expandedCheckList.add(task._id);
    }

    localStorage.setItem(
      "expandedCheckList",
      JSON.stringify(Array.from(expandedCheckList))
    );
  };

  return (
    <div className="todo-list-container">
      <div className="todo-list-container-header">
        <div className="left-text">
          {task?.priority === "low" && <div className="alert-circle low"></div>}
          {task?.priority === "moderate" && (
            <div className="alert-circle moderate"></div>
          )}
          {task?.priority === "high" && (
            <div className="alert-circle high"></div>
          )}
          <p>{task?.priority} PRIORITY</p>
        </div>
        <BiDotsHorizontalRounded />
      </div>
      <p className="title">{task?.title}</p>
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
          <MdKeyboardArrowDown />
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
          <p className="due-date">
            {task?.dueDate && formatDueDate(task?.dueDate)}
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
    </div>
  );
}
