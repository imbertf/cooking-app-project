import React, { useEffect, useState } from "react";

// material UI
import { Container, Stack, Typography, Box } from "@mui/material";
import TagComponent from "../components/TagComponent";
import IngredientTagComponent from "../components/IngredientTagComponent";
import RecipeStepsComponent from "../components/RecipeStepsComponent";
import FavoriteHeart from "../components/FavoriteIconComponent";
import CookingMethodTagComponent from "../components/CookingMethodTagComponent";
import { useParams } from "react-router-dom";

const RecipeDetailsPage = () => {
  const { id } = useParams();
  const [getData, setGetData] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [ingredientsImage, setIngredientsImage] = useState([]);

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/recipes");
        const data = await response.json();
        setGetData(data);
      } catch (error) {
        console.error("Error fetching recipe data:", error);
      }
    };

    fetchRecipeData();
  }, []);

  // get ingrédients from DB to display them in option selection
  useEffect(() => {
    fetch("http://localhost:3000/api/ingredients")
      .then((res) => res.json())
      .then((data) => {
        setIngredientsImage(data);
      });
  }, []);

  useEffect(() => {
    const selectedRecipe = getData.find((recipe) => recipe._id === id);
    if (selectedRecipe) {
      setCurrentRecipe(selectedRecipe);

      // Map over ingredients and add image path from the ingredient database
      const updatedIngredients = selectedRecipe.ingredients.map(
        (ingredient) => {
          const ingredientImage = ingredientsImage.find(
            (img) => img.name === ingredient.name
          );
          return {
            ...ingredient,
            image: ingredientImage ? ingredientImage.image : "", // Provide a default value if the image is not found
          };
        }
      );

      setIngredients(updatedIngredients);
      setSteps(selectedRecipe.steps);
    }
  }, [getData, id, ingredientsImage]);

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
              {currentRecipe.name}
            </Typography>
            <FavoriteHeart />
          </Stack>
          <TagComponent
            label={currentRecipe.category}
            color={"info"}
            variant={"outlined"}
          />
          <CookingMethodTagComponent
            cookingMethod={currentRecipe.cookingMethod}
          />
          {/* <Stack direction={"row"} spacing={1} my={1}>
            {currentRecipe.tools.map((tool, index) => (
              <Stack direction={"row"} spacing={1} key={index}>
                <Box
                  component="img"
                  src={tool.src}
                  alt={tool.alt}
                  style={{ width: "100px", height: "100px" }}
                />
              </Stack>
            ))}
          </Stack> */}
        </Stack>
        <Stack width={{ xs: "100%", md: "initial" }}>
          <Box
            component="img"
            alt="Sauce béarnaise"
            src={currentRecipe.image}
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
          {ingredients.map((ingredient, index) => (
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
        <Box>
          {steps.map((step, index) => (
            <RecipeStepsComponent
              key={index}
              index={index}
              step={step.description}
            />
          ))}
        </Box>
      </Container>
    </Container>
  );
};

export default RecipeDetailsPage;
