"use client";

import { Box, Text } from "@chakra-ui/react";

const OperatorDisplay = ({
  operator,
  size = "lg",
  color = "red.500",
  minWidth = "12px",
  ...props
}) => (
  <Box
    minW={minWidth}
    display="flex"
    alignItems="center"
    justifyContent="center"
    {...props}
  >
    <Text fontSize={size} fontWeight="bold" color={color}>
      {operator}
    </Text>
  </Box>
);

export default OperatorDisplay;
