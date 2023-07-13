import React from "react";
import { Link } from "react-router-dom";

// material UI
import {
  Grid,
  // CardMedia,
  Container,
  Box,
  Typography,
  TextField,
  Button,
  // Card,
  // CardContent,
  useTheme,
  Stack,
} from "@mui/material";

// material icons
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import SearchIcon from "@mui/icons-material/Search";
import CardRecipeComponent from "../components/CardRecipeComponent";

const HomePage = ({ idx }) => {
  const handleSearch = (event) => {
    event.preventDefault();
  };

  const theme = useTheme();

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
  ];

  return (
    <Container maxWidth="lg">
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

      <Box my={10} textAlign="center">
        <Typography variant="h5" component="h2" gutterBottom>
          Dictionnaire des termes techniques
        </Typography>
        <form onSubmit={handleSearch}>
          <TextField
            label="Chercher un terme"
            variant="outlined"
            size="small"
            sx={{
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: theme.palette.primary.main, // Change the border color on hover
                },
              mb: { xs: "10px" },
              mr: { xs: "10px" },
            }}
          />
          <Button type="submit" variant="contained" color="secondary">
            <SearchIcon />
          </Button>
        </form>
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
          <Link to="/recipe-list">
            <Button
              variant="contained"
              color="secondary"
              sx={{ marginLeft: "10px" }}
            >
              <MenuBookRoundedIcon color="inherit" />
            </Button>
          </Link>
        </Stack>

        <Grid container spacing={2} justifyContent="center">
          {cards.map((card, index) => (
            <CardRecipeComponent
              name={card.name}
              image={card.image}
              index={index}
            />
          ))}
          <Typography
            display={"flex"}
            alignItems={"flex-end"}
            ml={{ sm: "10px" }}
            mt={{ xs: "10px", sm: "0" }}
            color={"primary"}
          >
            <Link to="/recipe-list">Plus de recettes...</Link>
          </Typography>
        </Grid>
      </Box>
    </Container>
  );
};

export default HomePage;
