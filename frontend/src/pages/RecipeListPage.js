import React from "react";

// material UI
import { Container, Box, Stack, Typography, Grid } from "@mui/material";
import CategoryFilterComponent from "../components/filterQueryResultOptions/CategoryFilterComponent";
import CardRecipeComponent from "../components/CardRecipeComponent";
import SortOptionsComponent from "../components/SortOptionsComponent";

const cards = [
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

const RecipesPage = () => {
  return (
    <Container maxWidth="xl" sx={{ display: { md: "flex" } }}>
      <Box pt={{ md: "85px" }}>
        <SortOptionsComponent />
        <CategoryFilterComponent />
      </Box>
      <Box my={4} textAlign="center">
        <Stack
          direction={"row"}
          my={2}
          flexWrap={{ xs: "wrap" }}
          justifyContent={{ xs: "center" }}
        >
          <Typography variant="h5" component="h2">
            Recettes tranditionnelles
          </Typography>
        </Stack>

        <Grid container spacing={2} justifyContent="center">
          {cards.map((card, index) => (
            <CardRecipeComponent
              name={card.name}
              image={card.image}
              index={index}
            />
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default RecipesPage;
