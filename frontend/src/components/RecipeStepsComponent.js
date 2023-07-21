import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Icon, Stack } from "@mui/material";

export default function BasicList({ steps }) {
  return (
    <Box my={3}>
      <List>
        <ListItem
          disablePadding
          sx={{ flexDirection: "column", alignItems: "start" }}
        >
          {steps.map((step, index) => (
            <Stack
              direction={"row"}
              spacing={1}
              key={index}
              alignItems={"center"}
            >
              <Icon
                color="primary"
                fontSize="small"
                sx={{ display: "flex", alignItems: "center" }}
              >
                {index + 1}
              </Icon>
              <ListItemText primary={step.etape} />
            </Stack>
          ))}
        </ListItem>
      </List>
    </Box>
  );
}
