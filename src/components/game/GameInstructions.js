"use client";

import { Text, Box } from "@chakra-ui/react";

const GameInstructions = ({
  instructions,
  textColor = "gray.700",
  bgColor = "transparent",
  showShadow = false,
}) => {
  return (
    <Box bg={bgColor} p={4} borderRadius="md" textAlign="center">
      <Text
        fontSize="xl"
        color={textColor}
        fontWeight="bold"
        textShadow={
          showShadow && textColor === "white"
            ? "2px 2px 4px rgba(0,0,0,0.5)"
            : "none"
        }
      >
        {instructions}
      </Text>
    </Box>
  );
};

export default GameInstructions;
