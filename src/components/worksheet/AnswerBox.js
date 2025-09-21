"use client";

import { Box, Text } from "@chakra-ui/react";

const AnswerBox = ({
  includeAnswers,
  answer,
  minWidth = "40px",
  height = "40px",
  ...props
}) => (
  <Box
    minW={minWidth}
    h={height}
    border="2px dashed"
    borderColor="green.400"
    borderRadius="md"
    display="flex"
    alignItems="center"
    justifyContent="center"
    bg="gray.50"
    {...props}
  >
    {includeAnswers && (
      <Text fontSize="lg" fontWeight="bold" color="green.700">
        {answer}
      </Text>
    )}
  </Box>
);

export default AnswerBox;
