import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/slices/tasksSlice";
import TaskCard from "./TaskCard";
import { CircularProgress, Grid, Box, Typography } from "@mui/material";

const TaskList = () => {
  const dispatch = useDispatch();
  const { tasks, loading, error } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  if (loading) return (
    <Box sx={{ margin: 4, display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
      <CircularProgress />
    </Box>
  );
  if (error) return (
    <Box sx={{ margin: 4, display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
      <Typography color="error">{error}</Typography>
    </Box>
  );

  return (
    <Grid container spacing={2} sx={{ marginTop: 4 }}>
      {tasks.map((task) => (
        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={task.id}>
          <TaskCard task={task} />
        </Grid>
      ))}
    </Grid>
  );
};

export default TaskList;