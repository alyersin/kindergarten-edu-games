"use client";

import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  useToast,
  SimpleGrid,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { getOptimalColors } from "../../../utils/colors";
import React from "react";
import GameCard from "../../../components/GameCard";
import GameHeader from "../../../components/GameHeader";
import GameProgress from "../../../components/GameProgress";
import LevelCompletedModal from "../../../components/LevelCompletedModal";
import GameCompletedModal from "../../../components/GameCompletedModal";
import useGameLogic from "../../../hooks/useGameLogic";
import { sequencePatterns } from "../../../data/logicData";

// Convert sequence patterns data to game levels format
const sequenceLevels = [
  {
    id: 1,
    name: "Secvențe Simple",
    description: "Continuă secvențele simple",
    patterns: sequencePatterns.easy,
  },
  {
    id: 2,
    name: "Secvențe Medii",
    description: "Continuă secvențele medii",
    patterns: sequencePatterns.medium,
  },
  {
    id: 3,
    name: "Secvențe Complexe",
    description: "Continuă secvențele complexe",
    patterns: sequencePatterns.hard,
  },
  {
    id: 4,
    name: "Secvențe Expert",
    description: "Continuă secvențele expert",
    patterns: sequencePatterns.expert,
  },
  {
    id: 5,
    name: "Secvențe Master",
    description: "Continuă secvențele master",
    patterns: sequencePatterns.master,
  },
];

