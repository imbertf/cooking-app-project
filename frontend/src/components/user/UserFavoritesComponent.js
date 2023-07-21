import { React, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// material ui
import {
  Container,
  Box,
  Typography,
  Tabs,
  Tab,
  IconButton,
  Alert,
  Tooltip,
  Zoom,
} from "@mui/material";

// material icons
import DeleteIcon from "@mui/icons-material/Delete";

// temporary database
const recipes = [
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
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const UserFavoritesComponent = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container
      sx={{
        bgcolor: "background.paper",
        maxHeight: 280,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5" component={"h3"}>
        Recettes favorites
      </Typography>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        {recipes.map((recipe, index) => {
          return (
            <Link
              to="/recipe-details/:id"
              style={{
                color: "inherit",
                display: "flex",
                justifyContent: "space-between",
              }}
              key={index}
            >
              <Tab label={recipe.name} {...a11yProps(`${index}`)} />
              <IconButton aria-label="delete" color="primary">
                <Tooltip
                  title="Retirer"
                  followCursor
                  TransitionComponent={Zoom}
                >
                  <DeleteIcon fontSize="small" color="info" />
                </Tooltip>
              </IconButton>
            </Link>
          );
        })}
      </Tabs>
      <Alert severity="info">Recette retirée des favoris</Alert>
    </Container>
  );
};

export default UserFavoritesComponent;
