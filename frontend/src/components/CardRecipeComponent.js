import React from "react";
import { Link } from "react-router-dom";

// material UI
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  useTheme,
} from "@mui/material";

const CardRecipeComponent = ({ index, image, name }) => {
  const theme = useTheme();

  return (
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
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt={"Recipe" + { index }}
          />
          <CardContent>
            <Typography variant="h6" component="h3" gutterBottom>
              {name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Description de la recette {name}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

export default CardRecipeComponent;
