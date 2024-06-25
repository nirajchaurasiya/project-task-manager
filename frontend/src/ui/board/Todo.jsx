import React, { useContext, useEffect, useRef, useState } from "react";
import { TbPlus } from "react-icons/tb";
import { VscCollapseAll } from "react-icons/vsc";
import TodoCard from "../TodoCard";
import { MdDelete, MdKeyboardArrowDown } from "react-icons/md";
import { BiPlus } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { ToastContext } from "../../context/ToastContext";
import { toast } from "react-toastify";
import { createTask } from "../../apis/tasks";
import { addSingleTask } from "../../features/tasks/formattedTasksSlice";

export default function Todo() {
  const [showTodo, setShowTodo] = useState(false);
  const [showAssignPeople, setShowAssignPeople] = useState(false);
  const [checklistItems, setChecklistItems] = useState([]);
  const [assignee, setAssignee] = useState("Add an assignee");
  const [startDate, setStartDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hasUserClickedOnDateBtn, setHasUserClickedOnDateBtn] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [errors, setErrors] = useState({
    titleError: "",
    priorityError: "",
    checkListError: "",
  });
  const [globalToggle, setGlobalToggle] = useState(false);
  const accessToken = useSelector((state) => state.accessToken.accessToken);
  const handleGlobalToggle = () => {
    setGlobalToggle(!globalToggle);
  };
  const tasks = useSelector((state) => state.formattedTasks.formattedTasks);
  console.log(tasks);
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

  const loggedInUser = useSelector((state) => state.loggedInUser.loggedInUser);
  const [title, setTitle] = useState("");

  const addChecklistItem = () => {
    const newChecklistItems = [
      ...checklistItems,
      { title: "", isChecked: false },
    ];

    let checkListError = "";
    if (newChecklistItems.length === 0) {
      checkListError = "Create at least one subtask";
    }

    setChecklistItems(newChecklistItems);

    setErrors((prevErrors) => ({
      ...prevErrors,
      checkListError: newChecklistItems.length === 0 ? checkListError : "",
    }));
  };

  const deleteChecklistItem = (index) => {
    const newChecklistItems = checklistItems.filter((_, i) => i !== index);
    let checkListError = "";
    if (newChecklistItems.length === 0) {
      checkListError = "Create at least one subtask";
    }
    setChecklistItems(newChecklistItems);
    setErrors((prevErrors) => ({
      ...prevErrors,
      checkListError: checkListError,
    }));
  };

  const handleDateChange = (date) => {
    setStartDate(date);
    setShowDatePicker(false);
    setHasUserClickedOnDateBtn(true);
  };

  const titleRef = useRef();

  useEffect(() => {
    setChecklistItems([]);
    setShowAssignPeople(false);
    setAssignee("Add an assignee");
    setSelectedPriority(null);
    setHasUserClickedOnDateBtn(false);
    setTitle("");
    setErrors({ titleError: "", priorityError: "", checkListError: "" });
  }, [showTodo]);
  const dispatch = useDispatch();
  const handlePriorityClick = (priority) => {
    setSelectedPriority(priority);
    let priorityError = "";
    if (!priority) {
      priorityError = "This field is required";
    }
    setErrors((prevErrors) => ({
      ...prevErrors,
      priorityError: priorityError,
    }));
  };

  const handleChecklistChange = (index, key, value) => {
    const updatedItems = checklistItems.map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
    setChecklistItems(updatedItems);
  };

  const handleTaskCreation = async () => {
    let valid = true;
    let newErrors = { titleError: "", priorityError: "", checkListError: "" };

    if (!title) {
      newErrors.titleError = "This field is required";
      titleRef.current.focus();
      valid = false;
      displayToast("Title is required", false);
      setErrors(newErrors);
      return;
    }

    if (!selectedPriority) {
      newErrors.priorityError = "This field is required";
      valid = false;
      displayToast("Priority is required", false);
      setErrors(newErrors);
      return;
    }

    if (checklistItems.length < 1) {
      newErrors.checkListError = "Create at least one subtask";
      valid = false;
      displayToast("At least one subtask is required to create a Task", false);
      setErrors(newErrors);
      return;
    }

    for (let i = 0; i < checklistItems.length; i++) {
      if (!checklistItems[i].title) {
        newErrors.checkListError = "All subtasks must have a title";
        valid = false;
        displayToast("All subtasks must have a title", false);
        setErrors(newErrors);
        return;
      } else {
        newErrors.checkListError = "";
        setErrors(newErrors);
      }
    }

    if (valid) {
      console.log(title, selectedPriority, checklistItems);
      console.log(startDate, assignee);
      const response = await createTask(accessToken, {
        title,
        priority: selectedPriority,
        checklist: checklistItems,
        dueDate: startDate && hasUserClickedOnDateBtn ? startDate : "",
        assignedTo: assignee,
      });
      const { success, msg, task } = response;

      if (success) {
        dispatch(addSingleTask(task));
      }
      displayToast(msg, success);
    }
  };

  const handleChangeTitle = (e) => {
    const value = e.target.value;
    setTitle(value);
    let titleError = "";
    if (value === "") {
      titleError = "This field is required";
    }
    setErrors((prevErrors) => ({ ...prevErrors, titleError: titleError }));
  };

  return (
    <>
      <div className="card-header">
        <p>To do</p>
        <p>
          <TbPlus
            onClick={() => {
              setShowTodo(!showTodo);
            }}
          />
          <VscCollapseAll onClick={handleGlobalToggle} />
        </p>
      </div>
      {tasks &&
        tasks?.todo.map((task, index) => (
          <TodoCard key={index} globalToggle={globalToggle} task={task} />
        ))}
      {showTodo && (
        <div
          className="overflow-container"
          onClick={() => {
            setShowTodo(!showTodo);
          }}
        >
          <div className="overflow-mid-container todo-form">
            <div
              className="add-todo-container main-content"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="main-part-todo-container">
                <div className="input-wrapper">
                  <label htmlFor="todo-title">
                    Title <span>*</span>
                  </label>
                  <input
                    ref={titleRef}
                    value={title}
                    onChange={handleChangeTitle}
                    type="text"
                    placeholder="Enter Task Title"
                    style={
                      errors.titleError
                        ? { border: "1px solid var(--error-red)" }
                        : {}
                    }
                  />
                  {errors?.titleError && (
                    <span style={{ marginTop: "5px" }}>
                      {errors.titleError}
                    </span>
                  )}
                </div>
                <div className="priority-wrapper">
                  <div className="priority-selector-field">
                    <p>
                      Select Priority <span>*</span>
                    </p>
                    <div className="priority-selector-options">
                      <div
                        className={`priority-selector-options-hover ${
                          selectedPriority === "high" ? "selected" : ""
                        }`}
                        onClick={() => handlePriorityClick("high")}
                      >
                        <p className="high-priority-point"></p> HIGH PRIORITY
                      </div>
                      <div
                        className={`priority-selector-options-hover ${
                          selectedPriority === "moderate" ? "selected" : ""
                        }`}
                        onClick={() => handlePriorityClick("moderate")}
                      >
                        <p className="moderate-priority-point"></p> MODERATE
                        PRIORITY
                      </div>
                      <div
                        className={`priority-selector-options-hover ${
                          selectedPriority === "low" ? "selected" : ""
                        }`}
                        onClick={() => handlePriorityClick("low")}
                      >
                        <p className="low-priority-point"></p> LOW PRIORITY
                      </div>
                    </div>
                  </div>
                  {errors.priorityError && <span>{errors?.priorityError}</span>}
                </div>

                <div className="assign-to-task">
                  <div className="assign-task-menu">
                    <p>Assign to</p>
                    <div
                      className="select-button"
                      onClick={() => {
                        setShowAssignPeople(!showAssignPeople);
                      }}
                    >
                      <p>{assignee}</p>
                      <p>
                        <MdKeyboardArrowDown />
                      </p>
                    </div>
                  </div>
                  {showAssignPeople && (
                    <div name="assign" className="assign-options">
                      {loggedInUser?.chosenAssignees?.length > 0 &&
                        loggedInUser.chosenAssignees.map((e) => (
                          <div key={e._id} className="assign-option">
                            <div className="user-details">
                              <p>{e?.email?.slice(0, 2)}</p>
                              <p>{e?.email}</p>
                            </div>
                            <button
                              onClick={() => {
                                setAssignee(e?.email);
                              }}
                            >
                              {assignee === e.email ? "Assigned" : "Assign"}
                            </button>
                          </div>
                        ))}
                    </div>
                  )}
                </div>

                <div className="checklist-length">
                  <p>
                    Checklist (
                    {checklistItems.filter((item) => item.isChecked).length}/
                    {checklistItems.length}) <span>*</span>
                  </p>
                  {errors.checkListError && (
                    <span>{errors.checkListError}</span>
                  )}
                </div>

                <div className="all-checklist-field-container">
                  {checklistItems.map((item, index) => (
                    <div key={index} className="checklists-field">
                      <div className="select-checklist">
                        <input
                          type="checkbox"
                          checked={item.isChecked}
                          onChange={(e) =>
                            handleChecklistChange(
                              index,
                              "isChecked",
                              e.target.checked
                            )
                          }
                        />
                        <input
                          placeholder="Add a task"
                          type="text"
                          className="select-checklist-input"
                          value={item.title}
                          onChange={(e) =>
                            handleChecklistChange(
                              index,
                              "title",
                              e.target.value
                            )
                          }
                          // style={
                          //   !item.title && errors.checkListError
                          //     ? { border: "1px solid var(--error-red)" }
                          //     : {}
                          // }
                        />
                      </div>
                      <MdDelete onClick={() => deleteChecklistItem(index)} />
                    </div>
                  ))}
                </div>

                <div className="add-new-box" onClick={addChecklistItem}>
                  <p>
                    <BiPlus />
                  </p>
                  <p>Add New</p>
                </div>
              </div>
              <div className="action-buttons">
                <button
                  className="due-button"
                  onClick={() => setShowDatePicker(!showDatePicker)}
                >
                  {startDate && hasUserClickedOnDateBtn
                    ? `${startDate.toLocaleDateString()}`
                    : "Select Due Date"}
                </button>
                {showDatePicker && (
                  <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    className="date-picker"
                    inline
                  />
                )}
                <div className="save-cancel-buttons">
                  <button onClick={() => setShowTodo(false)}>Cancel</button>
                  <button onClick={handleTaskCreation}>Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
