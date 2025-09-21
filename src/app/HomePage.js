"use client";

import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Button,
  VStack,
  Text,
  Icon,
  useColorModeValue,
  Tooltip,
  Badge,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import {
  FaFont,
  FaCalculator,
  FaQuestionCircle,
  FaEye,
  FaPuzzlePiece,
  FaCircle,
  FaTheaterMasks,
  FaFileAlt,
  FaLink,
} from "react-icons/fa";

const games = [
  {
    id: "shadow-matching",
    title: "Potrivirea Umbrelor",
    description: "Potrivește umbra cu obiectul corect",
    icon: FaEye,
    color: "purple.400",
    route: "/games/shadow-matching",
  },
  {
    id: "letter-matching",
    title: "Litere și Obiecte",
    description: "Potrivește literele cu obiectele (A - Avion)",
    icon: FaFont,
    color: "green.400",
    route: "/games/letter-matching",
  },
  {
    id: "number-matching",
    title: "Cifre și Cantități",
    description: "Potrivește cifrele cu cantitățile (3 mere → 3)",
    icon: FaCalculator,
    color: "orange.400",
    route: "/games/number-matching",
  },
  {
    id: "quiz",
    title: "Întrebări și Răspunsuri",
    description: "Răspunde la întrebări cu răspunsuri mari și colorate",
    icon: FaQuestionCircle,
    color: "red.400",
    route: "/games/quiz",
  },
  {
    id: "puzzle",
    title: "Puzzle-uri Simple",
    description: "Trage și plasează piesele pentru a completa puzzle-urile",
    icon: FaPuzzlePiece,
    color: "pink.400",
    route: "/games/puzzle",
    disabled: true,
    comingSoon: "În curând! 🚧",
  },
  {
    id: "wheel-of-fortune",
    title: "Învârte Roata",
    description: "Învârte roata și potrivește elementele selectate",
    icon: FaCircle,
    color: "purple.400",
    route: "/games/wheel-of-fortune",
    disabled: true,
    comingSoon: "În curând! 🚧",
  },
  {
    id: "animal-imitation",
    title: "Imită Animalul",
    description: "Imită sunetele și mișcările animalelor cu muzică",
    icon: FaTheaterMasks,
    color: "orange.400",
    route: "/games/animal-imitation",
  },
  {
    id: "sequence-patterns",
    title: "Secvențe și Modele",
    description: "Continuă secvențele și descoperă modelele",
    icon: FaLink,
    color: "blue.400",
    route: "/games/sequence-patterns",
  },
  {
    id: "worksheets",
    title: "Generator de Fișe",
    description: "Creează și printează fișe educaționale pentru copii",
    icon: FaFileAlt,
    color: "teal.400",
    route: "/worksheets",
  },
];

export default function HomePage() {
  const router = useRouter();
  const bgColor = useColorModeValue("blue.50", "blue.900");
  const cardBg = useColorModeValue("white", "gray.800");

  return (
    <Box minH="100vh" bg={bgColor} py={8}>
      <Container maxW="6xl">
        <VStack spacing={8}>
          <Heading
            size="2xl"
            color="brand.700"
            textAlign="center"
            textShadow="2px 2px 4px rgba(0,0,0,0.1)"
          >
            🎮 Jocuri Educaționale 🎮
          </Heading>

          <Text fontSize="xl" color="gray.600" textAlign="center">
            Alege un joc pentru a începe să înveți!
          </Text>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8} w="full">
            {games.map((game) => (
              <Tooltip
                key={game.id}
                label={game.disabled ? game.comingSoon : ""}
                hasArrow
                placement="top"
                bg="orange.500"
                color="white"
                fontSize="md"
                fontWeight="bold"
                borderRadius="lg"
                p={3}
                boxShadow="xl"
                isDisabled={!game.disabled}
              >
                <Box
                  bg={cardBg}
                  p={8}
                  borderRadius="3xl"
                  boxShadow="xl"
                  border="3px solid"
                  borderColor={game.disabled ? "gray.300" : game.color}
                  transition="all 0.3s"
                  _hover={{
                    transform: game.disabled ? "none" : "translateY(-5px)",
                    boxShadow: game.disabled ? "xl" : "2xl",
                  }}
                  cursor={game.disabled ? "not-allowed" : "pointer"}
                  onClick={
                    game.disabled ? undefined : () => router.push(game.route)
                  }
                  h="full"
                  display="flex"
                  flexDirection="column"
                  opacity={game.disabled ? 0.6 : 1}
                  position="relative"
                >
                  {/* Coming Soon Badge */}
                  {game.disabled && (
                    <Badge
                      position="absolute"
                      top={4}
                      right={4}
                      colorScheme="orange"
                      fontSize="xs"
                      px={2}
                      py={1}
                      borderRadius="full"
                      fontWeight="bold"
                    >
                      🚧 În Dezvoltare
                    </Badge>
                  )}

                  <VStack spacing={6} h="full" justify="space-between">
                    <VStack spacing={6} flex="1">
                      <Icon
                        as={game.icon}
                        w={20}
                        h={20}
                        color={game.disabled ? "gray.400" : game.color}
                      />

                      <Heading
                        size="lg"
                        color={game.disabled ? "gray.500" : "gray.700"}
                        textAlign="center"
                      >
                        {game.title}
                      </Heading>

                      <Text
                        fontSize="md"
                        color={game.disabled ? "gray.500" : "gray.600"}
                        textAlign="center"
                        lineHeight="1.6"
                        flex="1"
                      >
                        {game.description}
                      </Text>
                    </VStack>

                    <Button
                      variant="game"
                      size="xl"
                      bg={game.disabled ? "gray.300" : game.color}
                      color={game.disabled ? "gray.600" : "white"}
                      _hover={{
                        bg: game.disabled ? "gray.300" : game.color,
                        opacity: game.disabled ? 1 : 0.8,
                      }}
                      cursor={game.disabled ? "not-allowed" : "pointer"}
                      onClick={
                        game.disabled
                          ? undefined
                          : (e) => {
                              e.stopPropagation();
                              router.push(game.route);
                            }
                      }
                      mt="auto"
                      isDisabled={game.disabled}
                    >
                      {game.disabled
                        ? "În Dezvoltare"
                        : game.id === "worksheets"
                        ? "Generează Fișe!"
                        : "Joacă Acum!"}
                    </Button>
                  </VStack>
                </Box>
              </Tooltip>
            ))}
          </SimpleGrid>
        </VStack>
      </Container>
    </Box>
  );
}
