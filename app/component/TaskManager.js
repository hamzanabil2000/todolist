"use client";

import { useState, useEffect } from "react";
import ToDoList from "./todolist";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [currentTask, setCurrentTask] = useState("");

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
    setCurrentTask("");
  };

  const handleEditTask = (index, updatedTask) => {
    const newTasks = [...tasks]; 
    newTasks[index] = updatedTask; 
    setTasks(newTasks); 
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  return (
    <ToDoList
      tasks={tasks}
      currentTask={currentTask}
      setCurrentTask={setCurrentTask}
      onAddTask={handleAddTask}
      onEditTask={handleEditTask}
      onDeleteTask={handleDeleteTask}
    />
  );
};

export default TaskManager;
