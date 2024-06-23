import React from "react";
import { VscCollapseAll } from "react-icons/vsc";
import TodoCard from "../TodoCard";
export default function Backlog() {
  return (
    <>
      <div className="card-header">
        <p>Backlog</p>
        <p>
          <VscCollapseAll />
        </p>
      </div>
      {/* All the todos */}
      <TodoCard />
    </>
  );
}
