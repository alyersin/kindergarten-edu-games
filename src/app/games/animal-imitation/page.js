"use client";

import {
  Box,
  Container,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  IconButton,
  useToast,
  Image,
  Flex,
  Spacer,
  Badge,
  Progress,
} from "@chakra-ui/react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  FaPlay,
  FaPause,
  FaStop,
  FaHome,
  FaRedo,
  FaVolumeUp,
} from "react-icons/fa";
import GameHeader from "../../../components/GameHeader";
import GameCompletedModal from "../../../components/GameCompletedModal";

// Animal data with sounds, movements, and emojis
const animals = [
  {
    id: 1,
    name: "Vaca",
    emoji: "🐄",
    sound: "/sounds/cow.mp3",
    soundText: "Muuu!",
    movement: "Fă mișcări cu capul ca o vacă!",
    description: "Imită vaca - fă 'Muuu' și mișcă capul!",
  },
  {
    id: 2,
    name: "Câinele",
    emoji: "🐕",
    sound: "/sounds/dog.mp3",
    soundText: "Ham ham!",
    movement: "Fă mișcări cu coada ca un câine!",
    description: "Imită câinele - fă 'Ham ham' și mișcă coada!",
  },
  {
    id: 3,
    name: "Pisica",
    emoji: "🐱",
    sound: "/sounds/cat.mp3",
    soundText: "Miau!",
    movement: "Fă mișcări cu ghearele ca o pisică!",
    description: "Imită pisica - fă 'Miau' și mișcă ghearele!",
  },
  {
    id: 4,
    name: "Porcul",
    emoji: "🐷",
    sound: "/sounds/pig.mp3",
    soundText: "Oink oink!",
    movement: "Fă mișcări cu nasul ca un porc!",
    description: "Imită porcul - fă 'Oink oink' și mișcă nasul!",
  },
  {
    id: 5,
    name: "Oaia",
    emoji: "🐑",
    sound: "/sounds/sheep.mp3",
    soundText: "Beee!",
    movement: "Fă mișcări cu capul ca o oaie!",
    description: "Imită oaia - fă 'Beee' și mișcă capul!",
  },
  {
    id: 6,
    name: "Calul",
    emoji: "🐴",
    sound: "/sounds/horse.mp3",
    soundText: "Neigh!",
    movement: "Fă mișcări cu picioarele ca un cal!",
    description: "Imită calul - fă 'Neigh' și mișcă picioarele!",
  },
  {
    id: 7,
    name: "Răța",
    emoji: "🦆",
    sound: "/sounds/duck.mp3",
    soundText: "Quack quack!",
    movement: "Fă mișcări cu aripile ca o răță!",
    description: "Imită răța - fă 'Quack quack' și mișcă aripile!",
  },
  {
    id: 8,
    name: "Găina",
    emoji: "🐔",
    sound: "/sounds/chicken.mp3",
    soundText: "Cotcodac!",
    movement: "Fă mișcări cu aripile ca o găină!",
    description: "Imită găina - fă 'Cotcodac' și mișcă aripile!",
  },
  {
    id: 9,
    name: "Cocoșul",
    emoji: "🐓",
    sound: "/sounds/rooster.mp3",
    soundText: "Cucurigu!",
    movement: "Fă mișcări cu aripile ca un cocoș!",
    description: "Imită cocoșul - fă 'Cucurigu' și mișcă aripile!",
  },
  {
    id: 10,
    name: "Capra",
    emoji: "🐐",
    sound: "/sounds/goat.mp3",
    soundText: "Meeeh!",
    movement: "Fă mișcări cu capul ca o capră!",
    description: "Imită capra - fă 'Meeeh' și mișcă capul!",
  },
];

