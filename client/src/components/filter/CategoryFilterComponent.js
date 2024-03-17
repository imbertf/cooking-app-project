import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, Typography, Tabs, Tab, Button, Stack } from "@mui/material";

// temporary database
const categories = [
  {
    name: "Potage",
  },
  {
    name: "Hors-d'oeuvre froid",
  },
  {
    name: "Hors-d'oeuvre chaud",
  },
  {
    name: "Oeuf",
  },
  {
    name: "Poisson",
  },
  {
    name: "Coquillage, Crustacé",
  },
  {
    name: "Viande",
  },
  {
    name: "Abat",
  },
  {
    name: "Volaille",
  },
  {
    name: "Garniture",
  },
  {
    name: "Dessert",
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

export default function VerticalTabs({
  sendFilteredCategory,
  sendSortedRecipes,
}) {
  const [value, setValue] = React.useState(0);
  const [getData, setGetData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/recipes")
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => a.name.localeCompare(b.name));
        setGetData(data);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // send filtered category to RecipeListPage.js
  const handleCategory = (categoryName) => {
    const formattedCategory = categoryName
      .toLowerCase()
      .replace(/[^a-zA-Z0-9éÉ]/g, "")
      .replace(/[éÉ]/g, "e");
    sendFilteredCategory(formattedCategory);
  };

  const sortNameFromAToZ = () => {
    const dataToSort = getData.slice();
    dataToSort.sort((a, b) => a.name.localeCompare(b.name));
    sendSortedRecipes(dataToSort);
  };
  const sortNameFromZToA = () => {
    const dataToSort = getData.slice();
    dataToSort.sort((a, b) => b.name.localeCompare(a.name));
    sendSortedRecipes(dataToSort);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        flexDirection: "column",
        height: { xs: "200px", md: "400px" },
        justifyContent: { xs: "center" },
        mr: { md: "10px" },
      }}
    >
      <Stack>
        <Button onClick={sortNameFromAToZ} color="info" size="small">
          Trier A-Z
        </Button>
        <Button onClick={sortNameFromZToA} color="info" size="small">
          Trier Z-A
        </Button>
        <Button
          onClick={() => {
            sendFilteredCategory(null);
          }}
          color="info"
          size="small"
        >
          Voir tout
        </Button>
      </Stack>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{
          borderRight: 1,
          borderColor: "divider",
        }}
      >
        {categories.map((category, index) => {
          return (
            <Tab
              label={category.name}
              {...a11yProps(`${index}`)}
              key={index}
              onClick={() => {
                handleCategory(category.name);
              }}
            />
          );
        })}
      </Tabs>
    </Box>
  );
}
