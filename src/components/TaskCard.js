import React from "react";
import { Card, CardContent, Box, Typography, Button, MenuItem, Select } from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "../api/axiosInstance";
import { fetchTasks } from "../redux/slices/tasksSlice";

const TaskCard = ({ task }) => {
  const dispatch = useDispatch();

  const handleStatusChange = async (event) => {
    await axios.put(`/tasks/${task._id}`, { ...task, status: event.target.value });
    dispatch(fetchTasks());
  };

  const handleDelete = async () => {
    await axios.delete(`/tasks/${task._id}`);
    dispatch(fetchTasks());
  };

  return (
    <Card sx={{ minWidth: 275, minHeight: "100%" }}>
      <CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 1 }}>
        <Typography variant="h6" textAlign={"center"}>{task.title}</Typography>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
          <Select size="small" value={task.status} onChange={handleStatusChange} fullWidth>
            <MenuItem value="todo">To do</MenuItem>
            <MenuItem value="in_progress">In progress</MenuItem>
            <MenuItem value="completed">Completed</MenuItem>
          </Select>
          <Button onClick={handleDelete} variant="outlined" color="error">Delete</Button>
        </Box>
        <Typography variant="body2" textAlign={"left"}>{task.description}</Typography>
      </CardContent>
    </Card>
  );

};

export default TaskCard;