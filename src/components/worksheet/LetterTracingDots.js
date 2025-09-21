"use client";

import { Box, Image } from "@chakra-ui/react";

// Component pentru literele punctate folosind imagini
export const LetterTracingDots = ({ letter }) => {
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
        src={`/letters/${letter}.png`}
        alt={`Litera punctată ${letter}`}
        maxW="100%"
        maxH="100%"
        objectFit="contain"
        p={2}
        mx="auto"
        display="block"
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
            {letter}
          </Box>
        }
      />
    </Box>
  );
};
