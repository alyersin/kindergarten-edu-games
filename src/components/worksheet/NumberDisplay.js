"use client";

import { Box, Text } from "@chakra-ui/react";

const NumberDisplay = ({
  value,
  size = "md",
  color = "blue.700",
  minWidth = "55px",
  ...props
}) => (
  <Box
    minW={minWidth}
    display="flex"
    alignItems="center"
    justifyContent="center"
    {...props}
  >
    <Text fontSize={size} fontWeight="bold" color={color} textAlign="center">
      {value}
    </Text>
  </Box>
);

export default NumberDisplay;
