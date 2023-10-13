import React, { useState, useEffect } from "react";
import { Container, Divider, Typography, Stack } from "@mui/material";

import AlphabeticallyPaginationComponent from "../components/AlphabeticallyPaginationComponent";
import TermListComponent from "../components/TermsListComponent";

const TermsPage = () => {
  const [getData, setGetData] = useState([]);

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

  return (
    <Container maxWidth="lg">
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
              <TermListComponent
                name={term.title}
                description={term.description}
                key={index}
              />
            ))}
          </Stack>
        ))}
      </Container>
    </Container>
  );
};

export default TermsPage;
