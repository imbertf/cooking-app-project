import React, { useState } from "react";

// material ui
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  Box,
  Alert,
  Container,
} from "@mui/material";

// components
import UserFavoritesComponent from "../../components/user/UserFavoritesComponent";

const UserProfilePage = () => {
  const initialFormData = {
    name: "John",
    lastName: "Doe",
    email: "john@doe.com",
    phoneNumber: "",
    address: "",
    country: "",
    zipCode: "",
    city: "",
    state: "",
    password: "",
    repeatPassword: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [passwordError, setPasswordError] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isFormValid = () => {
    return (
      formData.name !== "" &&
      formData.lastName !== "" &&
      formData.password !== "" &&
      formData.repeatPassword !== "" &&
      formData.password === formData.repeatPassword
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password" || name === "repeatPassword") {
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
      // Handle form submission here
      console.log(formData);
      // You can add your API call or other logic to handle form submission
      setIsSubmitted(true);
      // Clear the form inputs after submission
      setFormData(initialFormData);
    } else {
      alert("Please fill in all required fields correctly!");
    }
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center", my: "50px" }}>
      <Box component={"article"} pt={{ md: "33px" }}>
        <UserFavoritesComponent />
      </Box>
      <Box component={"main"} display={"flex"} justifyContent={"center"}>
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
          <Typography variant="h5" component={"h3"} gutterBottom>
            Modifier le profil
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Prénom"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
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
                value={
                  "Vous ne pouvez pas changer votre mail, pour utiliser une nouvelle adresse merci de bien vouloir créer un nouveau compte"
                }
                onChange={handleChange}
                variant="outlined"
                disabled // Disable the email input
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Numéro de téléphone"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Adresse"
                name="address"
                value={formData.address}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Pays"
                name="country"
                value={formData.country}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Code postal"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Ville"
                name="city"
                value={formData.city}
                onChange={handleChange}
                variant="outlined"
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
                    ? "Password should have at least 6 characters"
                    : ""
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Répetez le mot de passe"
                name="repeatPassword"
                type="password"
                value={formData.repeatPassword}
                onChange={handleChange}
                variant="outlined"
                required
                error={formData.repeatPassword !== formData.password}
                helperText={
                  formData.repeatPassword !== formData.password
                    ? "Passwords do not match"
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
                Save Changes
              </Button>
            </Grid>
          </Grid>
          {isSubmitted && <Alert severity="info">Infos mises à jour</Alert>}
        </Paper>
      </Box>
    </Container>
  );
};

export default UserProfilePage;
