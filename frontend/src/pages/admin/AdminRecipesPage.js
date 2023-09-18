import React, { useState, useEffect } from "react";
import { Await, Link, useNavigate } from "react-router-dom";

// material ui
import { Container, Stack, Typography, Button, Alert } from "@mui/material";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import AdminRecipeCardComponent from "../../components/admin/AdminRecipeCardComponent";
import SnackBarComponent from "../../components/SnackBarComponent";

// temporary backend
// const recipes = [
//   {
//     name: "Sauce Bearnaise",
//     image: "https://recette.supertoinette.com/156204/b/sauce-bearnaise.jpg",
//   },
//   {
//     name: "Boeuf bourguignon",
//     image: "https://img.cuisineaz.com/660x660/2017/05/23/i127816-.jpeg",
//   },
//   {
//     name: "Fondant au chocolat",
//     image:
//       "https://resize.prod.femina.ladmedia.fr/rblr/652,438/img/var/2019-12/1575898110_fondant-au-chocolat.jpg",
//   },
//   {
//     name: "Sole meunière",
//     image:
//       "https://www.produits-de-nouvelle-aquitaine.fr/uploads/2019/01/sole_meuniere_piment.jpg",
//   },
//   {
//     name: "Ratatouille",
//     image:
//       "https://www.primevere.com/voy_content/uploads/2023/02/image-346.jpg",
//   },
//   {
//     name: "Bouchée à la reine",
//     image:
//       "https://assets.afcdn.com/recipe/20200225/108174_w1024h1024c1cx3037cy1912.webp",
//   },
//   {
//     name: "Saumon gravlax",
//     image:
//       "https://res.cloudinary.com/hv9ssmzrz/image/fetch/c_fill,f_auto,h_360,q_auto,w_740/https://s3-eu-west-1.amazonaws.com/images-ca-1-0-1-eu/recipe_photos/original/94924/saumon-gravlax.jpg",
//   },
//   {
//     name: "Sauce grand veneur",
//     image:
//       "https://odelices.ouest-france.fr/images/recettes/sauce-grand-veneur-1-814x1024.jpg",
//   },
//   {
//     name: "Profiteroles",
//     image:
//       "https://api.swissmilk.ch/wp-content/uploads/2022/08/SM2022_W-CH_05_Profiteroles-au-chocolat-scaled.jpg",
//   },
// ];

const AdminRecipesPage = () => {
  const [getData, setGetData] = useState([]);
  const [currentValues, setCurrentValues] = useState(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
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
        setShowDeleteAlert(!showDeleteAlert);
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
        <Stack direction={"row"}>
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
        {showDeleteAlert && (
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
