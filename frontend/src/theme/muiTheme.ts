import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",          // switch to dark mode
    primary: {
      main: "#e50914"      // Netflix red (optional)
    },
    secondary: {
      main: "#9c27b0"
    },
    background: {
      default: "#1f1c1c", // full page background
      paper: "#000000"    // Card / Container background
    },
    text: {
      primary: "#ffffff",
      secondary: "rgba(255,255,255,0.7)"
    }
  },
  typography: {
    fontFamily: "Inter, Roboto, sans-serif"
  }
});
