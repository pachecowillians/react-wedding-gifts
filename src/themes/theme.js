import { extendTheme } from "@chakra-ui/react";
import "@fontsource-variable/inter";

const theme = extendTheme({
  fonts: {
    heading: `'Inter Variable', sans-serif`,
    body: `'Inter Variable', sans-serif`,
  },
  colors: {
    facebook: {
      500: "#42567B",
    },
  },
  fontSizes: {
    xs: "0.875rem",
    sm: "1rem",
  },
});

export default theme;