export default function SequencePatterns() {
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
  } = useGameLogic(sequenceLevels);

  const colors = getOptimalColors();
  const bgColor = "blue.400"; // Same color as the homepage button
  const [currentPattern, setCurrentPattern] = useState(null);
  const [patternIndex, setPatternIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);

  // Initialize current pattern when level changes
  useEffect(() => {
    if (currentLevelData?.patterns) {
      setCurrentPattern(currentLevelData.patterns[0]);
      setPatternIndex(0);
      setSelectedAnswer(null);
      setAnswerSubmitted(false);
    }
  }, [currentLevelData]);

  const handleAnswerClick = (answer) => {
    if (answerSubmitted) return;
    setSelectedAnswer(answer);
  };

  const submitAnswer = () => {
    if (!selectedAnswer || answerSubmitted) return;

    setAnswerSubmitted(true);

    if (selectedAnswer === currentPattern.answer) {
      setShowSuccessMessage(true);

      // Move to next pattern or level
      setTimeout(() => {
        setShowSuccessMessage(false);
        if (patternIndex < currentLevelData.patterns.length - 1) {
          // Next pattern in same level
          setPatternIndex(patternIndex + 1);
          setCurrentPattern(currentLevelData.patterns[patternIndex + 1]);
          setSelectedAnswer(null);
          setAnswerSubmitted(false);
        } else {
          // Level completed
          setLevelCompleted(true);
        }
      }, 2000);
    } else {
      setShowErrorMessage(true);

      // Reset after showing error
      setTimeout(() => {
        setShowErrorMessage(false);
        setSelectedAnswer(null);
        setAnswerSubmitted(false);
      }, 2000);
    }
  };

  const handleNextLevel = () => {
    nextLevel();
    setPatternIndex(0);
    setSelectedAnswer(null);
    setAnswerSubmitted(false);
  };

  const handleRestart = () => {
    restartGame();
    setPatternIndex(0);
    setSelectedAnswer(null);
    setAnswerSubmitted(false);
  };

  if (!currentPattern) {
    return (
      <Box minH="100vh" bg={bgColor} py={6}>
        <Container maxW="6xl">
          <VStack spacing={8}>
            <Text>Se încarcă jocul...</Text>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg={bgColor} py={6}>
      <Container maxW="6xl">
        <VStack spacing={8}>
          <GameHeader
            title="🔗 Secvențe și Modele"
            levelName="Continuă secvențele și descoperă modelele!"
            onHomeClick={() => router.push("/")}
            onRestartClick={handleRestart}
            textColor={colors.textColor}
          />

          <GameProgress
            current={currentLevel + 1}
            total={sequenceLevels.length}
            label="Nivel"
            textColor={colors.textColor}
          />

          {/* Game Content */}
          <VStack spacing={8} w="full">
            {/* Pattern Display */}
            <Box
              w="full"
              maxW="4xl"
              p={8}
              borderRadius="3xl"
              border="4px solid"
              borderColor="blue.300"
              textAlign="center"
              boxShadow="xl"
              bg="white"
              position="relative"
            >
              <VStack spacing={6}>
                <Heading size="lg" color="blue.700" mb={4}>
                  {currentPattern.title}
                </Heading>

                {/* Pattern Display */}
                <HStack spacing={4} justify="center" flexWrap="wrap">
                  {currentPattern.pattern.map((item, index) => (
                    <Box
                      key={index}
                      fontSize="4xl"
                      p={4}
                      bg="blue.50"
                      borderRadius="lg"
                      border="2px solid"
                      borderColor="blue.200"
                      minW="80px"
                      textAlign="center"
                    >
                      {item}
                    </Box>
                  ))}
                  <Box
                    fontSize="4xl"
                    p={4}
                    bg="yellow.100"
                    borderRadius="lg"
                    border="2px solid"
                    borderColor="yellow.400"
                    minW="80px"
                    textAlign="center"
                    color="yellow.600"
                  >
                    ?
                  </Box>
                </HStack>

                {/* Success Message */}
                {showSuccessMessage && (
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    zIndex="10"
                    bg="green.500"
                    color="white"
                    p={6}
                    borderRadius="xl"
                    boxShadow="2xl"
                    textAlign="center"
                    minW="300px"
                  >
                    <VStack spacing={3}>
                      <Text fontSize="6xl">✅</Text>
                      <Text fontSize="2xl" fontWeight="bold">
                        Corect!
                      </Text>
                      <Text fontSize="lg">Răspunsul este perfect!</Text>
                    </VStack>
                  </Box>
                )}

                {/* Error Message */}
                {showErrorMessage && (
                  <Box
                    position="absolute"
                    top="50%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    zIndex="10"
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
                      <Text fontSize="lg">Încearcă din nou!</Text>
                    </VStack>
                  </Box>
                )}

                {/* Answer Options */}
                <SimpleGrid columns={2} spacing={4} w="full" maxW="md">
                  {(() => {
                    // Generate unique answer options
                    const correctAnswer = currentPattern.answer;
                    const allOptions = [
                      "🔴",
                      "🔵",
                      "🟡",
                      "🟢",
                      "🟣",
                      "🟠",
                      "🔺",
                      "🔸",
                      "⬜",
                      "🔶",
                      "🔷",
                      "🐱",
                      "🐶",
                      "🐰",
                      "🐸",
                      "🍎",
                      "🍌",
                      "🍊",
                      "🍇",
                      "🍓",
                      "🍒",
                      "⭐",
                      "🌟",
                      "✨",
                      "❤️",
                      "💙",
                      "💚",
                      "🚗",
                      "🚕",
                      "🚙",
                      "🌞",
                      "🌙",
                      "☁️",
                    ];

                    // Filter out the correct answer and get 3 random wrong options
                    const wrongOptions = allOptions.filter(
                      (option) => option !== correctAnswer
                    );
                    const shuffledWrong = wrongOptions.sort(
                      () => Math.random() - 0.5
                    );
                    const selectedWrong = shuffledWrong.slice(0, 3);

                    // Combine correct answer with wrong options and shuffle
                    const allAnswers = [correctAnswer, ...selectedWrong];
                    return allAnswers.sort(() => Math.random() - 0.5);
                  })().map((option, index) => (
                    <Button
                      key={index}
                      size="lg"
                      fontSize="2xl"
                      variant={selectedAnswer === option ? "solid" : "outline"}
                      colorScheme={selectedAnswer === option ? "green" : "blue"}
                      minW="120px"
                      h="60px"
                      onClick={() => handleAnswerClick(option)}
                      disabled={answerSubmitted}
                      _hover={{
                        transform: "scale(1.05)",
                        boxShadow: "lg",
                      }}
                      transition="all 0.2s"
                    >
                      {option}
                    </Button>
                  ))}
                </SimpleGrid>

                {/* Submit Button */}
                {selectedAnswer && !answerSubmitted && (
                  <Button
                    onClick={submitAnswer}
                    bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                    color="white"
                    size="xl"
                    fontSize="xl"
                    fontWeight="bold"
                    h="60px"
                    px={8}
                    borderRadius="25px"
                    _hover={{
                      bg: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                    }}
                    _active={{ transform: "translateY(0)" }}
                    transition="all 0.3s"
                  >
                    Verifică Răspunsul
                  </Button>
                )}
              </VStack>
            </Box>

            {/* Level Info */}
            <Text
              fontSize="lg"
              color={colors.textColor}
              textAlign="center"
              fontWeight="bold"
            >
              Nivel {currentLevel + 1}: {currentLevelData?.name}
            </Text>
          </VStack>

          {/* Modals */}
          {levelCompleted && (
            <LevelCompletedModal
              isOpen={levelCompleted}
              onClose={() => setLevelCompleted(false)}
              onNextLevel={handleNextLevel}
              levelName={currentLevelData?.name}
              textColor={colors.textColor}
            />
          )}

          {gameCompleted && (
            <GameCompletedModal
              isOpen={gameCompleted}
              onClose={() => setGameCompleted(false)}
              onRestart={handleRestart}
              finalScore={score}
              textColor={colors.textColor}
            />
          )}
        </VStack>
      </Container>
    </Box>
  );
}
