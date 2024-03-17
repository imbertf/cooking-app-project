import React from "react";
import { NavLink } from "react-router-dom";

// material ui
import { Box, Stack, useTheme } from "@mui/material";

const AdminLinksComponent = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        boxShadow: "0 0 5px 1px lightgrey",
        p: "10px",
        m: { xs: "20px", sm: "53px 10px" },
        borderRadius: "20px",
      }}
      component={"nav"}
      maxHeight={"200px"}
      display={"flex"}
      alignItems={"center"}
      justifyContent={{ xs: "center", sm: "inherit" }}
    >
      <Stack direction={"column"} spacing={3}>
        <NavLink
          to="/admin/users"
          style={({ isActive, isPending }) => {
            return {
              color: isActive && theme.palette.secondary.main,
            };
          }}
        >
          Utilisateurs
        </NavLink>
        <NavLink
          to="/admin/recipes"
          style={({ isActive, isPending }) => {
            return {
              color: isActive && theme.palette.secondary.main,
            };
          }}
        >
          Recettes
        </NavLink>
        <NavLink
          to="/admin/ingredients"
          style={({ isActive, isPending }) => {
            return {
              color: isActive && theme.palette.secondary.main,
            };
          }}
        >
          Ingrédients
        </NavLink>
        <NavLink
          to="/admin/terms"
          style={({ isActive, isPending }) => {
            return {
              color: isActive && theme.palette.secondary.main,
            };
          }}
        >
          Termes
        </NavLink>
      </Stack>
    </Box>
  );
};

export default AdminLinksComponent;
