"use client";

import { Button, VStack, Text } from "@chakra-ui/react";

const GameCard = ({
  id,
  content,
  label,
  onClick,
  isMatched = false,
  isSelected = false,
  isDisabled = false,
  size = "large",
  variant = "default",
  displayText,
  item,
  fontSize,
  bg,
  borderColor,
  _hover,
  // Drag & Drop props
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  draggable,
  cursor,
  opacity,
  ...props
}) => {
  const getSizeStyles = () => {
    switch (size) {
      case "small":
        return { w: "120px", h: "120px", fontSize: "4xl" };
      case "medium":
        return { w: "140px", h: "140px", fontSize: "5xl" };
      case "large":
        return { w: "160px", h: "160px", fontSize: "6xl" };
      default:
        return { w: "160px", h: "160px", fontSize: "6xl" };
    }
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "letter":
        return {
          bg: isMatched ? "green.200" : isSelected ? "green.300" : "white",
          color: "green.700",
          borderColor: isSelected ? "green.500" : "green.200",
          transform: isSelected ? "scale(1.05)" : "scale(1)",
          boxShadow: isSelected ? "0 0 20px rgba(34, 197, 94, 0.5)" : "none",
          _hover: { bg: isMatched ? "green.200" : "green.100" },
        };
      case "object":
        return {
          bg: isMatched ? "green.200" : isSelected ? "blue.300" : "white",
          color: "blue.700",
          borderColor: isSelected ? "blue.500" : "blue.200",
          transform: isSelected ? "scale(1.05)" : "scale(1)",
          boxShadow: isSelected ? "0 0 20px rgba(59, 130, 246, 0.5)" : "none",
          _hover: { bg: isMatched ? "green.200" : "blue.100" },
        };
      case "shadow":
        return {
          bg: isMatched ? "purple.200" : isSelected ? "purple.300" : "white",
          color: "purple.700",
          borderColor: isSelected ? "purple.500" : "purple.200",
          transform: isSelected ? "scale(1.05)" : "scale(1)",
          boxShadow: isSelected ? "0 0 20px rgba(147, 51, 234, 0.5)" : "none",
          _hover: { bg: isMatched ? "purple.200" : "purple.100" },
        };
      case "number":
        return {
          bg: isMatched ? "orange.200" : isSelected ? "orange.300" : "white",
          color: "orange.700",
          borderColor: isSelected ? "orange.500" : "orange.200",
          transform: isSelected ? "scale(1.05)" : "scale(1)",
          boxShadow: isSelected ? "0 0 20px rgba(249, 115, 22, 0.5)" : "none",
          _hover: { bg: isMatched ? "orange.200" : "orange.100" },
        };
      default:
        return {
          bg: isMatched ? "gray.200" : isSelected ? "gray.300" : "white",
          color: "gray.700",
          borderColor: isSelected ? "gray.500" : "gray.200",
          _hover: { bg: isMatched ? "gray.200" : "gray.100" },
        };
    }
  };

  const sizeStyles = getSizeStyles();
  const variantStyles = getVariantStyles();

  // Merge custom styles with variant styles
  const finalStyles = {
    ...variantStyles,
    ...(bg && { bg }),
    ...(borderColor && { borderColor }),
    ...(fontSize && { fontSize }),
    ...(_hover && { _hover }),
  };

  return (
    <VStack spacing={2}>
      <Button
        key={id}
        onClick={onClick}
        size="xl"
        h={sizeStyles.h}
        w={sizeStyles.w}
        fontSize={fontSize || sizeStyles.fontSize}
        fontWeight="bold"
        borderRadius="xl"
        border="3px solid"
        opacity={opacity !== undefined ? opacity : isMatched ? 0.7 : 1}
        cursor={cursor || (isDisabled ? "not-allowed" : "pointer")}
        disabled={isDisabled}
        // Drag & Drop props
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        draggable={draggable}
        {...finalStyles}
        {...props}
      >
        {displayText || content}
      </Button>
      {label && (
        <Text
          fontSize="sm"
          fontWeight="bold"
          color={finalStyles.color}
          textAlign="center"
          maxW={sizeStyles.w}
        >
          {label}
        </Text>
      )}
    </VStack>
  );
};

export default GameCard;