export default function AnimalImitation() {
  const router = useRouter();
  const toast = useToast();
  const audioRef = useRef(null);
  const musicRef = useRef(null);

  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showInstructions, setShowInstructions] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [musicPaused, setMusicPaused] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showInfoMessage, setShowInfoMessage] = useState(false);
  const [showLevelCompletedMessage, setShowLevelCompletedMessage] =
    useState(false);
  const [messageText, setMessageText] = useState("");

  const currentAnimal = animals[currentAnimalIndex];

  // Background music (you can add a background music file)
  const backgroundMusic = "/sounds/background-music.mp3"; // Add this file if you want background music

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [currentAnimal]);

  const playAnimalSound = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.log("Audio play failed:", error);
        setMessageText(currentAnimal.soundText);
        setShowInfoMessage(true);
        setTimeout(() => setShowInfoMessage(false), 2000);
      });
    }
  };

  const playBackgroundMusic = () => {
    if (musicRef.current) {
      if (isMusicPlaying) {
        musicRef.current.pause();
        setIsMusicPlaying(false);
        setMusicPaused(true);
      } else {
        musicRef.current.play().catch((error) => {
          console.log("Background music play failed:", error);
        });
        setIsMusicPlaying(true);
        setMusicPaused(false);
      }
    }
  };

  const nextAnimal = () => {
    if (currentAnimalIndex < animals.length - 1) {
      setCurrentAnimalIndex(currentAnimalIndex + 1);
      setScore(score + 1);
      setMessageText(`Ai imitat ${currentAnimal.name} perfect!`);
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 2000);
    } else {
      setGameCompleted(true);
      setMessageText("Ai imitat toate animalele!");
      setShowLevelCompletedMessage(true);
      setTimeout(() => setShowLevelCompletedMessage(false), 3000);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setShowInstructions(false);
    playAnimalSound();
  };

  const restartGame = () => {
    setCurrentAnimalIndex(0);
    setScore(0);
    setGameCompleted(false);
    setGameStarted(false);
    setShowInstructions(true);
    setIsPlaying(false);
    setIsMusicPlaying(false);
    setMusicPaused(false);
  };

  const getBackgroundGradient = () => {
    const gradients = [
      "linear(to-br, #FFE4B5, #FFA07A)", // Light peach to salmon
      "linear(to-br, #98FB98, #32CD32)", // Light green to lime
      "linear(to-br, #87CEEB, #4169E1)", // Light blue to royal blue
      "linear(to-br, #FFB6C1, #FF69B4)", // Light pink to hot pink
      "linear(to-br, #DDA0DD, #8A2BE2)", // Plum to blue violet
      "linear(to-br, #F0E68C, #DAA520)", // Khaki to goldenrod
    ];
    return gradients[currentAnimalIndex % gradients.length];
  };

  if (showInstructions) {
    return (
      <Box minH="100vh" bg="linear(to-br, #FFE4B5, #FFA07A)" py={6}>
        <Container maxW="4xl">
          <VStack spacing={8}>
            <GameHeader
              title="🎭 Imită Animalul 🎭"
              levelName="Instrucțiuni"
              description="Imită sunetele și mișcările animalelor!"
              onHomeClick={() => router.push("/")}
              onRestartClick={restartGame}
              textColor="gray.800"
            />

            <Box
              bg="white"
              p={8}
              borderRadius="3xl"
              boxShadow="xl"
              border="3px solid"
              borderColor="orange.400"
              w="full"
              maxW="600px"
            >
              <VStack spacing={6}>
                <Heading size="lg" color="orange.600" textAlign="center">
                  📋 Cum să joci:
                </Heading>

                <VStack spacing={4} align="start" w="full">
                  <HStack spacing={4}>
                    <Text fontSize="2xl">1️⃣</Text>
                    <Text fontSize="lg">
                      Apasă pe &quot;Joacă Sunetul&quot; pentru a auzi animalul
                    </Text>
                  </HStack>

                  <HStack spacing={4}>
                    <Text fontSize="2xl">2️⃣</Text>
                    <Text fontSize="lg">
                      Imită sunetul animalului cu vocea ta
                    </Text>
                  </HStack>

                  <HStack spacing={4}>
                    <Text fontSize="2xl">3️⃣</Text>
                    <Text fontSize="lg">
                      Fă mișcările animalului cu corpul tău
                    </Text>
                  </HStack>

                  <HStack spacing={4}>
                    <Text fontSize="2xl">4️⃣</Text>
                    <Text fontSize="lg">
                      Apasă &quot;Următorul Animal&quot; când ai terminat
                    </Text>
                  </HStack>
                </VStack>

                <Button
                  size="xl"
                  colorScheme="orange"
                  onClick={startGame}
                  leftIcon={<FaPlay />}
                  fontSize="xl"
                  px={8}
                  py={6}
                >
                  Începe Jocul!
                </Button>
              </VStack>
            </Box>
          </VStack>
        </Container>
      </Box>
    );
  }

  return (
    <Box minH="100vh" bg={getBackgroundGradient()} py={6}>
      <Container maxW="6xl">
        <VStack spacing={6}>
          <GameHeader
            title="🎭 Imită Animalul 🎭"
            levelName={`${currentAnimalIndex + 1} din ${animals.length}: ${
              currentAnimal.name
            }`}
            description={currentAnimal.description}
            onHomeClick={() => router.push("/")}
            onRestartClick={restartGame}
            textColor="gray.800"
          />

          {/* Progress */}
          <Box w="full" maxW="400px">
            <Progress
              value={(currentAnimalIndex / animals.length) * 100}
              colorScheme="orange"
              size="lg"
              borderRadius="full"
              bg="whiteAlpha.300"
            />
            <Text
              textAlign="center"
              mt={2}
              fontSize="sm"
              fontWeight="bold"
              color="gray.800"
            >
              Progres: {currentAnimalIndex + 1} / {animals.length}
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
                  Bravo!
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
                <Text fontSize="6xl">🔊</Text>
                <Text fontSize="2xl" fontWeight="bold">
                  Sunetul animalului
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
                  Joc Completat!
                </Text>
                <Text fontSize="lg">{messageText}</Text>
              </VStack>
            </Box>
          )}

          {/* Main Game Area */}
          <Box
            bg="white"
            p={8}
            borderRadius="3xl"
            boxShadow="xl"
            border="3px solid"
            borderColor="orange.400"
            w="full"
            maxW="600px"
          >
            <VStack spacing={8}>
              {/* Animal Display */}
              <VStack spacing={4}>
                <Text
                  fontSize="6xl"
                  filter="drop-shadow(2px 2px 4px rgba(0,0,0,0.3))"
                >
                  {currentAnimal.emoji}
                </Text>
                <Heading size="xl" color="orange.600" textAlign="center">
                  {currentAnimal.name}
                </Heading>
                <Badge colorScheme="orange" fontSize="lg" px={4} py={2}>
                  {currentAnimal.soundText}
                </Badge>
              </VStack>

              {/* Movement Instructions */}
              <Box
                bg="orange.50"
                p={6}
                borderRadius="xl"
                border="2px solid"
                borderColor="orange.200"
                w="full"
              >
                <Text
                  fontSize="lg"
                  color="orange.700"
                  textAlign="center"
                  fontWeight="bold"
                >
                  {currentAnimal.movement}
                </Text>
              </Box>

              {/* Control Buttons */}
              <HStack spacing={4} w="full" justify="center">
                <Button
                  size="lg"
                  colorScheme="green"
                  onClick={playAnimalSound}
                  leftIcon={<FaVolumeUp />}
                  flex="1"
                >
                  Joacă Sunetul
                </Button>

                {backgroundMusic && (
                  <Button
                    size="lg"
                    colorScheme="purple"
                    onClick={playBackgroundMusic}
                    leftIcon={isMusicPlaying ? <FaPause /> : <FaPlay />}
                    variant={musicPaused ? "outline" : "solid"}
                  >
                    {isMusicPlaying ? "Pauză Muzică" : "Muzică"}
                  </Button>
                )}
              </HStack>

              <Button
                size="xl"
                colorScheme="orange"
                onClick={nextAnimal}
                w="full"
                fontSize="xl"
                py={6}
                disabled={currentAnimalIndex >= animals.length - 1}
              >
                {currentAnimalIndex >= animals.length - 1
                  ? "Finalizează Jocul"
                  : "Următorul Animal"}
              </Button>
            </VStack>
          </Box>

          {/* Score Display */}
          <Box
            bg="whiteAlpha.800"
            p={4}
            borderRadius="xl"
            border="2px solid"
            borderColor="orange.300"
          >
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
              Scor: {score} / {animals.length}
            </Text>
          </Box>
        </VStack>
      </Container>

      {/* Audio Elements */}
      <audio ref={audioRef} preload="auto">
        <source src={currentAnimal.sound} type="audio/mpeg" />
      </audio>

      {backgroundMusic && (
        <audio ref={musicRef} preload="auto" loop>
          <source src={backgroundMusic} type="audio/mpeg" />
        </audio>
      )}

      <GameCompletedModal
        isOpen={gameCompleted}
        score={score}
        onRestart={restartGame}
        onHome={() => router.push("/")}
      />
    </Box>
  );
}
