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

// components
import CardRecipeComponent from "../components/CardRecipeComponent";
import SearchComponent from "../components/SearchComponent";

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
      <Box my={4} textAlign="center">
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ display: { xs: "block", sm: "none" } }}
          color="primary"
        >
          Cooking App Project
        </Typography>
      </Box>
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
        <Stack marginBottom={3} direction={"row"} flexWrap={"wrap"}>
          <Typography
            sx={{
              padding: "10px",
              width: { sm: "45%" },
            }}
            gutterBottom
          >
            Cette application à destination des étudiants en formation cuisine
            peuvent acceder simplement et rapidement à un{" "}
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
              enregistrant
            </Link>{" "}
            vous aurez la possibilité d'ajouter vos recettes en favoris
          </Typography>
          <Typography
            sx={{
              padding: "10px",
              width: { sm: "45%" },
            }}
          >
            L'accès à votre{" "}
            <Link
              to="/user/notepad"
              style={{ color: theme.palette.info.light }}
            >
              {" "}
              bloc note{" "}
            </Link>
            afin d'y ajouter rapidement les informations dont vous pourriez
            avoir besoin pour votre travail
          </Typography>
        </Stack>
      </Box>
      <Box my={10}>
        <Stack
          my={2}
          flexWrap={{ xs: "wrap" }}
          justifyContent={{ xs: "center" }}
          alignItems={"center"}
        >
          <Typography variant="h5" component="h2" gutterBottom>
            Dictionnaire des termes techniques
          </Typography>

          <form onSubmit={handleSearch} style={{ maxWidth: "300px" }}>
            <SearchComponent />
          </form>
        </Stack>
      </Box>

      <Box my={4} textAlign="center">
        <Stack direction={"row"} my={2} flexWrap={{ xs: "wrap" }}>
          <Typography variant="h5" component="h2">
            Recettes tranditionnelles
          </Typography>
          <Link to="/recipe-list">
            <Button variant="text" color="primary" sx={{ marginLeft: "10px" }}>
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
            />
          ))}
          <Typography
            display={"flex"}
            alignItems={"flex-end"}
            ml={{ sm: "10px" }}
            mt={{ xs: "10px", sm: "0" }}
            color={"primary"}
          >
            <Link to="/recipe-list">
              <Typography color={"secondary"}>Plus de recettes...</Typography>
            </Link>
          </Typography>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
