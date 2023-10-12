import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// material ui
import {
  Container,
  Divider,
  Typography,
  Stack,
  Button,
  Tooltip,
  Zoom,
  IconButton,
} from "@mui/material";

// components
import AlphabeticallyPaginationComponent from "../../components/AlphabeticallyPaginationComponent";
import TermListComponent from "../../components/TermsListComponent";
import SnackBarComponent from "../../components/SnackBarComponent";
// import ActionButtonComponent from "../../components/ActionButtonComponent";

// material icons
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";

const AdminTermsPage = () => {
  const navigate = useNavigate();
  const [getData, setGetData] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const sections = {};

  // get data from DB
  useEffect(() => {
    fetch("http://localhost:3000/api/terms")
      .then((res) => res.json())
      .then((data) => {
        setGetData(data);
      });
  }, []);

  // Sort the terms alphabetically
  getData.sort((a, b) => a.title.localeCompare(b.title));

  // Group the terms by sections
  getData.forEach((term) => {
    const section = term.title[0].toUpperCase(); // Extract the first letter and convert to uppercase to create ections
    if (!sections[section]) {
      sections[section] = [];
    }
    sections[section].push(term);
  });

  // remove term from the DB
  let handleDelete = async (termID) => {
    if (window.confirm("Êtes-vous sur de vouloir supprimer ce terme?")) {
      console.log(termID);

      try {
        await setTimeout(() => {
          fetch(`http://localhost:3000/api/terms/${termID}`, {
            method: "DELETE",
          });
          // Update the state by filtering out the deleted term and display alert to inform user of suppression
          setGetData([...getData].filter((term) => term._id !== termID));
          setShowAlert(!showAlert);
          // navigate("/admin/terms");
        }, 1);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" } }}
    >
      <AdminLinksComponent />
      <Stack direction={"column"}>
        <Stack
          direction={{ md: "row" }}
          alignItems={{ xs: "center", md: "inherit" }}
        >
          <Typography
            component="h1"
            variant="h4"
            textAlign={{ xs: "center", sm: "inherit" }}
            mx={"10px"}
          >
            Gestion des termes techniques
          </Typography>
          <Link to="/admin/create-term">
            <Button variant="outlined" color="info" sx={{ mb: "5px" }}>
              Ajouter un terme
            </Button>
          </Link>
        </Stack>
        <Container
          sx={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
        >
          <AlphabeticallyPaginationComponent />
        </Container>
        <Divider />
        <Container sx={{ marginTop: "10px" }}>
          {Object.keys(sections).map((section) => (
            <Stack key={section}>
              <Typography color={"secondary"}>{section}</Typography>
              {sections[section].map((term, index) => (
                <Stack
                  direction={"row"}
                  justifyContent={"space-between"}
                  key={index}
                >
                  <TermListComponent
                    name={term.title}
                    description={term.description}
                    key={index}
                  />
                  <Stack direction={"row"} alignItems={"center"}>
                    <Tooltip
                      title="Supprimer"
                      followCursor
                      TransitionComponent={Zoom}
                    >
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDelete(term._id)}
                        tooltip={"Supprimer"}
                      >
                        <DeleteIcon color="error" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip
                      title="Editer"
                      followCursor
                      TransitionComponent={Zoom}
                    >
                      <IconButton
                        aria-label="edit"
                        // onClick={handleUpdate}
                        tooltip={"Editer"}
                      >
                        <EditNoteOutlinedIcon color="info" />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                  {/* <Stack direction={"row"} alignItems={"center"}>
                    <ActionButtonComponent
                      text={"Terme technique supprimé"}
                      severity={"info"}
                      Children={<DeleteIcon color="error" />}
                      toolTip={"Supprimer"}
                      clickAction={deleteHandler}
                    />
                    <Link to="/admin/edit-term">
                      <ActionButtonComponent
                        Children={<EditNoteOutlinedIcon color="info" />}
                        toolTip={"Editer"}
                      />
                    </Link>
                  </Stack> */}
                </Stack>
              ))}
            </Stack>
          ))}
        </Container>
        {showAlert && (
          <SnackBarComponent
            severity={"warning"}
            textAlert={"Recette supprimée!"}
          />
        )}
      </Stack>
    </Container>
  );
};

export default AdminTermsPage;
