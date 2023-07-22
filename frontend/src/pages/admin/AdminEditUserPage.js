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

const AdminEditUserPage = () => {
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
        <Link to="/admin/users">
          <Button variant="outlined" color="info" sx={{ mb: "5px" }}>
            Retour
          </Button>
        </Link>
        <Typography variant="h5" component="h2" gutterBottom>
          Editer le compte utilisateur
        </Typography>

        <Grid container spacing={2} mb={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Prénom"
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
              label="Nom"
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
              label="Mot de passe"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              variant="outlined"
              required
              error={passwordError}
              helperText={
                passwordError
                  ? "Le mot de passe doit contenir au minimum une majuscule, un symbole, un nombre et plus de 6 caractères"
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirmez le mot de passe"
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
              Mettre à jour
            </Button>
          </Grid>
        </Grid>
        <Alert severity="info">Mise à jour effectuée</Alert>
      </Paper>
    </Box>
  );
};

export default AdminEditUserPage;
