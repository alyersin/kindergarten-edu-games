export const getOptimalColors = (backgroundGradient) => {
  if (!backgroundGradient) {
    return {
      textColor: "gray.700",
      progressColor: "purple",
      instructionColor: "purple.700",
      headingColor: "purple.600",
    };
  }

  const lightTokens = [
    "#87CEEB",
    "#98FB98",
    "#FFE4B5",
    "#F0E68C",
    "#FFB6C1",
    "#FFC0CB",
    "#FFE4E1",
    "#FFA07A",
    "#90EE90",
    "#32CD32",
    "#DDA0DD",
    "#DA70D6",
    "#FFD700",
    "#4ECDC4",
    "#A8E6CF",
    "#88D8A3",
    "#E6E6FA",
    "#D8BFD8",
    "#FF8C00",
    "#FF4500",
    "#FFA500",
    "#FF69B4",
    "#FF1493",
    "#20B2AA",
    "#008B8B",
    "#228B22",
    "#9370DB",
    "#8A2BE2",
    "#FF6347",
    "#DC143C",
    "#00CED1",
  ];

  // Check for purple/violet gradients that need white text
  const purpleGradients = ["#a78bfa", "#8b5cf6", "#9366D2", "#7a54b0"];
  const isPurpleGradient = purpleGradients.some((color) =>
    backgroundGradient.includes(color)
  );

  const isLight = lightTokens.some((token) =>
    backgroundGradient.includes(token)
  );

  // Special handling for purple gradients
  if (isPurpleGradient) {
    return {
      textColor: "white",
      progressColor: "green",
      instructionColor: "white",
      headingColor: "white",
    };
  }

  if (isLight) {
    return {
      textColor: "gray.800",
      progressColor: "purple",
      instructionColor: "purple.700",
      headingColor: "purple.600",
    };
  }

  return {
    textColor: "white",
    progressColor: "green",
    instructionColor: "white",
    headingColor: "white",
  };
};
