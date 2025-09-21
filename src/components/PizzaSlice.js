"use client";

import { Box, Text, VStack } from "@chakra-ui/react";

const PizzaSlice = ({
  item,
  index,
  totalItems,
  isSelected = false,
  onClick = null,
}) => {
  // Calculate the angle for this slice
  const sliceAngle = 360 / totalItems;
  const startAngle = index * sliceAngle;
  const centerAngle = startAngle + sliceAngle / 2;

  // Calculate position for content - all numbers at same height from center
  const radius = 40; // Distance from center - same for all slices (increased for larger wheel)
  const x = Math.cos(((centerAngle - 90) * Math.PI) / 180) * radius;
  const y = Math.sin(((centerAngle - 90) * Math.PI) / 180) * radius;

  return (
    <Box
      position="absolute"
      top="50%"
      left="50%"
      w="50%"
      h="50%"
      transformOrigin="0 0"
      transform={`rotate(${startAngle}deg)`}
      cursor={onClick ? "pointer" : "default"}
      onClick={onClick}
      _hover={
        onClick
          ? {
              transform: `rotate(${startAngle}deg) scale(1.05)`,
              zIndex: 10,
            }
          : {}
      }
      transition="all 0.3s ease"
    >
      {/* Pizza Slice Card */}
      <Box
        position="absolute"
        top={`${50 + y}%`}
        left={`${50 + x}%`}
        transform="translate(-50%, -50%)"
        bg="rgba(0,0,0,0.4)"
        borderRadius="xl"
        p={3}
        minW="90px"
        minH="80px"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        border="3px solid"
        borderColor="rgba(255,255,255,0.6)"
        backdropFilter="blur(15px)"
        boxShadow="0 6px 20px rgba(0,0,0,0.4)"
        zIndex="5"
        _hover={{
          bg: "rgba(0,0,0,0.5)",
          borderColor: "rgba(255,255,255,0.8)",
          boxShadow: "0 8px 25px rgba(0,0,0,0.5)",
        }}
      >
        <VStack spacing={2} align="center">
          <Text
            fontSize="3xl"
            fontWeight="bold"
            color="white"
            textShadow="3px 3px 8px rgba(0,0,0,0.9)"
            lineHeight="1"
            textAlign="center"
          >
            {item.pizzaTopping}
          </Text>
          <Text
            fontSize="md"
            fontWeight="bold"
            color="white"
            textShadow="2px 2px 6px rgba(0,0,0,0.9)"
            textAlign="center"
            lineHeight="1.1"
            maxW="80px"
            noOfLines={2}
          >
            {item.name}
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default PizzaSlice;
