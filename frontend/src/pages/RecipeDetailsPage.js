import React from "react";

// material UI
import { Container, Stack, Typography, Box } from "@mui/material";
import TagComponent from "../components/TagComponent";
import IngredientTagComponent from "../components/IngredientTagComponent";
import RecipeStepsComponent from "../components/RecipeStepsComponent";
import FavoriteHeart from "../components/FavoriteIconComponent";
import CookingMethodTagComponent from "../components/CookingMethodTagComponent";

// temporary data used before deploy backend
const recipe = {
  name: "Sauce Béarnaise",
  image: "https://recette.supertoinette.com/156204/b/sauce-bearnaise.jpg",
  recipeType: "Sauce émulsionnées semi-coagulée chaude",
  cookingMethod: "émulsionné",
  tools: [
    { src: "/medias/images/tools/casserole.png", alt: "casserole" },
    { src: "/medias/images/tools/fouet.png", alt: "fouet" },
  ],
  ingredients: [
    {
      name: "oeufs (jaunes)",
      unit: "pièce",
      quantity: "16",
      image:
        "https://img-3.journaldesfemmes.fr/gme4olijc7ny4sPDGJPnkJseRX8=/40x/smart/4dc16b1b16674c4786e1c6a0cc3896a1/ccmcms-jdf/10954756.jpg",
    },
    {
      name: "beurre",
      unit: "kg",
      quantity: "1.0",
      image:
        "https://img-3.journaldesfemmes.fr/dkGzI6opbmpQ7Zlf3p-leshKhV8=/40x/smart/9afe9193579148d5a554fe7a9ae5cf8b/ccmcms-jdf/10954793.jpg",
    },
    {
      name: "vin blanc",
      unit: "l",
      quantity: "0.15",
      image:
        "https://img-3.journaldesfemmes.fr/vA6IOrluM5OkoAx6Vvx5N_e3qIg=/40x/smart/68ff1d172e064bdd88b0cc55d55ef21c/ccmcms-jdf/10970346.jpg",
    },
    {
      name: "vinaigre d'alcool",
      unit: "l",
      quantity: "0.5",
      image:
        "https://img-3.journaldesfemmes.fr/fdzLeLz8L4r-OzB37AZVcsP3AxA=/40x/smart/0ccfcc2dff6d4bf7b3f83d1202f7ee4a/ccmcms-jdf/24438387.jpg",
    },
    {
      name: "échalotes",
      unit: "kg",
      quantity: "0.15",
      image:
        "https://img-3.journaldesfemmes.fr/wVZZB7ru-v-GhbmOWROh_5H-B1g=/40x/smart/e264ad4c20414611ac9a11fc78b0f85b/ccmcms-jdf/10969589.jpg",
    },
    {
      name: "poivre concassé",
      unit: "kg",
      quantity: "0.015",
      image:
        "https://img-3.journaldesfemmes.fr/AAYsG6oNLjPZZUR6RdPnKdoAtNA=/40x/smart/2ef084836bdd4e5387e9f5fb55130028/ccmcms-jdf/10954794.jpg",
    },
    {
      name: "estragon",
      unit: "botte",
      quantity: "1",
      image:
        "https://img-3.journaldesfemmes.fr/iUbTp1BAeh4-3U88UF4NEbi9UJk=/40x/smart/e3728841999841aebcafb65b530e60a1/ccmcms-jdf/10663242.jpg",
    },
    {
      name: "cerfeuil",
      unit: "botte",
      quantity: "1/2",
      image:
        "https://img-3.journaldesfemmes.fr/pKglsq5teoFvCJtFPwCthgMpNOc=/40x/smart/fb1085c0ac1e42329bc1238374bb4acb/ccmcms-jdf/10660953.jpg",
    },
  ],
  steps: [
    { etape: `Clarifier le beurre` },
    {
      etape:
        "Réduire au 3/4 le mélange vin blanc, vinaigre, échalote ciselée, mignonette, moitié d'estragon et du cerfeuil hachés",
    },
    { etape: "Laisser infuser" },
    { etape: "Ajouter les jaunes" },
    { etape: "Monter le sabayon" },
    { etape: "Retirer du feu lorsque la température est proche de 60°" },
    { etape: "Incorporer le beurre clarifié progressivement en fouettant" },
    { etape: "Ajouter le reste d'estragon et cerfeuil" },
    { etape: "Reserver à couvert à 40/50°" },
  ],
};

const RecipeDetailsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ my: "50px" }}>
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "10px",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center" },
        }}
      >
        <Stack
          justifyContent={"center"}
          marginBottom={{ xs: "10px", md: "0" }}
          width="100%"
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: { md: "row" },
              alignItems: { xs: "flex-end", md: "inherit" },
            }}
            mb={1}
          >
            <Typography variant="h2" component="h1">
              {recipe.name}
            </Typography>
            <FavoriteHeart />
          </Stack>
          <TagComponent
            label={recipe.recipeType}
            color={"info"}
            variant={"outlined"}
          />
          <CookingMethodTagComponent cookingMethod={recipe.cookingMethod} />
          <Stack direction={"row"} spacing={1} my={1}>
            {recipe.tools.map((tool, index) => (
              <Stack direction={"row"} spacing={1} key={index}>
                <Box
                  component="img"
                  src={tool.src}
                  alt={tool.alt}
                  style={{ width: "100px", height: "100px" }}
                />
              </Stack>
            ))}
          </Stack>
        </Stack>
        <Stack width={{ xs: "100%", md: "initial" }}>
          <Box
            component="img"
            alt="Sauce béarnaise"
            src={recipe.image}
            sx={{
              maxHeight: "300px",
              maxWidth: { xs: "none", md: "300px" },
              objectFit: { xs: "cover", md: "inherit" },
            }}
          ></Box>
        </Stack>
      </Container>
      <Container>
        <Box sx={{ width: "fit-content", display: "flex", flexWrap: "wrap" }}>
          {recipe.ingredients.map((ingredient, index) => (
            <IngredientTagComponent
              key={index}
              img={ingredient.image}
              ingredient={ingredient.name}
              quantity={ingredient.quantity}
              mesure={ingredient.unit}
            />
          ))}
        </Box>
      </Container>
      <Container>
        <RecipeStepsComponent steps={recipe.steps} />
      </Container>
    </Container>
  );
};

export default RecipeDetailsPage;
