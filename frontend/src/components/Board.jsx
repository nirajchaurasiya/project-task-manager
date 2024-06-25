import React, { useState } from "react";
import "../styles/board.css";
import Backlog from "../ui/board/Backlog";
import Todo from "../ui/board/Todo";
import InProgress from "../ui/board/InProgress";
import Done from "../ui/board/Done";
import { useSelector } from "react-redux";
import { GoPeople } from "react-icons/go";

export default function Board() {
  const [showPeople, setShowPeople] = useState(false);
  const [addedAlert, setAddedAlert] = useState(false);
  const loggedInUser = useSelector((state) => state.loggedInUser.loggedInUser);
  const handleAddEmail = () => {
    setAddedAlert(true);
  };
  return (
    <div className="board-container">
      <div className="board-header">
        <p>
          Welcome! <span>{loggedInUser?.fullName}</span>
        </p>
        <span>23 Jun, 2024</span>
      </div>
      <div className="board-second-options">
        <div className="board-add-people">
          <p>Board</p>
          <p
            onClick={() => {
              setShowPeople(!showPeople);
            }}
          >
            <GoPeople />
            <span>Add people</span>
          </p>
        </div>
        <select name="timeframe" id="timeframe">
          <option value="0">This Week</option>
          <option value="1">Today</option>
          <option value="2">This Month</option>
        </select>
      </div>
      <div className="board-all-cards">
        <div className="card">
          <Backlog />
        </div>
        <div className="card">
          <Todo />
        </div>
        <div className="card">
          <InProgress />
        </div>
        <div className="card">
          <Done />
        </div>
      </div>
      {showPeople && (
        <div
          className="overflow-container"
          onClick={() => {
            setShowPeople(!showPeople);
          }}
        >
          <div className="overflow-mid-container">
            {addedAlert ? (
              <div
                className="main-content"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className="alert-notification">
                  <p>Ramgupta@gmail.com added to board</p>
                  <button
                    onClick={() => {
                      setShowPeople(false);
                      setAddedAlert(false);
                    }}
                  >
                    Okay, got it!
                  </button>
                </div>
              </div>
            ) : (
              <div
                className="main-content"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <p className="add-people-text">Add people to the board</p>
                <input placeholder="Enter the email" type="text" />
                <span>This field is required</span>
                <div className="flex-button-overflow-container">
                  <button
                    onClick={() => {
                      setShowPeople(!showPeople);
                    }}
                  >
                    Cancel
                  </button>
                  <button onClick={handleAddEmail}>Add Email</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
