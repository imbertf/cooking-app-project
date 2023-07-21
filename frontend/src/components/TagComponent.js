import * as React from "react";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

export default function TagComponent({ label, color, variant, size }) {
  return (
    <Stack direction="row" spacing={1} alignItems="center" my={0.3}>
      <Chip label={label} color={color} variant={variant} size={size} />
    </Stack>
  );
}
