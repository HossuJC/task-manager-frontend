import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { TextField, Button, Box } from "@mui/material";
import axios from "../api/axiosInstance";
import { fetchTasks } from "../redux/slices/tasksSlice";

const TaskForm = () => {
  const dispatch = useDispatch();
  const [task, setTask] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/tasks", task);
    dispatch(fetchTasks());
    setTask({ title: "", description: "" });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
      <TextField name="title" label="Title" value={task.title} onChange={handleChange} required />
      <TextField name="description" label="Description" value={task.description} onChange={handleChange} required />
      <Button type="submit" variant="contained">Add</Button>
    </Box>
  );
};

export default TaskForm;