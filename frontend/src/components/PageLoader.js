import React from "react";
import { Box, CircularProgress } from "@mui/material";

const PageLoader = () => {
  return (
    <Box
      width={"100%"}
      height={"300px"}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <CircularProgress />
    </Box>
  );
};

export default PageLoader;
