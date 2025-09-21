"use client";

import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import {
  sequencePatterns,
  shapeMatching,
  colorRecognition,
  classification,
  mazeSimple,
  memoryGame,
  geometricShapes,
} from "../data/logicData";

export const useWorksheetGenerator = () => {
  const toast = useToast();
  const [worksheetType, setWorksheetType] = useState("addition");
  const [difficulty, setDifficulty] = useState("easy");
  const [numberOfProblems, setNumberOfProblems] = useState(10);
  const [includeAnswers, setIncludeAnswers] = useState(false);
  const [worksheetTitle, setWorksheetTitle] = useState("Fișă de Adunare");
  const [orientation, setOrientation] = useState("portrait");
  const [showVisualObjects, setShowVisualObjects] = useState(false);
  const [visualObjectType, setVisualObjectType] = useState("mixed");
  const [showNumbers, setShowNumbers] = useState(true);
  const [connectDotsCategory, setConnectDotsCategory] = useState("toate");
  const [connectDotsDifficulty, setConnectDotsDifficulty] = useState("usor");
  const [connectDotsCount, setConnectDotsCount] = useState(1);
  const [generatedWorksheet, setGeneratedWorksheet] = useState(null);

  // Actualizează automat previzualizarea când se schimbă showNumbers
  useEffect(() => {
    if (
      generatedWorksheet &&
      (worksheetType === "addition" || worksheetType === "subtraction") &&
      generatedWorksheet.showNumbers !== showNumbers
    ) {
      setGeneratedWorksheet((prev) => ({
        ...prev,
        showNumbers: showNumbers,
      }));
    }
  }, [showNumbers, worksheetType, generatedWorksheet]);

  // Actualizează automat previzualizarea când se schimbă showVisualObjects
  useEffect(() => {
    if (
      generatedWorksheet &&
      (worksheetType === "addition" || worksheetType === "subtraction") &&
      generatedWorksheet.showVisualObjects !== showVisualObjects
    ) {
      setGeneratedWorksheet((prev) => ({
        ...prev,
        showVisualObjects: showVisualObjects,
      }));
    }
  }, [showVisualObjects, worksheetType, generatedWorksheet]);

  const generateAdditionProblems = () => {
    const problems = [];
    const usedProblems = new Set(); // Pentru a evita duplicatele

    for (let i = 0; i < numberOfProblems; i++) {
      let num1, num2;
      let problemKey;

      // Generează probleme până când găsești una unică
      do {
        if (difficulty === "easy") {
          // Ușor: numere între 1-5
          num1 = Math.floor(Math.random() * 5) + 1;
          num2 = Math.floor(Math.random() * 5) + 1;
        } else {
          // Mediu: numere între 1-9
          num1 = Math.floor(Math.random() * 9) + 1;
          num2 = Math.floor(Math.random() * 9) + 1;
        }

        // Creează o cheie pentru problema (normalizează ordinea)
        const smaller = Math.min(num1, num2);
        const larger = Math.max(num1, num2);
        problemKey = `${smaller}+${larger}`;
      } while (usedProblems.has(problemKey));

      usedProblems.add(problemKey);

      const answer = num1 + num2;
      problems.push({
        id: i + 1,
        num1,
        num2,
        answer,
        operator: "+",
      });
    }

    return problems;
  };

  const generateSubtractionProblems = () => {
    const problems = [];
    const usedProblems = new Set(); // Pentru a evita duplicatele

    for (let i = 0; i < numberOfProblems; i++) {
      let num1, num2;
      let problemKey;

      // Generează probleme până când găsești una unică
      do {
        if (difficulty === "easy") {
          // Ușor: numere între 1-5
          num1 = Math.floor(Math.random() * 5) + 1;
          num2 = Math.floor(Math.random() * 5) + 1;
          // Asigură că num1 >= num2 pentru scădere
          if (num1 < num2) {
            [num1, num2] = [num2, num1]; // Schimbă ordinea dacă num1 < num2
          }
        } else {
          // Mediu: numere între 1-9
          num1 = Math.floor(Math.random() * 9) + 1;
          num2 = Math.floor(Math.random() * 9) + 1;
          // Asigură că num1 >= num2 pentru scădere
          if (num1 < num2) {
            [num1, num2] = [num2, num1]; // Schimbă ordinea dacă num1 < num2
          }
        }

        // Creează o cheie pentru problema
        problemKey = `${num1}-${num2}`;
      } while (usedProblems.has(problemKey));

      usedProblems.add(problemKey);

      const answer = num1 - num2;
      problems.push({
        id: i + 1,
        num1,
        num2,
        answer,
        operator: "-",
      });
    }

    return problems;
  };

  const generateConnectTheDots = () => {
    const allShapes = {
      // ANIMALE
      pisica: {
        name: "Pisică",
        points: [
          // Conturul capului (de sus în jos, stânga) - mai rotunjit
          { x: 150, y: 70 }, // vârf cap
          { x: 130, y: 80 },
          { x: 110, y: 90 },
          { x: 90, y: 100 },
          { x: 80, y: 110 },
          { x: 70, y: 120 },
          { x: 65, y: 130 },
          { x: 60, y: 140 },
          { x: 65, y: 150 },
          { x: 70, y: 160 },
          { x: 80, y: 170 },
          { x: 90, y: 180 },
          { x: 100, y: 190 },
          { x: 110, y: 200 },
          { x: 120, y: 210 },
          { x: 130, y: 220 },
          { x: 140, y: 230 },
          { x: 150, y: 240 },
          // Conturul capului (de jos în sus, dreapta) - mai rotunjit
          { x: 160, y: 230 },
          { x: 170, y: 220 },
          { x: 180, y: 210 },
          { x: 190, y: 200 },
          { x: 200, y: 190 },
          { x: 210, y: 180 },
          { x: 220, y: 170 },
          { x: 230, y: 160 },
          { x: 235, y: 150 },
          { x: 240, y: 140 },
          { x: 235, y: 130 },
          { x: 230, y: 120 },
          { x: 220, y: 110 },
          { x: 210, y: 100 },
          { x: 190, y: 90 },
          { x: 170, y: 80 },
          { x: 150, y: 70 },
          // Urechile - mai ascuțite și mai mari
          { x: 120, y: 80 },
          { x: 110, y: 70 },
          { x: 100, y: 75 },
          { x: 90, y: 85 },
          { x: 100, y: 95 },
          { x: 110, y: 100 },
          { x: 120, y: 80 },
          { x: 180, y: 80 },
          { x: 190, y: 70 },
          { x: 200, y: 75 },
          { x: 210, y: 85 },
          { x: 200, y: 95 },
          { x: 190, y: 100 },
          { x: 180, y: 80 },
          // Nasul - triunghiular
          { x: 150, y: 160 },
          { x: 145, y: 165 },
          { x: 155, y: 165 },
          { x: 150, y: 160 },
          // Ochii - mai mari și mai expresivi
          { x: 130, y: 140 },
          { x: 125, y: 145 },
          { x: 135, y: 145 },
          { x: 130, y: 150 },
          { x: 125, y: 145 },
          { x: 130, y: 140 },
          { x: 170, y: 140 },
          { x: 165, y: 145 },
          { x: 175, y: 145 },
          { x: 170, y: 150 },
          { x: 165, y: 145 },
          { x: 170, y: 140 },
          // Mustățile
          { x: 120, y: 160 },
          { x: 110, y: 165 },
          { x: 100, y: 170 },
          { x: 180, y: 160 },
          { x: 190, y: 165 },
          { x: 200, y: 170 },
          // Gură - mică și rotunjită
          { x: 150, y: 170 },
          { x: 145, y: 175 },
          { x: 155, y: 175 },
          { x: 150, y: 170 },
        ],
        numbers: [],
        category: "animale",
      },
      caine: {
        name: "Câine",
        points: [
          // Conturul capului - mai rotunjit și mai frumos
          { x: 150, y: 70 },
          { x: 130, y: 80 },
          { x: 110, y: 90 },
          { x: 90, y: 100 },
          { x: 80, y: 110 },
          { x: 70, y: 120 },
          { x: 65, y: 130 },
          { x: 60, y: 140 },
          { x: 65, y: 150 },
          { x: 70, y: 160 },
          { x: 80, y: 170 },
          { x: 90, y: 180 },
          { x: 100, y: 190 },
          { x: 110, y: 200 },
          { x: 120, y: 210 },
          { x: 130, y: 220 },
          { x: 140, y: 230 },
          { x: 150, y: 240 },
          { x: 160, y: 230 },
          { x: 170, y: 220 },
          { x: 180, y: 210 },
          { x: 190, y: 200 },
          { x: 200, y: 190 },
          { x: 210, y: 180 },
          { x: 220, y: 170 },
          { x: 230, y: 160 },
          { x: 235, y: 150 },
          { x: 240, y: 140 },
          { x: 235, y: 130 },
          { x: 230, y: 120 },
          { x: 220, y: 110 },
          { x: 210, y: 100 },
          { x: 190, y: 90 },
          { x: 170, y: 80 },
          { x: 150, y: 70 },
          // Urechile - mai mari și mai rotunjite
          { x: 120, y: 80 },
          { x: 110, y: 70 },
          { x: 100, y: 75 },
          { x: 90, y: 85 },
          { x: 100, y: 95 },
          { x: 110, y: 100 },
          { x: 120, y: 80 },
          { x: 180, y: 80 },
          { x: 190, y: 70 },
          { x: 200, y: 75 },
          { x: 210, y: 85 },
          { x: 200, y: 95 },
          { x: 190, y: 100 },
          { x: 180, y: 80 },
          // Nasul - mai mare și mai clar
          { x: 150, y: 160 },
          { x: 145, y: 165 },
          { x: 155, y: 165 },
          { x: 150, y: 160 },
          // Ochii - mai mari și mai expresivi
          { x: 130, y: 140 },
          { x: 125, y: 145 },
          { x: 135, y: 145 },
          { x: 130, y: 150 },
          { x: 125, y: 145 },
          { x: 130, y: 140 },
          { x: 170, y: 140 },
          { x: 165, y: 145 },
          { x: 175, y: 145 },
          { x: 170, y: 150 },
          { x: 165, y: 145 },
          { x: 170, y: 140 },
          // Gură - mai mare
          { x: 150, y: 170 },
          { x: 145, y: 175 },
          { x: 155, y: 175 },
          { x: 150, y: 170 },
        ],
        numbers: [],
        category: "animale",
      },
      fluture: {
        name: "Fluture",
        points: [
          // Corpul (vertical) - mai lung și mai clar
          { x: 150, y: 80 },
          { x: 150, y: 90 },
          { x: 150, y: 100 },
          { x: 150, y: 110 },
          { x: 150, y: 120 },
          { x: 150, y: 130 },
          { x: 150, y: 140 },
          { x: 150, y: 150 },
          { x: 150, y: 160 },
          { x: 150, y: 170 },
          { x: 150, y: 180 },
          { x: 150, y: 190 },
          { x: 150, y: 200 },
          { x: 150, y: 210 },
          { x: 150, y: 220 },
          // Aripa stânga (contur) - mai frumoasă și mai rotunjită
          { x: 100, y: 100 },
          { x: 90, y: 110 },
          { x: 80, y: 120 },
          { x: 70, y: 130 },
          { x: 60, y: 140 },
          { x: 50, y: 150 },
          { x: 60, y: 160 },
          { x: 70, y: 170 },
          { x: 80, y: 180 },
          { x: 90, y: 190 },
          { x: 100, y: 200 },
          { x: 110, y: 210 },
          { x: 120, y: 220 },
          { x: 130, y: 210 },
          { x: 140, y: 200 },
          { x: 150, y: 190 },
          // Aripa dreapta (contur) - mai frumoasă și mai rotunjită
          { x: 200, y: 100 },
          { x: 210, y: 110 },
          { x: 220, y: 120 },
          { x: 230, y: 130 },
          { x: 240, y: 140 },
          { x: 250, y: 150 },
          { x: 240, y: 160 },
          { x: 230, y: 170 },
          { x: 220, y: 180 },
          { x: 210, y: 190 },
          { x: 200, y: 200 },
          { x: 190, y: 210 },
          { x: 180, y: 220 },
          { x: 170, y: 210 },
          { x: 160, y: 200 },
          { x: 150, y: 190 },
          // Antenele
          { x: 150, y: 80 },
          { x: 140, y: 70 },
          { x: 150, y: 80 },
          { x: 160, y: 70 },
          { x: 150, y: 80 },
        ],
        numbers: [],
        category: "animale",
      },
      pasare: {
        name: "Pasăre",
        points: [
          // Capul (contur) - mai rotunjit și mai frumos
          { x: 150, y: 80 },
          { x: 140, y: 90 },
          { x: 130, y: 100 },
          { x: 120, y: 110 },
          { x: 110, y: 120 },
          { x: 100, y: 130 },
          { x: 90, y: 140 },
          { x: 100, y: 150 },
          { x: 110, y: 160 },
          { x: 120, y: 170 },
          { x: 130, y: 180 },
          { x: 140, y: 190 },
          { x: 150, y: 200 },
          // Gâtul și corpul - mai lung și mai clar
          { x: 150, y: 200 },
          { x: 150, y: 210 },
          { x: 150, y: 220 },
          { x: 150, y: 230 },
          { x: 150, y: 240 },
          { x: 150, y: 250 },
          { x: 150, y: 260 },
          { x: 150, y: 270 },
          // Aripa stânga (contur) - mai frumoasă și mai rotunjită
          { x: 100, y: 130 },
          { x: 90, y: 140 },
          { x: 80, y: 150 },
          { x: 70, y: 160 },
          { x: 60, y: 170 },
          { x: 70, y: 180 },
          { x: 80, y: 190 },
          { x: 90, y: 200 },
          { x: 100, y: 210 },
          { x: 110, y: 220 },
          { x: 120, y: 230 },
          { x: 130, y: 240 },
          { x: 140, y: 250 },
          { x: 150, y: 260 },
          // Aripa dreapta (contur) - mai frumoasă și mai rotunjită
          { x: 200, y: 130 },
          { x: 210, y: 140 },
          { x: 220, y: 150 },
          { x: 230, y: 160 },
          { x: 240, y: 170 },
          { x: 230, y: 180 },
          { x: 220, y: 190 },
          { x: 210, y: 200 },
          { x: 200, y: 210 },
          { x: 190, y: 220 },
          { x: 180, y: 230 },
          { x: 170, y: 240 },
          { x: 160, y: 250 },
          { x: 150, y: 260 },
          // Coada
          { x: 150, y: 270 },
          { x: 140, y: 280 },
          { x: 130, y: 290 },
          { x: 120, y: 300 },
          { x: 130, y: 310 },
          { x: 140, y: 320 },
          { x: 150, y: 330 },
          { x: 160, y: 320 },
          { x: 170, y: 310 },
          { x: 180, y: 300 },
          { x: 170, y: 290 },
          { x: 160, y: 280 },
          { x: 150, y: 270 },
          // Ciocul
          { x: 150, y: 80 },
          { x: 150, y: 70 },
          { x: 150, y: 80 },
        ],
        numbers: [],
        category: "animale",
      },

      // OBIECTE
      casa: {
        name: "Casă",
        points: [
          // Acoperișul - mai frumos și mai clar
          { x: 150, y: 80 },
          { x: 140, y: 90 },
          { x: 160, y: 90 },
          { x: 130, y: 100 },
          { x: 150, y: 100 },
          { x: 170, y: 100 },
          { x: 120, y: 110 },
          { x: 140, y: 110 },
          { x: 160, y: 110 },
          { x: 180, y: 110 },
          { x: 110, y: 120 },
          { x: 130, y: 120 },
          { x: 150, y: 120 },
          { x: 170, y: 120 },
          { x: 190, y: 120 },
          { x: 100, y: 130 },
          { x: 120, y: 130 },
          { x: 140, y: 130 },
          { x: 160, y: 130 },
          { x: 180, y: 130 },
          { x: 200, y: 130 },
          // Peretele stâng - mai clar
          { x: 100, y: 140 },
          { x: 100, y: 150 },
          { x: 100, y: 160 },
          { x: 100, y: 170 },
          { x: 100, y: 180 },
          { x: 100, y: 190 },
          { x: 100, y: 200 },
          { x: 100, y: 210 },
          { x: 100, y: 220 },
          { x: 100, y: 230 },
          { x: 100, y: 240 },
          { x: 100, y: 250 },
          // Peretele drept - mai clar
          { x: 200, y: 140 },
          { x: 200, y: 150 },
          { x: 200, y: 160 },
          { x: 200, y: 170 },
          { x: 200, y: 180 },
          { x: 200, y: 190 },
          { x: 200, y: 200 },
          { x: 200, y: 210 },
          { x: 200, y: 220 },
          { x: 200, y: 230 },
          { x: 200, y: 240 },
          { x: 200, y: 250 },
          // Fundația - mai clar
          { x: 100, y: 250 },
          { x: 110, y: 250 },
          { x: 120, y: 250 },
          { x: 130, y: 250 },
          { x: 140, y: 250 },
          { x: 150, y: 250 },
          { x: 160, y: 250 },
          { x: 170, y: 250 },
          { x: 180, y: 250 },
          { x: 190, y: 250 },
          { x: 200, y: 250 },
          // Ușa - mai clar
          { x: 130, y: 200 },
          { x: 140, y: 200 },
          { x: 150, y: 200 },
          { x: 160, y: 200 },
          { x: 170, y: 200 },
          { x: 130, y: 210 },
          { x: 140, y: 210 },
          { x: 150, y: 210 },
          { x: 160, y: 210 },
          { x: 170, y: 210 },
          { x: 130, y: 220 },
          { x: 140, y: 220 },
          { x: 150, y: 220 },
          { x: 160, y: 220 },
          { x: 170, y: 220 },
          { x: 130, y: 230 },
          { x: 140, y: 230 },
          { x: 150, y: 230 },
          { x: 160, y: 230 },
          { x: 170, y: 230 },
          { x: 130, y: 240 },
          { x: 140, y: 240 },
          { x: 150, y: 240 },
          { x: 160, y: 240 },
          { x: 170, y: 240 },
          // Ferestrele - mai mari și mai clare
          { x: 120, y: 170 },
          { x: 130, y: 170 },
          { x: 140, y: 170 },
          { x: 120, y: 180 },
          { x: 130, y: 180 },
          { x: 140, y: 180 },
          { x: 120, y: 190 },
          { x: 130, y: 190 },
          { x: 140, y: 190 },
          { x: 160, y: 170 },
          { x: 170, y: 170 },
          { x: 180, y: 170 },
          { x: 160, y: 180 },
          { x: 170, y: 180 },
          { x: 180, y: 180 },
          { x: 160, y: 190 },
          { x: 170, y: 190 },
          { x: 180, y: 190 },
        ],
        numbers: [],
        category: "obiecte",
      },
      masina: {
        name: "Mașină",
        points: [
          // Fața - mai clară și mai frumoasă
          { x: 100, y: 140 },
          { x: 110, y: 130 },
          { x: 120, y: 120 },
          { x: 100, y: 150 },
          { x: 110, y: 140 },
          { x: 120, y: 130 },
          { x: 100, y: 160 },
          { x: 110, y: 150 },
          { x: 120, y: 140 },
          { x: 100, y: 170 },
          { x: 110, y: 160 },
          { x: 120, y: 150 },
          // Capota - mai clară
          { x: 130, y: 120 },
          { x: 140, y: 120 },
          { x: 150, y: 120 },
          { x: 160, y: 120 },
          { x: 170, y: 120 },
          { x: 180, y: 120 },
          { x: 130, y: 130 },
          { x: 140, y: 130 },
          { x: 150, y: 130 },
          { x: 160, y: 130 },
          { x: 170, y: 130 },
          { x: 180, y: 130 },
          { x: 130, y: 140 },
          { x: 140, y: 140 },
          { x: 150, y: 140 },
          { x: 160, y: 140 },
          { x: 170, y: 140 },
          { x: 180, y: 140 },
          { x: 130, y: 150 },
          { x: 140, y: 150 },
          { x: 150, y: 150 },
          { x: 160, y: 150 },
          { x: 170, y: 150 },
          { x: 180, y: 150 },
          // Fața dreapta - mai clară
          { x: 190, y: 120 },
          { x: 200, y: 130 },
          { x: 200, y: 140 },
          { x: 190, y: 130 },
          { x: 200, y: 150 },
          { x: 200, y: 160 },
          { x: 190, y: 140 },
          { x: 200, y: 170 },
          { x: 200, y: 180 },
          { x: 190, y: 150 },
          { x: 200, y: 190 },
          { x: 200, y: 200 },
          // Spatele - mai clar
          { x: 200, y: 200 },
          { x: 190, y: 210 },
          { x: 180, y: 220 },
          { x: 200, y: 210 },
          { x: 190, y: 220 },
          { x: 170, y: 230 },
          { x: 200, y: 220 },
          { x: 190, y: 230 },
          { x: 180, y: 240 },
          { x: 170, y: 250 },
          { x: 160, y: 260 },
          { x: 150, y: 270 },
          { x: 140, y: 280 },
          { x: 130, y: 290 },
          { x: 120, y: 300 },
          { x: 110, y: 310 },
          { x: 100, y: 320 },
          { x: 90, y: 330 },
          { x: 80, y: 340 },
          { x: 70, y: 350 },
          { x: 60, y: 360 },
          { x: 50, y: 370 },
          { x: 40, y: 380 },
          { x: 30, y: 390 },
          { x: 20, y: 400 },
          { x: 10, y: 410 },
          { x: 0, y: 420 },
          // Roțile - mai mari și mai clare
          { x: 120, y: 200 },
          { x: 130, y: 200 },
          { x: 140, y: 200 },
          { x: 120, y: 210 },
          { x: 130, y: 210 },
          { x: 140, y: 210 },
          { x: 120, y: 220 },
          { x: 130, y: 220 },
          { x: 140, y: 220 },
          { x: 160, y: 200 },
          { x: 170, y: 200 },
          { x: 180, y: 200 },
          { x: 160, y: 210 },
          { x: 170, y: 210 },
          { x: 180, y: 210 },
          { x: 160, y: 220 },
          { x: 170, y: 220 },
          { x: 180, y: 220 },
          // Spatele stâng
          { x: 100, y: 180 },
          { x: 110, y: 190 },
          { x: 120, y: 200 },
          { x: 100, y: 190 },
          { x: 110, y: 200 },
          { x: 120, y: 210 },
          { x: 100, y: 200 },
          { x: 110, y: 210 },
          { x: 120, y: 220 },
        ],
        numbers: [],
        category: "obiecte",
      },
      stea: {
        name: "Stea",
        points: [
          // Vârf
          { x: 150, y: 50 },
          { x: 140, y: 60 },
          { x: 160, y: 60 },
          { x: 130, y: 70 },
          { x: 150, y: 70 },
          { x: 170, y: 70 },
          { x: 120, y: 80 },
          { x: 140, y: 80 },
          { x: 160, y: 80 },
          { x: 180, y: 80 },
          { x: 110, y: 90 },
          { x: 130, y: 90 },
          { x: 150, y: 90 },
          { x: 170, y: 90 },
          { x: 190, y: 90 },
          { x: 100, y: 100 },
          { x: 120, y: 100 },
          { x: 140, y: 100 },
          { x: 160, y: 100 },
          { x: 180, y: 100 },
          { x: 200, y: 100 },
          // Braț dreapta sus
          { x: 170, y: 110 },
          { x: 190, y: 110 },
          { x: 210, y: 110 },
          { x: 180, y: 120 },
          { x: 200, y: 120 },
          { x: 220, y: 120 },
          { x: 190, y: 130 },
          { x: 210, y: 130 },
          { x: 230, y: 130 },
          { x: 200, y: 140 },
          { x: 220, y: 140 },
          { x: 240, y: 140 },
          { x: 210, y: 150 },
          { x: 230, y: 150 },
          { x: 250, y: 150 },
          { x: 220, y: 160 },
          { x: 240, y: 160 },
          { x: 260, y: 160 },
          { x: 230, y: 170 },
          { x: 250, y: 170 },
          { x: 270, y: 170 },
          { x: 240, y: 180 },
          { x: 260, y: 180 },
          { x: 280, y: 180 },
          { x: 250, y: 190 },
          { x: 270, y: 190 },
          { x: 290, y: 190 },
          { x: 260, y: 200 },
          { x: 280, y: 200 },
          { x: 300, y: 200 },
          { x: 270, y: 210 },
          { x: 290, y: 210 },
          { x: 280, y: 220 },
          // Vârf dreapta
          { x: 240, y: 120 },
          { x: 250, y: 110 },
          { x: 260, y: 100 },
          { x: 240, y: 130 },
          { x: 250, y: 120 },
          { x: 260, y: 110 },
          { x: 240, y: 140 },
          { x: 250, y: 130 },
          { x: 260, y: 120 },
          // Braț dreapta jos
          { x: 190, y: 160 },
          { x: 210, y: 160 },
          { x: 230, y: 160 },
          { x: 180, y: 170 },
          { x: 200, y: 170 },
          { x: 220, y: 170 },
          { x: 240, y: 170 },
          { x: 170, y: 180 },
          { x: 190, y: 180 },
          { x: 210, y: 180 },
          { x: 230, y: 180 },
          { x: 250, y: 180 },
          { x: 160, y: 190 },
          { x: 180, y: 190 },
          { x: 200, y: 190 },
          { x: 220, y: 190 },
          { x: 240, y: 190 },
          { x: 260, y: 190 },
          { x: 150, y: 200 },
          { x: 170, y: 200 },
          { x: 190, y: 200 },
          { x: 210, y: 200 },
          { x: 230, y: 200 },
          { x: 250, y: 200 },
          { x: 270, y: 200 },
          { x: 160, y: 210 },
          { x: 180, y: 210 },
          { x: 200, y: 210 },
          { x: 220, y: 210 },
          { x: 240, y: 210 },
          { x: 260, y: 210 },
          { x: 170, y: 220 },
          { x: 190, y: 220 },
          { x: 210, y: 220 },
          { x: 230, y: 220 },
          { x: 250, y: 220 },
          { x: 180, y: 230 },
          { x: 200, y: 230 },
          { x: 220, y: 230 },
          { x: 240, y: 230 },
          { x: 190, y: 240 },
          { x: 210, y: 240 },
          { x: 230, y: 240 },
          { x: 200, y: 250 },
          { x: 220, y: 250 },
          { x: 210, y: 260 },
          // Vârf jos
          { x: 210, y: 230 },
          { x: 200, y: 240 },
          { x: 190, y: 250 },
          { x: 210, y: 240 },
          { x: 200, y: 250 },
          { x: 190, y: 260 },
          { x: 210, y: 250 },
          { x: 200, y: 260 },
          { x: 190, y: 270 },
          // Braț stânga jos
          { x: 150, y: 190 },
          { x: 130, y: 190 },
          { x: 110, y: 190 },
          { x: 140, y: 200 },
          { x: 120, y: 200 },
          { x: 100, y: 200 },
          { x: 130, y: 210 },
          { x: 110, y: 210 },
          { x: 90, y: 210 },
          { x: 120, y: 220 },
          { x: 100, y: 220 },
          { x: 80, y: 220 },
          { x: 110, y: 230 },
          { x: 90, y: 230 },
          { x: 70, y: 230 },
          { x: 100, y: 240 },
          { x: 80, y: 240 },
          { x: 60, y: 240 },
          { x: 90, y: 250 },
          { x: 70, y: 250 },
          { x: 50, y: 250 },
          { x: 80, y: 260 },
          { x: 60, y: 260 },
          { x: 40, y: 260 },
          { x: 70, y: 270 },
          { x: 50, y: 270 },
          { x: 60, y: 280 },
          // Vârf stânga
          { x: 90, y: 230 },
          { x: 80, y: 220 },
          { x: 70, y: 210 },
          { x: 90, y: 240 },
          { x: 80, y: 230 },
          { x: 70, y: 220 },
          { x: 90, y: 250 },
          { x: 80, y: 240 },
          { x: 70, y: 230 },
          // Braț stânga jos
          { x: 110, y: 160 },
          { x: 90, y: 160 },
          { x: 70, y: 160 },
          { x: 100, y: 170 },
          { x: 80, y: 170 },
          { x: 60, y: 170 },
          { x: 90, y: 180 },
          { x: 70, y: 180 },
          { x: 50, y: 180 },
          { x: 80, y: 190 },
          { x: 60, y: 190 },
          { x: 40, y: 190 },
          { x: 70, y: 200 },
          { x: 50, y: 200 },
          { x: 30, y: 200 },
          { x: 60, y: 210 },
          { x: 40, y: 210 },
          { x: 20, y: 210 },
          { x: 50, y: 220 },
          { x: 30, y: 220 },
          { x: 10, y: 220 },
          { x: 40, y: 230 },
          { x: 20, y: 230 },
          { x: 30, y: 240 },
          // Vârf stânga
          { x: 60, y: 120 },
          { x: 50, y: 110 },
          { x: 40, y: 100 },
          { x: 60, y: 130 },
          { x: 50, y: 120 },
          { x: 40, y: 110 },
          { x: 60, y: 140 },
          { x: 50, y: 130 },
          { x: 40, y: 120 },
          // Braț stânga sus
          { x: 130, y: 120 },
          { x: 110, y: 120 },
          { x: 90, y: 120 },
          { x: 120, y: 110 },
          { x: 100, y: 110 },
          { x: 80, y: 110 },
          { x: 110, y: 100 },
          { x: 90, y: 100 },
          { x: 70, y: 100 },
          { x: 100, y: 90 },
          { x: 80, y: 90 },
          { x: 60, y: 90 },
          { x: 90, y: 80 },
          { x: 70, y: 80 },
          { x: 50, y: 80 },
          { x: 80, y: 70 },
          { x: 60, y: 70 },
          { x: 40, y: 70 },
          { x: 70, y: 60 },
          { x: 50, y: 60 },
          { x: 60, y: 50 },
        ],
        numbers: [],
        category: "forme",
      },
      inima: {
        name: "Inimă",
        points: [
          // Centru
          { x: 150, y: 120 },
          { x: 140, y: 130 },
          { x: 160, y: 130 },
          { x: 130, y: 140 },
          { x: 150, y: 140 },
          { x: 170, y: 140 },
          { x: 120, y: 150 },
          { x: 140, y: 150 },
          { x: 160, y: 150 },
          { x: 180, y: 150 },
          { x: 110, y: 160 },
          { x: 130, y: 160 },
          { x: 150, y: 160 },
          { x: 170, y: 160 },
          { x: 190, y: 160 },
          { x: 100, y: 170 },
          { x: 120, y: 170 },
          { x: 140, y: 170 },
          { x: 160, y: 170 },
          { x: 180, y: 170 },
          { x: 200, y: 170 },
          { x: 110, y: 180 },
          { x: 130, y: 180 },
          { x: 150, y: 180 },
          { x: 170, y: 180 },
          { x: 190, y: 180 },
          { x: 120, y: 190 },
          { x: 140, y: 190 },
          { x: 160, y: 190 },
          { x: 180, y: 190 },
          { x: 130, y: 200 },
          { x: 150, y: 200 },
          { x: 170, y: 200 },
          { x: 140, y: 210 },
          { x: 160, y: 210 },
          { x: 150, y: 220 },
          // Stânga sus
          { x: 130, y: 100 },
          { x: 120, y: 90 },
          { x: 110, y: 80 },
          { x: 130, y: 110 },
          { x: 120, y: 100 },
          { x: 110, y: 90 },
          { x: 130, y: 120 },
          { x: 120, y: 110 },
          { x: 110, y: 100 },
          // Stânga
          { x: 120, y: 120 },
          { x: 110, y: 110 },
          { x: 100, y: 100 },
          { x: 120, y: 130 },
          { x: 110, y: 120 },
          { x: 100, y: 110 },
          { x: 120, y: 140 },
          { x: 110, y: 130 },
          { x: 100, y: 120 },
          // Stânga jos
          { x: 130, y: 140 },
          { x: 120, y: 150 },
          { x: 110, y: 160 },
          { x: 130, y: 150 },
          { x: 120, y: 160 },
          { x: 110, y: 170 },
          { x: 130, y: 160 },
          { x: 120, y: 170 },
          { x: 110, y: 180 },
          // Vârf
          { x: 150, y: 160 },
          { x: 140, y: 170 },
          { x: 160, y: 170 },
          { x: 150, y: 170 },
          { x: 140, y: 180 },
          { x: 160, y: 180 },
          { x: 150, y: 180 },
          { x: 140, y: 190 },
          { x: 160, y: 190 },
          // Dreapta jos
          { x: 170, y: 140 },
          { x: 180, y: 150 },
          { x: 190, y: 160 },
          { x: 170, y: 150 },
          { x: 180, y: 160 },
          { x: 190, y: 170 },
          { x: 170, y: 160 },
          { x: 180, y: 170 },
          { x: 190, y: 180 },
          // Dreapta
          { x: 180, y: 120 },
          { x: 190, y: 110 },
          { x: 200, y: 100 },
          { x: 180, y: 130 },
          { x: 190, y: 120 },
          { x: 200, y: 110 },
          { x: 180, y: 140 },
          { x: 190, y: 130 },
          { x: 200, y: 120 },
          // Dreapta sus
          { x: 170, y: 100 },
          { x: 180, y: 90 },
          { x: 190, y: 80 },
          { x: 170, y: 110 },
          { x: 180, y: 100 },
          { x: 190, y: 90 },
          { x: 170, y: 120 },
          { x: 180, y: 110 },
          { x: 190, y: 100 },
        ],
        numbers: [],
        category: "forme",
      },
    };

    // Filtrează după categorie dacă este specificată
    let availableShapes = Object.values(allShapes);
    if (connectDotsCategory && connectDotsCategory !== "toate") {
      availableShapes = availableShapes.filter(
        (shape) => shape.category === connectDotsCategory
      );
    }

    // Alege un desen aleatoriu
    const selectedShape =
      availableShapes[Math.floor(Math.random() * availableShapes.length)];

    // Adaugă opțiuni pentru afișare
    return {
      ...selectedShape,
      showLines: false, // Nu afișa liniile implicit
      difficulty: connectDotsDifficulty || "usor",
    };
  };

  const generateNumberTracing = () => {
    let selectedSet;

    if (difficulty === "easy") {
      // Ușor: doar numere 1-5
      selectedSet = {
        name: "Numere 1-5",
        numbers: [1, 2, 3, 4, 5],
        description: "Trasează numerele de la 1 la 5",
      };
    } else if (difficulty === "medium") {
      // Mediu: toate numerele 1-10
      selectedSet = {
        name: "Numere 1-10",
        numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        description: "Trasează numerele de la 1 la 10",
      };
    } else {
      // Greu: numere 11-15
      selectedSet = {
        name: "Numere 11-15",
        numbers: [11, 12, 13, 14, 15],
        description: "Trasează numerele de la 11 la 15",
      };
    }

    return selectedSet;
  };

  const generateNumberTracingProblems = () => {
    // Pentru "Trasare Numere", nu avem nevoie de multiple probleme
    // Un singur set de numere este suficient
    return [generateNumberTracing()];
  };

  const generateLetterTracing = () => {
    let selectedSet;

    if (difficulty === "easy") {
      // Ușor: literele A-E
      selectedSet = {
        name: "Litere A-E",
        letters: ["A", "B", "C", "D", "E"],
        description: "Trasează literele de la A la E",
      };
    } else if (difficulty === "medium") {
      // Mediu: literele F-J
      selectedSet = {
        name: "Litere F-J",
        letters: ["F", "G", "H", "I", "J"],
        description: "Trasează literele de la F la J",
      };
    } else if (difficulty === "hard") {
      // Greu: literele K-O
      selectedSet = {
        name: "Litere K-O",
        letters: ["K", "L", "M", "N", "O"],
        description: "Trasează literele de la K la O",
      };
    } else if (difficulty === "advanced") {
      // Avansat: literele P-T
      selectedSet = {
        name: "Litere P-T",
        letters: ["P", "Q", "R", "S", "T"],
        description: "Trasează literele de la P la T",
      };
    } else if (difficulty === "expert") {
      // Expert: literele U-Z
      selectedSet = {
        name: "Litere U-Z",
        letters: ["U", "V", "W", "X", "Y", "Z"],
        description: "Trasează literele de la U la Z",
      };
    } else if (difficulty === "all") {
      // All letters: A-Z
      selectedSet = {
        name: "Toate Literele A-Z",
        letters: [
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
          "G",
          "H",
          "I",
          "J",
          "K",
          "L",
          "M",
          "N",
          "O",
          "P",
          "Q",
          "R",
          "S",
          "T",
          "U",
          "V",
          "W",
          "X",
          "Y",
          "Z",
        ],
        description: "Trasează toate literele de la A la Z",
      };
    } else {
      // Fallback to easy
      selectedSet = {
        name: "Litere A-E",
        letters: ["A", "B", "C", "D", "E"],
        description: "Trasează literele de la A la E",
      };
    }

    return selectedSet;
  };

  const generateLetterTracingProblems = () => {
    // Pentru "Trasare Litere", nu avem nevoie de multiple probleme
    // Un singur set de litere este suficient
    return [generateLetterTracing()];
  };

  const generateWorksheet = () => {
    let problems = [];
    let title = worksheetTitle || "Fișă de Adunare"; // Folosește titlul setat de utilizator

    switch (worksheetType) {
      case "addition":
        problems = generateAdditionProblems();
        break;
      case "subtraction":
        problems = generateSubtractionProblems();
        break;
      case "connect-dots":
        problems = [];
        for (let i = 0; i < connectDotsCount; i++) {
          problems.push(generateConnectTheDots());
        }
        break;
      case "number-tracing":
        problems = generateNumberTracingProblems();
        break;
      case "letter-tracing":
        problems = generateLetterTracingProblems();
        break;
      case "sequence-patterns":
        problems = generateSequencePatterns();
        break;
      case "shape-matching":
        problems = generateShapeMatching();
        break;
      case "color-recognition":
        problems = generateColorRecognition();
        break;
      case "classification":
        problems = generateClassification();
        break;
      case "maze-simple":
        problems = generateMazeSimple();
        break;
      case "memory-game":
        problems = generateMemoryGame();
        break;
      case "geometric-shapes":
        problems = generateGeometricShapes();
        break;
      default:
        problems = generateAdditionProblems();
    }

    // Use the worksheetTitle from the input field (which user can edit)
    if (!worksheetTitle) {
      switch (worksheetType) {
        case "addition":
          title = "Fișă de Adunare";
          break;
        case "subtraction":
          title = "Fișă de Scădere";
          break;
        case "connect-dots":
          title = "Conectează Punctele";
          break;
        case "number-tracing":
          title = "Trasare Numere";
          break;
        case "letter-tracing":
          title = "Trasare Litere";
          break;
        case "sequence-patterns":
          title = "Secvențe și Modele";
          break;
        case "shape-matching":
          title = "Potrivirea Formelor";
          break;
        case "color-recognition":
          title = "Recunoașterea Culorilor";
          break;
        case "classification":
          title = "Clasificări și Grupări";
          break;
        case "maze-simple":
          title = "Labirinturi Simple";
          break;
        case "memory-game":
          title = "Jocuri de Memorie";
          break;
        case "geometric-shapes":
          title = "Figuri Geometrice și Culori";
          break;
        default:
          title = "Fișă de Adunare";
      }
    } else {
      title = worksheetTitle;
    }

    setGeneratedWorksheet({
      type: worksheetType,
      title,
      problems,
      difficulty,
      numberOfProblems,
      includeAnswers,
      orientation,
      showVisualObjects,
      visualObjectType,
      showNumbers,
    });

    toast({
      title: "✅ Fișa Generată!",
      description: `Am creat fișa pentru tine!`,
      status: "success",
      duration: 2000,
      position: "top",
    });

    return {
      type: worksheetType,
      title,
      problems,
      difficulty,
      numberOfProblems,
      includeAnswers,
      orientation,
      showVisualObjects,
      visualObjectType,
      showNumbers,
      connectDotsCategory,
      connectDotsDifficulty,
      connectDotsCount,
    };
  };

  const resetWorksheet = () => {
    setGeneratedWorksheet(null);
  };

  // Logic worksheet generation functions
  const generateSequencePatterns = () => {
    const patterns = sequencePatterns[difficulty] || sequencePatterns.easy;
    // Limit to 5 sequences to fit on one A4 page (single column)
    const limitedPatterns = patterns.slice(0, 5);
    return [{ patterns: limitedPatterns }];
  };

  const generateShapeMatching = () => {
    const shapes = shapeMatching[difficulty] || shapeMatching.easy;
    return [{ shapes }];
  };

  const generateColorRecognition = () => {
    const colors = colorRecognition[difficulty] || colorRecognition.easy;
    return [{ colors }];
  };

  const generateClassification = () => {
    const classifications = classification[difficulty] || classification.easy;
    return [{ classifications }];
  };

  const generateMazeSimple = () => {
    const allMazes = mazeSimple[difficulty] || mazeSimple.easy;

    if (difficulty === "easy") {
      // Pentru nivelul easy, selectează aleatoriu 1 labirint din cele 6 disponibile
      const randomIndex = Math.floor(Math.random() * allMazes.length);
      const selectedMaze = allMazes[randomIndex];
      return [{ mazes: [selectedMaze] }];
    } else if (difficulty === "medium") {
      // Pentru nivelul medium, selectează aleatoriu 2 labirinturi din cele 6 disponibile
      const shuffled = [...allMazes].sort(() => Math.random() - 0.5);
      const selectedMazes = shuffled.slice(0, 2);
      return [{ mazes: selectedMazes }];
    }

    return [{ mazes: allMazes }];
  };

  const generateMemoryGame = () => {
    const memories = memoryGame[difficulty] || memoryGame.easy;
    return [{ memories }];
  };

  const generateGeometricShapes = () => {
    const geometricData = geometricShapes[difficulty] || geometricShapes.easy;
    return [{ geometricSet: geometricData }];
  };

  return {
    // State
    worksheetType,
    difficulty,
    numberOfProblems,
    includeAnswers,
    worksheetTitle,
    orientation,
    showVisualObjects,
    visualObjectType,
    showNumbers,
    connectDotsCategory,
    connectDotsDifficulty,
    connectDotsCount,
    generatedWorksheet,

    // Setters
    setWorksheetType,
    setDifficulty,
    setNumberOfProblems,
    setIncludeAnswers,
    setWorksheetTitle,
    setOrientation,
    setShowVisualObjects,
    setVisualObjectType,
    setShowNumbers,
    setConnectDotsCategory,
    setConnectDotsDifficulty,
    setConnectDotsCount,

    // Actions
    generateWorksheet,
    resetWorksheet,
  };
};
