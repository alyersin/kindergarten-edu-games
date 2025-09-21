"use client";

import { VStack, HStack, Text } from "@chakra-ui/react";

const VisualObjects = ({
  count,
  type = "apple",
  specificType = null,
  showNumbers = true,
}) => {
  const objects = {
    apple: "🍎",
    banana: "🍌",
    orange: "🍊",
    strawberry: "🍓",
    grape: "🍇",
    cherry: "🍒",
    peach: "🍑",
    lemon: "🍋",
    star: "⭐",
    heart: "❤️",
    circle: "⭕",
    square: "⬜",
    ball: "⚽",
    car: "🚗",
    flower: "🌸",
    butterfly: "🦋",
    fish: "🐠",
    bird: "🐦",
    cat: "🐱",
    dog: "🐶",
    bear: "🐻",
    rabbit: "🐰",
    duck: "🦆",
    frog: "🐸",
    bee: "🐝",
    ladybug: "🐞",
    sun: "☀️",
    moon: "🌙",
    cloud: "☁️",
    rainbow: "🌈",
  };

  // Dacă avem un tip specific (pentru mixed), folosește-l
  if (specificType && objects[specificType]) {
    const object = objects[specificType];

    // Calculate rows and items per row - maximum 3 rows, max 3 items per row
    const rows = Math.min(3, Math.ceil(count / 3)); // Max 3 items per row for 3 rows
    const itemsPerRow = Math.min(3, Math.ceil(count / rows)); // Never more than 3 items per row

    return (
      <VStack spacing={1} align="center" maxW="30px" justify="center" h="full">
        {Array.from({ length: rows }, (_, rowIndex) => {
          const startIndex = rowIndex * itemsPerRow;
          const endIndex = Math.min(startIndex + itemsPerRow, count);
          const rowItems = Array.from(
            { length: endIndex - startIndex },
            (_, i) => startIndex + i
          );

          return (
            <HStack key={rowIndex} spacing={1} justify="center">
              {rowItems.map((itemIndex) => (
                <Text
                  key={itemIndex}
                  fontSize="md"
                  lineHeight="1"
                  bg="transparent"
                  display="inline-block"
                >
                  {object}
                </Text>
              ))}
            </HStack>
          );
        })}
      </VStack>
    );
  }

  const object = objects[type] || "🍎";

  // Calculate rows and items per row - maximum 3 rows, max 3 items per row
  const rows = Math.min(3, Math.ceil(count / 3)); // Max 3 items per row for 3 rows
  const itemsPerRow = Math.min(3, Math.ceil(count / rows)); // Never more than 3 items per row

  return (
    <VStack spacing={1} align="center" maxW="30px" justify="center" h="full">
      {Array.from({ length: rows }, (_, rowIndex) => {
        const startIndex = rowIndex * itemsPerRow;
        const endIndex = Math.min(startIndex + itemsPerRow, count);
        const rowItems = Array.from(
          { length: endIndex - startIndex },
          (_, i) => startIndex + i
        );

        return (
          <HStack key={rowIndex} spacing={1} justify="center">
            {rowItems.map((itemIndex) => (
              <Text
                key={itemIndex}
                fontSize="md"
                lineHeight="1"
                bg="transparent"
                display="inline-block"
              >
                {object}
              </Text>
            ))}
          </HStack>
        );
      })}
    </VStack>
  );
};

export default VisualObjects;
