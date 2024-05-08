import { extendTheme } from "@chakra-ui/react";
import "@fontsource-variable/inter";

const theme = extendTheme({
  fonts: {
    heading: `'Inter Variable', sans-serif`,
    body: `'Inter Variable', sans-serif`,
  },
  colors: {
    main: {
      100: "#42567B",
      200: "#42567B",
      300: "#42567B",
      400: "#42567B",
      500: "#42567B",
      600: "#42567B",
      700: "#42567B",
      800: "#42567B",
      900: "#42567B",
    },
  },
  fontSizes: {
    xs: "0.875rem",
    sm: "1rem",
  },
});

export default theme;
