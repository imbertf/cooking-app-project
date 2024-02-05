import React, { useEffect, useState } from "react";

// material UI
import {
  Container,
  Box,
  Stack,
  Typography,
  Grid,
  useTheme,
} from "@mui/material";
import CategoryFilterComponent from "../components/filter/CategoryFilterComponent";
import CardRecipeComponent from "../components/CardRecipeComponent";
import SortOptionsComponent from "../components/SortOptionsComponent";

const RecipesPage = () => {
  const [getData, setGetData] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    fetch("http://localhost:3000/api/recipes")
      .then((res) => res.json())
      .then((data) => {
        setGetData(data);
      });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ display: { md: "flex" } }}>
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
          {getData.map((recipe, index) => (
            <CardRecipeComponent
              name={recipe.name}
              description={recipe.description}
              image={recipe.image}
              key={index}
              ID={recipe._id}
            />
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default RecipesPage;
