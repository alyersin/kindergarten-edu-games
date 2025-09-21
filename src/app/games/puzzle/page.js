"use client";

import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Button,
  VStack,
  HStack,
  Text,
  useToast,
  Progress,
  Icon,
  Image,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { shuffleArray } from "../../../utils/array";
import { useRouter } from "next/navigation";
import { FaHome, FaRedo, FaPuzzlePiece } from "react-icons/fa";
import GameHeader from "../../../components/GameHeader";
import GameInstructions from "../../../components/game/GameInstructions";
import { getOptimalColors } from "../../../utils/colors";
import puzzleJson from "../../../data/puzzleData.json";

const puzzleData = puzzleJson.puzzles;

export default function PuzzleGame() {
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [puzzle, setPuzzle] = useState(null);
  const [pieces, setPieces] = useState([]);
  const [grid, setGrid] = useState([]);
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [puzzleCompleted, setPuzzleCompleted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showWarningMessage, setShowWarningMessage] = useState(false);
  const [showLevelCompletedMessage, setShowLevelCompletedMessage] =
    useState(false);
  const [messageText, setMessageText] = useState("");
  const toast = useToast();
  const router = useRouter();

  const initializeGame = useCallback(() => {
    setCurrentPuzzle(0);
    setScore(0);
    setGameCompleted(false);
    startPuzzle(0);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const startPuzzle = (puzzleIndex) => {
    const selectedPuzzle = puzzleData[puzzleIndex];
    setPuzzle(selectedPuzzle);

    // Shuffle pieces
    const shuffledPieces = shuffleArray(selectedPuzzle.pieces);
    setPieces(shuffledPieces);

    // Initialize empty grid
    const newGrid = Array(selectedPuzzle.gridSize)
      .fill(null)
      .map(() => Array(selectedPuzzle.gridSize).fill(null));
    setGrid(newGrid);
    setPuzzleCompleted(false);
  };

  const handleDragStart = (e, piece) => {
    setDraggedPiece(piece);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e, gridX, gridY) => {
    e.preventDefault();

    if (!draggedPiece) return;

    // Check if position is empty
    if (grid[gridY][gridX] !== null) {
      setMessageText("Încearcă o altă poziție.");
      setShowWarningMessage(true);
      setTimeout(() => setShowWarningMessage(false), 2000);
      return;
    }

    // Update grid
    const newGrid = [...grid];
    newGrid[gridY][gridX] = draggedPiece;
    setGrid(newGrid);

    // Remove piece from pieces array
    const newPieces = pieces.filter((p) => p.id !== draggedPiece.id);
    setPieces(newPieces);

    // Check if correct position
    const isCorrect =
      gridX === draggedPiece.correctPosition.x &&
      gridY === draggedPiece.correctPosition.y;

    if (isCorrect) {
      setMessageText(`Piesa ${draggedPiece.emoji} este în poziția corectă!`);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 2000);
    } else {
      setMessageText("Piesa nu este în poziția corectă, dar poți continua!");
      setShowWarningMessage(true);
      setTimeout(() => setShowWarningMessage(false), 2000);
    }

    setDraggedPiece(null);

    // Check if puzzle is complete
    if (newPieces.length === 0) {
      checkPuzzleCompletion(newGrid);
    }
  };

  const checkPuzzleCompletion = (currentGrid) => {
    let correctPieces = 0;
    let totalPieces = 0;

    puzzle.pieces.forEach((piece) => {
      const gridPiece =
        currentGrid[piece.correctPosition.y]?.[piece.correctPosition.x];
      if (gridPiece && gridPiece.id === piece.id) {
        correctPieces++;
      }
      totalPieces++;
    });

    if (correctPieces === totalPieces) {
      setPuzzleCompleted(true);
      setScore(score + 1);

      setMessageText(`Ai terminat puzzle-ul ${puzzle.name}!`);
      setShowLevelCompletedMessage(true);
      setTimeout(() => setShowLevelCompletedMessage(false), 3000);

      // Move to next puzzle after delay
      setTimeout(() => {
        if (currentPuzzle + 1 < puzzleData.length) {
          setCurrentPuzzle(currentPuzzle + 1);
          startPuzzle(currentPuzzle + 1);
        } else {
          setGameCompleted(true);
          setMessageText("Ai terminat toate puzzle-urile!");
          setShowLevelCompletedMessage(true);
          setTimeout(() => setShowLevelCompletedMessage(false), 4000);
        }
      }, 2000);
    }
  };

  const resetPuzzle = () => {
    startPuzzle(currentPuzzle);
  };

  const colors = getOptimalColors(puzzle?.background);

  return (
    <Box
      minH="100vh"
      bg={
        puzzle?.background ||
        "linear-gradient(135deg, #FFE4E1 0%, #FFB6C1 50%, #FFC0CB 100%)"
      }
      py={6}
      position="relative"
      overflow="hidden"
    >
      {/* Decorative background elements */}
      <Box
        position="absolute"
        top="10%"
        left="5%"
        fontSize="4xl"
        opacity="0.1"
        transform="rotate(-15deg)"
      >
        🧩
      </Box>
      <Box
        position="absolute"
        top="20%"
        right="10%"
        fontSize="3xl"
        opacity="0.1"
        transform="rotate(20deg)"
      >
        🎯
      </Box>
      <Box
        position="absolute"
        bottom="15%"
        left="8%"
        fontSize="5xl"
        opacity="0.1"
        transform="rotate(10deg)"
      >
        ✨
      </Box>

      <Container maxW="6xl" position="relative" zIndex={1}>
        <VStack spacing={8}>
          <GameHeader
            title="🧩 Puzzle-uri Simple 🧩"
            levelName={`${currentPuzzle + 1}`}
            description={puzzle?.name}
            onHomeClick={() => router.push("/")}
            onRestartClick={initializeGame}
            textColor={colors.textColor}
          />

          {/* Progress */}
          <Box w="full" maxW="md">
            <Text mb={2} fontWeight="bold" color="pink.600">
              Puzzle {currentPuzzle + 1} din {puzzleData.length} | Scor: {score}
            </Text>
            <Progress
              value={((currentPuzzle + 1) / puzzleData.length) * 100}
              colorScheme="pink"
              size="lg"
              borderRadius="full"
            />
          </Box>

          {!gameCompleted && puzzle && (
            <>
              {/* Puzzle Info */}
              <Box
                bg="white"
                p={8}
                borderRadius="3xl"
                border="4px solid"
                borderColor="pink.400"
                textAlign="center"
                boxShadow="2xl"
                position="relative"
                overflow="hidden"
              >
                {/* Decorative corner elements */}
                <Box
                  position="absolute"
                  top="-10px"
                  left="-10px"
                  w="40px"
                  h="40px"
                  bg="pink.200"
                  borderRadius="full"
                  opacity="0.7"
                />
                <Box
                  position="absolute"
                  top="-10px"
                  right="-10px"
                  w="40px"
                  h="40px"
                  bg="pink.200"
                  borderRadius="full"
                  opacity="0.7"
                />
                <Box
                  position="absolute"
                  bottom="-10px"
                  left="-10px"
                  w="40px"
                  h="40px"
                  bg="pink.200"
                  borderRadius="full"
                  opacity="0.7"
                />
                <Box
                  position="absolute"
                  bottom="-10px"
                  right="-10px"
                  w="40px"
                  h="40px"
                  bg="pink.200"
                  borderRadius="full"
                  opacity="0.7"
                />

                <Text
                  fontSize="8xl"
                  mb={4}
                  filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.1))"
                >
                  {puzzle.image}
                </Text>
                <Heading
                  size="xl"
                  color="pink.700"
                  mb={3}
                  textShadow="1px 1px 2px rgba(0,0,0,0.1)"
                >
                  {puzzle.name}
                </Heading>
                <Text color="pink.600" fontSize="lg" fontWeight="semibold">
                  Trage piesele în pozițiile corecte! 🎯
                </Text>
              </Box>

              {/* Success Message */}
              {showSuccessMessage && (
                <Box
                  position="fixed"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  zIndex="1000"
                  bg="green.500"
                  color="white"
                  p={6}
                  borderRadius="xl"
                  boxShadow="2xl"
                  textAlign="center"
                  minW="300px"
                >
                  <VStack spacing={3}>
                    <Text fontSize="6xl">🎉</Text>
                    <Text fontSize="2xl" fontWeight="bold">
                      Corect!
                    </Text>
                    <Text fontSize="lg">{messageText}</Text>
                  </VStack>
                </Box>
              )}

              {/* Warning Message */}
              {showWarningMessage && (
                <Box
                  position="fixed"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  zIndex="1000"
                  bg="orange.500"
                  color="white"
                  p={6}
                  borderRadius="xl"
                  boxShadow="2xl"
                  textAlign="center"
                  minW="300px"
                >
                  <VStack spacing={3}>
                    <Text fontSize="6xl">😊</Text>
                    <Text fontSize="2xl" fontWeight="bold">
                      Aproape!
                    </Text>
                    <Text fontSize="lg">{messageText}</Text>
                  </VStack>
                </Box>
              )}

              {/* Level Completed Message */}
              {showLevelCompletedMessage && (
                <Box
                  position="fixed"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  zIndex="1000"
                  bg="blue.500"
                  color="white"
                  p={6}
                  borderRadius="xl"
                  boxShadow="2xl"
                  textAlign="center"
                  minW="300px"
                >
                  <VStack spacing={3}>
                    <Text fontSize="6xl">🏆</Text>
                    <Text fontSize="2xl" fontWeight="bold">
                      Felicitări!
                    </Text>
                    <Text fontSize="lg">{messageText}</Text>
                  </VStack>
                </Box>
              )}

              <HStack spacing={8} align="start" w="full" justify="center">
                {/* Puzzle Grid */}
                <VStack spacing={6}>
                  <Box
                    bg="white"
                    px={6}
                    py={3}
                    borderRadius="full"
                    border="3px solid"
                    borderColor="pink.400"
                    boxShadow="lg"
                  >
                    <Heading size="md" color="pink.700" textAlign="center">
                      🎯 Puzzle Grid
                    </Heading>
                  </Box>
                  <Box
                    border="6px solid"
                    borderColor="pink.500"
                    borderRadius="2xl"
                    p={6}
                    bg="white"
                    boxShadow="2xl"
                    position="relative"
                  >
                    {/* Wooden texture effect */}
                    <Box
                      position="absolute"
                      top="0"
                      left="0"
                      right="0"
                      bottom="0"
                      bg="linear-gradient(45deg, #DEB887 0%, #F4A460 50%, #DEB887 100%)"
                      opacity="0.1"
                      borderRadius="xl"
                    />
                    <SimpleGrid columns={puzzle.gridSize} spacing={2}>
                      {Array(puzzle.gridSize)
                        .fill(null)
                        .map((_, y) =>
                          Array(puzzle.gridSize)
                            .fill(null)
                            .map((_, x) => (
                              <Box
                                key={`${x}-${y}`}
                                w="80px"
                                h="80px"
                                border="3px dashed"
                                borderColor={
                                  grid[y]?.[x] ? "green.400" : "pink.300"
                                }
                                borderRadius="xl"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                fontSize="3xl"
                                bg={grid[y]?.[x] ? "green.50" : "gray.50"}
                                onDragOver={handleDragOver}
                                onDrop={(e) => handleDrop(e, x, y)}
                                cursor="pointer"
                                position="relative"
                                transition="all 0.3s ease"
                                _hover={{
                                  borderColor: grid[y]?.[x]
                                    ? "green.500"
                                    : "pink.500",
                                  bg: grid[y]?.[x] ? "green.100" : "pink.50",
                                  transform: "scale(1.05)",
                                  boxShadow: "lg",
                                }}
                                _active={{
                                  transform: "scale(0.95)",
                                }}
                              >
                                {/* Afișează imaginea completă ca fundal dacă nu există o piesă plasată */}
                                {!grid[y]?.[x] && puzzle.fullImage && (
                                  <Text
                                    opacity="0.3"
                                    fontSize="2xl"
                                    filter="blur(1px)"
                                  >
                                    {puzzle.fullImage[y]?.[x]}
                                  </Text>
                                )}
                                {/* Afișează piesa plasată */}
                                {grid[y]?.[x]?.emoji}
                                {grid[y]?.[x] && (
                                  <Box
                                    position="absolute"
                                    top="-5px"
                                    right="-5px"
                                    w="20px"
                                    h="20px"
                                    bg="green.400"
                                    borderRadius="full"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    fontSize="xs"
                                    color="white"
                                    fontWeight="bold"
                                  >
                                    ✓
                                  </Box>
                                )}
                              </Box>
                            ))
                        )}
                    </SimpleGrid>
                  </Box>
                </VStack>

                {/* Puzzle Pieces */}
                <VStack spacing={6}>
                  <Box
                    bg="white"
                    px={6}
                    py={3}
                    borderRadius="full"
                    border="3px solid"
                    borderColor="pink.400"
                    boxShadow="lg"
                  >
                    <Heading size="md" color="pink.700" textAlign="center">
                      🧩 Piese de Puzzle
                    </Heading>
                  </Box>
                  <Box
                    bg="white"
                    p={6}
                    borderRadius="2xl"
                    border="4px solid"
                    borderColor="pink.400"
                    boxShadow="xl"
                    minH="400px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {pieces.length > 0 ? (
                      <SimpleGrid columns={3} spacing={3}>
                        {pieces.map((piece) => (
                          <Box
                            key={piece.id}
                            w="80px"
                            h="80px"
                            bg="linear-gradient(135deg, #FFB6C1 0%, #FFC0CB 100%)"
                            border="4px solid"
                            borderColor="pink.500"
                            borderRadius="xl"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                            fontSize="3xl"
                            cursor="grab"
                            draggable
                            onDragStart={(e) => handleDragStart(e, piece)}
                            position="relative"
                            transition="all 0.3s ease"
                            _hover={{
                              bg: "linear-gradient(135deg, #FFA0B4 0%, #FFB0C0 100%)",
                              transform: "scale(1.1) rotate(5deg)",
                              boxShadow: "xl",
                              borderColor: "pink.600",
                            }}
                            _active={{
                              cursor: "grabbing",
                              transform: "scale(0.95) rotate(-5deg)",
                            }}
                            boxShadow="lg"
                          >
                            {piece.emoji}
                            {/* Puzzle piece notch effect */}
                            <Box
                              position="absolute"
                              top="10px"
                              right="10px"
                              w="15px"
                              h="15px"
                              bg="pink.300"
                              borderRadius="full"
                              opacity="0.6"
                            />
                            <Box
                              position="absolute"
                              bottom="10px"
                              left="10px"
                              w="15px"
                              h="15px"
                              bg="pink.300"
                              borderRadius="full"
                              opacity="0.6"
                            />
                          </Box>
                        ))}
                      </SimpleGrid>
                    ) : (
                      <VStack spacing={4}>
                        <Text fontSize="6xl">🎉</Text>
                        <Text
                          color="green.600"
                          fontWeight="bold"
                          textAlign="center"
                          fontSize="xl"
                        >
                          Toate piesele au fost plasate!
                        </Text>
                        <Text color="green.500" textAlign="center">
                          Excelent lucru! 🌟
                        </Text>
                      </VStack>
                    )}
                  </Box>
                </VStack>
              </HStack>

              {/* Reset Button */}
              <Button
                onClick={resetPuzzle}
                colorScheme="pink"
                size="xl"
                leftIcon={<Icon as={FaPuzzlePiece} />}
                borderRadius="full"
                px={8}
                py={6}
                fontSize="lg"
                fontWeight="bold"
                boxShadow="xl"
                _hover={{
                  transform: "translateY(-3px)",
                  boxShadow: "2xl",
                }}
                transition="all 0.3s ease"
              >
                🔄 Resetează Puzzle-ul
              </Button>

              {/* Puzzle Completed Message */}
              {puzzleCompleted && (
                <Box
                  bg="green.100"
                  p={6}
                  borderRadius="xl"
                  border="3px solid"
                  borderColor="green.400"
                  textAlign="center"
                >
                  <Text fontSize="xl" fontWeight="bold" color="green.600">
                    🎉 Puzzle completat! Următorul puzzle începe în curând... 🎉
                  </Text>
                </Box>
              )}
            </>
          )}

          {/* Game Completed Message */}
          {gameCompleted && (
            <Box
              bg="green.100"
              p={8}
              borderRadius="3xl"
              border="4px solid"
              borderColor="green.400"
              textAlign="center"
              maxW="2xl"
              w="full"
            >
              <Text fontSize="6xl" mb={4}>
                🏆
              </Text>
              <Heading size="xl" color="green.600" mb={4}>
                Felicitări! Ai terminat toate puzzle-urile!
              </Heading>
              <Text fontSize="2xl" fontWeight="bold" color="green.600" mb={6}>
                Scor final: {score} din {puzzleData.length} puzzle-uri
              </Text>
              <Text fontSize="lg" color="green.600" mb={8}>
                {score === puzzleData.length
                  ? "Perfect! Toate puzzle-urile au fost completate!"
                  : score >= puzzleData.length * 0.8
                  ? "Foarte bine! Ești foarte bun la puzzle-uri!"
                  : score >= puzzleData.length * 0.6
                  ? "Bun! Continuă să exersezi!"
                  : "Încearcă din nou să îmbunătățești!"}
              </Text>
              <HStack justify="center" spacing={6}>
                <Button
                  onClick={initializeGame}
                  colorScheme="pink"
                  size="xl"
                  fontSize="xl"
                  h="80px"
                  px={8}
                >
                  Joacă din nou
                </Button>
                <Button
                  onClick={() => router.push("/")}
                  colorScheme="blue"
                  size="xl"
                  fontSize="xl"
                  h="80px"
                  px={8}
                >
                  Înapoi la meniu
                </Button>
              </HStack>
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
