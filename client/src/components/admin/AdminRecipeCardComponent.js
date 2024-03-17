import React from "react";

// material ui
import {
  Stack,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
  Tooltip,
  Zoom,
} from "@mui/material";

// material icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

export default function AdminRecipeCardComponent({
  ID,
  name,
  description,
  image,
  alt,
  handleDelete,
  handleUpdate,
}) {
  return (
    <Card variant="outlined" sx={{ m: "4px", width: "250px" }}>
      <CardContent>
        <Typography>ID: {ID}</Typography>
        <Typography>Nom: {name} </Typography>
        <Typography display={"none"}>Description: {description} </Typography>
        <CardMedia
          component={"img"}
          image={image}
          alt={"Recipe" + { name }}
          height={140}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Stack direction={"row"} alignItems={"center"}>
          <Tooltip title="Supprimer" followCursor TransitionComponent={Zoom}>
            <IconButton
              aria-label="delete"
              onClick={handleDelete}
              tooltip={"Supprimer"}
            >
              <DeleteIcon color="error" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editer" followCursor TransitionComponent={Zoom}>
            <IconButton
              aria-label="edit"
              onClick={handleUpdate}
              tooltip={"Editer"}
            >
              <EditNoteOutlinedIcon color="info" />
            </IconButton>
          </Tooltip>
        </Stack>
      </CardActions>
    </Card>
  );
}
