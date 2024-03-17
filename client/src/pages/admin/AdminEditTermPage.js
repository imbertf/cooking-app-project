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
  CircularProgress,
} from "@mui/material";

const AdminEditRecipePage = () => {
  const navigate = useNavigate();
  const valuesToUpdate = JSON.parse(localStorage.getItem("valuesToUpdate"));
  const [getData, setGetData] = useState([]);
  const [updatedTerm, setUpdatedTerm] = useState(valuesToUpdate);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/api/terms")
      .then((res) => res.json())
      .then((data) => {
        setGetData(data);
      });
  }, []);

  const HandleSubmit = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/terms/${updatedTerm._id}`,
        {
          method: "PUT",
          body: JSON.stringify({
            title: updatedTerm.title,
            description: updatedTerm.description,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      if (res.ok) {
        setShowUpdateAlert(!showUpdateAlert);
        localStorage.clear();
      } else {
        console.log("Erreur lors de la mise à jour du terme technique");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        navigate("/admin/terms");
      }, 1500);
    }
  };

  const handleUpdateChange = (event) => {
    const { name, value } = event.target;
    setUpdatedTerm({ ...updatedTerm, [name]: value });
  };

  const clearLocalStorage = async () => {
    try {
      localStorage.clear();
      navigate("/admin/terms");
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
          Editer le terme technique
        </Typography>
        <Grid container spacing={2} mb={1}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              name="title"
              value={updatedTerm.title}
              onChange={handleUpdateChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              fullWidth
              name="description"
              value={updatedTerm.description}
              rows={10}
              multiline
              onChange={handleUpdateChange}
              variant="outlined"
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={HandleSubmit}
            >
              {showUpdateAlert ? (
                <CircularProgress color="info" size={25} />
              ) : (
                "Mettre à jour"
              )}
            </Button>
          </Grid>
        </Grid>
        {showUpdateAlert && (
          <Box>
            <SnackBarComponent
              severity={"info"}
              textAlert={"Recette modifée!"}
            />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default AdminEditRecipePage;
