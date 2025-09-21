"use client";

import {
  Box,
  VStack,
  HStack,
  Text,
  SimpleGrid,
  Button,
  Badge,
  Image,
} from "@chakra-ui/react";
import MathProblemRenderer from "./MathProblemRenderer";
import { NumberTracingDots } from "./NumberTracingDots";
import { LetterTracingDots } from "./LetterTracingDots";

// Number Tracing Renderer
export const NumberTracingRenderer = ({ numberSet }) => {
  const isMediumDifficulty = numberSet.numbers.length === 10;
  const useGridLayout = numberSet.numbers.length > 5 && !isMediumDifficulty;

  if (isMediumDifficulty) {
    /* Special layout for medium difficulty (1-10): single column with all numbers 1-10 */
    return (
      <Box w="full" display="flex" justifyContent="center">
        <VStack spacing={0} w="auto">
          {numberSet.numbers.map((number, index) => (
            <Box
              key={index}
              w="full"
              borderBottom="1px solid"
              borderColor="gray.200"
              pb={2}
              mb={2}
            >
              <HStack spacing={2} align="center" justify="center">
                {/* Numerele punctate pentru trasare */}
                <HStack spacing={3}>
                  {[1, 2, 3, 4, 5].map((_, traceIndex) => (
                    <Box
                      key={traceIndex}
                      minW="80px"
                      h="50px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <NumberTracingDots number={number} />
                    </Box>
                  ))}
                </HStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      </Box>
    );
  } else if (useGridLayout) {
    /* Compact grid layout for other cases with 6+ numbers */
    return (
      <Box w="full" display="flex" justifyContent="center">
        <SimpleGrid columns={2} spacing={0} w="auto">
          {numberSet.numbers.map((number, index) => (
            <Box
              key={index}
              w="full"
              borderBottom="1px solid"
              borderColor="gray.200"
              pb={3}
              mb={3}
            >
              <HStack spacing={4} align="center" justify="flex-start">
                {/* Numerele punctate pentru trasare */}
                <HStack spacing={2}>
                  {[1, 2, 3, 4, 5].map((_, traceIndex) => (
                    <Box
                      key={traceIndex}
                      minW="120px"
                      h="50px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <NumberTracingDots number={number} />
                    </Box>
                  ))}
                </HStack>
              </HStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    );
  } else {
    /* Vertical layout for 5 or fewer numbers */
    return (
      <Box w="full" display="flex" justifyContent="center">
        <VStack spacing={0} w="auto">
          {numberSet.numbers.map((number, index) => (
            <Box
              key={index}
              w="full"
              borderBottom="1px solid"
              borderColor="gray.200"
              pb={3}
              mb={3}
            >
              <HStack spacing={6} align="center" justify="flex-start">
                {/* Numerele punctate pentru trasare */}
                <HStack spacing={3}>
                  {[1, 2, 3, 4, 5].map((_, traceIndex) => (
                    <Box
                      key={traceIndex}
                      minW="60px"
                      h="60px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <NumberTracingDots number={number} />
                    </Box>
                  ))}
                </HStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      </Box>
    );
  }
};

// Connect the Dots Renderer
export const ConnectTheDotsRenderer = ({ shape }) => {
  return (
    <Box
      w="full"
      p={4}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <VStack spacing={4} align="center" w="full" maxW="400px">
        <Text
          fontSize="lg"
          fontWeight="bold"
          color="blue.700"
          textAlign="center"
        >
          Conectează Punctele: {shape.name}
        </Text>
        <Box
          p={8}
          border="2px solid"
          borderColor="gray.300"
          borderRadius="lg"
          bg="white"
          minH="400px"
          minW="400px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          w="full"
        >
          <svg
            width="380"
            height="380"
            viewBox="0 0 300 300"
            style={{
              display: "block",
              margin: "0 auto",
            }}
          >
            {/* Desenează punctele */}
            {shape.points.map((point, index) => (
              <g key={index}>
                {/* Cerc pentru punct - mic și elegant */}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r="2.5"
                  fill="black"
                  stroke="none"
                />
              </g>
            ))}
            {/* Desenează liniile între puncte (opțional - pentru referință) */}
            {shape.showLines &&
              shape.points.map((point, index) => {
                const nextPoint = shape.points[index + 1];
                if (nextPoint) {
                  return (
                    <line
                      key={`line-${index}`}
                      x1={point.x}
                      y1={point.y}
                      x2={nextPoint.x}
                      y2={nextPoint.y}
                      stroke="lightgray"
                      strokeWidth="1"
                      strokeDasharray="3,3"
                    />
                  );
                }
                return null;
              })}
          </svg>
        </Box>
      </VStack>
    </Box>
  );
};

// Letter Tracing Renderer
export const LetterTracingRenderer = ({ letterSet }) => {
  // Check if we have all 26 letters (A-Z) for two-column layout
  const isAllLetters = letterSet.letters.length === 26;

  if (isAllLetters) {
    // Two-column layout for all 26 letters (13 on left, 13 on right)
    return (
      <HStack spacing={8} align="start" w="full" justify="center">
        {/* Left column: letters A-M */}
        <VStack spacing={0} w="full">
          {letterSet.letters.slice(0, 13).map((letter, index) => (
            <Box
              key={index}
              w="full"
              borderBottom="1px solid"
              borderColor="gray.200"
              pb={1}
              mb={1}
            >
              <HStack spacing={4} align="center" justify="center">
                {/* Literele pentru trasare */}
                <HStack spacing={0.5}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Box
                      key={i}
                      minW="40px"
                      h="40px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <LetterTracingDots letter={letter} />
                    </Box>
                  ))}
                </HStack>
              </HStack>
            </Box>
          ))}
        </VStack>

        {/* Right column: letters N-Z */}
        <VStack spacing={0} w="full">
          {letterSet.letters.slice(13, 26).map((letter, index) => (
            <Box
              key={index + 13}
              w="full"
              borderBottom="1px solid"
              borderColor="gray.200"
              pb={1}
              mb={1}
            >
              <HStack spacing={4} align="center" justify="center">
                {/* Literele pentru trasare */}
                <HStack spacing={0}>
                  {Array.from({ length: 5 }, (_, i) => (
                    <Box
                      key={i}
                      minW="30px"
                      h="40px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <LetterTracingDots letter={letter} />
                    </Box>
                  ))}
                </HStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      </HStack>
    );
  }

  // Single column layout for all other letter counts
  return (
    <VStack spacing={0} w="full">
      {letterSet.letters.map((letter, index) => (
        <Box
          key={index}
          w="full"
          borderBottom="1px solid"
          borderColor="gray.200"
          pb={1}
          mb={1}
        >
          <HStack spacing={4} align="center" justify="center">
            {/* Literele pentru trasare */}
            <HStack spacing={3}>
              {Array.from({ length: 5 }, (_, i) => (
                <Box
                  key={i}
                  minW="80px"
                  h="60px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <LetterTracingDots letter={letter} />
                </Box>
              ))}
            </HStack>
          </HStack>
        </Box>
      ))}
    </VStack>
  );
};

// Logic and Thinking Renderers

// Sequence Patterns Renderer
export const SequencePatternsRenderer = ({ sequenceSet }) => {
  // Limit to 5 sequences to fit on one A4 page (single column)
  const limitedPatterns = sequenceSet.patterns.slice(0, 5);

  return (
    <VStack spacing={4} w="full">
      {limitedPatterns.map((pattern, index) => (
        <Box
          key={index}
          w="full"
          border="2px solid"
          borderColor="blue.200"
          borderRadius="lg"
          p={4}
          bg="blue.50"
        >
          <VStack spacing={3}>
            <HStack spacing={1} justify="center" flexWrap="nowrap">
              {pattern.pattern.map((item, itemIndex) => (
                <Box
                  key={itemIndex}
                  fontSize="2xl"
                  p={2}
                  bg="white"
                  borderRadius="md"
                  border="2px solid"
                  borderColor="gray.200"
                  minW="50px"
                  textAlign="center"
                >
                  {item}
                </Box>
              ))}
              <Box
                fontSize="2xl"
                p={2}
                bg="yellow.100"
                borderRadius="md"
                border="2px solid"
                borderColor="yellow.400"
                minW="50px"
                textAlign="center"
                color="yellow.600"
              >
                ?
              </Box>
            </HStack>

            {/* Answer choices - generate diverse options */}
            <HStack spacing={2} justify="center" flexWrap="wrap">
              {(() => {
                // Generate diverse answer options based on pattern type
                const correctAnswer = pattern.answer;

                // Define all possible options by category
                const allOptions = {
                  colors: ["🔴", "🔵", "🟡", "🟢", "🟣", "🟠"],
                  shapes: ["🔺", "🔸", "⬜", "🔶", "🔷", "⭐"],
                  animals: ["🐱", "🐶", "🐰", "🐸", "🐭", "🐹"],
                  fruits: ["🍎", "🍌", "🍊", "🍇", "🍓", "🍒"],
                  objects: ["🚗", "🚕", "🚙", "🚌", "🚑", "🚒"],
                  hearts: ["❤️", "💙", "💚", "🧡", "💛", "💜"],
                  stars: ["⭐", "🌟", "✨", "💫", "⭐", "🌟"],
                };

                // Determine category based on pattern content
                let category = "colors"; // default
                if (
                  pattern.pattern.some((item) =>
                    ["🔺", "🔸", "⬜", "🔶", "🔷"].includes(item)
                  )
                ) {
                  category = "shapes";
                } else if (
                  pattern.pattern.some((item) =>
                    ["🐱", "🐶", "🐰", "🐸", "🐭", "🐹"].includes(item)
                  )
                ) {
                  category = "animals";
                } else if (
                  pattern.pattern.some((item) =>
                    ["🍎", "🍌", "🍊", "🍇", "🍓", "🍒"].includes(item)
                  )
                ) {
                  category = "fruits";
                } else if (
                  pattern.pattern.some((item) =>
                    ["🚗", "🚕", "🚙", "🚌", "🚑", "🚒"].includes(item)
                  )
                ) {
                  category = "objects";
                } else if (
                  pattern.pattern.some((item) =>
                    ["❤️", "💙", "💚", "🧡", "💛", "💜"].includes(item)
                  )
                ) {
                  category = "hearts";
                } else if (
                  pattern.pattern.some((item) =>
                    ["⭐", "🌟", "✨", "💫"].includes(item)
                  )
                ) {
                  category = "stars";
                }

                // Extract colors/elements from the pattern for answer options
                const patternElements = [...new Set(pattern.pattern)]; // Get unique elements from pattern

                // For colors, use the actual colors from the pattern
                if (category === "colors") {
                  // Use colors from the pattern + one additional color if needed
                  const patternColors = patternElements;
                  const additionalColors = ["🟡", "🟢", "🟣", "🟠"].filter(
                    (color) => !patternColors.includes(color)
                  );

                  let answerOptions = [...patternColors];
                  if (answerOptions.length === 1) {
                    // If only one color in pattern, add one more color
                    answerOptions.push(additionalColors[0] || "🟡");
                  }

                  // Determine difficulty level based on pattern complexity
                  const uniqueColorsCount = patternColors.length;
                  let numberOfWrongOptions;

                  if (uniqueColorsCount <= 2) {
                    // Easy: 2 or fewer unique colors = 2 total answers (1 correct + 1 wrong)
                    numberOfWrongOptions = 1;
                  } else if (uniqueColorsCount <= 3) {
                    // Medium: 3 unique colors = 3 total answers (1 correct + 2 wrong)
                    numberOfWrongOptions = 2;
                  } else {
                    // Hard: 4+ unique colors = 4 total answers (1 correct + 3 wrong)
                    numberOfWrongOptions = 3;
                  }

                  // Remove the correct answer and get wrong options
                  const wrongOptions = answerOptions.filter(
                    (option) => option !== correctAnswer
                  );
                  const selectedWrong = wrongOptions.slice(
                    0,
                    numberOfWrongOptions
                  );

                  // If not enough wrong options, add from additional colors
                  if (selectedWrong.length < numberOfWrongOptions) {
                    const needed = numberOfWrongOptions - selectedWrong.length;
                    const extraOptions = additionalColors.slice(0, needed);
                    selectedWrong.push(...extraOptions);
                  }

                  // Combine correct answer with wrong options and shuffle
                  const allAnswers = [correctAnswer, ...selectedWrong];
                  return allAnswers.sort(() => Math.random() - 0.5);
                }

                // For other categories, use elements from the pattern
                let categoryOptions = allOptions[category] || allOptions.colors;

                // Try to use elements from the pattern first
                const patternBasedOptions = categoryOptions.filter((option) =>
                  patternElements.includes(option)
                );

                let finalOptions =
                  patternBasedOptions.length >= 2
                    ? patternBasedOptions
                    : categoryOptions;

                // Determine difficulty level based on pattern complexity
                const uniqueElementsCount = patternElements.length;
                let numberOfWrongOptions;

                if (uniqueElementsCount <= 2) {
                  // Easy: 2 or fewer unique elements = 2 total answers (1 correct + 1 wrong)
                  numberOfWrongOptions = 1;
                } else if (uniqueElementsCount <= 3) {
                  // Medium: 3 unique elements = 3 total answers (1 correct + 2 wrong)
                  numberOfWrongOptions = 2;
                } else {
                  // Hard: 4+ unique elements = 4 total answers (1 correct + 3 wrong)
                  numberOfWrongOptions = 3;
                }

                // Remove the correct answer and get wrong options
                const wrongOptions = finalOptions.filter(
                  (option) => option !== correctAnswer
                );
                const selectedWrong = wrongOptions.slice(
                  0,
                  numberOfWrongOptions
                );

                // Combine correct answer with wrong options and shuffle
                const allAnswers = [correctAnswer, ...selectedWrong];
                return allAnswers.sort(() => Math.random() - 0.5);
              })().map((option, optionIndex) => (
                <Box
                  key={optionIndex}
                  fontSize="xl"
                  p={2}
                  bg="transparent"
                  borderRadius="md"
                  minW="40px"
                  textAlign="center"
                  cursor="pointer"
                  _hover={{
                    bg: "gray.100",
                  }}
                >
                  {option}
                </Box>
              ))}
            </HStack>
          </VStack>
        </Box>
      ))}
    </VStack>
  );
};

// Shape Matching Renderer
export const ShapeMatchingRenderer = ({ shapeSet }) => {
  return (
    <VStack spacing={6} w="full">
      {shapeSet.shapes.map((shape, index) => (
        <Box
          key={index}
          w="full"
          border="2px solid"
          borderColor="purple.200"
          borderRadius="lg"
          p={6}
          bg="purple.50"
        >
          <VStack spacing={4}>
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="purple.800"
              textAlign="center"
            >
              {shape.title}
            </Text>

            <HStack spacing={4} justify="center" flexWrap="wrap">
              {shape.shapes.map((shapeItem, shapeIndex) => (
                <Box
                  key={shapeIndex}
                  fontSize="3xl"
                  p={4}
                  bg="white"
                  borderRadius="md"
                  border="2px solid"
                  borderColor="gray.200"
                  minW="80px"
                  textAlign="center"
                >
                  {shapeItem}
                </Box>
              ))}
            </HStack>

            <HStack spacing={4} justify="center" flexWrap="wrap">
              {shape.objects.map((object, objectIndex) => (
                <Button
                  key={objectIndex}
                  size="lg"
                  fontSize="2xl"
                  variant="outline"
                  colorScheme="purple"
                  minW="80px"
                >
                  {object}
                </Button>
              ))}
            </HStack>
          </VStack>
        </Box>
      ))}
    </VStack>
  );
};

// Color Recognition Renderer
export const ColorRecognitionRenderer = ({ colorSet }) => {
  return (
    <VStack spacing={6} w="full">
      {colorSet.colors.map((color, index) => (
        <Box
          key={index}
          w="full"
          border="2px solid"
          borderColor="orange.200"
          borderRadius="lg"
          p={6}
          bg="orange.50"
        >
          <VStack spacing={4}>
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="orange.800"
              textAlign="center"
            >
              {color.title}
            </Text>

            <HStack spacing={2} justify="center" flexWrap="wrap">
              {color.objects.map((object, objectIndex) => (
                <Button
                  key={objectIndex}
                  size="lg"
                  fontSize="2xl"
                  variant={object === color.color ? "solid" : "outline"}
                  colorScheme={object === color.color ? "green" : "gray"}
                  minW="70px"
                >
                  {object}
                </Button>
              ))}
            </HStack>
          </VStack>
        </Box>
      ))}
    </VStack>
  );
};

// Classification Renderer
export const ClassificationRenderer = ({ classificationSet }) => {
  return (
    <VStack spacing={6} w="full">
      {classificationSet.classifications.map((classification, index) => (
        <Box
          key={index}
          w="full"
          border="2px solid"
          borderColor="green.200"
          borderRadius="lg"
          p={6}
          bg="green.50"
        >
          <VStack spacing={4}>
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="green.800"
              textAlign="center"
            >
              {classification.title}
            </Text>

            <Badge colorScheme="green" size="lg" fontSize="md" p={2}>
              Categoria: {classification.category}
            </Badge>

            <HStack spacing={2} justify="center" flexWrap="wrap">
              {classification.items.map((item, itemIndex) => (
                <Button
                  key={itemIndex}
                  size="lg"
                  fontSize="2xl"
                  variant="outline"
                  colorScheme="green"
                  minW="70px"
                >
                  {item}
                </Button>
              ))}
            </HStack>
          </VStack>
        </Box>
      ))}
    </VStack>
  );
};

// Simple Maze Renderer
export const SimpleMazeRenderer = ({ mazeSet }) => {
  // Function to generate maze grid with random obstacles
  const generateMazeGrid = (path, startEmoji, endEmoji) => {
    // Much larger 8x7 grid with obstacles
    const rows = 7;
    const cols = 8;
    const grid = Array(rows)
      .fill(null)
      .map(() => Array(cols).fill(" "));

    // Place start at top-left corner
    grid[0][0] = startEmoji;

    // Place end at bottom-right corner
    grid[rows - 1][cols - 1] = endEmoji;

    // Generate random obstacles while ensuring paths around start and end
    const generateRandomObstacles = () => {
      const obstacles = [];
      const totalCells = rows * cols;
      const numObstacles = Math.floor(totalCells * 0.35); // 35% of cells are obstacles

      // Define protected areas around start and end - allow more flexibility
      const protectedCells = new Set();

      // Protect only the start and end positions themselves
      protectedCells.add(`${0}-${0}`); // start position only
      protectedCells.add(`${rows - 1}-${cols - 1}`); // end position only

      // Protect only one adjacent cell for start and end to ensure at least one exit/entry
      // For start: protect the right cell (0,1) to allow movement right
      protectedCells.add(`${0}-${1}`); // right of start - main exit

      // For end: protect the left cell (6,6) to allow movement from left
      protectedCells.add(`${rows - 1}-${cols - 2}`); // left of end - main entry

      // Add minimal protected paths to ensure basic connectivity
      const randomPathCells = [
        `${0}-${2}`, // top row path
        `${1}-${1}`, // second row path
        `${2}-${2}`, // middle path
        `${3}-${3}`, // center path
        `${4}-${4}`, // lower middle path
        `${5}-${5}`, // bottom area path
        `${6}-${5}`, // bottom path to end
      ];

      randomPathCells.forEach((cell) => protectedCells.add(cell));

      // Generate random obstacles
      let attempts = 0;
      while (obstacles.length < numObstacles && attempts < 1000) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * cols);
        const cellKey = `${row}-${col}`;

        // Skip if cell is protected, already has obstacle, or is start/end
        if (!protectedCells.has(cellKey) && grid[row][col] === " ") {
          obstacles.push({ row, col });
        }
        attempts++;
      }

      return obstacles;
    };

    // Generate random obstacles for this maze
    const obstacles = generateRandomObstacles();

    // Place obstacles
    obstacles.forEach(({ row, col }) => {
      if (grid[row][col] === " ") {
        grid[row][col] = "■";
      }
    });

    return grid;
  };

  return (
    <VStack spacing={6} w="full">
      {mazeSet.mazes.map((maze, index) => {
        const mazeGrid = generateMazeGrid(maze.path, maze.start, maze.end);

        return (
          <Box
            key={index}
            w="full"
            border="2px solid"
            borderColor="teal.200"
            borderRadius="lg"
            p={6}
            bg="teal.50"
          >
            <VStack spacing={4}>
              <Text
                fontSize="lg"
                fontWeight="bold"
                color="teal.800"
                textAlign="center"
              >
                {maze.title}
              </Text>

              <Box
                w="500px"
                h="400px"
                bg="white"
                border="2px solid"
                borderColor="gray.300"
                borderRadius="md"
                p={8}
                position="relative"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                {/* Maze Grid */}
                <Box
                  display="grid"
                  gridTemplateColumns="repeat(8, 1fr)"
                  gridTemplateRows="repeat(7, 1fr)"
                  gap="3px"
                  w="450px"
                  h="350px"
                >
                  {mazeGrid.map((row, rowIndex) =>
                    row.map((cell, colIndex) => (
                      <Box
                        key={`${rowIndex}-${colIndex}`}
                        w="100%"
                        h="100%"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg={
                          cell === " "
                            ? "gray.100"
                            : cell === "■"
                            ? "black"
                            : cell === maze.start || cell === maze.end
                            ? "yellow.100"
                            : "green.100"
                        }
                        border="1px solid"
                        borderColor="gray.300"
                        borderRadius="sm"
                        fontSize="xl"
                        fontWeight="bold"
                        color={
                          cell === "■"
                            ? "white"
                            : cell === maze.start || cell === maze.end
                            ? "black"
                            : cell === " "
                            ? "gray.400"
                            : "green.700"
                        }
                      >
                        {cell === " " ? "" : cell}
                      </Box>
                    ))
                  )}
                </Box>
              </Box>
            </VStack>
          </Box>
        );
      })}
    </VStack>
  );
};

// Memory Game Renderer
export const MemoryGameRenderer = ({ memorySet }) => {
  return (
    <VStack spacing={6} w="full">
      {memorySet.memories.map((memory, index) => (
        <Box
          key={index}
          w="full"
          border="2px solid"
          borderColor="pink.200"
          borderRadius="lg"
          p={6}
          bg="pink.50"
        >
          <VStack spacing={4}>
            <Text
              fontSize="lg"
              fontWeight="bold"
              color="pink.800"
              textAlign="center"
            >
              {memory.title}
            </Text>

            <HStack spacing={4} justify="center" flexWrap="wrap">
              {memory.pairs.map((pair, pairIndex) => (
                <VStack key={pairIndex} spacing={2}>
                  <Button
                    size="lg"
                    fontSize="2xl"
                    variant="outline"
                    colorScheme="pink"
                    minW="80px"
                  >
                    {pair.emoji}
                  </Button>
                  <Text fontSize="sm" color="gray.600">
                    ←→
                  </Text>
                  <Button
                    size="lg"
                    fontSize="2xl"
                    variant="outline"
                    colorScheme="pink"
                    minW="80px"
                  >
                    {pair.match}
                  </Button>
                </VStack>
              ))}
            </HStack>
          </VStack>
        </Box>
      ))}
    </VStack>
  );
};

// Geometric Shapes Renderer
export const GeometricShapesRenderer = ({ geometricSet }) => {
  // Defensive programming - handle undefined geometricSet
  if (
    !geometricSet ||
    !geometricSet.colorKey ||
    !geometricSet.shapesToColor ||
    !geometricSet.sequences
  ) {
    return (
      <Box p={8} textAlign="center">
        <Text color="red.500" fontSize="lg">
          Eroare: Datele pentru fișa geometrică nu sunt disponibile
        </Text>
      </Box>
    );
  }

  const getShapeSize = (size) => {
    switch (size) {
      case "small":
        return "60px";
      case "medium":
        return "80px";
      case "large":
        return "100px";
      default:
        return "80px";
    }
  };

  const getShapeEmoji = (shapeName) => {
    switch (shapeName) {
      case "cerc":
        return "⭕";
      case "triunghi":
        return "🔺";
      case "pătrat":
        return "⬜";
      case "dreptunghi":
        return "⬜"; // Folosim pătrat pentru dreptunghi pentru claritate
      case "romb":
        return "♦️";
      case "oval":
        return "⭕"; // Folosim cerc pentru oval pentru claritate
      case "hexagon":
        return "⬡";
      default:
        return "⬜";
    }
  };

  const getOutlineShape = (shapeName) => {
    switch (shapeName) {
      case "cerc":
        return "○";
      case "triunghi":
        return "△";
      case "pătrat":
        return "□";
      case "dreptunghi":
        return "▭";
      case "romb":
        return "◇";
      case "oval":
        return "○"; // Folosim cerc pentru oval pentru claritate
      case "hexagon":
        return "⬡";
      default:
        return "□";
    }
  };

  const getOutlineShapeFromEmoji = (emoji) => {
    // Convert colored emoji to outline shape
    if (emoji.includes("🟡") || emoji.includes("⭕")) return "○"; // cerc
    if (emoji.includes("🔴") || emoji.includes("🔺")) return "△"; // triunghi
    if (emoji.includes("🔵") || emoji.includes("⬜")) return "□"; // pătrat
    if (emoji.includes("🟢")) return "▭"; // dreptunghi
    if (emoji.includes("🟣") || emoji.includes("♦️")) return "◇"; // romb
    if (emoji.includes("🟠")) return "○"; // oval (folosim cerc)
    if (emoji.includes("🩷") || emoji.includes("⬡")) return "⬡"; // hexagon
    return "□"; // default
  };

  const getSVGShape = (shapeName, size) => {
    const strokeWidth = Math.max(2, size / 15); // Proportional stroke width

    switch (shapeName) {
      case "cerc":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="black"
              strokeWidth={strokeWidth}
            />
          </svg>
        );
      case "triunghi":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <polygon
              points="50,10 90,80 10,80"
              fill="none"
              stroke="black"
              strokeWidth={strokeWidth}
            />
          </svg>
        );
      case "pătrat":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <rect
              x="10"
              y="10"
              width="80"
              height="80"
              fill="none"
              stroke="black"
              strokeWidth={strokeWidth}
            />
          </svg>
        );
      case "dreptunghi":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <rect
              x="5"
              y="20"
              width="90"
              height="60"
              fill="none"
              stroke="black"
              strokeWidth={strokeWidth}
            />
          </svg>
        );
      case "romb":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <polygon
              points="50,10 80,50 50,90 20,50"
              fill="none"
              stroke="black"
              strokeWidth={strokeWidth}
            />
          </svg>
        );
      case "oval":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <ellipse
              cx="50"
              cy="50"
              rx="45"
              ry="30"
              fill="none"
              stroke="black"
              strokeWidth={strokeWidth}
            />
          </svg>
        );
      case "hexagon":
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <polygon
              points="50,5 85,25 85,75 50,95 15,75 15,25"
              fill="none"
              stroke="black"
              strokeWidth={strokeWidth}
            />
          </svg>
        );
      default:
        return (
          <svg width={size} height={size} viewBox="0 0 100 100">
            <rect
              x="10"
              y="10"
              width="80"
              height="80"
              fill="none"
              stroke="black"
              strokeWidth={strokeWidth}
            />
          </svg>
        );
    }
  };

  return (
    <VStack spacing={8} w="full" p={4}>
      {/* Section 1: Color Key */}
      <Box w="full">
        <Text
          fontSize="lg"
          fontWeight="bold"
          color="blue.800"
          mb={4}
          textAlign="center"
        >
          1. Colorează figurile geometrice cu culorile indicate:
        </Text>

        {/* Color Key - Interactive shapes to color */}
        <HStack spacing={6} justify="center" mb={6} flexWrap="wrap">
          {geometricSet.colorKey.map((colorItem, index) => (
            <HStack key={index} spacing={3} align="center">
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  border: "2px dashed #ccc",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = "#666";
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = "#ccc";
                  e.target.style.transform = "scale(1)";
                }}
              >
                {getSVGShape(colorItem.shapeName, 60)}
              </div>
              <Text fontSize="lg" fontWeight="600" color="black">
                {colorItem.color}
              </Text>
            </HStack>
          ))}
        </HStack>

        {/* Shapes to Color - Completely free positioning */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "600px",
            padding: "32px",
            backgroundColor: "white",
            overflow: "hidden",
            border: "none",
            outline: "none",
            boxShadow: "none",
          }}
        >
          {geometricSet.shapesToColor.map((shapeItem, index) => {
            // Generate random positions and sizes
            const randomX = Math.random() * 85; // 0-85% of container width
            const randomY = Math.random() * 85; // 0-85% of container height
            const randomSize = Math.random() * 4 + 3; // 3-7 (font size multiplier)

            return (
              <div
                key={index}
                style={{
                  position: "absolute",
                  left: `${randomX}%`,
                  top: `${randomY}%`,
                  cursor: "pointer",
                  userSelect: "none",
                  transition: "transform 0.2s ease",
                  zIndex: 1,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
              >
                {getSVGShape(shapeItem.name, randomSize * 20)}
              </div>
            );
          })}
        </div>
      </Box>
    </VStack>
  );
};
