import React from "react";

// material ui
import { styled, alpha, InputBase } from "@mui/material";

// material icons
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  border: `1px solid lightgrey`,
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const SearchComponent = () => {
  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon color="primary" />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Recherche..."
        inputProps={{ "aria-label": "search" }}
      />
    </Search>
  );
};

export default SearchComponent;
