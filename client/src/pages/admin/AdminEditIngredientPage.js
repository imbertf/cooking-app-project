import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// components
import SnackBarComponent from "../../components/SnackBarComponent";

// material ui
import {
  Box,
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  OutlinedInput,
  CircularProgress,
} from "@mui/material";

const AdminEditIngredientPage = () => {
  const navigate = useNavigate();
  const valuesToUpdate = JSON.parse(localStorage.getItem("valuesToUpdate"));
  const [getData, setGetData] = useState([]);
  const [updatedIngredient, setUpdatedIngredient] = useState(valuesToUpdate);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/ingredients")
      .then((res) => res.json())
      .then((data) => {
        setGetData(data);
      });
  }, []);

  const HandleSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", updatedIngredient.name);
    formDataToSend.append("image", updatedIngredient.image);
    console.log(formDataToSend);
    try {
      const res = await fetch(
        `http://localhost:3000/api/ingredients/${updatedIngredient._id}`,
        {
          method: "PUT",
          body: formDataToSend,
        }
      );
      if (res.ok) {
        setShowDeleteAlert(!showDeleteAlert);
        localStorage.clear();
      } else {
        console.log("Erreur lors de la mise à jour de l'ingrédient");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        navigate("/admin/ingredients");
      }, 1500);
    }
  };

  const handleUpdateChange = (event) => {
    const { name, value } = event.target;
    setUpdatedIngredient({ ...updatedIngredient, [name]: value });
  };

  // change image into [currentValues] state
  const handleUpdateImage = (event) => {
    const file = event.target.files[0];
    setUpdatedIngredient({ ...updatedIngredient, image: file });
  };

  const clearLocalStorage = async () => {
    try {
      localStorage.clear();
      navigate("/admin/ingredients");
    } catch (error) {
      console.log(error);
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
        <Button
          variant="outlined"
          color="info"
          sx={{ mb: "5px" }}
          onClick={clearLocalStorage}
        >
          Retour
        </Button>
        <Typography variant="h5" component="h2" gutterBottom>
          Editer l'ingrédient
        </Typography>
        <Grid container spacing={2} mb={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="name"
              value={updatedIngredient.name}
              onChange={handleUpdateChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <OutlinedInput
              fullWidth
              type="file"
              id="image"
              name="image"
              accept=".jpg, .jpeg, .png, .webp"
              variant="outlined"
              sx={{ my: "5px" }}
              onChange={handleUpdateImage}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={HandleSubmit}
            >
              {showDeleteAlert ? (
                <CircularProgress color="info" size={25} />
              ) : (
                "Mettre à jour"
              )}
            </Button>
          </Grid>
        </Grid>
        {showDeleteAlert && (
          <Box>
            <SnackBarComponent
              severity={"info"}
              textAlert={"Ingrédient modifé!"}
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default AdminEditIngredientPage;
