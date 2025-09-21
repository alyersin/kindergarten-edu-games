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
  Center,
} from "@chakra-ui/react";
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { FaHome, FaRedo } from "react-icons/fa";
import { shuffleArray } from "../../../utils/array";
import quizData from "../../../data/quizQuestions.json";

const quizQuestions = quizData.questions;

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [showLevelCompletedMessage, setShowLevelCompletedMessage] =
    useState(false);
  const [messageText, setMessageText] = useState("");
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const toast = useToast();
  const router = useRouter();

  const question = shuffledQuestions[currentQuestion];

  // Function to play animal sounds
  const playAnimalSound = useCallback((soundName) => {
    if (soundName) {
      try {
        // Create audio element and play sound
        const audio = new Audio(`/sounds/${soundName}.mp3`);
        audio.volume = 0.7; // Set volume to 70%
        audio.play().catch((error) => {
          console.log("Could not play sound:", error);
          // Fallback: use Web Audio API for simple beep sounds
          playBeepSound(soundName);
        });
      } catch (error) {
        console.log("Audio not available:", error);
        playBeepSound(soundName);
      }
    }
  }, []);

  // Fallback function to create simple beep sounds
  const playBeepSound = (soundName) => {
    try {
      const audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Different frequencies for different animals
      const frequencies = {
        cat: 800,
        dog: 400,
        cow: 200,
        pig: 300,
        duck: 600,
        rooster: 500,
        sheep: 250,
        goat: 350,
        horse: 150,
        chicken: 700,
        donkey: 180,
        geese: 550,
        turkey: 320,
      };

      oscillator.frequency.setValueAtTime(
        frequencies[soundName] || 440,
        audioContext.currentTime
      );
      oscillator.type = "sine";

      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(
        0.01,
        audioContext.currentTime + 0.5
      );

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (error) {
      console.log("Web Audio API not available:", error);
    }
  };

  // Play sound when question changes
  useEffect(() => {
    if (question && question.sound) {
      // Play sound after a short delay to let the UI update
      const timer = setTimeout(() => {
        playAnimalSound(question.sound);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [currentQuestion, question, playAnimalSound]);

  // Initialize game on component mount
  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    // Shuffle questions for random order
    const shuffled = shuffleArray([...quizQuestions]);
    setShuffledQuestions(shuffled);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setGameCompleted(false);
    setAnswerSubmitted(false);
  };

  const handleAnswerClick = (answer) => {
    if (answerSubmitted) return;
    setSelectedAnswer(answer);
  };

  const submitAnswer = () => {
    if (!selectedAnswer || answerSubmitted) return;

    setAnswerSubmitted(true);
    setShowResult(true);

    if (selectedAnswer.correct) {
      setScore(score + 1);
      setMessageText("Răspuns foarte bun!");
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 2000);
    } else {
      setMessageText(
        `Răspunsul corect era: ${question.answers.find((a) => a.correct).emoji}`
      );
      setShowErrorMessage(true);
      setTimeout(() => setShowErrorMessage(false), 3000);
    }

    // Move to next question after delay
    setTimeout(() => {
      if (currentQuestion + 1 < shuffledQuestions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setAnswerSubmitted(false);
      } else {
        // Game completed
        setGameCompleted(true);
        setMessageText(
          `Ai terminat quiz-ul cu ${
            score + (selectedAnswer?.correct ? 1 : 0)
          } răspunsuri corecte din ${shuffledQuestions.length}!`
        );
        setShowLevelCompletedMessage(true);
        setTimeout(() => setShowLevelCompletedMessage(false), 4000);
      }
    }, 3000);
  };

  const getAnswerButtonProps = (answer) => {
    const baseProps = {
      size: "xl",
      h: "120px",
      w: "full",
      fontSize: "2xl",
      fontWeight: "bold",
      borderRadius: "20px",
      border: "4px solid",
      transition: "all 0.3s",
    };

    if (answerSubmitted) {
      if (answer.correct) {
        return {
          ...baseProps,
          bg: "green.200",
          borderColor: "green.500",
          color: "green.800",
          _hover: {},
        };
      } else if (selectedAnswer?.id === answer.id && !answer.correct) {
        return {
          ...baseProps,
          bg: "red.200",
          borderColor: "red.500",
          color: "red.800",
          _hover: {},
        };
      } else {
        return {
          ...baseProps,
          bg: "gray.100",
          borderColor: "gray.300",
          color: "gray.600",
          _hover: {},
        };
      }
    }

    if (selectedAnswer?.id === answer.id) {
      return {
        ...baseProps,
        bg: `${answer.color}.300`,
        borderColor: `${answer.color}.500`,
        color: `${answer.color}.800`,
        transform: "scale(1.02)",
        _hover: {
          transform: "scale(1.02)",
        },
      };
    }

    return {
      ...baseProps,
      bg: `${answer.color}.100`,
      borderColor: `${answer.color}.300`,
      color: `${answer.color}.700`,
      _hover: {
        bg: `${answer.color}.200`,
        borderColor: `${answer.color}.400`,
        transform: "scale(1.05)",
      },
    };
  };

  // Show loading if no questions are available yet
  if (shuffledQuestions.length === 0) {
    return (
      <Box minH="100vh" bg="red.50" py={6}>
        <Container maxW="4xl">
          <Center h="50vh">
            <Text fontSize="xl" color="red.600">
              Se încarcă întrebările...
            </Text>
          </Center>
        </Container>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg="red.50" py={6}>
      <Container maxW="4xl">
        <VStack spacing={8}>
          {/* Header */}
          <HStack justify="space-between" w="full">
            <Button
              leftIcon={<Icon as={FaHome} />}
              onClick={() => router.push("/")}
              colorScheme="blue"
              size="lg"
            >
              Acasă
            </Button>

            <Heading color="red.700" textAlign="center">
              ❓ Întrebări și Răspunsuri ❓
            </Heading>

            <Button
              leftIcon={<Icon as={FaRedo} />}
              onClick={initializeGame}
              colorScheme="purple"
              size="lg"
            >
              Restart
            </Button>
          </HStack>

          {!gameCompleted ? (
            <>
              {/* Progress */}
              <Box w="full" maxW="md">
                <Text mb={2} fontWeight="bold" color="red.600">
                  Întrebarea {currentQuestion + 1} din{" "}
                  {shuffledQuestions.length} | Scor: {score}
                </Text>
                <Progress
                  value={
                    ((currentQuestion + 1) / shuffledQuestions.length) * 100
                  }
                  colorScheme="red"
                  size="lg"
                  borderRadius="full"
                />
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
                    <Text fontSize="6xl">😊</Text>
                    <Text fontSize="2xl" fontWeight="bold">
                      Încearcă să te gândești mai bine!
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
                      Quiz Completat!
                    </Text>
                    <Text fontSize="lg">{messageText}</Text>
                  </VStack>
                </Box>
              )}

              {/* Question */}
              <Box
                bg="white"
                p={8}
                borderRadius="3xl"
                border="4px solid"
                borderColor="red.300"
                textAlign="center"
                boxShadow="xl"
                w="full"
              >
                <HStack justify="center" mb={4}>
                  <Text fontSize="6xl">{question.emoji}</Text>
                  {question.sound && (
                    <Button
                      onClick={() => playAnimalSound(question.sound)}
                      colorScheme="green"
                      size="lg"
                      borderRadius="full"
                      leftIcon={<Text fontSize="2xl">🔊</Text>}
                      _hover={{ transform: "scale(1.1)" }}
                      transition="all 0.2s"
                    >
                      Ascultă sunetul!
                    </Button>
                  )}
                </HStack>
                <Heading size="lg" color="red.700" mb={6}>
                  {question.question}
                </Heading>
              </Box>

              {/* Answers */}
              <SimpleGrid columns={1} spacing={6} w="full" maxW="2xl">
                {question.answers.map((answer) => (
                  <Button
                    key={answer.id}
                    onClick={() => handleAnswerClick(answer)}
                    {...getAnswerButtonProps(answer)}
                    disabled={answerSubmitted}
                  >
                    <Text fontSize="6xl">{answer.emoji}</Text>
                  </Button>
                ))}
              </SimpleGrid>

              {/* Submit Button */}
              {selectedAnswer && !answerSubmitted && (
                <Button
                  onClick={submitAnswer}
                  bg="linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 50%, #FF6B6B 100%)"
                  color="white"
                  size="xl"
                  fontSize="2xl"
                  fontWeight="bold"
                  h="100px"
                  px={16}
                  borderRadius="25px"
                  border="4px solid"
                  borderColor="red.300"
                  boxShadow="0 8px 25px rgba(255, 107, 107, 0.4)"
                  _hover={{
                    transform: "scale(1.08) translateY(-5px)",
                    boxShadow: "0 12px 35px rgba(255, 107, 107, 0.6)",
                    bg: "linear-gradient(135deg, #FF5252 0%, #FF7979 50%, #FF5252 100%)",
                  }}
                  _active={{
                    transform: "scale(0.98) translateY(-2px)",
                  }}
                  animation="bounce 2s infinite"
                  sx={{
                    "@keyframes bounce": {
                      "0%, 20%, 50%, 80%, 100%": {
                        transform: "translateY(0) scale(1.05)",
                      },
                      "40%": {
                        transform: "translateY(-10px) scale(1.08)",
                      },
                      "60%": {
                        transform: "translateY(-5px) scale(1.06)",
                      },
                    },
                  }}
                >
                  🎯 Apasă aici! 🎯
                </Button>
              )}

              {/* Result Message */}
              {showResult && (
                <Box
                  bg={selectedAnswer?.correct ? "green.100" : "orange.100"}
                  p={6}
                  borderRadius="xl"
                  border="3px solid"
                  borderColor={
                    selectedAnswer?.correct ? "green.400" : "orange.400"
                  }
                  textAlign="center"
                >
                  <Text
                    fontSize="xl"
                    fontWeight="bold"
                    color={selectedAnswer?.correct ? "green.600" : "orange.600"}
                  >
                    {selectedAnswer?.correct
                      ? "🎉 Foarte bine! Răspuns corect!"
                      : `😊 Răspunsul corect era: ${
                          question.answers.find((a) => a.correct).text
                        }`}
                  </Text>
                  {currentQuestion + 1 < quizData.length && (
                    <Text mt={2} color="gray.600">
                      Următoarea întrebare în curând...
                    </Text>
                  )}
                </Box>
              )}
            </>
          ) : (
            /* Game Completed */
            <Center w="full">
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
                  Felicitări! Ai terminat quiz-ul!
                </Heading>
                <Text fontSize="2xl" fontWeight="bold" color="green.600" mb={6}>
                  Scor final: {score} din {quizData.length} răspunsuri corecte
                </Text>
                <Text fontSize="lg" color="green.600" mb={8}>
                  {score === quizData.length
                    ? "Perfect! Toate răspunsurile au fost corecte!"
                    : score >= quizData.length * 0.8
                    ? "Foarte bine! Știi multe lucruri!"
                    : score >= quizData.length * 0.6
                    ? "Bun! Continuă să înveți!"
                    : "Încearcă din nou să înveți mai mult!"}
                </Text>
                <HStack justify="center" spacing={6}>
                  <Button
                    onClick={initializeGame}
                    colorScheme="red"
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
            </Center>
          )}
        </VStack>
      </Container>
    </Box>
  );
}
