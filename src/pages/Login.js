import React, { useState } from "react";
import { TextField, Button, Box, Typography, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(credentials)).unwrap()
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Log in error:", error);
      });
  };

  return (
    <Box sx={{ maxWidth: 400, textAlign: "center", margin: "0 auto", padding: 4 }}>
      <Typography variant="h4" gutterBottom>Log In</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          margin="normal"
        />
        {error && <Typography color="error" align="center">{error}</Typography>}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{ marginTop: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Log In"}
        </Button>
      </form>
    </Box>
  );
};

export default Login;