import React from "react";
import { Container, Typography } from "@mui/material";
import TaskChart from "../components/TaskChart";

const Chart = () => {
  return (
    <Container sx={{ marginY: 4 }}>
      <Typography variant="h4" textAlign={"center"} gutterBottom>
        Task Status Chart
      </Typography>
      <TaskChart /> 
    </Container>
  );
};

export default Chart;