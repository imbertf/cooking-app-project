import * as React from "react";
import { List, ListItem, ListItemText } from "@mui/material";

export default function TermListComponent({ name, description }) {
  return (
    <List>
      <ListItem
        disablePadding
        sx={{ flexDirection: "column", alignItems: "start" }}
      >
        <ListItemText primary={name} secondary={description} />
      </ListItem>
    </List>
  );
}
