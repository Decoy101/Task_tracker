import React from "react";
import Task from "./Task";

const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    <div>
      {tasks.map((task) => (
        <Task
          key={task.id}
          task={task}
          onDelete={(id) => onDelete(task.id)}
          onToggle={onToggle}
        ></Task>
      ))}
    </div>
  );
};

export default Tasks;
