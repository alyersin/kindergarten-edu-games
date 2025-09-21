"use client";

import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";

export const useMatchingGame = (levels, gameType = "matching") => {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [matches, setMatches] = useState([]);
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const toast = useToast();

  const currentLevelData = levels[currentLevel];

  // Initialize game
  const initializeGame = () => {
    setCurrentLevel(0);
    setMatches([]);
    setScore(0);
    setGameCompleted(false);
    setLevelCompleted(false);
    setSelectedItem(null);
    setSelectedTarget(null);
  };

  // Check if item is matched
  const isMatched = (itemId) => {
    return matches.includes(itemId);
  };

  // Check if item is selected
  const isSelected = (itemId, type = "item") => {
    if (type === "item") {
      return selectedItem?.id === itemId;
    } else {
      return selectedTarget?.id === itemId;
    }
  };

  // Handle match checking
  const checkMatch = (item, target) => {
    if (!item || !target) return false;

    // Different matching logic based on game type
    switch (gameType) {
      case "shadow":
        return item.id === target.id;
      case "letter":
        return item.id === target.id;
      case "number":
        return item.id === target.id;
      case "wheel":
        return item.id === target.id;
      default:
        return item.id === target.id;
    }
  };

  // Handle successful match
  const handleSuccessfulMatch = (item, target) => {
    setMatches([...matches, item.id]);
    setScore(score + 1);

    toast({
      title: "🎉 Corect!",
      description: `Ai potrivit ${item.name || item.letter || item.number} cu ${
        target.name
      }!`,
      status: "success",
      duration: 2000,
      position: "top",
    });

    // Check if level is completed
    const totalItems =
      currentLevelData?.items?.length ||
      currentLevelData?.objects?.length ||
      currentLevelData?.letters?.length ||
      0;

    if (matches.length + 1 === totalItems) {
      setLevelCompleted(true);
      toast({
        title: "🎉 Nivel Completat!",
        description: `Ai terminat nivelul "${currentLevelData?.name}"!`,
        status: "success",
        duration: 3000,
        position: "top",
      });
    }
  };

  // Handle failed match
  const handleFailedMatch = () => {
    toast({
      title: "❌ Greșit!",
      description: "Încearcă din nou!",
      status: "error",
      duration: 2000,
      position: "top",
    });
  };

  // Handle item click
  const handleItemClick = (item, type = "item") => {
    if (isMatched(item.id)) return;

    if (type === "item") {
      if (selectedTarget && checkMatch(item, selectedTarget)) {
        handleSuccessfulMatch(item, selectedTarget);
        setSelectedItem(null);
        setSelectedTarget(null);
      } else {
        setSelectedItem({ ...item, type: "item" });
        setSelectedTarget(null);
      }
    } else {
      if (selectedItem && checkMatch(selectedItem, item)) {
        handleSuccessfulMatch(selectedItem, item);
        setSelectedItem(null);
        setSelectedTarget(null);
      } else {
        setSelectedTarget({ ...item, type: "target" });
        setSelectedItem(null);
      }
    }
  };

  // Handle target click
  const handleTargetClick = (target) => {
    if (isMatched(target.id)) return;

    if (selectedItem && checkMatch(selectedItem, target)) {
      handleSuccessfulMatch(selectedItem, target);
      setSelectedItem(null);
      setSelectedTarget(null);
    } else if (selectedTarget && selectedTarget.id === target.id) {
      setSelectedTarget(null);
    } else {
      setSelectedTarget({ ...target, type: "target" });
      setSelectedItem(null);
    }
  };

  // Move to next level
  const nextLevel = () => {
    if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
      setMatches([]);
      setLevelCompleted(false);
      setSelectedItem(null);
      setSelectedTarget(null);
    } else {
      setGameCompleted(true);
      toast({
        title: "🏆 Joc Completat!",
        description: `Felicitări! Ai terminat toate nivelele cu ${score} puncte!`,
        status: "success",
        duration: 4000,
        position: "top",
      });
    }
  };

  // Restart game
  const restartGame = () => {
    initializeGame();
  };

  // Auto-advance level when completed
  useEffect(() => {
    if (levelCompleted && !gameCompleted) {
      const timer = setTimeout(() => {
        nextLevel();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [levelCompleted, gameCompleted]);

  return {
    // State
    currentLevel,
    currentLevelData,
    matches,
    score,
    gameCompleted,
    levelCompleted,
    selectedItem,
    selectedTarget,

    // Actions
    setSelectedItem,
    setSelectedTarget,
    setMatches,
    setScore,
    setLevelCompleted,
    setGameCompleted,
    checkMatch,
    isMatched,
    isSelected,
    handleItemClick,
    handleTargetClick,
    nextLevel,
    restartGame,
    initializeGame,
  };
};
