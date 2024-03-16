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
import TagComponent from "./TagComponent";
import CookingMethodTagComponent from "./CookingMethodTagComponent";

const CardRecipeComponent = ({ ID, image, name, category, cookingMethod }) => {
  const theme = useTheme();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Link to={`/recipe-details/${ID}`}>
        <Card
          variant="outlined"
          sx={{
            transition: "transform 150ms, box-shadow 0.3s",
            boxShadow: "0px 0px 10px lightgrey",
            minWidth: "250px",
            "&:hover": {
              transform: "scale(1.02)",
              boxShadow: "0px 0px 20px lightgrey",
            },
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={image}
            alt={"Recipe" + { name }}
          />
          <CardContent>
            <Typography variant="h6" component="h3" gutterBottom>
              {name}
            </Typography>
            <TagComponent
              label={category}
              color={"info"}
              variant={"outlined"}
            />
            <CookingMethodTagComponent cookingMethod={cookingMethod} />
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
};

export default CardRecipeComponent;
