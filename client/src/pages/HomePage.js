import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// material UI
import {
  Grid,
  Container,
  Box,
  Typography,
  Button,
  Stack,
  useTheme,
} from "@mui/material";

// material icons
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

// components
import CardRecipeComponent from "../components/CardRecipeComponent";

const HomePage = ({ idx }) => {
  const theme = useTheme();
  const [getData, setGetData] = useState([]);
  const handleSearch = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    fetch("http://localhost:3000/api/recipes")
      .then((res) => res.json())
      .then((data) => {
        setGetData(data);
      });
  }, []);

  return (
    <Container maxWidth="md">
      <Box
        component={"section"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        textAlign={"center"}
        px={{ xs: 1 }}
      >
        <Typography variant="h5" component="h2" my={5}>
          Bienvenue sur Cooking App Project !
        </Typography>
        <Stack
          marginBottom={3}
          direction={"row"}
          flexWrap={"wrap"}
          justifyContent={"center"}
        >
          <Typography
            sx={{
              padding: "10px",
              width: { sm: "45%" },
            }}
            gutterBottom
          >
            Cette application destinée aux étudiants en formation hôtelière
            permet d'accéder simplement et rapidement à un{" "}
            <Link
              to="/technical-terms"
              style={{ color: theme.palette.secondary.light }}
            >
              lexique des termes
            </Link>{" "}
            culinaires les plus utilisés.
          </Typography>
          <Typography
            sx={{
              padding: "10px",
              width: { sm: "45%" },
            }}
          >
            Une section avec des{" "}
            <Link
              to="/recipe-list"
              style={{ color: theme.palette.primary.main }}
            >
              recettes de cuisine{" "}
            </Link>{" "}
            de base des formations allant du CAP au BTS est également
            disponible.
          </Typography>
          <Typography
            sx={{
              padding: "10px",
              width: { sm: "45%" },
            }}
          >
            En vous{" "}
            <Link to="/register" style={{ color: theme.palette.success.main }}>
              enregistrant,
            </Link>{" "}
            vous aurez la possibilité d'ajouter, modifier ou supprimer une
            recette.
          </Typography>
          <Typography
            sx={{
              padding: "10px",
              width: { sm: "45%" },
            }}
          >
            Un{" "}
            <Link
              to="/user/notepad"
              style={{ color: theme.palette.info.light }}
            >
              {" "}
              bloc note{" "}
            </Link>
            afin d'y ajouter rapidement les informations dont vous pourriez
            avoir besoin pour votre travail est disponible via l'onglet "profil"
            du menu de navigation.
          </Typography>
        </Stack>
      </Box>
      <Box my={10}>
        <Stack
          my={2}
          direction={"row"}
          flexWrap={{ xs: "wrap" }}
          justifyContent={{ xs: "center", md: "flex-start" }}
          alignItems={{ xs: "center", md: "flex-start" }}
        >
          <Typography variant="h5" component="h3">
            Dictionnaire des termes techniques
          </Typography>
          <Link to="/recipe-list">
            <Button
              variant="text"
              color="primary"
              size="small"
              sx={{ minWidth: "30px" }}
            >
              <ArticleOutlinedIcon color="inherit" />
            </Button>
          </Link>
        </Stack>
        <Typography>
          Les termes techniques culinaires en cuisine désignent un ensemble de
          mots et de phrases spécifiques utilisés dans le domaine de la cuisine
          pour décrire les techniques de préparation des aliments, les méthodes
          de cuisson, les équipements de cuisine, les ingrédients et les plats
          eux-mêmes.
          <br />
          <br /> Ces termes sont souvent en français, mais peuvent également
          provenir d'autres langues en raison de l'influence internationale dans
          le domaine culinaire. Ils sont essentiels pour la communication
          efficace entre les chefs, les cuisiniers et le personnel de cuisine,
          ainsi que pour la compréhension des recettes et des instructions de
          cuisine.
          <br />
          <br /> En outre, ces termes peuvent varier en fonction de la tradition
          culinaire régionale ou nationale, ce qui ajoute une richesse et une
          diversité au vocabulaire culinaire.
        </Typography>
      </Box>
      <Box my={4} textAlign="center">
        <Stack
          direction={"row"}
          my={2}
          flexWrap={{ xs: "wrap" }}
          justifyContent={{ xs: "center", md: "flex-start" }}
        >
          <Typography variant="h5" component="h3">
            Recettes tranditionnelles
          </Typography>
          <Link to="/recipe-list">
            <Button
              variant="text"
              color="primary"
              size="small"
              sx={{ minWidth: "30px" }}
            >
              <MenuBookRoundedIcon color="inherit" />
            </Button>
          </Link>
        </Stack>

        <Grid container spacing={2} justifyContent="flex-end">
          {getData.slice(0, 3).map((recipe, index) => (
            <CardRecipeComponent
              name={recipe.name}
              image={recipe.image}
              key={index}
              ID={recipe._id}
              category={recipe.category}
              cookingMethod={recipe.cookingMethod}
            />
          ))}
          <Typography
            display={"flex"}
            alignItems={"flex-end"}
            ml={{ sm: "10px" }}
            mt={2}
          >
            <Link to="/recipe-list">
              Plus de recettes
              <IoArrowForwardCircleOutline />
            </Link>
          </Typography>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
