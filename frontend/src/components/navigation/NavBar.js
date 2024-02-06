import * as React from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

// material UI
import {
  Tooltip,
  Zoom,
  Menu,
  MenuItem,
  Stack,
  Typography,
  IconButton,
  Toolbar,
  Box,
  AppBar,
} from "@mui/material";

// material icons
import AccountCircle from "@mui/icons-material/AccountCircle";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import MoreIcon from "@mui/icons-material/MoreVert";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchComponent from "../SearchComponent";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { NavBarButtons } from "./NavbarButtons";

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const { isAuthenticated, user } = useAuth0();

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
        <Link to="/user/notepad">Bloc notes</Link>
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
            aria-label="shom technical terms"
            color="primary"
          >
            <ArticleOutlinedIcon />
          </IconButton>
          <p>Termes techniques</p>
        </MenuItem>
      </Link>
      <Link to="/recipe-list">
        <MenuItem>
          <IconButton
            size="large"
            color="primary"
            aria-label="Send user to recipes page"
          >
            <MenuBookRoundedIcon />
          </IconButton>
          <p>Recettes</p>
        </MenuItem>
      </Link>
      {isAuthenticated && (
        <div>
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
            <p>Profil</p>
          </MenuItem>
          <Link to="/admin/users">
            <MenuItem>
              <IconButton
                size="large"
                aria-label="shom technical terms"
                color="primary"
              >
                <AdminPanelSettingsOutlinedIcon />
              </IconButton>
              <p>Admin</p>
            </MenuItem>
          </Link>
        </div>
      )}

      <Stack direction="column" spacing={1} alignItems={"center"}>
        <NavBarButtons />
      </Stack>
    </Menu>
  );

  return (
    <Box
      sx={{
        flexGrow: 1,
        boxShadow: "0 0 5px lightgrey",
        mb: "3rem",
        height: "100px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Box display="flex" flexDirection="column">
            <Typography
              variant="h5"
              noWrap
              component="div"
              color={"primary"}
              mr={1}
            >
              <Link to="/">Cooking App Project</Link>
            </Typography>
            {isAuthenticated && <Typography>Bonjour {user.name} !</Typography>}
          </Box>
          {/* <SearchComponent /> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="small"
              sx={{ pb: 0, mr: 1 }}
              aria-label="Accueil"
              color="primary"
            >
              <Tooltip title="Accueil" followCursor TransitionComponent={Zoom}>
                <Link to="/">
                  <HomeOutlinedIcon />
                </Link>
              </Tooltip>
            </IconButton>
            <IconButton
              size="small"
              sx={{ pb: 0, mr: 1 }}
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
            <IconButton
              size="small"
              sx={{ pb: 0, mr: 1 }}
              aria-label="Recettes"
              color="primary"
            >
              <Tooltip title="Recettes" followCursor TransitionComponent={Zoom}>
                <Link to="/recipe-list">
                  <MenuBookRoundedIcon />
                </Link>
              </Tooltip>
            </IconButton>
            {isAuthenticated && (
              <>
                <IconButton
                  size="small"
                  sx={{ pb: 0, mr: 1 }}
                  aria-label="Compte utilisateur"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="primary"
                  sx={{ display: "block" }}
                >
                  <Tooltip
                    title="Profil"
                    followCursor
                    TransitionComponent={Zoom}
                  >
                    <AccountCircle />
                  </Tooltip>
                </IconButton>
                <IconButton
                  size="small"
                  sx={{ pb: 0, mr: 1 }}
                  aria-label="Admin"
                  color="primary"
                >
                  <Tooltip
                    title="Admin"
                    followCursor
                    TransitionComponent={Zoom}
                  >
                    <Link to="/admin/users">
                      <AdminPanelSettingsOutlinedIcon />
                    </Link>
                  </Tooltip>
                </IconButton>
              </>
            )}

            <Stack direction={"row"} spacing={1} alignItems={"center"}>
              <NavBarButtons />
            </Stack>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="small"
              sx={{ pb: 0, mr: 1 }}
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
