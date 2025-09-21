// Game configuration constants
export const GAME_TYPES = {
  SHADOW_MATCHING: "shadow",
  LETTER_MATCHING: "letter",
  NUMBER_MATCHING: "number",
  WHEEL_OF_FORTUNE: "wheel",
  PUZZLE: "puzzle",
  QUIZ: "quiz",
  ANIMAL_IMITATION: "animal-imitation",
  WORKSHEETS: "worksheets",
};

export const DIFFICULTY_LEVELS = {
  EASY: "easy",
  MEDIUM: "medium",
  HARD: "hard",
};

export const WORKSHEET_TYPES = {
  ADDITION: "addition",
  SUBTRACTION: "subtraction",
  CONNECT_DOTS: "connect-dots",
  NUMBER_TRACING: "number-tracing",
};

// Common color schemes for games
export const COLOR_SCHEMES = {
  PURPLE: {
    primary: "purple.400",
    secondary: "purple.200",
    background: "purple.50",
    text: "purple.800",
  },
  BLUE: {
    primary: "blue.400",
    secondary: "blue.200",
    background: "blue.50",
    text: "blue.800",
  },
  GREEN: {
    primary: "green.400",
    secondary: "green.200",
    background: "green.50",
    text: "green.800",
  },
  ORANGE: {
    primary: "orange.400",
    secondary: "orange.200",
    background: "orange.50",
    text: "orange.800",
  },
  PINK: {
    primary: "pink.400",
    secondary: "pink.200",
    background: "pink.50",
    text: "pink.800",
  },
  TEAL: {
    primary: "teal.400",
    secondary: "teal.200",
    background: "teal.50",
    text: "teal.800",
  },
};

// Game card sizes
export const CARD_SIZES = {
  SMALL: { w: "120px", h: "120px", fontSize: "4xl" },
  MEDIUM: { w: "140px", h: "140px", fontSize: "5xl" },
  LARGE: { w: "160px", h: "160px", fontSize: "6xl" },
};

// Animation durations
export const ANIMATIONS = {
  FAST: "0.2s",
  NORMAL: "0.3s",
  SLOW: "0.5s",
};

// Toast durations
export const TOAST_DURATIONS = {
  SHORT: 2000,
  MEDIUM: 3000,
  LONG: 4000,
};
