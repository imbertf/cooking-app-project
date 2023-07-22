import * as React from "react";
import { Link } from "react-router-dom";

// material ui
import {
  Stack,
  Card,
  CardActions,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";

// components
import ActionButtonComponent from "../ActionButtonComponent";

// material icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

// tools functions
const deleteHandler = () => {
  if (window.confirm("Êtes-vous sur de vouloir supprimer cet utilisateur?")); // Alert user for deleting
};

export default function AdminRecipeCardComponent({ ID, name, image, alt }) {
  return (
    <Card variant="outlined" sx={{ m: "10px", width: "250px" }}>
      <CardContent>
        <Typography>ID: {ID}</Typography>
        <Typography>Nom: {name} </Typography>
        <CardMedia
          component={"img"}
          image={image}
          alt={"Recipe" + { name }}
          height={140}
        />
      </CardContent>
      <CardActions sx={{ justifyContent: "flex-end" }}>
        <Stack direction={"row"} alignItems={"center"}>
          <ActionButtonComponent
            text={"Utilisateur supprimée"}
            severity={"info"}
            Children={<DeleteIcon color="error" />}
            toolTip={"Supprimer"}
            clickAction={deleteHandler}
          />
          <Link to="/admin/edit-recipe">
            <ActionButtonComponent
              Children={<EditNoteOutlinedIcon color="info" />}
              toolTip={"Editer"}
            />
          </Link>
        </Stack>
      </CardActions>
    </Card>
  );
}
