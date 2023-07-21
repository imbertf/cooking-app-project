import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Jost Variable", "sans-serif"].join(","),
    allVariants: { color: "#2E5B5B" },
  },

  palette: {
    primary: {
      light: "#E2F6F8",
      main: "#52C2CC",
      dark: "#2E5B5B",
    },
    secondary: {
      main: "#FF9D42",
    },
    success: {
      main: "#6EBF63",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "inherit",
          boxShadow: "none",
          color: "primary",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          color: "primary",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
        },
      },
    },
  },

  shape: {
    borderRadius: "20px",
  },
});

export default theme;
