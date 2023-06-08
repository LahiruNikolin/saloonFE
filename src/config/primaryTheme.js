import { createTheme } from "@suid/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      // #512DA8
      main: "#1e3c72",
    },
    secondary: {
      light: "#0066ff",
      main: "#0044ff",
      contrastText: "#ffcc00",
    },

    custom: {
      light: "#ffa726",
      main: "#f57c00",
      dark: "#ef6c00",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: "Montserrat",
    subtitle1: {
      fontSize: 12,
      color: "red",
    },
    body3: {
      fontSize: 16,
      fontWeight: 700,
    },
    body4: {
      fontSize: 12,
      color: "blue",
    },
  },
});

export default theme;
