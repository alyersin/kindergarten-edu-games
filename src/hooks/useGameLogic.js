"use client";

import { useState, useCallback, useEffect } from "react";
import { useToast } from "@chakra-ui/react";

const useGameLogic = (levels, initialLevel = 0, customLevelIndex = null) => {
  const [currentLevel, setCurrentLevel] = useState(initialLevel);
  const [matches, setMatches] = useState([]);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);

  const toast = useToast();

  const currentLevelData =
    levels[customLevelIndex !== null ? customLevelIndex : currentLevel];

  const initializeGame = useCallback(() => {
    setMatches([]);
    setLevelCompleted(false);
    setSelectedItem(null);
    setSelectedTarget(null);
  }, []);

  const nextLevel = useCallback(() => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setScore(score + 1);
      initializeGame();
    } else {
      setGameCompleted(true);
    }
  }, [currentLevel, levels.length, score, initializeGame]);

  const restartGame = useCallback(() => {
    setCurrentLevel(0);
    setScore(0);
    setGameCompleted(false);
    initializeGame();
  }, [initializeGame]);

  const checkMatch = useCallback(
    (item, target) => {
      const isMatch = item.id === target.id;

      if (isMatch) {
        setMatches((prev) => [...prev, item.id]);
        setScore((prev) => prev + 1);

        // Success - let the game handle the message

        // Check if level is completed
        if (
          matches.length + 1 === currentLevelData?.letters?.length ||
          matches.length + 1 === currentLevelData?.objects?.length
        ) {
          setLevelCompleted(true);
          // Level completed - let the game handle the message
        }
      } else {
        // Error - let the game handle the message
      }

      setSelectedItem(null);
      setSelectedTarget(null);
    },
    [matches.length, currentLevelData]
  );

  const isMatched = useCallback((id) => matches.includes(id), [matches]);

  const isSelected = useCallback(
    (id, type) => {
      return type === "item" ||
        type === "object" ||
        type === "letter" ||
        type === "number"
        ? selectedItem?.id === id
        : selectedTarget?.id === id;
    },
    [selectedItem, selectedTarget]
  );

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return {
    currentLevel,
    currentLevelData,
    matches,
    score,
    gameCompleted,
    levelCompleted,
    selectedItem,
    selectedTarget,
    setSelectedItem,
    setSelectedTarget,
    setMatches,
    setScore,
    setLevelCompleted,
    setGameCompleted,
    checkMatch,
    isMatched,
    isSelected,
    nextLevel,
    restartGame,
    initializeGame,
  };
};

export default useGameLogic;
