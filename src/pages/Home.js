import React, { useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  });

  return (
    <Box sx={{ textAlign: "center", padding: 4 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to the Task Manager App
      </Typography>
      <Typography variant="body1">
        Organize your tasks efficiently and optimize your productivity.
      </Typography>
      <Button variant="contained" component={Link} to="/login" sx={{ margin: 1 }}>
        Log in
      </Button>
      <Button variant="outlined" component={Link} to="/register" sx={{ margin: 1 }}>
        Sign up
      </Button>
    </Box>
  );
};

export default Home;