import React, { useState, useEffect } from "react";

// material ui
import {
  Container,
  Button,
  Stack,
  Typography,
  Modal,
  TextField,
  Paper,
  Grid,
  List,
  ListItem,
  ListItemText,
  Tooltip,
} from "@mui/material";

// material icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";

// components
import SnackBarComponent from "../../components/SnackBarComponent";

const UserNotePadPage = () => {
  // states management
  // stock data
  const [getData, setGetData] = useState([]);

  // stock new data to send to DB
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // stock data to update
  const [currentValues, setCurrentValues] = useState({
    title: "",
    description: "",
    ID: "",
  });

  // open and close menus
  const [open, setOpen] = useState(false);
  const [openUpdateMenu, setOpenUpdateMenu] = useState(false);

  // alerts states
  const [showAlert, setShowAlert] = useState(false);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showUpdateAlert, setShowUpdateAlert] = useState(false);
  const [showAlertEmptyField, setShowAlertEmptyField] = useState(false);

  // open and close functions
  const toggleModalAddNote = () => setOpen(!open);
  const toggleUpdateMenu = () => setOpenUpdateMenu(!openUpdateMenu);

  // get data from API
  useEffect(() => {
    fetch("http://localhost:3000/api/notes")
      .then((res) => res.json())
      .then((data) => {
        setGetData(data);
      });
  }, []);

  // function added in handleSubmit / handleDelete to refresh data in the page without refreshing page
  const fetchData = () => {
    fetch("http://localhost:3000/api/notes")
      .then((res) => res.json())
      .then((data) => {
        setGetData(data);
      });
  };

  // input change listener to create task
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // input change listener to update task
  const handleUpdateChange = (event) => {
    const { name, value } = event.target;
    setCurrentValues({
      ...currentValues,
      [name]: value,
    });
  };

  // create new recipe in DB
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.title === "" || formData.description === "") {
      setShowAlertEmptyField(!showAlertEmptyField);
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/api/notes", {
        method: "POST",
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      // if res is ok, clear formData, close modal and fetch data again to display current tasks
      // use formData state to stock new data before sending them to DB
      if (res.ok) {
        setFormData({
          title: "",
          description: "",
        });
        setShowAlert(!showAlert);
        setOpen(!open);
        fetchData();
      } else {
        console.log("Error adding note");
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  // update note
  const handleUpdate = (noteID) => {
    setOpenUpdateMenu(!openUpdateMenu);
    try {
      // get data from selected note, copy it into [currentValues] state
      const selectNoteToUpdate = [...getData].filter(
        (note) => note._id === noteID
      );
      setCurrentValues({
        title: selectNoteToUpdate[0].title,
        description: selectNoteToUpdate[0].description,
        ID: selectNoteToUpdate[0]._id,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateSubmit = async () => {
    // send current values to backend
    try {
      const res = await fetch(
        `http://localhost:3000/api/notes/${currentValues.ID}`,
        {
          method: "PUT",
          body: JSON.stringify({
            title: currentValues.title,
            description: currentValues.description,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );

      // if res is OK, clear current value state, fetch data to display current data from DB and close modal
      // use currentValues state to stock updated data before sending it to DB
      if (res.ok) {
        setOpenUpdateMenu(!openUpdateMenu);
        setCurrentValues({
          title: "",
          description: "",
          ID: "",
        });
        fetchData();
        setShowUpdateAlert(!showUpdateAlert);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // remove note from the DB
  let handleDelete = async (noteID) => {
    if (window.confirm("Êtes-vous sur de vouloir supprimer cette recette?")) {
      setTimeout(() => {
        try {
          fetch(`http://localhost:3000/api/notes/${noteID}`, {
            method: "DELETE",
          });
          // Update the state by filtering out the deleted note and display alert to inform user of suppression
          setGetData([...getData].filter((note) => note._id !== noteID));
          setShowDeleteAlert(!showDeleteAlert);
        } catch (error) {
          console.log(error);
        }
      }, 1);
    }
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
        <Button
          variant="outlined"
          color="info"
          sx={{ mb: "5px" }}
          onClick={toggleModalAddNote}
        >
          Ajouter une note
        </Button>

        {/* add section */}
        <Modal
          open={open}
          onClose={toggleModalAddNote}
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
              width: { xs: "95%", sm: "50%" },
              maxWidth: 800,
              margin: "auto",
              boxShadow: "none",
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              Ajouter une note
            </Typography>
            <TextField
              id="title"
              name="title"
              label="Titre"
              variant="outlined"
              required
              sx={{ my: "5px" }}
              value={formData.title}
              onChange={handleChange}
            />
            <TextField
              id="description"
              name="description"
              label="Description"
              multiline
              required
              rows={8}
              sx={{ my: "5px" }}
              value={formData.description}
              onChange={handleChange}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Ajouter
            </Button>
          </Paper>
        </Modal>

        {/* edit section */}
        <Modal
          open={openUpdateMenu}
          onClose={toggleUpdateMenu}
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
              width: { xs: "95%", sm: "50%" },
              maxWidth: 800,
              margin: "auto",
              boxShadow: "none",
            }}
          >
            <Typography variant="h5" component="h2" gutterBottom>
              Editer la note
            </Typography>
            <TextField
              id="title"
              name="title"
              label="Nouveau titre"
              variant="outlined"
              required
              sx={{ my: "5px" }}
              value={currentValues.title}
              onChange={handleUpdateChange}
            />
            <TextField
              id="description"
              name="description"
              label="Nouvelle description"
              multiline
              required
              rows={8}
              sx={{ my: "5px" }}
              value={currentValues.description}
              onChange={handleUpdateChange}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleUpdateSubmit}
            >
              Editer
            </Button>
          </Paper>
        </Modal>
      </Stack>

      {/* tasks */}
      <Grid item xs={12} md={6}>
        <List>
          {getData.map((note, index) => (
            <ListItem
              sx={{
                flexDirection: { xs: "column", sm: "row" },
                textAlign: { xs: "center", sm: "inherit" },
                my: 2,
                boxShadow: "0 0 5px lightgrey",
              }}
              key={index}
            >
              <ListItemText sx={{ mx: 1 }}>{index + 1}</ListItemText>
              <ListItemText sx={{ mx: 1 }}>{note.title}</ListItemText>
              <ListItemText sx={{ mx: 1 }}>{note.description}</ListItemText>
              <Stack direction={"row"} alignItems={"center"} spacing={1}>
                <Tooltip title="Editer">
                  <EditNoteOutlinedIcon
                    color="info"
                    onClick={() => handleUpdate(note._id)}
                    sx={{ cursor: "pointer" }}
                  />
                </Tooltip>
                <Tooltip title="Supprimer">
                  <DeleteIcon
                    color="error"
                    onClick={() => handleDelete(note._id)}
                    sx={{ cursor: "pointer" }}
                  />
                </Tooltip>
              </Stack>
            </ListItem>
          ))}
        </List>
        {showDeleteAlert && (
          <SnackBarComponent
            severity={"warning"}
            textAlert={"Recette supprimée!"}
          />
        )}
        {showAlert && (
          <SnackBarComponent severity={"success"} textAlert={"Note ajoutée!"} />
        )}
        {showUpdateAlert && (
          <SnackBarComponent severity={"info"} textAlert={"Note modifiée!"} />
        )}
        {showAlertEmptyField && (
          <SnackBarComponent
            severity={"warning"}
            textAlert={"Tous les champs doivent être remplis"}
          />
        )}
      </Grid>
    </Container>
  );
};

export default UserNotePadPage;
