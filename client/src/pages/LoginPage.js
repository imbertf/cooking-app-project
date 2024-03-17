import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// material ui
import { TextField, Button, Grid, Paper, Typography, Box } from "@mui/material";

// component
import SnackBarComponent from "../components/SnackBarComponent";

const GetUsers = () => {
  const [getUsers, setGetUsers] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3000/api/auth")
      .then((res) => res.json())
      .then((user) => {
        setGetUsers(user);
      });
  }, []);
  console.log(getUsers);
};

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showFailAlert, setShowFailAlert] = useState(false);

  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (isFormValid()) {
      // first check if user exist in BDD
      try {
        const res = await fetch(`http://localhost:3000/api/auth/login`, {
          method: "POST",
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        if (res.ok) {
          setShowAlert(!showAlert);
          console.log("Connexion réussie");
          // after check if user exist, modify isLogged status in BDD
          // check updateLogStatus in backend folder then userController file for more informations
          try {
            const res = await fetch(`http://localhost:3000/api/auth`, {
              method: "PUT",
              body: JSON.stringify({
                email: formData.email,
                isLogged: true,
              }),
              headers: {
                "Content-type": "application/json; charset=UTF-8",
              },
            });
            if (res.ok) {
              console.log(`Utilisateur connecté!`);
              // navigate("/user");
            }
          } catch (error) {
            console.log(error);
          }
        } else {
          setShowFailAlert(!showFailAlert);
          console.log("Erreur lors de la connexion");
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
          Vous n'avez pas encore de compte?
          <Link to="/register">S'enregistrer</Link>
        </Typography>
        {showAlert && (
          <Box>
            <SnackBarComponent
              severity={"success"}
              textAlert={"Connexion réussie!"}
            />
          </Box>
        )}
        {showFailAlert && (
          <Box>
            <SnackBarComponent
              severity={"error"}
              textAlert={"Ce compte n'existe pas"}
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default LoginPage;
