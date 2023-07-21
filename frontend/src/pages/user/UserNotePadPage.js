import React, { useState } from "react";

// material ui
import {
  Container,
  Button,
  Stack,
  Typography,
  Modal,
  Fab,
  TextField,
  Snackbar,
  Alert,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@mui/material";

// material icons
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import ActionButtonComponent from "../../components/ActionButtonComponent";

// temporary backend
const notes = [
  {
    id: 1,
    note: "Ajouter ciseler aux termes, couper en mini cubes, plusieurs entailles dans la longueur sans couper le pied du produit, une ou deux tailles a plat dans la longueur et emincer normalements",
  },
  { id: 2, note: "Econome" },
  {
    id: 3,
    note: "Expression d'annonce d'une commande en cuisine",
  },
  {
    id: 4,
    note: "moutarde, vinaigre, sel, poivre, monter à l'huile",
  },
  { id: 5, note: "Ajouter la recette du chef Bonzi" },
  { id: 6, note: "Aiguiser ASAP" },
];

const UserNotePadPage = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => {
    setOpenEdit(true);
    console.log(notes);
  };

  const handleCloseEdit = () => setOpenEdit(false);

  const [openSnack, setOpenSnack] = useState(false);
  const handleClick = () => {
    setOpenSnack(true);
    setOpen(false);
    setOpenEdit(false);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnack(false);
  };

  return (
    <Container maxWidth="lg" sx={{ my: "50px" }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={"center"}
      >
        <Typography variant="h2" component="h1">
          Bloc note
        </Typography>
        <Fab size="small" color="info" aria-label="add" onClick={handleOpen}>
          <AddIcon />
        </Fab>

        {/* add section */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            component="form"
            elevation={3}
            sx={{
              p: 4,
              maxWidth: 600,
              margin: "auto",
              borderRadius: "none",
              boxShadow: "none",
            }}
          >
            <Typography>Ajoutez votre nouvelle note</Typography>
            <Stack my={2}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                placeholder="texte"
                multiline
                maxRows={10}
              />
            </Stack>
            <Stack alignItems="end">
              <Button color="primary" variant="outlined" onClick={handleClick}>
                Ajouter
              </Button>
            </Stack>
          </Paper>
        </Modal>

        {/* edit section */}
        <Modal
          open={openEdit}
          onClose={handleCloseEdit}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            component="form"
            elevation={3}
            sx={{
              p: 4,
              maxWidth: 600,
              margin: "auto",
              borderRadius: "none",
              boxShadow: "none",
            }}
          >
            <Typography>Modifiez la note n°{`${notes[0].id}`}</Typography>
            <Stack my={2}>
              <TextField
                id="outlined-basic"
                variant="outlined"
                defaultValue={`${notes[0].note}`}
                multiline
                maxRows={10}
              />
            </Stack>
            <Stack alignItems="end">
              <Button color="primary" variant="outlined" onClick={handleClick}>
                Modifier
              </Button>
            </Stack>
          </Paper>
        </Modal>
        <Snackbar
          open={openSnack}
          autoHideDuration={2000}
          onClose={handleCloseSnack}
        >
          <Alert
            onClose={handleCloseSnack}
            severity="success"
            sx={{ width: "100%" }}
          >
            Note modifiée !
          </Alert>
        </Snackbar>
      </Stack>

      {/* tasks */}
      <Grid item xs={12} md={6}>
        <List>
          {notes.map((note, index) => (
            <ListItem
              sx={{
                flexDirection: { xs: "column", sm: "row" },
                textAlign: { xs: "center", sm: "inherit" },
                my: "10px",
                boxShadow: "0 0 5px lightgrey",
                px: "0",
              }}
            >
              <ListItemText
                sx={{ maxWidth: "50px", minWidth: "50px", textAlign: "center" }}
              >
                {note.id}
              </ListItemText>
              <ListItemText>{note.note}</ListItemText>
              <Stack direction={"row"} alignItems={"center"}>
                <Tooltip title="Editer">
                  <EditNoteOutlinedIcon
                    color="info"
                    onClick={handleOpenEdit}
                    sx={{ cursor: "pointer" }}
                  />
                </Tooltip>
                <ActionButtonComponent
                  text={"Note supprimée"}
                  severity={"info"}
                  Children={<DeleteIcon color="error" />}
                  toolTip={"Supprimer"}
                />
              </Stack>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Container>
  );
};

export default UserNotePadPage;
