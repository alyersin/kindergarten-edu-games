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
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { shuffleArray } from "../../../utils/array";
import { getOptimalColors } from "../../../utils/colors";
import React from "react";
import GameCard from "../../../components/GameCard";
import GameHeader from "../../../components/GameHeader";
import GameProgress from "../../../components/GameProgress";
import LevelCompletedModal from "../../../components/LevelCompletedModal";
import GameCompletedModal from "../../../components/GameCompletedModal";
import useGameLogic from "../../../hooks/useGameLogic";
import letterData from "../../../data/letterMatchingData.json";

const letterLevels = letterData.levels;

export default function LetterMatching() {
  const router = useRouter();
  const toast = useToast();
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
  } = useGameLogic(letterLevels);

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showLevelCompletedMessage, setShowLevelCompletedMessage] =
    useState(false);
  const [messageText, setMessageText] = useState("");

  const [letters, setLetters] = useState([]);
  const [objects, setObjects] = useState([]);

  // Initialize game data when level changes
  useEffect(() => {
    if (currentLevelData) {
      const shuffledLetters = shuffleArray(currentLevelData.letters);
      // Shuffle objects independently from letters for more challenge
      const shuffledObjects = shuffleArray(currentLevelData.letters);
      setLetters(shuffledLetters);
      setObjects(shuffledObjects);
    }
  }, [currentLevelData]);

  const handleLetterClick = (letter) => {
    if (isMatched(letter.id)) return;

    if (selectedTarget && selectedTarget.type === "object") {
      // Check if it's a correct match
      if (letter.id === selectedTarget.id) {
        // Correct match
        setMatches([...matches, letter.id]);
        setScore(score + 1);

        setMessageText(
          `Ai potrivit litera ${letter.letter} cu ${selectedTarget.name}!`
        );
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 2000);

        // Check if level is completed
        if (matches.length + 1 === letterLevels[currentLevel].letters.length) {
          setLevelCompleted(true);
          setMessageText(
            `Ai terminat nivelul "${letterLevels[currentLevel].name}"!`
          );
          setShowLevelCompletedMessage(true);
          setTimeout(() => setShowLevelCompletedMessage(false), 3000);
        }
      } else {
        // Wrong match
        setMessageText("Încearcă din nou!");
        setShowErrorMessage(true);
        setTimeout(() => setShowErrorMessage(false), 2000);
      }

      setSelectedItem(null);
      setSelectedTarget(null);
    } else {
      // Reset any previous selection and select this letter
      setSelectedItem({ ...letter, type: "letter" });
      setSelectedTarget(null);
    }
  };

  const handleObjectClick = (object) => {
    if (isMatched(object.id)) return;

    if (selectedItem && selectedItem.type === "letter") {
      // Check if it's a correct match
      if (selectedItem.id === object.id) {
        // Correct match
        setMatches([...matches, object.id]);
        setScore(score + 1);

        setMessageText(
          `Ai potrivit litera ${selectedItem.letter} cu ${object.name}!`
        );
        setShowSuccessMessage(true);
        setTimeout(() => setShowSuccessMessage(false), 2000);

        // Check if level is completed
        if (matches.length + 1 === letterLevels[currentLevel].letters.length) {
          setLevelCompleted(true);
          setMessageText(
            `Ai terminat nivelul "${letterLevels[currentLevel].name}"!`
          );
          setShowLevelCompletedMessage(true);
          setTimeout(() => setShowLevelCompletedMessage(false), 3000);
        }
      } else {
        // Wrong match
        setMessageText("Încearcă din nou!");
        setShowErrorMessage(true);
        setTimeout(() => setShowErrorMessage(false), 2000);
      }

      setSelectedItem(null);
      setSelectedTarget(null);
    } else {
      // Reset any previous selection and select this object
      setSelectedTarget({ ...object, type: "object" });
      setSelectedItem(null);
    }
  };

  const colors = getOptimalColors(currentLevelData?.background);

  return (
    <Box minH="100vh" bg={currentLevelData?.background || "blue.50"} py={6}>
      <Container maxW="6xl">
        <VStack spacing={8}>
          <GameHeader
            title="🔤 Potrivirea Literelor 🔤"
            levelName={`${currentLevel + 1}: ${currentLevelData?.name}`}
            description={currentLevelData?.description}
            onHomeClick={() => router.push("/")}
            onRestartClick={initializeGame}
            textColor={colors.textColor}
          />

          {!gameCompleted ? (
            <>
              <GameProgress
                current={matches.length}
                total={currentLevelData?.letters.length}
                colorScheme={colors.progressColor}
                label="Progres"
                textColor={colors.textColor}
              />

              <Text
                fontSize="xl"
                color={colors.instructionColor}
                textAlign="center"
                fontWeight="bold"
                textShadow={
                  colors.textColor === "white"
                    ? "2px 2px 4px rgba(0,0,0,0.5)"
                    : "none"
                }
              >
                Apasă pe o literă, apoi pe obiectul care începe cu acea literă!
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

              <HStack spacing={12} align="start" w="full" justify="center">
                {/* Letters Column */}
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
                    🔤 Literele
                  </Heading>
                  <SimpleGrid columns={2} spacing={6}>
                    {letters.map((letter) => (
                      <VStack key={`letter-${letter.id}`} spacing={2}>
                        <GameCard
                          id={letter.id}
                          content={letter.letter}
                          label={letter.name}
                          onClick={() => handleLetterClick(letter)}
                          isMatched={isMatched(letter.id)}
                          isSelected={
                            selectedItem?.id === letter.id &&
                            selectedItem?.type === "letter"
                          }
                          variant="letter"
                          size="large"
                          bg={
                            isMatched(letter.id)
                              ? "green.200"
                              : selectedItem?.id === letter.id &&
                                selectedItem?.type === "letter"
                              ? "blue.300"
                              : "blue.100"
                          }
                          borderColor={
                            isMatched(letter.id)
                              ? "green.400"
                              : selectedItem?.id === letter.id &&
                                selectedItem?.type === "letter"
                              ? "blue.500"
                              : "blue.300"
                          }
                          transform={
                            isSelected(letter.id, "letter")
                              ? "scale(1.05)"
                              : "scale(1)"
                          }
                          transition="all 0.3s ease"
                          boxShadow={
                            isSelected(letter.id, "letter")
                              ? "0 0 20px rgba(59, 130, 246, 0.5)"
                              : "none"
                          }
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

                {/* Objects Column */}
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
                    🎯 Obiectele
                  </Heading>
                  <SimpleGrid columns={2} spacing={6}>
                    {objects.map((object) => (
                      <VStack key={`object-${object.id}`} spacing={2}>
                        <GameCard
                          id={object.id}
                          content={object.object}
                          label={object.name}
                          onClick={() => handleObjectClick(object)}
                          isMatched={isMatched(object.id)}
                          isSelected={
                            selectedTarget?.id === object.id &&
                            selectedTarget?.type === "object"
                          }
                          variant="object"
                          size="large"
                          bg={
                            isMatched(object.id)
                              ? "green.200"
                              : selectedTarget?.id === object.id &&
                                selectedTarget?.type === "object"
                              ? "green.300"
                              : "green.100"
                          }
                          borderColor={
                            isMatched(object.id)
                              ? "green.400"
                              : selectedTarget?.id === object.id &&
                                selectedTarget?.type === "object"
                              ? "green.500"
                              : "green.300"
                          }
                          transform={
                            isSelected(object.id, "object")
                              ? "scale(1.05)"
                              : "scale(1)"
                          }
                          transition="all 0.3s ease"
                          boxShadow={
                            isSelected(object.id, "object")
                              ? "0 0 20px rgba(34, 197, 94, 0.5)"
                              : "none"
                          }
                        />
                        {/* Invisible spacer to match the text height from letter cards */}
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
            </>
          ) : (
            <GameCompletedModal
              isOpen={gameCompleted}
              score={score}
              onRestart={restartGame}
              onHome={() => router.push("/")}
            />
          )}

          <LevelCompletedModal
            isOpen={levelCompleted}
            levelName={currentLevelData?.name}
            onNextLevel={
              currentLevel < letterLevels.length - 1
                ? nextLevel
                : () => setGameCompleted(true)
            }
            onRestart={initializeGame}
            onHome={() => router.push("/")}
            isLastLevel={currentLevel >= letterLevels.length - 1}
          />
        </VStack>
      </Container>
    </Box>
  );
}
