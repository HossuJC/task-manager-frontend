import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {user ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ marginRight: 2 }}>
              {"TMA"}
            </Typography>
            <Button
              component={Link}
              to="/dashboard"
              color="inherit"
              sx={{ marginRight: 2 }}
            >
              Tasks
            </Button>
            <Button
              component={Link}
              to="/chart"
              color="inherit"
              sx={{ marginRight: 2 }}
            >
              Chart
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" sx={{ marginRight: 2 }}>
              {"TMA"}
            </Typography>
          </Box>
        )}
        {user ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body1" textAlign={"right"} sx={{ marginRight: 2 }}>
              {"Hi, " + (user?.username ?? "User") + "!"}
            </Typography>
            <Button color="inherit" onClick={handleLogout}>
              Log out
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              component={Link}
              to="/login"
              color="inherit"
              sx={{ marginRight: 2 }}
            >
              Log in
            </Button>
            <Button component={Link} to="/register" color="inherit">
              Sign up
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;