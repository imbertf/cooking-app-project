// react
import React, { useState } from "react";
import { Link } from "react-router-dom";

// material ui
import {
  Box,
  Button,
  Input,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

// material icons

const AdminCreateRecipePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
    image: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setFormData({ ...formData, image: file });
  };

  // create new recipe in DB
  const handleSubmit = async (event) => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("image", formData.image);
    try {
      const res = await fetch("http://localhost:3000/api/recipes", {
        method: "POST",
        body: formDataToSend,
      });

      if (res.ok) {
        console.log("Recipe added successfully!");
      } else {
        console.log("Error adding recipe");
      }
    } catch (error) {
      console.error("Error", error);
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
        onSubmit={handleSubmit}
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
          Ajouter une nouvelle recette
        </Typography>
        <TextField
          id="name"
          name="name"
          label="Nom de la recette"
          variant="outlined"
          required
          sx={{ my: "5px" }}
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          id="category"
          name="category"
          label="Catégorie de recette"
          variant="outlined"
          required
          sx={{ my: "5px" }}
          value={formData.category}
          onChange={handleChange}
        />
        <TextField
          id="description"
          name="description"
          label="Description"
          multiline
          rows={8}
          sx={{ my: "5px" }}
          value={formData.description}
          onChange={handleChange}
        />
        <OutlinedInput
          type="file"
          id="image"
          name="image"
          accept=".jpg, .jpeg, .png, .webp"
          variant="outlined"
          sx={{ my: "5px" }}
          onChange={handleImageChange}
        />
        <Button
          variant="outlined"
          color="info"
          sx={{ mb: "5px" }}
          type="submit"
        >
          Enregistrer
        </Button>
      </Paper>
    </Box>
  );
};

export default AdminCreateRecipePage;
