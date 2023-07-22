import React from "react";

// material ui
import { Container, Stack, Typography } from "@mui/material";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import AdminRecipeCardComponent from "../../components/admin/AdminRecipeCardComponent";

// temporary backend
const recipes = [
  {
    name: "Sauce Bearnaise",
    image: "https://recette.supertoinette.com/156204/b/sauce-bearnaise.jpg",
  },
  {
    name: "Boeuf bourguignon",
    image: "https://img.cuisineaz.com/660x660/2017/05/23/i127816-.jpeg",
  },
  {
    name: "Fondant au chocolat",
    image:
      "https://resize.prod.femina.ladmedia.fr/rblr/652,438/img/var/2019-12/1575898110_fondant-au-chocolat.jpg",
  },
  {
    name: "Sole meunière",
    image:
      "https://www.produits-de-nouvelle-aquitaine.fr/uploads/2019/01/sole_meuniere_piment.jpg",
  },
  {
    name: "Ratatouille",
    image:
      "https://www.primevere.com/voy_content/uploads/2023/02/image-346.jpg",
  },
  {
    name: "Bouchée à la reine",
    image:
      "https://assets.afcdn.com/recipe/20200225/108174_w1024h1024c1cx3037cy1912.webp",
  },
  {
    name: "Saumon gravlax",
    image:
      "https://res.cloudinary.com/hv9ssmzrz/image/fetch/c_fill,f_auto,h_360,q_auto,w_740/https://s3-eu-west-1.amazonaws.com/images-ca-1-0-1-eu/recipe_photos/original/94924/saumon-gravlax.jpg",
  },
  {
    name: "Sauce grand veneur",
    image:
      "https://odelices.ouest-france.fr/images/recettes/sauce-grand-veneur-1-814x1024.jpg",
  },
  {
    name: "Profiteroles",
    image:
      "https://api.swissmilk.ch/wp-content/uploads/2022/08/SM2022_W-CH_05_Profiteroles-au-chocolat-scaled.jpg",
  },
];

const AdminRecipesPage = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}
    >
      <AdminLinksComponent />
      <Stack direction={"column"}>
        <Typography
          component="h1"
          variant="h4"
          textAlign={{ xs: "center", sm: "inherit" }}
          mx={"10px"}
        >
          Gestion des recettes
        </Typography>
        <Stack
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={{ xs: "center", sm: "inherit" }}
        >
          {recipes.map((recipe, index) => {
            return (
              <AdminRecipeCardComponent
                ID={`recette_${index}`}
                name={recipe.name}
                image={recipe.image}
                alt={recipe.name}
                key={index}
              />
            );
          })}
        </Stack>
      </Stack>
    </Container>
  );
};

export default AdminRecipesPage;
