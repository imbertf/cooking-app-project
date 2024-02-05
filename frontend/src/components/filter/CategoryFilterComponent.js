import * as React from "react";
import PropTypes from "prop-types";
import { Box, Typography, Tabs, Tab } from "@mui/material";

// temporary database
const categories = [
  {
    name: "Potages",
  },
  {
    name: "Hors-d'oeuvre froids",
  },
  {
    name: "Hors-d'oeuvre chauds",
  },
  {
    name: "Oeufs",
  },
  {
    name: "Poissons",
  },
  {
    name: "Coquillages, Crustacés",
  },
  {
    name: "Viandes",
  },
  {
    name: "Abats",
  },
  {
    name: "Volailles",
  },
  {
    name: "Garnitures",
  },
  {
    name: "Desserts",
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

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: { xs: "200px", md: "400px" },
        justifyContent: { xs: "center" },
        mr: { md: "10px" },
      }}
    >
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
            <Tab label={category.name} {...a11yProps(`${index}`)} key={index} />
          );
        })}
      </Tabs>
    </Box>
  );
}
