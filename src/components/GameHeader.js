"use client";

import { HStack, VStack, Heading, Text, Button, Icon } from "@chakra-ui/react";
import { FaHome, FaRedo } from "react-icons/fa";

const GameHeader = ({
  title,
  levelName,
  description,
  onHomeClick,
  onRestartClick,
  homeButtonText = "Acasă",
  restartButtonText = "Restart",
  textColor = "gray.700",
  ...props
}) => {
  return (
    <HStack justify="space-between" w="full" {...props}>
      <Button
        leftIcon={<Icon as={FaHome} />}
        onClick={onHomeClick}
        colorScheme="blue"
        size="lg"
      >
        {homeButtonText}
      </Button>

      <VStack spacing={2}>
        <Heading
          textAlign="center"
          size="lg"
          color={textColor}
          textShadow={
            textColor === "white" ? "2px 2px 4px rgba(0,0,0,0.5)" : "none"
          }
        >
          {title}
        </Heading>
        {levelName && (
          <Text
            fontWeight="bold"
            fontSize="lg"
            color={textColor}
            textShadow={
              textColor === "white" ? "2px 2px 4px rgba(0,0,0,0.5)" : "none"
            }
          >
            Nivel: {levelName}
          </Text>
        )}
        {description && (
          <Text
            fontSize="md"
            textAlign="center"
            color={textColor}
            textShadow={
              textColor === "white" ? "2px 2px 4px rgba(0,0,0,0.5)" : "none"
            }
          >
            {description}
          </Text>
        )}
      </VStack>

      <Button
        leftIcon={<Icon as={FaRedo} />}
        onClick={onRestartClick}
        colorScheme="purple"
        size="lg"
      >
        {restartButtonText}
      </Button>
    </HStack>
  );
};

export default GameHeader;
