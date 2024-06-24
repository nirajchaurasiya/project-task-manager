import React from "react";
import { TbPlus } from "react-icons/tb";
import { VscCollapseAll } from "react-icons/vsc";
import TodoCard from "../TodoCard";
export default function Todo() {
  return (
    <>
      <div className="card-header">
        <p>To do</p>
        <p>
          <TbPlus />
          <VscCollapseAll />
        </p>
      </div>
      {[1, 2, 3, 4, 5].map((e) => (
        <TodoCard key={e} />
      ))}
    </>
  );
}
