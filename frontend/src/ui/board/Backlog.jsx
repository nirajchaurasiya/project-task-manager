import React, { useState } from "react";
import { VscCollapseAll } from "react-icons/vsc";
import TodoCard from "../TodoCard";
import { useSelector } from "react-redux";

export default function Backlog() {
  const [globalToggle, setGlobalToggle] = useState(false);

  const handleGlobalToggle = () => {
    setGlobalToggle(!globalToggle);
  };
  const tasks = useSelector((state) => state.formattedTasks.formattedTasks);
  console.log(tasks);
  return (
    <>
      <div className="card-header">
        <p>Backlog</p>
        <p>
          <VscCollapseAll onClick={handleGlobalToggle} />
        </p>
      </div>
      {tasks &&
        tasks?.backlog.map((task, index) => (
          <TodoCard key={index} globalToggle={globalToggle} task={task} />
        ))}
    </>
  );
}
