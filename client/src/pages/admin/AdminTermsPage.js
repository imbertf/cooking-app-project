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
} from "@mui/material";

// components
import AlphabeticallyPaginationComponent from "../../components/filter/AlphabeticallyPaginationComponent";
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
  const [currentValues, setCurrentValues] = useState({
    title: "",
    description: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const sections = {};
  localStorage.setItem("valuesToUpdate", JSON.stringify(currentValues));

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

  // update term
  const handleUpdate = (termID) => {
    try {
      // get the Object and extract datas to stock to [currentValues] state
      const currentValue = [...getData].filter((term) => term._id === termID);
      const title = currentValue[0].title;
      const description = currentValue[0].description;
      const ID = currentValue[0]._id;
      setCurrentValues({
        title: title,
        description: description,
        _id: ID,
      });

      localStorage.setItem("valuesToUpdate", JSON.stringify(currentValues));
      setTimeout(() => {
        navigate("/admin/edit-term");
      }, 1);
    } catch (error) {
      console.log(error);
    }
  };

  // remove term from the DB
  const handleDelete = async (termID) => {
    if (window.confirm("Êtes-vous sur de vouloir supprimer ce terme?")) {
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
                  <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <Tooltip title="Editer">
                      <EditNoteOutlinedIcon
                        color="info"
                        onClick={() => handleUpdate(term._id)}
                        sx={{ cursor: "pointer" }}
                      />
                    </Tooltip>
                    <Tooltip title="Supprimer">
                      <DeleteIcon
                        color="error"
                        onClick={() => handleDelete(term._id)}
                        sx={{ cursor: "pointer" }}
                      />
                    </Tooltip>
                  </Stack>
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
