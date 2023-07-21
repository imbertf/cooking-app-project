import React, { useState } from "react";
import { Link } from "react-router-dom";

// material ui
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Box,
  Alert,
} from "@mui/material";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const isFormValid = () => {
    return (
      formData.email !== "" &&
      !emailError &&
      formData.password !== "" &&
      !passwordError
    );
  };

  const isValidEmail = (email) => {
    // Basic email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      // Validate email on change
      setEmailError(!isValidEmail(value));
    }

    if (name === "password") {
      // Validate password on change
      setPasswordError(value.length < 6);
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      // Handle login here
      console.log(formData);
      // You can add your API call or other logic to handle login
    } else {
      alert("Please fill in all required fields correctly!");
    }
  };

  return (
    <Box
      component={"main"}
      display={"flex"}
      justifyContent={"center"}
      my={{ sm: "160px" }}
    >
      <Paper
        component="form"
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 600,
          margin: "auto",
          borderRadius: "none",
          boxShadow: "none",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              required
              error={emailError}
              helperText={emailError ? "Invalid email" : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              required
              error={passwordError}
              helperText={
                passwordError ? "Password must have at least 6 characters" : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!isFormValid()}
            >
              Login
            </Button>
          </Grid>
        </Grid>
        <Typography>
          Vous n'avez pas encore de compte?{" "}
          <Link to="/registrer">S'enregistrer</Link>
        </Typography>
        <Alert severity="error">
          Les identifiants ne sont pas corrects ou le compte n'existe pas
        </Alert>
      </Paper>
    </Box>
  );
};

export default LoginPage;
