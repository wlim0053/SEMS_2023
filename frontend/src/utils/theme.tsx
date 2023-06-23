// theme.tsx

import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    black: "#000000",
    blue: "#006DAE",
    white: "#FFFFFF",
    grey: {
      50: "#5A5A5A",
      100: "#969696",
      200: "#E6E6E6",
    },
    secBlue: {
      500: "#009FDA",
      600: "#027EB6",
    },
    fuchsia: {
      500: "#9651AO",
      600: "#9651AO",
    },
    red: {
      500: "#FF002B",
      600: "#EE0220",
    },
    umber: {
      500: "#795549",
      600: "#795549",
    },
    pink: {
      500: "#EE64A4",
    },
    purple: {
      500: "#8177B4",
      600: "#746FB2",
    },
    ruby: {
      500: "#C8008F",
      600: "#C8008F",
    },
    olive: {
      500: "#829356",
      600: "#6F7C4D",
    },
    green: {
      500: "#00AC3E",
      600: "#008A25",
    },
    orange: {
      500: "#FC622E",
      600: "#D93F00",
    },
  },
  fonts: {
    heading: "Helvetica Neue Condensed, sans-serif",
    body: "Helvetica Neue Light, sans-serif",
    online: "Roboto, sans-serif",
    traditional: "Century Schoolbook, serif",
    // Add more font styles as needed
  },
  // Add more styling properties as needed
});

export default theme;