import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// material ui
import { Box, TextField, Button, Grid, Paper, Typography } from "@mui/material";

// component
import SnackBarComponent from "../components/SnackBarComponent";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid()) {
      // Handle form submission here
      // You can add your API call or other logic to handle form submission
      try {
        const res = await fetch(`http://localhost:3000/api/auth/signup`, {
          method: "POST",
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
          }),

          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        if (res.ok) {
          setShowSuccessAlert(!showSuccessAlert);
          console.log("utilisateur créé");
          setTimeout(() => {
            navigate("/");
          }, 1500);
        } else {
          setShowFailAlert(!showFailAlert);
          console.log("Erreur lors de la création du compte");
        }
      } catch (error) {
        console.log(error);
      }
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
                  ? "Le mot de passe doit contenir minimum 1 majuscule, 1 symbole, 1 chiffre et plus de 6 caractères"
                  : ""
              }
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Confirmez le Mot de passe"
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
        {showSuccessAlert && (
          <Box>
            <SnackBarComponent
              severity={"success"}
              textAlert={"Compte créé!"}
            />
          </Box>
        )}
        {showFailAlert && (
          <Box>
            <SnackBarComponent
              severity={"error"}
              textAlert={"Compte déjà existant"}
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default RegisterPage;
