// react
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// component
import SnackBarComponent from "../../components/SnackBarComponent";

// material ui
import {
  Box,
  Button,
  OutlinedInput,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

const AdminCreateIngredientPage = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertEmptyField, setShowAlertEmptyField] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
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

  // create new ingredient in DB
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("image", formData.image);

    if (
      formDataToSend.get("name") === "" ||
      formDataToSend.get("image") === null ||
      !(formDataToSend.get("image") instanceof File)
    ) {
      setShowAlertEmptyField(!showAlertEmptyField);
      return; // Exit early, preventing form submission
    }

    try {
      const res = await fetch("http://localhost:3000/api/ingredients", {
        method: "POST",
        body: formDataToSend,
      });
      console.log(res);
      console.log(res.body);

      if (res.ok) {
        console.log("Ingredient added successfully!");
        setShowAlert(!showAlert);
      } else {
        console.log("Error adding ingredient");
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setTimeout(() => {
        navigate("/admin/ingredients");
      }, 1);
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
        <Link to="/admin/ingredients">
          <Button variant="outlined" color="info" sx={{ mb: "5px" }}>
            Retour
          </Button>
        </Link>
        <Typography variant="h5" component="h2" gutterBottom>
          Ajouter un nouvel ingrédient
        </Typography>
        <TextField
          id="name"
          name="name"
          label="Nom de l'ingrédient"
          variant="outlined"
          required
          sx={{ my: "5px" }}
          value={formData.name}
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
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          {showAlert ? (
            <CircularProgress color="info" size={25} />
          ) : (
            "Enregistrer"
          )}
        </Button>
      </Paper>
      {showAlert && (
        <Box>
          <SnackBarComponent
            severity={"success"}
            textAlert={"Ingrédient créée!"}
          />
        </Box>
      )}
      {showAlertEmptyField && (
        <Box>
          <SnackBarComponent
            severity={"warning"}
            textAlert={"Tous les champs doivent être remplis"}
          />
        </Box>
      )}
    </Box>
  );
};

export default AdminCreateIngredientPage;
