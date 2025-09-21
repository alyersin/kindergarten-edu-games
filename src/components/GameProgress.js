"use client";

import { Box, Text, Progress } from "@chakra-ui/react";

const GameProgress = ({
  current,
  total,
  colorScheme = "green",
  label = "Progres",
  currentLevel,
  totalLevels,
  currentLevelData,
  score,
  textColor = "gray.700",
  ...props
}) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <Box w="full" maxW="md" {...props}>
      <Text
        mb={2}
        fontWeight="bold"
        color={textColor}
        textShadow={
          textColor === "white" ? "2px 2px 4px rgba(0,0,0,0.5)" : "none"
        }
      >
        {label}: {current} din {total}
      </Text>
      <Progress
        value={percentage}
        colorScheme={colorScheme}
        size="lg"
        borderRadius="full"
      />
    </Box>
  );
};

export default GameProgress;
