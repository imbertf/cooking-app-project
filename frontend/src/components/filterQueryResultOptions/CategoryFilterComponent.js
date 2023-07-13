import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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
        <Tab label="Potages" {...a11yProps(0)} />
        <Tab label="Hors-d'oeuvre froids" {...a11yProps(1)} />
        <Tab label="Hors-d'oeuvre chauds" {...a11yProps(2)} />
        <Tab label="Oeufs" {...a11yProps(3)} />
        <Tab label="Poissons" {...a11yProps(4)} />
        <Tab label="Coquillages, Crustacés" {...a11yProps(5)} />
        <Tab label="Viandes" {...a11yProps(6)} />
        <Tab label="Abats" {...a11yProps(7)} />
        <Tab label="Volailles" {...a11yProps(8)} />
        <Tab label="Garnitures" {...a11yProps(9)} />
        <Tab label="Desserts" {...a11yProps(10)} />
      </Tabs>
    </Box>
  );
}
