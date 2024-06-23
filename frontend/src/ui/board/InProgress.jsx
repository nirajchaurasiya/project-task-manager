import React from "react";
import { VscCollapseAll } from "react-icons/vsc";
export default function InProgress() {
  return (
    <div className="card-header">
      <p>In Progress</p>
      <p>
        <VscCollapseAll />
      </p>
    </div>
  );
}
