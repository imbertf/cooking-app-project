import { createTheme } from "@mui/material/styles";

const Theme = createTheme({
  typography: {
    fontFamily: ["Jost Variable", "sans-serif"].join(","),
    allVariants: { color: "#454545" },
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
    // MuiOutlinedInput: {
    //   styleOverrides: {
    //     root: {
    //       fieldset: {
    //         borderColor: "red",
    //       },
    //     },
    //   },
    // },
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

export default Theme;

/* colors */
/* main: 52C2CC;
accent: FF9D42;
text: 454545;
bittersweet: FF675A;
mantis: 6EBF63; */
