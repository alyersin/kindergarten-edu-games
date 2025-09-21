"use client";

import { Box } from "@chakra-ui/react";
import VisualObjects from "./VisualObjects";

const ObjectGroup = ({
  count,
  type,
  specificType,
  containerWidth = "60px",
  showNumbers = true,
  ...props
}) => (
  <Box
    minW={containerWidth}
    h="80px"
    display="flex"
    alignItems="center"
    justifyContent="center"
    {...props}
  >
    <VisualObjects
      count={count}
      type={type}
      specificType={specificType}
      showNumbers={showNumbers}
    />
  </Box>
);

export default ObjectGroup;
