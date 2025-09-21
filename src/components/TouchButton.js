"use client";

import { Button } from "@chakra-ui/react";
import { forwardRef } from "react";

const TouchButton = forwardRef(({ children, ...props }, ref) => {
  return (
    <Button
      ref={ref}
      className="touch-animation touch-target no-select"
      transition="all 0.2s ease"
      _active={{
        transform: "scale(0.95)",
        transition: "transform 0.1s ease-out",
      }}
      _hover={{
        transform: "scale(1.02)",
        transition: "transform 0.2s ease-out",
      }}
      {...props}
    >
      {children}
    </Button>
  );
});

TouchButton.displayName = "TouchButton";

export default TouchButton;
