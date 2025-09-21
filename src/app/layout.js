"use client";

import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "./globals.css";

const theme = extendTheme({
  config: {
    initialColorMode: "light",
    useSystemColorMode: false,
  },
  fonts: {
    heading: "Comic Sans MS, cursive",
    body: "Comic Sans MS, cursive",
  },
  colors: {
    brand: {
      50: "#e3f2fd",
      100: "#bbdefb",
      200: "#90caf9",
      300: "#64b5f6",
      400: "#42a5f5",
      500: "#2196f3",
      600: "#1e88e5",
      700: "#1976d2",
      800: "#1565c0",
      900: "#0d47a1",
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "20px",
      },
      sizes: {
        xl: {
          h: "80px",
          minW: "120px",
          fontSize: "24px",
          px: "32px",
        },
      },
      variants: {
        game: {
          bg: "brand.400",
          color: "white",
          _hover: {
            bg: "brand.500",
            transform: "scale(1.05)",
          },
          _active: {
            bg: "brand.600",
            transform: "scale(0.95)",
          },
        },
      },
    },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <body suppressHydrationWarning={true}>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </body>
    </html>
  );
}
