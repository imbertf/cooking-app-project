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

const AdminEditRecipePage = () => {
  const [formData, setFormData] = useState({
    recipeName: "",
    recipeType: "",
    cookingMethod: "",
    tools: [],
    ingredients: [],
    image: "",
    steps: [],
  });

  const isFormValid = () => {
    return (
      formData.recipeName !== "" &&
      formData.recipeType !== "" &&
      formData.cookingMethod !== "" &&
      formData.tools !== [] &&
      formData.ingredients !== [] &&
      formData.image !== "" &&
      formData.steps !== []
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

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
          Editer la recette
        </Typography>
        <Grid container spacing={2} mb={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nom de la recette"
              name="recipeName"
              value={formData.recipeName}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Type de recette"
              name="recipeType"
              value={formData.recipeType}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Ingrédients"
              name="ingredients"
              value={formData.ingredients}
              onChange={handleChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Etapes"
              name="steps"
              value={formData.steps}
              onChange={handleChange}
              variant="outlined"
              required
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

export default AdminEditRecipePage;
