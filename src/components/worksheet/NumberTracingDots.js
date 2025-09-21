"use client";

import { Box, Image } from "@chakra-ui/react";

// Component pentru cifrele punctate folosind imagini
export const NumberTracingDots = ({ number }) => {
  return (
    <Box
      position="relative"
      w="full"
      h="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Image
        src={`/numbers/${number}.png`}
        alt={`Cifra punctată ${number}`}
        maxW="100%"
        maxH="100%"
        objectFit="contain"
        p={2}
        mx="auto"
        display="block"
        ml={number < 10 ? "16px" : "auto"}
        mr="auto"
        fallback={
          <Box
            w="full"
            h="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="blue.600"
            fontSize="2xl"
            fontWeight="bold"
          >
            {number}
          </Box>
        }
      />
    </Box>
  );
};
