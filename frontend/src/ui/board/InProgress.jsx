import React from "react";
import { VscCollapseAll } from "react-icons/vsc";
import TodoCard from "../TodoCard";
export default function InProgress() {
  return (
    <>
      <div className="card-header">
        <p>In Progress</p>
        <p>
          <VscCollapseAll />
        </p>
      </div>
      {[1, 2, 3, 4, 5].map((e) => (
        <TodoCard key={e} />
      ))}
    </>
  );
}
