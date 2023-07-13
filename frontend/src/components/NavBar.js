import * as React from "react";
import { Link } from "react-router-dom";

// material UI
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Tooltip } from "@mui/material";

// material icons
import SearchIcon from "@mui/icons-material/Search";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import MoreIcon from "@mui/icons-material/MoreVert";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

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

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Link to="/user">Profil</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to="/login">Se déconnecter</Link>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link to="/">
        <MenuItem>
          <IconButton size="large" aria-label="Accueil" color="primary">
            <HomeOutlinedIcon />
          </IconButton>
          <p>Accueil</p>
        </MenuItem>
      </Link>
      <Link to="/technical-terms">
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 4 new mails"
            color="primary"
          >
            <Badge badgeContent={4} color="secondary">
              <ArticleOutlinedIcon />
            </Badge>
          </IconButton>
          <p>Termes techniques</p>
        </MenuItem>
      </Link>
      <Link to="/recipe-list">
        <MenuItem>
          <IconButton
            size="large"
            aria-label="show 17 new notifications"
            color="primary"
          >
            <Badge badgeContent={17} color="secondary">
              <MenuBookRoundedIcon />
            </Badge>
          </IconButton>
          <p>Recettes</p>
        </MenuItem>
      </Link>
      <Link to="/user/notepad">
        <MenuItem>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="primary"
          >
            <NoteAddIcon />
          </IconButton>
          <p>Bloc notes</p>
        </MenuItem>
      </Link>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="primary"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}
            color={"primary"}
          >
            <Link to="/">Cooking App Project</Link>
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon color="primary" />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Recherche..."
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" aria-label="Accueil" color="primary">
              <Tooltip title="Accueil" followCursor>
                <Link to="/">
                  <HomeOutlinedIcon />
                </Link>
              </Tooltip>
            </IconButton>
            <IconButton
              size="large"
              aria-label="Repertoire des termes techniques"
              color="primary"
            >
              <Tooltip title="Termes techniques" followCursor>
                <Link to="/technical-terms">
                  <ArticleOutlinedIcon />
                </Link>
              </Tooltip>
            </IconButton>
            <IconButton size="large" aria-label="Recettes" color="primary">
              <Tooltip title="Recettes" followCursor>
                <Link to="/recipe-list">
                  <MenuBookRoundedIcon />
                </Link>
              </Tooltip>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="Compte utilisateur"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="primary"
            >
              <Tooltip title="Profil" followCursor>
                <AccountCircle />
              </Tooltip>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="Ouvre le menu"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="primary"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
