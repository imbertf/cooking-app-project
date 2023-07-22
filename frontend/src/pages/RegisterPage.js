import React, { useState } from "react";
import { Link } from "react-router-dom";

// material ui
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Alert,
} from "@mui/material";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const isFormValid = () => {
    return (
      formData.firstName !== "" &&
      formData.lastName !== "" &&
      formData.email !== "" &&
      !emailError && // Check if email is valid
      formData.password !== "" &&
      !passwordError && // Check if password is valid
      formData.password === formData.confirmPassword
    );
  };

  const isValidEmail = (email) => {
    // Basic email validation regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  };

  const isValidPassword = (password) => {
    // Password must have minimum 1 uppercase, 1 symbol, 1 number, and more than 6 characters
    const passwordPattern =
      /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{7,}$/;
    return passwordPattern.test(password);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      // Validate email on change
      setEmailError(!isValidEmail(value));
    }

    if (name === "password") {
      // Validate password on change
      setPasswordError(!isValidPassword(value));
    }

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid()) {
      // Handle form submission here
      console.log(formData);
      // You can add your API call or other logic to handle form submission
    } else {
      alert("Merci de renseigner tous les champs");
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
        <Typography variant="h5" component="h2" gutterBottom>
          S'enregistrer
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>
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
                passwordError
                  ? "Password must have minimum 1 uppercase, 1 symbol, 1 number, and more than 6 characters"
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              variant="outlined"
              required
              error={
                formData.confirmPassword !== formData.password &&
                formData.confirmPassword !== ""
              }
              helperText={
                formData.confirmPassword !== formData.password &&
                formData.confirmPassword !== ""
                  ? "Les mots de passe ne correspondent pas"
                  : ""
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
              Enregistrer
            </Button>
          </Grid>
        </Grid>
        <Typography>
          Vous avez déjà un compte? <Link to="/login">Se connecter</Link>
        </Typography>
        <Alert severity="error">Ce mail est déjà associé à un compte</Alert>
        <Alert severity="info">Compte créé</Alert>
      </Paper>
    </Box>
  );
};

export default RegisterPage;
