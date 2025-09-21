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
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { shuffleArray } from "../../../utils/array";
import { useRouter } from "next/navigation";
import GameHeader from "../../../components/GameHeader";
import GameInstructions from "../../../components/game/GameInstructions";
import { getOptimalColors } from "../../../utils/colors";
import { FaHome, FaRedo } from "react-icons/fa";
import numberData from "../../../data/numberLevels.json";

const numberLevels = numberData.levels;

export default function NumberMatching() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [gameData, setGameData] = useState([]);
  const [numbers, setNumbers] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(null);
  const [matches, setMatches] = useState([]);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [useAllItems, setUseAllItems] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showLevelCompletedMessage, setShowLevelCompletedMessage] =
    useState(false);
  const [messageText, setMessageText] = useState("");
  const toast = useToast();
  const router = useRouter();

  const currentLevelData = numberLevels[currentLevel];
  const colors = getOptimalColors(currentLevelData?.background);

  const initializeGame = useCallback(() => {
    setCurrentLevel(0);
    setScore(0);
    setGameCompleted(false);
    setUseAllItems(false);
    startLevel(0, false);
  }, []);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  const startLevel = (levelIndex, useAllItems = false) => {
    const allLevelData = numberLevels[levelIndex].items;
    const levelData = useAllItems ? allLevelData : allLevelData.slice(0, 5);

    const shuffledNumbers = shuffleArray(levelData);
    const shuffledQuantities = shuffleArray(levelData);

    setGameData(levelData);
    setNumbers(shuffledNumbers);
    setQuantities(shuffledQuantities);
    setSelectedNumber(null);
    setSelectedQuantity(null);
    setMatches([]);
    setLevelCompleted(false);
  };

  const handleNumberClick = (number) => {
    if (matches.includes(number.id)) return;
    setSelectedNumber(number);

    if (selectedQuantity) {
      checkMatch(number, selectedQuantity);
    }
  };

  const handleQuantityClick = (quantity) => {
    if (matches.includes(quantity.id)) return;
    setSelectedQuantity(quantity);

    if (selectedNumber) {
      checkMatch(selectedNumber, quantity);
    }
  };

  const checkMatch = (number, quantity) => {
    if (number.id === quantity.id) {
      // Correct match
      setMatches([...matches, number.id]);
      setScore(score + 1);
      setSelectedNumber(null);
      setSelectedQuantity(null);

      setMessageText(`${number.number} = ${quantity.name}!`);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 2000);

      if (matches.length + 1 === gameData.length) {
        setLevelCompleted(true);

        if (currentLevel + 1 === numberLevels.length) {
          // Game completed
          setTimeout(() => {
            setGameCompleted(true);
            setMessageText("Ai învățat toate numerele!");
            setShowLevelCompletedMessage(true);
            setTimeout(() => setShowLevelCompletedMessage(false), 4000);
          }, 1000);
        } else {
          // Level completed, move to next
          setTimeout(() => {
            setCurrentLevel(currentLevel + 1);
            startLevel(currentLevel + 1);
          }, 2000);
        }
      }
    } else {
      // Wrong match
      setSelectedNumber(null);
      setSelectedQuantity(null);

      setMessageText("Numără din nou obiectele.");
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 2000);
    }
  };

  const isMatched = (id) => matches.includes(id);
  const isSelectedNumber = (id) => selectedNumber?.id === id;
  const isSelectedQuantity = (id) => selectedQuantity?.id === id;

  return (
    <Box minH="100vh" bg={currentLevelData?.background || "orange.50"} py={6}>
      <Container maxW="6xl">
        <VStack spacing={6}>
          <GameHeader
            title="🔢 Cifre și Cantități 🔢"
            levelName={`${currentLevel + 1}: ${currentLevelData?.name}`}
            description={currentLevelData?.description}
            onHomeClick={() => router.push("/")}
            onRestartClick={initializeGame}
            textColor={colors.textColor}
          />

          {/* Level Progress */}
          <Box w="full" maxW="md">
            <Text mb={2} fontWeight="bold" color="orange.600">
              Nivel {currentLevel + 1}: {currentLevelData?.name} | Scor total:{" "}
              {score}
            </Text>
            <Progress
              value={
                ((currentLevel * (useAllItems ? 10 : 5) + matches.length) /
                  (numberLevels.length * (useAllItems ? 10 : 5))) *
                100
              }
              colorScheme="orange"
              size="lg"
              borderRadius="full"
            />
          </Box>

          {/* Current Level Progress */}
          <Box w="full" maxW="md">
            <Text mb={2} fontWeight="bold" color="orange.500">
              Progres nivel: {matches.length} din {useAllItems ? 10 : 5}
            </Text>
            <Progress
              value={(matches.length / gameData.length) * 100}
              colorScheme="yellow"
              size="md"
              borderRadius="full"
            />
          </Box>

          <GameInstructions
            instructions={`${currentLevelData?.description} - Numără obiectele și potrivește-le cu cifra corectă!`}
            textColor={colors.instructionColor || colors.textColor}
            showShadow={colors.textColor === "white"}
          />

          {/* Game Area */}
          <HStack spacing={4} align="start" w="full" justify="flex-start">
            {/* Control Panel */}
            <VStack spacing={4} align="center" minW="180px" maxW="200px" ml={4}>
              <Heading size="md" color="blue.600" textAlign="center">
                🎮 Control
              </Heading>

              {/* Level Selection */}
              <VStack spacing={2} w="full">
                <Text fontSize="sm" fontWeight="bold" color="blue.600">
                  Selectează Nivelul:
                </Text>
                <SimpleGrid columns={1} spacing={2} w="full">
                  {numberLevels.map((level, index) => (
                    <Button
                      key={level.id}
                      size="sm"
                      colorScheme={currentLevel === index ? "blue" : "orange"}
                      variant={currentLevel === index ? "solid" : "outline"}
                      onClick={() => {
                        setCurrentLevel(index);
                        startLevel(index, useAllItems);
                      }}
                      fontSize="xs"
                      h="40px"
                      borderColor={
                        currentLevel === index ? "blue.400" : "orange.300"
                      }
                      color={currentLevel === index ? "white" : "orange.700"}
                      _hover={{
                        bg: currentLevel === index ? "blue.500" : "orange.100",
                        borderColor:
                          currentLevel === index ? "blue.500" : "orange.400",
                      }}
                    >
                      {level.name}
                    </Button>
                  ))}
                </SimpleGrid>
              </VStack>

              {/* Game Controls */}
              <VStack spacing={2} w="full">
                <Text fontSize="sm" fontWeight="bold" color="green.600">
                  Controale Joc:
                </Text>
                <Button
                  size="sm"
                  colorScheme="green"
                  onClick={initializeGame}
                  w="full"
                  h="40px"
                >
                  🔄 Restart Joc
                </Button>
                <Button
                  size="sm"
                  colorScheme="purple"
                  onClick={() => {
                    const shuffledNumbers = shuffleArray(gameData);
                    const shuffledQuantities = shuffleArray(gameData);
                    setNumbers(shuffledNumbers);
                    setQuantities(shuffledQuantities);
                  }}
                  w="full"
                  h="40px"
                >
                  🔀 Amestecă
                </Button>
                <Button
                  size="sm"
                  colorScheme={useAllItems ? "red" : "blue"}
                  onClick={() => {
                    setUseAllItems(!useAllItems);
                    startLevel(currentLevel, !useAllItems);
                  }}
                  w="full"
                  h="40px"
                >
                  {useAllItems ? "📉 1-5 Numere" : "📈 1-10 Numere"}
                </Button>
              </VStack>

              {/* Stats */}
              <VStack spacing={2} w="full">
                <Text fontSize="sm" fontWeight="bold" color="orange.600">
                  Statistici:
                </Text>
                <Box
                  bg="orange.50"
                  p={3}
                  borderRadius="md"
                  border="2px solid"
                  borderColor="orange.200"
                  w="full"
                >
                  <Text fontSize="xs" color="orange.700">
                    Nivel: {currentLevel + 1}/{numberLevels.length}
                  </Text>
                  <Text fontSize="xs" color="orange.700">
                    Progres: {matches.length}/{useAllItems ? 10 : 5}
                  </Text>
                  <Text fontSize="xs" color="orange.700">
                    Scor: {score}
                  </Text>
                </Box>
              </VStack>
            </VStack>

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
                    Perfect!
                  </Text>
                  <Text fontSize="lg">{messageText}</Text>
                </VStack>
              </Box>
            )}

            {/* Error Message */}
            {showErrorMessage && (
              <Box
                position="fixed"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                zIndex="1000"
                bg="red.500"
                color="white"
                p={6}
                borderRadius="xl"
                boxShadow="2xl"
                textAlign="center"
                minW="300px"
              >
                <VStack spacing={3}>
                  <Text fontSize="6xl">😅</Text>
                  <Text fontSize="2xl" fontWeight="bold">
                    Mai încearcă!
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

            {/* Central Game Area */}
            <VStack spacing={6} align="center" flex="1" justify="center">
              <HStack spacing={12} align="start">
                {/* Numbers Column */}
                <VStack spacing={6} align="center">
                  <Heading size="lg" color="orange.600" textAlign="center">
                    Cifre
                  </Heading>
                  <SimpleGrid columns={1} spacing={6}>
                    {numbers.map((number) => (
                      <VStack
                        key={`number-${number.id}`}
                        spacing={3}
                        align="center"
                      >
                        <Button
                          onClick={() => handleNumberClick(number)}
                          size="xl"
                          h="120px"
                          w="120px"
                          fontSize="7xl"
                          fontWeight="bold"
                          bg={
                            isMatched(number.id)
                              ? "green.200"
                              : isSelectedNumber(number.id)
                              ? "orange.300"
                              : "white"
                          }
                          border="4px solid"
                          borderColor={
                            isMatched(number.id)
                              ? "green.400"
                              : isSelectedNumber(number.id)
                              ? "orange.500"
                              : "orange.200"
                          }
                          color={
                            isMatched(number.id)
                              ? "green.700"
                              : isSelectedNumber(number.id)
                              ? "orange.700"
                              : "orange.600"
                          }
                          transform={
                            isSelectedNumber(number.id)
                              ? "scale(1.05)"
                              : "scale(1)"
                          }
                          boxShadow={
                            isSelectedNumber(number.id)
                              ? "0 0 20px rgba(249, 115, 22, 0.5)"
                              : "none"
                          }
                          _hover={{
                            transform: !isMatched(number.id)
                              ? "scale(1.05)"
                              : "none",
                            borderColor: !isMatched(number.id)
                              ? "orange.500"
                              : "green.400",
                          }}
                          disabled={isMatched(number.id)}
                          cursor={
                            isMatched(number.id) ? "not-allowed" : "pointer"
                          }
                        >
                          {number.number}
                        </Button>
                        <Text
                          fontSize="md"
                          fontWeight="bold"
                          color="transparent"
                          textAlign="center"
                          minH="20px"
                        >
                          &nbsp;
                        </Text>
                      </VStack>
                    ))}
                  </SimpleGrid>
                </VStack>

                {/* Quantities Column */}
                <VStack spacing={6} align="center">
                  <Heading size="lg" color="orange.600" textAlign="center">
                    Cantități
                  </Heading>
                  <SimpleGrid columns={1} spacing={6}>
                    {quantities.map((quantity) => (
                      <VStack
                        key={`quantity-${quantity.id}`}
                        spacing={3}
                        align="center"
                      >
                        <Button
                          onClick={() => handleQuantityClick(quantity)}
                          size="xl"
                          h="120px"
                          w="320px"
                          fontSize="4xl"
                          whiteSpace="normal"
                          wordBreak="break-all"
                          lineHeight="1.1"
                          bg={
                            isMatched(quantity.id)
                              ? "green.200"
                              : isSelectedQuantity(quantity.id)
                              ? "orange.300"
                              : "white"
                          }
                          border="4px solid"
                          borderColor={
                            isMatched(quantity.id)
                              ? "green.400"
                              : isSelectedQuantity(quantity.id)
                              ? "orange.500"
                              : "orange.200"
                          }
                          transform={
                            isSelectedQuantity(quantity.id)
                              ? "scale(1.05)"
                              : "scale(1)"
                          }
                          boxShadow={
                            isSelectedQuantity(quantity.id)
                              ? "0 0 20px rgba(249, 115, 22, 0.5)"
                              : "none"
                          }
                          _hover={{
                            transform: !isMatched(quantity.id)
                              ? "scale(1.02)"
                              : "none",
                            borderColor: !isMatched(quantity.id)
                              ? "orange.500"
                              : "green.400",
                          }}
                          disabled={isMatched(quantity.id)}
                          cursor={
                            isMatched(quantity.id) ? "not-allowed" : "pointer"
                          }
                          overflow="hidden"
                          textOverflow="ellipsis"
                        >
                          {quantity.quantity}
                        </Button>
                        <Text
                          fontSize="md"
                          fontWeight="bold"
                          color="orange.600"
                          textAlign="center"
                          minH="20px"
                        >
                          {quantity.name}
                        </Text>
                      </VStack>
                    ))}
                  </SimpleGrid>
                </VStack>
              </HStack>
            </VStack>
          </HStack>

          {/* Level Completed Message */}
          {levelCompleted && currentLevel + 1 < numberLevels.length && (
            <Box
              bg="yellow.100"
              p={6}
              borderRadius="xl"
              border="3px solid"
              borderColor="yellow.400"
              textAlign="center"
            >
              <Text fontSize="xl" fontWeight="bold" color="yellow.700">
                🎉 Nivel completat! Următorul nivel începe în curând... 🎉
              </Text>
            </Box>
          )}

          {/* Game Completed Message */}
          {gameCompleted && (
            <Box
              bg="green.100"
              p={6}
              borderRadius="xl"
              border="3px solid"
              borderColor="green.400"
              textAlign="center"
            >
              <Text fontSize="2xl" fontWeight="bold" color="green.600" mb={4}>
                🏆 Felicitări! Ai învățat toate numerele! 🏆
              </Text>
              <Text fontSize="lg" color="green.600" mb={4}>
                Scor final: {score} din {numberLevels.length}
              </Text>
              <HStack justify="center" spacing={4}>
                <Button onClick={initializeGame} colorScheme="orange" size="lg">
                  Joacă din nou
                </Button>
                <Button
                  onClick={() => router.push("/")}
                  colorScheme="blue"
                  size="lg"
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
