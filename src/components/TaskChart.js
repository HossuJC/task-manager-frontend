import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../redux/slices/tasksSlice";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { CircularProgress, Box, Typography } from "@mui/material";

const TaskChart = () => {
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

  const data = [
    { name: "To do", color: "#FFBB28", value: tasks.filter(t => t.status === "todo").length },
    { name: "In progress", color: "#0088FE", value: tasks.filter(t => t.status === "in_progress").length },
    { name: "Completed", color: "#00C49F", value: tasks.filter(t => t.status === "completed").length },
  ];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%` === "0%" ? "" : `${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Box>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" labelLine={false} label={renderCustomizedLabel} cx="50%" cy="50%" outerRadius={150} fill="#8884d8">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default TaskChart;