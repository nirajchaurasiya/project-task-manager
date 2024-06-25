import React, { useEffect, useRef, useState } from "react";
import { TbPlus } from "react-icons/tb";
import { VscCollapseAll } from "react-icons/vsc";
import TodoCard from "../TodoCard";
import { MdDelete, MdKeyboardArrowDown } from "react-icons/md";
import { BiPlus } from "react-icons/bi";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";
export default function Todo() {
  const [showTodo, setShowTodo] = useState(false);
  const [showAssignPeople, setShowAssignPeople] = useState(false);
  const [checklistItems, setChecklistItems] = useState([]);
  const [assignee, setAssignee] = useState("Add a assignee");
  const [startDate, setStartDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [hasUserClickedOnDateBtn, setHasUserClickedOnDateBtn] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const loggedInUser = useSelector((state) => state.loggedInUser.loggedInUser);
  const addChecklistItem = () => {
    setChecklistItems([...checklistItems, checklistItems.length]);
  };
  const deleteChecklistItem = (index) => {
    setChecklistItems(checklistItems.filter((_, i) => i !== index));
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
    setAssignee("Add a assignee");
    setSelectedPriority(null);
    setHasUserClickedOnDateBtn(false);
  }, [showTodo]);

  const handlePriorityClick = (priority) => {
    setSelectedPriority(priority);
  };

  const handleChecklistChange = (index, key, value) => {
    const updatedItems = checklistItems.map((item, i) =>
      i === index ? { ...item, [key]: value } : item
    );
    setChecklistItems(updatedItems);
  };

  // console.log(checklistItems);

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
          <VscCollapseAll />
        </p>
      </div>
      {[1, 2, 3, 4, 5].map((e) => (
        <TodoCard key={e} />
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
                    type="text"
                    placeholder="Enter Task Title"
                  />
                </div>
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
                      {loggedInUser.chosenAssignees.length > 0 ? (
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
                        ))
                      ) : (
                        <span>No assignee found</span>
                      )}
                    </div>
                  )}
                </div>

                <div className="checklist-length">
                  <p>
                    Checklist (
                    {checklistItems.filter((item) => item.isChecked).length}/
                    {checklistItems.length}) <span>*</span>
                  </p>
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
                  <button>Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
