import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// material ui
import { Container, Stack, Typography, Button } from "@mui/material";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import AdminRecipeCardComponent from "../../components/admin/AdminRecipeCardComponent";
import SnackBarComponent from "../../components/SnackBarComponent";

const AdminRecipesPage = () => {
  const [getData, setGetData] = useState([]);
  const [currentValues, setCurrentValues] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  localStorage.setItem("valuesToUpdate", JSON.stringify(currentValues));

  let navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/recipes")
      .then((res) => res.json())
      .then((data) => {
        setGetData(data);
      });
  }, []);

  // remove recipe from the DB
  let handleDelete = async (recipeID) => {
    if (window.confirm("Êtes-vous sur de vouloir supprimer cette recette?")) {
      try {
        await fetch(`http://localhost:3000/api/recipes/${recipeID}`, {
          method: "DELETE",
        });
        // Update the state by filtering out the deleted recipe and display alert to inform user of suppression
        setGetData([...getData].filter((recipe) => recipe._id !== recipeID));
        setShowAlert(!showAlert);
      } catch (error) {
        console.log(error);
      }
    }
  };

  let handleUpdate = (recipeID) => {
    try {
      // get the Object and extract datas to stock to [currentValues] state
      const cardData = [...getData].filter((recipe) => recipe._id === recipeID);
      const name = cardData[0].name;
      const category = cardData[0].category;
      const description = cardData[0].description;
      const image = cardData[0].image;
      const ID = cardData[0]._id;
      setCurrentValues({
        _id: ID,
        name: name,
        category: category,
        description: description,
        image: image,
      });

      localStorage.setItem("valuesToUpdate", JSON.stringify(currentValues));
      setTimeout(() => {
        navigate("/admin/edit-recipe");
      }, 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      component={"main"}
      maxWidth="lg"
      sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}
    >
      <AdminLinksComponent />
      <Stack>
        <Stack
          direction={{ md: "row" }}
          alignItems={{ xs: "center", sm: "inherit" }}
        >
          <Typography
            component="h1"
            variant="h4"
            textAlign={{ xs: "center", sm: "inherit" }}
            mx={"10px"}
          >
            Gestion des recettes
          </Typography>
          <Link to="/admin/create-recipe">
            <Button variant="outlined" color="info" sx={{ mb: "5px" }}>
              Créer une recette
            </Button>
          </Link>
        </Stack>
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={{ xs: "center", sm: "inherit" }}
        >
          {getData.map((recipe, index) => {
            return (
              <AdminRecipeCardComponent
                ID={recipe._id}
                name={recipe.name}
                description={recipe.description}
                image={recipe.image}
                alt={recipe.name}
                key={index}
                handleDelete={() => handleDelete(recipe._id)}
                handleUpdate={() => handleUpdate(recipe._id)}
              />
            );
          })}
        </Stack>
        {showAlert && (
          <SnackBarComponent
            severity={"warning"}
            textAlert={"Recette supprimée!"}
          />
        )}
      </Stack>
    </Container>
  );
};

export default AdminRecipesPage;
