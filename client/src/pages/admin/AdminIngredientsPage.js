import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// material ui
import { Container, Stack, Typography, Button } from "@mui/material";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import AdminRecipeCardComponent from "../../components/admin/AdminRecipeCardComponent";
import SnackBarComponent from "../../components/SnackBarComponent";

const AdminIngredientsPage = () => {
  const [getData, setGetData] = useState([]);
  const [currentValues, setCurrentValues] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  localStorage.setItem("valuesToUpdate", JSON.stringify(currentValues));

  let navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/ingredients")
      .then((res) => res.json())
      .then((data) => {
        setGetData(data);
      });
  }, []);

  // remove ingredient from the DB
  let handleDelete = async (ingredientID) => {
    if (window.confirm("Êtes-vous sur de vouloir supprimer cet ingredient?")) {
      try {
        await fetch(`http://localhost:3000/api/ingredients/${ingredientID}`, {
          method: "DELETE",
        });
        // Update the state by filtering out the deleted ingredient and display alert to inform user of suppression
        setGetData(
          [...getData].filter((ingredient) => ingredient._id !== ingredientID)
        );
        setShowAlert(!showAlert);
      } catch (error) {
        console.log(error);
      }
    }
  };

  let handleUpdate = (ingredientID) => {
    try {
      // get the Object and extract datas to stock to [currentValues] state
      const cardData = [...getData].filter(
        (ingredient) => ingredient._id === ingredientID
      );
      const name = cardData[0].name;
      const image = cardData[0].image;
      const ID = cardData[0]._id;
      setCurrentValues({
        _id: ID,
        name: name,
        image: image,
      });

      localStorage.setItem("valuesToUpdate", JSON.stringify(currentValues));
      setTimeout(() => {
        navigate("/admin/edit-ingredient");
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
            Gestion des ingredients
          </Typography>
          <Link to="/admin/create-ingredient">
            <Button variant="outlined" color="info" sx={{ mb: "5px" }}>
              Créer une ingredient
            </Button>
          </Link>
        </Stack>
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={{ xs: "center", sm: "inherit" }}
        >
          {getData.map((ingredient, index) => {
            return (
              <AdminRecipeCardComponent
                ID={ingredient._id}
                name={ingredient.name}
                image={ingredient.image}
                alt={ingredient.name}
                key={index}
                handleDelete={() => handleDelete(ingredient._id)}
                handleUpdate={() => handleUpdate(ingredient._id)}
              />
            );
          })}
        </Stack>
        {showAlert && (
          <SnackBarComponent
            severity={"warning"}
            textAlert={"Ingrédient supprimé!"}
          />
        )}
      </Stack>
    </Container>
  );
};

export default AdminIngredientsPage;
