import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// material UI
import {
  Container,
  Box,
  Stack,
  Typography,
  Grid,
  useTheme,
  Link,
  Button,
  Tooltip,
} from "@mui/material";
import CategoryFilterComponent from "../components/filter/CategoryFilterComponent";
import CardRecipeComponent from "../components/CardRecipeComponent";
import SortOptionsComponent from "../components/SortOptionsComponent";

const RecipesPage = () => {
  const [getData, setGetData] = useState([]);
  const theme = useTheme();
  const { isAuthenticated } = useAuth0();

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
          <Typography variant="h5" component="h2" mx={1}>
            Recettes tranditionnelles
          </Typography>
          {isAuthenticated ? (
            <Link href="/admin/create-recipe" onClick={console.log("test")}>
              <Button variant="outlined" color="info" sx={{ mb: "5px" }}>
                Créer une recette
              </Button>
            </Link>
          ) : (
            <Tooltip title="Vous devez être connecté" followCursor>
              <span>
                <Button
                  variant="outlined"
                  color="info"
                  sx={{ mb: "5px" }}
                  disabled
                >
                  Créer une recette
                </Button>
              </span>
            </Tooltip>
          )}
        </Stack>

        <Grid container spacing={2} justifyContent="center">
          {getData.map((recipe, index) => (
            <CardRecipeComponent
              name={recipe.name}
              description={recipe.description}
              image={recipe.image}
              key={index}
              ID={recipe._id}
              category={recipe.category}
              cookingMethod={recipe.cookingMethod}
            />
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default RecipesPage;
