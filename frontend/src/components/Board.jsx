import React from "react";
import "../styles/board.css";
import Backlog from "../ui/board/Backlog";
import Todo from "../ui/board/Todo";
import InProgress from "../ui/board/InProgress";
import Done from "../ui/board/Done";
import { useSelector } from "react-redux";

export default function Board() {
  const loggedInUser = useSelector((state) => state.loggedInUser.loggedInUser);
  return (
    <div className="board-container">
      <div className="board-header">
        <p>
          Welcome! <span>{loggedInUser?.fullName}</span>
        </p>
        <span>23 Jun, 2024</span>
      </div>
      <div className="board-second-options">
        <p>Board</p>
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
    </div>
  );
}
