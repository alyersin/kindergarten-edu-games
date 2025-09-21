"use client";

import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { shuffleArray } from "../../../utils/array";
import React from "react";
import GameHeader from "../../../components/GameHeader";
import GameProgress from "../../../components/GameProgress";
import LevelCompletedModal from "../../../components/LevelCompletedModal";
import GameCompletedModal from "../../../components/GameCompletedModal";
import PizzaSlice from "../../../components/PizzaSlice";
import useGameLogic from "../../../hooks/useGameLogic";

import wheelData from "../../../data/wheelLevels.json";
const wheelLevels = wheelData.levels;

export default function WheelOfFortune() {
  const router = useRouter();
  const {
    currentLevel,
    currentLevelData,
    matches,
    score,
    gameCompleted,
    levelCompleted,
    selectedItem,
    selectedTarget,
    setSelectedItem,
    setSelectedTarget,
    setMatches,
    setScore,
    setLevelCompleted,
    setGameCompleted,
    checkMatch,
    isMatched,
    isSelected,
    nextLevel,
    restartGame,
    initializeGame,
  } = useGameLogic(wheelLevels);

  const [isSpinning, setIsSpinning] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showInfoMessage, setShowInfoMessage] = useState(false);
  const [showLevelCompletedMessage, setShowLevelCompletedMessage] =
    useState(false);
  const [messageText, setMessageText] = useState("");
  const [rotation, setRotation] = useState(0);
  const [selectedWheelItem, setSelectedWheelItem] = useState(null);
  const [wheelItems, setWheelItems] = useState([]);
  const [targetItems, setTargetItems] = useState([]);
  const toast = useToast();

  // Initialize wheel data when level changes
  useEffect(() => {
    if (currentLevelData) {
      const shuffledWheelItems = shuffleArray(currentLevelData.items);
      const shuffledTargetItems = shuffleArray(currentLevelData.items);
      setWheelItems(shuffledWheelItems);
      setTargetItems(shuffledTargetItems);
    }
  }, [currentLevelData]);

  const spinWheel = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    const randomRotation = Math.random() * 360 * 5 + 360; // 5+ full rotations
    const finalRotation = rotation + randomRotation;
    setRotation(finalRotation);

    // Calculate which item the wheel lands on
    const itemAngle = 360 / wheelItems.length;
    const normalizedRotation = finalRotation % 360;
    const selectedIndex =
      Math.floor((360 - normalizedRotation) / itemAngle) % wheelItems.length;
    const selectedItem = wheelItems[selectedIndex];

    setTimeout(() => {
      setSelectedWheelItem(selectedItem);
      setIsSpinning(false);

      setMessageText(`Ai selectat: ${selectedItem.name}`);
      setShowInfoMessage(true);
      setTimeout(() => setShowInfoMessage(false), 2000);
    }, 3000); // Match the CSS animation duration
  }, [isSpinning, rotation, wheelItems]);

  const handleTargetClick = (targetItem) => {
    if (!selectedWheelItem || isMatched(targetItem.id)) return;

    if (selectedWheelItem.id === targetItem.id) {
      // Correct match
      setMatches((prev) => [...prev, targetItem.id]);
      setScore((prev) => prev + 1);
      setSelectedWheelItem(null);

      setMessageText(`Ai potrivit corect ${targetItem.name}!`);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 2000);

      // Check if level is completed
      if (matches.length + 1 === currentLevelData?.items.length) {
        setLevelCompleted(true);
        setMessageText(`Ai terminat nivelul "${currentLevelData?.name}"!`);
        setShowLevelCompletedMessage(true);
        setTimeout(() => setShowLevelCompletedMessage(false), 3000);
      }
    } else {
      setMessageText("Încearcă din nou!");
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 2000);
    }
  };

  return (
    <Box minH="100vh" bg={currentLevelData?.background || "purple.50"} py={6}>
      <Container maxW="6xl">
        <VStack spacing={6}>
          <GameHeader
            title="🎓 Roata Educațională 🎓"
            levelName={`${currentLevel + 1}: ${currentLevelData?.name}`}
            description={currentLevelData?.description}
            onHomeClick={() => router.push("/")}
            onRestartClick={initializeGame}
          />

          <GameProgress
            current={matches.length}
            total={currentLevelData?.items.length}
            colorScheme="orange"
            label="Progres"
          />

          {/* Instructions */}
          <Text
            fontSize="xl"
            color="orange.600"
            textAlign="center"
            fontWeight="bold"
          >
            Învârte roata și potrivește elementul selectat cu ținta pentru a
            învăța!
          </Text>

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
                  Bravo!
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
                <Text fontSize="6xl">❌</Text>
                <Text fontSize="2xl" fontWeight="bold">
                  Greșit!
                </Text>
                <Text fontSize="lg">{messageText}</Text>
              </VStack>
            </Box>
          )}

          {/* Info Message */}
          {showInfoMessage && (
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
                <Text fontSize="6xl">🎯</Text>
                <Text fontSize="2xl" fontWeight="bold">
                  Roata s-a oprit!
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
              bg="purple.500"
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
                  Nivel Completat!
                </Text>
                <Text fontSize="lg">{messageText}</Text>
              </VStack>
            </Box>
          )}

          {/* Game Area */}
          <HStack spacing={12} align="start" w="full" justify="center">
            {/* Wheel Column */}
            <VStack spacing={6}>
              <Heading size="md" color="orange.600">
                Roata Educațională
              </Heading>

              {/* Wheel Container */}
              <Box
                position="relative"
                w="500px"
                h="500px"
                borderRadius="50%"
                border="10px solid"
                borderColor="orange.500"
                bg="white"
                boxShadow="0 25px 60px rgba(0,0,0,0.4), inset 0 0 25px rgba(255,255,255,0.8)"
                overflow="hidden"
                _before={{
                  content: '""',
                  position: "absolute",
                  top: "-5px",
                  left: "-5px",
                  right: "-5px",
                  bottom: "-5px",
                  borderRadius: "50%",
                  background:
                    "linear-gradient(45deg, #FF6B35, #F7931E, #FFD23F, #06FFA5, #4ECDC4, #45B7D1)",
                  zIndex: "-1",
                }}
              >
                {/* Wheel */}
                <Box
                  w="100%"
                  h="100%"
                  borderRadius="50%"
                  position="relative"
                  transform={`rotate(${rotation}deg)`}
                  transition={
                    isSpinning
                      ? "transform 3s cubic-bezier(0.25, 0.46, 0.45, 0.94)"
                      : "none"
                  }
                  style={{
                    background: `conic-gradient(${wheelItems
                      .map(
                        (item, index) =>
                          `${item.bgColor} ${
                            index * (360 / wheelItems.length)
                          }deg ${(index + 1) * (360 / wheelItems.length)}deg`
                      )
                      .join(", ")})`,
                  }}
                >
                  {/* Pizza Slice Cards */}
                  {wheelItems.map((item, index) => (
                    <PizzaSlice
                      key={item.id}
                      item={item}
                      index={index}
                      totalItems={wheelItems.length}
                      isSelected={selectedWheelItem?.id === item.id}
                    />
                  ))}
                </Box>

                {/* Center Circle - Educational Center */}
                <Box
                  position="absolute"
                  top="50%"
                  left="50%"
                  transform="translate(-50%, -50%)"
                  w="90px"
                  h="90px"
                  borderRadius="50%"
                  bg="linear-gradient(135deg, #FF6B35, #F7931E)"
                  border="6px solid"
                  borderColor="white"
                  boxShadow="0 8px 25px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,255,255,0.3)"
                  zIndex="10"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text
                    fontSize="2xl"
                    filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.5))"
                  >
                    🎓
                  </Text>
                </Box>

                {/* Pointer - Hand */}
                <Box
                  position="absolute"
                  top="-12px"
                  left="50%"
                  transform="translateX(-50%)"
                  w="0"
                  h="0"
                  borderLeft="18px solid transparent"
                  borderRight="18px solid transparent"
                  borderTop="35px solid"
                  borderTopColor="orange.500"
                  zIndex="5"
                  filter="drop-shadow(0 4px 8px rgba(0,0,0,0.3))"
                >
                  <Text
                    position="absolute"
                    top="-45px"
                    left="-10px"
                    fontSize="xl"
                    filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.5))"
                  >
                    👆
                  </Text>
                </Box>
              </Box>

              {/* Spin Button */}
              <Button
                onClick={spinWheel}
                disabled={isSpinning}
                bg="orange.400"
                color="white"
                size="lg"
                fontSize="xl"
                px={10}
                py={8}
                borderRadius="full"
                boxShadow="0 8px 25px rgba(0,0,0,0.3)"
                _hover={{
                  bg: "orange.500",
                  transform: "translateY(-3px)",
                  boxShadow: "0 12px 35px rgba(0,0,0,0.4)",
                }}
                _active={{
                  transform: "translateY(0px)",
                }}
                transition="all 0.3s ease"
                border="3px solid"
                borderColor="orange.600"
              >
                {isSpinning ? "⏳ Se învârte..." : "🎓 Învârte Roata!"}
              </Button>

              {/* Selected Item Display */}
              {selectedWheelItem && (
                <Box
                  bg="orange.100"
                  border="4px solid"
                  borderColor="orange.400"
                  borderRadius="xl"
                  p={6}
                  textAlign="center"
                  minW="250px"
                  boxShadow="0 6px 20px rgba(0,0,0,0.2)"
                >
                  <Text
                    fontSize="lg"
                    fontWeight="bold"
                    color="orange.700"
                    mb={2}
                  >
                    Element selectat:
                  </Text>
                  <VStack spacing={2}>
                    <Text fontSize="4xl">{selectedWheelItem.pizzaTopping}</Text>
                    <Text fontSize="xl" color="orange.600" fontWeight="bold">
                      {selectedWheelItem.name}
                    </Text>
                  </VStack>
                </Box>
              )}
            </VStack>

            {/* Targets Column */}
            <VStack spacing={6}>
              <Heading size="md" color="orange.600">
                Elemente de Potrivit
              </Heading>
              <SimpleGrid columns={2} spacing={8}>
                {targetItems.map((item) => (
                  <Box
                    key={item.id}
                    onClick={() => handleTargetClick(item)}
                    w="160px"
                    h="160px"
                    bg={isMatched(item.id) ? "green.100" : "white"}
                    border="4px solid"
                    borderColor={
                      isMatched(item.id)
                        ? "green.500"
                        : selectedWheelItem?.id === item.id
                        ? "orange.500"
                        : "orange.300"
                    }
                    borderRadius="2xl"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    cursor={isMatched(item.id) ? "not-allowed" : "pointer"}
                    _hover={{
                      transform: !isMatched(item.id)
                        ? "scale(1.08) translateY(-4px)"
                        : "none",
                      borderColor: !isMatched(item.id)
                        ? "orange.500"
                        : "green.500",
                      boxShadow: !isMatched(item.id)
                        ? "0 12px 30px rgba(255,107,53,0.4)"
                        : "0 8px 25px rgba(0,0,0,0.2)",
                    }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                    boxShadow="0 8px 25px rgba(0,0,0,0.15)"
                    opacity={isMatched(item.id) ? 0.8 : 1}
                    position="relative"
                    overflow="hidden"
                    _before={{
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: isMatched(item.id)
                        ? "linear-gradient(135deg, rgba(76,175,80,0.1), rgba(139,195,74,0.1))"
                        : "linear-gradient(135deg, rgba(255,107,53,0.05), rgba(247,147,30,0.05))",
                      zIndex: "0",
                    }}
                  >
                    <VStack spacing={3} position="relative" zIndex="1">
                      <Text
                        fontSize="5xl"
                        fontWeight="bold"
                        color={isMatched(item.id) ? "green.600" : "orange.600"}
                        filter="drop-shadow(3px 3px 6px rgba(0,0,0,0.4))"
                        textShadow="2px 2px 4px rgba(0,0,0,0.3)"
                      >
                        {item.pizzaTopping}
                      </Text>
                      <Text
                        fontSize="sm"
                        fontWeight="bold"
                        color={isMatched(item.id) ? "green.700" : "orange.700"}
                        textAlign="center"
                        lineHeight="1.2"
                        px={2}
                      >
                        {item.name}
                      </Text>
                      {isMatched(item.id) && (
                        <Text
                          fontSize="2xl"
                          color="green.600"
                          mt={1}
                          filter="drop-shadow(1px 1px 2px rgba(0,0,0,0.3))"
                        >
                          ✅
                        </Text>
                      )}
                    </VStack>
                  </Box>
                ))}
              </SimpleGrid>
            </VStack>
          </HStack>

          <LevelCompletedModal
            isOpen={levelCompleted}
            levelName={currentLevelData?.name}
            onNextLevel={
              currentLevel < wheelLevels.length - 1
                ? nextLevel
                : () => setGameCompleted(true)
            }
            onRestart={initializeGame}
            isLastLevel={currentLevel >= wheelLevels.length - 1}
          />

          <GameCompletedModal
            isOpen={gameCompleted}
            score={score}
            onRestart={restartGame}
            onHome={() => router.push("/")}
          />
        </VStack>
      </Container>
    </Box>
  );
}
