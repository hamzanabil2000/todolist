"use client";

import { useState } from "react";

const ToDoList = ({
  tasks = [],
  onAddTask,
  currentTask,
  setCurrentTask,
  onEditTask,
  onDeleteTask,
}) => {
  const [isInputEnabled, setInputEnabled] = useState(false);
  const [isSubmitEnabled, setSubmitEnabled] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null); // Track the index of the task being edited

  const handleAddClick = () => {
    setInputEnabled(true);
    setSubmitEnabled(false);
    setEditingIndex(null); // Reset editing index when adding a new task
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setCurrentTask(value);
    setSubmitEnabled(value.trim() !== "");
  };

  const handleSubmit = () => {
    if (currentTask.trim() !== "") {
      if (editingIndex !== null) {
        onEditTask(editingIndex, currentTask);
        setEditingIndex(null); 
      } else {
        onAddTask(currentTask);
      }
      setCurrentTask(""); 
    }
  };

  const handleEdit = (index) => {
    setCurrentTask(tasks[index]); 
    setEditingIndex(index); 
    setInputEnabled(true); 
  };

  const handleDelete = (index) => {
    onDeleteTask(index);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          value={currentTask}
          onChange={handleInputChange}
          disabled={!isInputEnabled}
          className="border rounded p-2"
          placeholder="Enter Task"
        />

        <button
          onClick={handleAddClick}
          className="bg-blue-500 text-white rounded p-2"
        >
          +
        </button>

        <button
          onClick={handleSubmit}
          disabled={!isSubmitEnabled}
          className={`bg-green-500 text-white rounded p-2 ${
            !isSubmitEnabled && "opacity-50 cursor-not-allowed"
          }`}
        >
          ✔
        </button>
      </div>

      {tasks.length > 0 && (
        <table className="min-w-full border-1 border-gray-400">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2 text-center">Tasks</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, index) => (
              <tr className="border-b" key={index}>
                <td className="border px-4 py-2 text-center">{task}</td>
                <td className="border px-4 py-2 text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => handleEdit(index)}
                      className="bg-yellow-500 text-white rounded px-2 py-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="bg-red-500 text-white rounded px-2 py-1"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ToDoList;
