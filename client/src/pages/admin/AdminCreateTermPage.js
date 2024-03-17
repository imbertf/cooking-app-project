// react
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// component
import SnackBarComponent from "../../components/SnackBarComponent";

// material ui
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";

const AdminCreateTermPage = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertEmptyField, setShowAlertEmptyField] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // create new recipe in DB
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", formData.title);
    formDataToSend.append("description", formData.description);

    if (
      formDataToSend.get("title") === "" ||
      formDataToSend.get("description") === ""
    ) {
      setShowAlertEmptyField(!showAlertEmptyField);
      return; // Exit early, preventing form submission
    }

    try {
      const res = await fetch("http://localhost:3000/api/terms", {
        method: "POST",
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      console.log(res.body);

      if (res.ok) {
        console.log("Term added successfully!");
        setShowAlert(!showAlert);
      } else {
        console.log("Error adding term");
      }
    } catch (error) {
      console.error("Error", error);
    } finally {
      setTimeout(() => {
        navigate("/admin/terms");
      }, 1000);
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
        <Link to="/admin/terms">
          <Button variant="outlined" color="info" sx={{ mb: "5px" }}>
            Retour
          </Button>
        </Link>
        <Typography variant="h5" component="h2" gutterBottom>
          Ajouter un nouveau terme technique
        </Typography>
        <TextField
          id="title"
          name="title"
          label="Intitulé du terme"
          variant="outlined"
          required
          sx={{ my: "5px" }}
          value={formData.title}
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
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          {showAlert ? <CircularProgress color="info" size={25} /> : "Ajouter"}
        </Button>
      </Paper>
      {showAlert && (
        <Box>
          <SnackBarComponent
            severity={"success"}
            textAlert={"Terme technique ajouté!"}
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

export default AdminCreateTermPage;
