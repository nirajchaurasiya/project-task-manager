import React, { useState } from "react";
import { VscCollapseAll } from "react-icons/vsc";
import TodoCard from "../TodoCard";

export default function Backlog() {
  const [globalToggle, setGlobalToggle] = useState(false);

  const handleGlobalToggle = () => {
    setGlobalToggle(!globalToggle);
  };

  return (
    <>
      <div className="card-header">
        <p>Backlog</p>
        <p>
          <VscCollapseAll onClick={handleGlobalToggle} />
        </p>
      </div>
      {[1, 2, 3, 4, 5].map((e) => (
        <TodoCard key={e} globalToggle={globalToggle} />
      ))}
    </>
  );
}
