import { Stack, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <Stack
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
      alignItems={{ xs: "start", sm: "center" }}
      justifyContent={{ xs: "start", sm: "center" }}
      mt={5}
      pl={{ xs: "16px", sm: "0" }}
      height={100}
      component={"footer"}
    >
      <Typography variant="h6" color="primary">
        Cooking App Project
      </Typography>
      <Typography color="primary">Copyright ©️imbertf-2024</Typography>
      <Link
        to={"https://imbertf.fr"}
        target="_blank"
        rel="noreferrer"
        style={{ marginTop: "0" }}
      >
        imbertf.fr
      </Link>
    </Stack>
  );
};

export default FooterComponent;
