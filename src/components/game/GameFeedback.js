"use client";

import { useToast } from "@chakra-ui/react";

export const useGameFeedback = () => {
  const toast = useToast();

  const showSuccess = (title, description) => {
    toast({
      title,
      description,
      status: "success",
      duration: 2000,
      position: "top",
    });
  };

  const showError = (title, description) => {
    toast({
      title,
      description,
      status: "error",
      duration: 2000,
      position: "top",
    });
  };

  const showInfo = (title, description) => {
    toast({
      title,
      description,
      status: "info",
      duration: 3000,
      position: "top",
    });
  };

  const showWarning = (title, description) => {
    toast({
      title,
      description,
      status: "warning",
      duration: 2000,
      position: "top",
    });
  };

  // Predefined feedback messages
  const feedback = {
    correct: (itemName, targetName) =>
      showSuccess("🎉 Corect!", `Ai potrivit ${itemName} cu ${targetName}!`),

    wrong: () => showError("❌ Greșit!", "Încearcă din nou!"),

    levelCompleted: (levelName) =>
      showSuccess("🎉 Nivel Completat!", `Ai terminat nivelul "${levelName}"!`),

    gameCompleted: (score) =>
      showSuccess(
        "🏆 Joc Completat!",
        `Felicitări! Ai terminat toate nivelele cu ${score} puncte!`
      ),

    worksheetGenerated: (count) =>
      showSuccess("✅ Fișa Generată!", `Am creat fișa pentru tine!`),

    pdfGenerating: () =>
      showInfo(
        "📄 Se generează PDF-ul...",
        "Te rugăm să aștepți câteva secunde"
      ),

    pdfDownloaded: (fileName) =>
      showSuccess("✅ PDF Downloadat!", `Fișa a fost salvată ca ${fileName}`),

    pdfError: () =>
      showError(
        "❌ Eroare la generarea PDF",
        "A apărut o problemă. Încearcă din nou!"
      ),

    noWorksheet: () => showWarning("⚠️ Eroare", "Generează mai întâi o fișă!"),
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    feedback,
  };
};
