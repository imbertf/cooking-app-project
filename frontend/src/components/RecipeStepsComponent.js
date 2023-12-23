import * as React from "react";

// material ui
import { Box, Stack } from "@mui/material";

const StepTagComponent = ({ index, step }) => {
  return (
    <Box
      component={"div"}
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: " 10px",
        // boxShadow: "0 0 14px 0 rgba(0,0,0,.1)",
        fontWeight: "700",
        margin: "5px",
        // width: { xs: "100%", lg: "49%" },
      }}
    >
      <Stack
        direction={"row"}
        spacing={2}
        width={"100%"}
        fontWeight={"initial"}
      >
        <span style={{ color: "#52C2CC" }}>{index + 1}</span>
        <span>{step}</span>
      </Stack>
    </Box>
  );
};

export default StepTagComponent;
