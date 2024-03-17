import React, { useState, useEffect, useRef } from "react";
import { Container, Divider, Typography, Stack } from "@mui/material";

import AlphabeticallyPaginationComponent from "../components/filter/AlphabeticallyPaginationComponent";
import TermListComponent from "../components/TermsListComponent";

const TermsPage = () => {
  const [getData, setGetData] = useState([]);
  const originalTermsDataRef = useRef([]);
  const [selectedPage, setSelectedPage] = useState("");
  const [selectedTermsByName, setSelectedTermsByName] = useState([]);

  const sections = {};

  // get data from DB
  useEffect(() => {
    fetch("http://localhost:3000/api/terms")
      .then((res) => res.json())
      .then((data) => {
        setGetData(data);
        originalTermsDataRef.current = data;
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

  // catch page from AlphabeticallyPaginationComponent.js
  const handleFilteredPage = (page) => {
    setSelectedPage(page);
    filterTermsByName(page);
  };

  // Initialize filteredRecipe with getData
  useEffect(() => {
    setSelectedTermsByName([...getData]);
  }, [getData]);

  const filterTermsByName = (page) => {
    const termSelected = originalTermsDataRef.current.filter(
      (term) => term.title[0] === page
    );
    if (termSelected.length === 0) {
      setSelectedTermsByName([]);
    } else {
      setSelectedTermsByName(termSelected);
    }
  };

  return (
    <Container maxWidth="lg">
      <Container
        sx={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        <AlphabeticallyPaginationComponent sendPage={handleFilteredPage} />
      </Container>
      <Divider />
      <Container sx={{ marginTop: "10px" }}>
        {selectedTermsByName.map((term, index) => (
          <Stack key={index}>
            <Typography color={"secondary"}>{term.title[0]}</Typography>
            <TermListComponent
              name={term.title}
              description={term.description}
            />
          </Stack>
        ))}
      </Container>
    </Container>
  );
};

export default TermsPage;
