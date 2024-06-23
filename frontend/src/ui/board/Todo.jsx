import React from "react";
import { VscCollapseAll } from "react-icons/vsc";
export default function Todo() {
  return (
    <div className="card-header">
      <p>To do</p>
      <p>
        <VscCollapseAll />
      </p>
    </div>
  );
}
