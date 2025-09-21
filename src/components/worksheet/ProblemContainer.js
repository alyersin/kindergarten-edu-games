"use client";

import { Box } from "@chakra-ui/react";

const ProblemContainer = ({
  children,
  showVisualObjects,
  className,
  ...props
}) => (
  <Box
    p={1}
    border="2px solid"
    borderColor="gray.300"
    borderRadius="lg"
    minH={showVisualObjects ? "130px" : "35px"}
    display="flex"
    alignItems="center"
    bg="white"
    boxShadow="sm"
    className={className}
    {...props}
  >
    {children}
  </Box>
);

export default ProblemContainer;
