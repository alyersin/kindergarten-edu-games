"use client";

import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FaRedo, FaHome } from "react-icons/fa";

const GameCompletedModal = ({ isOpen, score, onRestart, onHome, ...props }) => {
  if (!isOpen) return null;

  return (
    <Box
      bg="purple.100"
      border="4px solid"
      borderColor="purple.400"
      borderRadius="xl"
      p={8}
      textAlign="center"
      maxW="md"
      {...props}
    >
      <Text fontSize="4xl" mb={4}>
        🏆
      </Text>
      <Heading size="lg" color="purple.700" mb={4}>
        Felicitări!
      </Heading>
      <Text fontSize="lg" color="purple.600" mb={6}>
        Ai terminat toate nivelurile! Scorul tău: {score}
      </Text>
      <HStack justify="center" spacing={4}>
        <Button
          onClick={onRestart}
          colorScheme="purple"
          size="lg"
          leftIcon={<Icon as={FaRedo} />}
        >
          Joacă Din Nou
        </Button>
        <Button
          onClick={onHome}
          colorScheme="blue"
          size="lg"
          leftIcon={<Icon as={FaHome} />}
        >
          Acasă
        </Button>
      </HStack>
    </Box>
  );
};

export default GameCompletedModal;
