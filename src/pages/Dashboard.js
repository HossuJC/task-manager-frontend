import React from "react";
import { Container, Typography } from "@mui/material";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

const Dashboard = () => {
  return (
    <Container sx={{ marginY: 4 }}>
      <Typography variant="h4" textAlign={"center"} gutterBottom>Task List</Typography>
      <TaskForm />
      <TaskList />
    </Container>
  );
};

export default Dashboard;