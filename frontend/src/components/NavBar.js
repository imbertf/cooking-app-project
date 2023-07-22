import * as React from "react";
import { Link } from "react-router-dom";

// material UI
import {
  Tooltip,
  Zoom,
  Menu,
  MenuItem,
  Badge,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar,
} from "@mui/material";

// material icons
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import MoreIcon from "@mui/icons-material/MoreVert";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchComponent from "./SearchComponent";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";

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
        <Link to="/user">Favoris</Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to="/user/notepad">Bloc notes</Link>
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
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="primary"
        >
          <PersonAddIcon />
        </IconButton>
        <p>Register</p>
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
          <SearchComponent />
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" aria-label="Accueil" color="primary">
              <Tooltip title="Accueil" followCursor TransitionComponent={Zoom}>
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
              <Tooltip
                title="Termes techniques"
                followCursor
                TransitionComponent={Zoom}
              >
                <Link to="/technical-terms">
                  <ArticleOutlinedIcon />
                </Link>
              </Tooltip>
            </IconButton>
            <IconButton size="large" aria-label="Recettes" color="primary">
              <Tooltip title="Recettes" followCursor TransitionComponent={Zoom}>
                <Link to="/recipe-list">
                  <MenuBookRoundedIcon />
                </Link>
              </Tooltip>
            </IconButton>
            <IconButton size="large" aria-label="S'enregistrer" color="primary">
              <Tooltip
                title="S'enregistrer"
                followCursor
                TransitionComponent={Zoom}
              >
                <Link to="/register">
                  <PersonAddIcon />
                </Link>
              </Tooltip>
            </IconButton>

            <IconButton
              size="large"
              aria-label="Compte utilisateur"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="primary"
              sx={{ display: "block" }}
            >
              <Tooltip title="Profil" followCursor TransitionComponent={Zoom}>
                <AccountCircle />
              </Tooltip>
            </IconButton>
            <IconButton size="large" aria-label="Admin" color="primary">
              <Tooltip title="Recettes" followCursor TransitionComponent={Zoom}>
                <Link to="/admin/users">
                  <AdminPanelSettingsOutlinedIcon />
                </Link>
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
