import React from "react";
import { Link } from "react-router-dom";

// material UI
import {
  Container,
  Box,
  Stack,
  Typography,
  useTheme,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";

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
  const theme = useTheme();

  return (
    <Container maxWidth="md">
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
          {/* Render up to 5 recipe cards */}

          {cards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Link to="/recipe-details/:id">
                <Card
                  variant="outlined"
                  sx={{
                    "&:hover": {
                      backgroundColor: theme.palette.primary.light,
                      borderColor: theme.palette.primary.light,
                      boxShadow: `0 0 5px 2px ${theme.palette.primary.light}`,
                    },
                    minHeight: "270px",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="140"
                    image={card.image} // Replace with actual image path
                    alt={"Recipe" + { index }}
                  />
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {card.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      Description de la recette {card.name}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default RecipesPage;
