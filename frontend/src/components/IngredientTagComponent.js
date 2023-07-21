import * as React from "react";

// material ui
import { Box, Stack } from "@mui/material";

const IngredientTagComponent = ({ img, alt, ingredient, quantity, mesure }) => {
  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: " 10px",
        boxShadow: "0 0 14px 0 rgba(0,0,0,.1)",
        fontWeight: "700",
        margin: "5px",
        width: { xs: "100%", sm: "300px" },
      }}
    >
      <Box component={"div"} sx={{ maxWidth: "40px" }}>
        <img
          src={img}
          alt={alt}
          style={{ display: "block", maxWidth: "100%" }}
        ></img>
      </Box>
      <Stack
        direction={"row"}
        spacing={2}
        width={"100%"}
        justifyContent={"space-between"}
      >
        <span>{ingredient}</span>
        <span>
          {quantity} {mesure}
        </span>
      </Stack>
    </Box>
  );
};

export default IngredientTagComponent;
