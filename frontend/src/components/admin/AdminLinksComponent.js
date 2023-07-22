import React from "react";
import { Link } from "react-router-dom";

// material ui
import { Box, Stack } from "@mui/material";

const AdminLinksComponent = () => {
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
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/recipes">Recipes</Link>
        <Link to="/admin/terms">Terms</Link>
      </Stack>
    </Box>
  );
};

export default AdminLinksComponent;
