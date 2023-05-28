import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  palette: {
    primary: {
      main: "#84A98C",
    },
    secondary: {
      main: "#e78686",
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;
