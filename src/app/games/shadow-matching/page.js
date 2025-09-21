"use client";

import {
  Box,
  Container,
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Heading,
  useToast,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Select,
  FormControl,
  FormLabel,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GameCard from "../../../components/GameCard";
import GameHeader from "../../../components/GameHeader";
import GameProgress from "../../../components/GameProgress";
import LevelCompletedModal from "../../../components/LevelCompletedModal";
import GameCompletedModal from "../../../components/GameCompletedModal";
import useGameLogic from "../../../hooks/useGameLogic";
import shadowData from "../../../data/shadowMatchingData.json";
import { getOptimalColors } from "../../../utils/colors";
import { shuffleArray } from "../../../utils/array";

const shadowLevels = shadowData.levels;

export default function ShadowMatching() {
  const router = useRouter();
  const toast = useToast();

  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [categoryCompleted, setCategoryCompleted] = useState(false);

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
    checkMatch,
    isMatched,
    isSelected,
    nextLevel,
    restartGame,
    initializeGame,
  } = useGameLogic(shadowLevels, 0, selectedCategory);

  // Get current level data from the new structure
  const currentLevelDataNew =
    shadowLevels[selectedCategory]?.levels[selectedLevel];

  // Get objects from the current level
  const currentLevelObjects =
    shadowLevels[selectedCategory]?.levels[selectedLevel]?.objects || [];

  const [objects, setObjects] = useState([]);
  const [shadows, setShadows] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showLevelCompletedMessage, setShowLevelCompletedMessage] =
    useState(false);
  const [messageText, setMessageText] = useState("");
  const [showInstructions, setShowInstructions] = useState(false);
  const [draggedObject, setDraggedObject] = useState(null);
  const [dragOverShadow, setDragOverShadow] = useState(null);

  // use shared shuffleArray util

  // Initialize game data when level changes or category changes
  useEffect(() => {
    if (
      shadowLevels[selectedCategory] &&
      shadowLevels[selectedCategory].levels[selectedLevel]
    ) {
      // Use objects from the specific level
      const levelObjects =
        shadowLevels[selectedCategory].levels[selectedLevel].objects;

      const shuffledObjects = shuffleArray(levelObjects);
      // Shuffle shadows independently from objects for more challenge
      const shuffledShadows = shuffleArray(levelObjects);
      setObjects(shuffledObjects);
      setShadows(shuffledShadows);
      setCategoryCompleted(false);
    }
  }, [selectedCategory, selectedLevel]);

  const handleObjectClick = (object) => {
    if (isMatched(object.id)) return;

    if (selectedTarget && selectedTarget.type === "shadow") {
      const isMatch = object.id === selectedTarget.id;
      if (isMatch) {
        setMessageText(`Ai potrivit ${object.name} cu umbra sa!`);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 2000);
      } else {
        setMessageText("Încearcă din nou!");
        setShowErrorMessage(true);
        setTimeout(() => setShowErrorMessage(false), 2000);
      }
      checkMatch(object, selectedTarget);
    } else {
      // Reset any previous selection
      setSelectedItem(null);
      setSelectedTarget(null);
      // Set new selection
      setSelectedItem({ ...object, type: "object" });
    }
  };

  const handleShadowClick = (shadow) => {
    if (isMatched(shadow.id)) return;

    if (selectedItem && selectedItem.type === "object") {
      const isMatch = selectedItem.id === shadow.id;
      if (isMatch) {
        setMessageText(`Ai potrivit ${selectedItem.name} cu umbra sa!`);
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 2000);
      } else {
        setMessageText("Încearcă din nou!");
        setShowErrorMessage(true);
        setTimeout(() => setShowErrorMessage(false), 2000);
      }
      checkMatch(selectedItem, shadow);
    } else {
      // Reset any previous selection
      setSelectedItem(null);
      setSelectedTarget(null);
      // Set new selection
      setSelectedTarget({ ...shadow, type: "shadow" });
    }
  };

  // Drag & Drop functions
  const handleDragStart = (e, object) => {
    setDraggedObject(object);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", object.object);
  };

  const handleDragOver = (e, shadow) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverShadow(shadow);
  };

  const handleDragLeave = (e) => {
    setDragOverShadow(null);
  };

  const handleNextLevel = () => {
    const currentCategory = shadowLevels[selectedCategory];
    // Check if there are more levels in the current category
    if (selectedLevel < currentCategory.levels.length - 1) {
      // Move to next level in the same category
      setSelectedLevel(selectedLevel + 1);
      initializeGame();
    } else {
      // All levels in this category completed, move to next category
      if (selectedCategory < shadowLevels.length - 1) {
        setSelectedCategory(selectedCategory + 1);
        setSelectedLevel(0);
        initializeGame();
      } else {
        // All categories completed
        setGameCompleted(true);
      }
    }
  };

  const handleDrop = (e, shadow) => {
    e.preventDefault();

    if (!draggedObject) return;

    // Check if it's a correct match
    if (draggedObject.id === shadow.id) {
      // Correct match
      setMatches([...matches, draggedObject.id]);
      setScore(score + 1);

      setMessageText(`Ai potrivit ${draggedObject.name} cu umbra sa!`);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 2000);

      // Check if level is completed
      if (matches.length + 1 === currentLevelObjects.length) {
        setLevelCompleted(true);
        setMessageText(`Ai terminat nivelul "${currentLevelDataNew?.name}"!`);
        setShowLevelCompletedMessage(true);
        setTimeout(() => setShowLevelCompletedMessage(false), 3000);
      }
    } else {
      // Wrong match
      setMessageText("Încearcă din nou!");
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 2000);
    }

    setDraggedObject(null);
    setDragOverShadow(null);
  };

  const colors = getOptimalColors(shadowLevels[selectedCategory]?.background);

  return (
    <Box
      minH="100vh"
      bg={shadowLevels[selectedCategory]?.background || "purple.50"}
      py={6}
    >
      <Container maxW="6xl">
        <VStack spacing={6}>
          <GameHeader
            title="🌟 Potrivirea Umbrelor 🌟"
            levelName={`Nivel ${selectedLevel + 1}: ${
              currentLevelDataNew?.name
            }`}
            description={shadowLevels[selectedCategory]?.description}
            onHomeClick={() => router.push("/")}
            onRestartClick={initializeGame}
            textColor={colors.textColor}
          />

          <GameProgress
            current={matches.length}
            total={currentLevelObjects.length}
            colorScheme={colors.progressColor}
            label="Progres"
            textColor={colors.textColor}
          />

          {/* Category Selection */}
          <FormControl maxW="400px" mx="auto">
            <FormLabel
              color={colors.textColor}
              fontWeight="bold"
              textAlign="center"
              textShadow={
                colors.textColor === "white"
                  ? "2px 2px 4px rgba(0,0,0,0.5)"
                  : "none"
              }
            >
              🎯 Alege categoria de obiecte:
            </FormLabel>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<Text>▼</Text>}
                bg="white"
                color="gray.800"
                border="2px solid"
                borderColor="gray.300"
                size="lg"
                w="full"
                _hover={{
                  bg: "gray.50",
                  borderColor: "blue.300",
                }}
                _active={{
                  bg: "gray.100",
                }}
                _expanded={{
                  bg: "gray.50",
                  borderColor: "blue.400",
                }}
              >
                {shadowLevels[selectedCategory]?.name || "Selectează categoria"}
              </MenuButton>
              <MenuList
                bg="white"
                border="2px solid"
                borderColor="gray.200"
                boxShadow="lg"
                maxH="300px"
                overflowY="auto"
              >
                {shadowLevels.map((level, index) => (
                  <MenuItem
                    key={level.id}
                    onClick={() => {
                      setSelectedCategory(index);
                      initializeGame(); // Reset game when changing category
                    }}
                    bg={selectedCategory === index ? "blue.50" : "white"}
                    color="gray.800"
                    _hover={{
                      bg: selectedCategory === index ? "blue.100" : "gray.50",
                    }}
                    _focus={{
                      bg: selectedCategory === index ? "blue.100" : "gray.50",
                    }}
                    fontWeight={selectedCategory === index ? "bold" : "normal"}
                  >
                    {level.name}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </FormControl>

          {/* Instructions Button */}
          <Button
            onClick={() => setShowInstructions(true)}
            colorScheme="blue"
            variant="outline"
            size="lg"
            leftIcon={<Text fontSize="lg">📋</Text>}
            _hover={{
              transform: "scale(1.05)",
              boxShadow: "lg",
            }}
            transition="all 0.2s"
          >
            Instrucțiuni de Joc
          </Button>

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
            {/* Objects Column */}
            <VStack spacing={6}>
              <Heading
                size="md"
                color={colors.headingColor}
                textShadow={
                  colors.textColor === "white"
                    ? "2px 2px 4px rgba(0,0,0,0.5)"
                    : "none"
                }
              >
                Obiecte
              </Heading>
              <SimpleGrid columns={2} spacing={6}>
                {objects.map((object, index) => (
                  <GameCard
                    key={`object-${selectedCategory}-${index}-${object.id}`}
                    id={object.id}
                    content={object.object}
                    label={object.name}
                    onClick={() => handleObjectClick(object)}
                    onDragStart={(e) => handleDragStart(e, object)}
                    draggable={!isMatched(object.id)}
                    isMatched={isMatched(object.id)}
                    isSelected={isSelected(object.id, "object")}
                    variant="object"
                    size="large"
                    opacity={draggedObject?.id === object.id ? 0.5 : 1}
                    cursor={isMatched(object.id) ? "not-allowed" : "grab"}
                    _active={{ cursor: "grabbing" }}
                    transition="all 0.3s ease"
                  />
                ))}
              </SimpleGrid>
            </VStack>

            {/* Shadows Column */}
            <VStack spacing={6} pt={0}>
              <Heading
                size="md"
                color={colors.headingColor}
                textShadow={
                  colors.textColor === "white"
                    ? "2px 2px 4px rgba(0,0,0,0.5)"
                    : "none"
                }
              >
                Umbre
              </Heading>
              <SimpleGrid columns={2} spacing={6}>
                {shadows.map((shadow, index) => (
                  <VStack
                    key={`shadow-${selectedCategory}-${index}-${shadow.id}`}
                    spacing={2}
                  >
                    <GameCard
                      id={shadow.id}
                      content={
                        <Box
                          position="relative"
                          w="full"
                          h="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          {isMatched(shadow.id) ? (
                            // Show the actual image when matched
                            <Box
                              transform="scale(1.1)"
                              transition="all 0.3s ease"
                              filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.3))"
                            >
                              {shadow.object}
                            </Box>
                          ) : (
                            // Show shadow when not matched
                            <Box
                              filter="brightness(0) contrast(100%) blur(0.5px)"
                              opacity="0.8"
                              textShadow="2px 2px 4px rgba(0,0,0,0.3)"
                            >
                              {shadow.shadow}
                            </Box>
                          )}
                          {dragOverShadow?.id === shadow.id &&
                            !isMatched(shadow.id) && (
                              <Box
                                position="absolute"
                                top="0"
                                left="0"
                                right="0"
                                bottom="0"
                                bg="yellow.100"
                                opacity="0.5"
                                borderRadius="md"
                                border="2px dashed"
                                borderColor="yellow.400"
                              />
                            )}
                        </Box>
                      }
                      onClick={() => handleShadowClick(shadow)}
                      onDragOver={(e) => handleDragOver(e, shadow)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, shadow)}
                      isMatched={isMatched(shadow.id)}
                      isSelected={isSelected(shadow.id, "shadow")}
                      variant="shadow"
                      size="large"
                      bg={
                        isMatched(shadow.id)
                          ? "green.200"
                          : isSelected(shadow.id, "shadow")
                          ? "purple.200"
                          : dragOverShadow?.id === shadow.id
                          ? "yellow.200"
                          : "gray.300"
                      }
                      borderColor={
                        isMatched(shadow.id)
                          ? "green.400"
                          : isSelected(shadow.id, "shadow")
                          ? "purple.400"
                          : dragOverShadow?.id === shadow.id
                          ? "yellow.400"
                          : "gray.400"
                      }
                      position="relative"
                      overflow="hidden"
                      transition="all 0.3s ease"
                    />
                    {/* Invisible spacer to match the text height from object cards */}
                    <Text
                      fontSize="sm"
                      fontWeight="bold"
                      color="transparent"
                      textAlign="center"
                      maxW="160px"
                      h="20px"
                    >
                      &nbsp;
                    </Text>
                  </VStack>
                ))}
              </SimpleGrid>
            </VStack>
          </HStack>

          <LevelCompletedModal
            isOpen={levelCompleted}
            levelName={currentLevelDataNew?.name}
            onNextLevel={handleNextLevel}
            onRestart={initializeGame}
            onHome={() => router.push("/")}
            isLastLevel={
              selectedCategory >= shadowLevels.length - 1 &&
              selectedLevel >= shadowLevels[selectedCategory]?.levels.length - 1
            }
          />

          <GameCompletedModal
            isOpen={gameCompleted}
            score={score}
            onRestart={restartGame}
            onHome={() => router.push("/")}
          />

          {/* Instructions Modal */}
          <Modal
            isOpen={showInstructions}
            onClose={() => setShowInstructions(false)}
            size="lg"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <HStack>
                  <Text fontSize="2xl">📋</Text>
                  <Text>Instrucțiuni de Joc</Text>
                </HStack>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <VStack spacing={4} align="start">
                  <Text fontSize="lg" fontWeight="bold" color="blue.600">
                    Cum se joacă:
                  </Text>

                  <VStack spacing={3} align="start">
                    <HStack spacing={3}>
                      <Text fontSize="2xl">👆</Text>
                      <Text>
                        <strong>Metoda 1 - Click:</strong> Apasă pe un obiect
                        din stânga, apoi pe umbra lui potrivită din dreapta.
                      </Text>
                    </HStack>

                    <HStack spacing={3}>
                      <Text fontSize="2xl">🖱️</Text>
                      <Text>
                        <strong>Metoda 2 - Drag & Drop:</strong> Trage obiectul
                        din stânga și lasă-l pe umbra sa din dreapta.
                      </Text>
                    </HStack>

                    <HStack spacing={3}>
                      <Text fontSize="2xl">✅</Text>
                      <Text>
                        <strong>Scopul:</strong> Potrivește toate obiectele cu
                        umbrele lor pentru a completa nivelul.
                      </Text>
                    </HStack>

                    <HStack spacing={3}>
                      <Text fontSize="2xl">🎯</Text>
                      <Text>
                        <strong>Progres:</strong> Bara de progres arată câte
                        potriviri ai făcut din total.
                      </Text>
                    </HStack>
                  </VStack>

                  <Box bg="blue.50" p={4} borderRadius="md" w="full">
                    <Text fontSize="sm" color="blue.700" fontWeight="medium">
                      💡 <strong>Sfat:</strong> Poți folosi oricare dintre
                      metode - click sau drag & drop!
                    </Text>
                  </Box>
                </VStack>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  onClick={() => setShowInstructions(false)}
                >
                  Am înțeles!
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </VStack>
      </Container>
    </Box>
  );
}
