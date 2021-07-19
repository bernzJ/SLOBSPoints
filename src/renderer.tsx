import React from "react";
import { render } from "react-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

import App from "./components/App";

const theme = extendTheme({
  initialColorMode: "dark",
  fonts: {
    body: "Roboto",
  },
  colors: {
    themePurple: {
      50: "#9147ff",
      100: "#9147ff",
      200: "#9147ff",
      300: "#9147ff",
      400: "#9147ff",
      500: "#9147ff",
      600: "#9147ff",
      700: "#9147ff",
      800: "#9147ff",
      900: "#9147ff",
    },
  },
});

render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);
