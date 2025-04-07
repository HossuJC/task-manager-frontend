import React, { useState } from "react";
import { TextField, Button, Box, Typography, CircularProgress } from "@mui/material";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [credentials, setCredentials] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setError(null);
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/register", credentials);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      if (error.response?.data?.detail[0]?.msg) {
        setError(error.response?.data?.detail[0]?.msg);
      } else if (error.response?.data?.detail && typeof error.response?.data?.detail === "string") {
        setError(error.response?.data?.detail);
      } else {
        setError("Unknown error. Please, try again.");
      }
    }
  };

  return (
    <Box sx={{ maxWidth: 400, textAlign: "center", margin: "0 auto", padding: 4 }}>
      <Typography variant="h4" gutterBottom>Sign Up</Typography>
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
          label="E-mail"
          name="email"
          value={credentials.email}
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
        {error && (
          <Typography color="error" align="center">{error}</Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={loading}
          sx={{ marginTop: 2 }}
        >
          {loading ? <CircularProgress size={24} /> : "Sign up"}
        </Button>
      </form>
    </Box>
  );
};

export default Register;