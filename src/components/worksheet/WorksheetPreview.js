"use client";

import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  SimpleGrid,
  Badge,
  Divider,
} from "@chakra-ui/react";
import { FaPrint, FaDownload } from "react-icons/fa";
import {
  ConnectTheDotsRenderer,
  NumberTracingRenderer,
  LetterTracingRenderer,
  SequencePatternsRenderer,
  ShapeMatchingRenderer,
  ColorRecognitionRenderer,
  ClassificationRenderer,
  SimpleMazeRenderer,
  MemoryGameRenderer,
  GeometricShapesRenderer,
} from "./WorksheetRenderers";
import MathProblemRenderer from "./MathProblemRenderer";

const WorksheetPreview = ({
  generatedWorksheet,
  difficulty,
  includeAnswers,
  onPrint,
  onDownloadPDF,
  printRef,
}) => {
  // Convert difficulty to descriptive text
  const getDifficultyText = (difficulty, worksheetType) => {
    if (worksheetType === "letter-tracing") {
      switch (difficulty) {
        case "easy":
          return "A B C D E";
        case "medium":
          return "F G H I J";
        case "hard":
          return "K L M N O";
        case "advanced":
          return "P Q R S T";
        case "expert":
          return "U V W X Y Z";
        case "all":
          return "A B C D E F G H I J K L M N O P Q R S T U V W X Y Z";
        default:
          return "A B C D E";
      }
    } else if (
      [
        "sequence-patterns",
        "shape-matching",
        "color-recognition",
        "classification",
        "maze-simple",
        "memory-game",
        "geometric-shapes",
      ].includes(worksheetType)
    ) {
      // For logic worksheets
      switch (difficulty) {
        case "easy":
          return "Grupa Mică (3-4 ani)";
        case "medium":
          return "Grupa Mijlocie (4-5 ani)";
        case "hard":
          return "Grupa Mare (5-6 ani)";
        default:
          return "Grupa Mică (3-4 ani)";
      }
    } else {
      // For number-based worksheets
      switch (difficulty) {
        case "easy":
          return "1-5";
        case "medium":
          return "1-10";
        default:
          return "1-10"; // Default to medium if unknown
      }
    }
  };

  if (!generatedWorksheet) {
    return (
      <Box
        ref={printRef}
        className="pdf-content"
        bg="white"
        minH="400px"
        w="100%"
        maxW="800px"
        position="relative"
        visibility="visible"
        opacity="1"
        display="block"
        p={8}
        border="2px dashed"
        borderColor="gray.300"
        borderRadius="xl"
        alignItems="center"
        justifyContent="center"
      >
        <VStack spacing={4}>
          <Text fontSize="2xl">📝</Text>
          <Text
            fontSize="lg"
            color="gray.600"
            textAlign="center"
            fontWeight="bold"
          >
            Nu ai generat încă nici o fișă
          </Text>
          <Text fontSize="md" color="gray.500" textAlign="center">
            Alege tipul de fișă și setările în partea stângă, apoi apasă butonul
            albastru "Generează Fișa"
          </Text>
        </VStack>
      </Box>
    );
  }

  const renderWorksheetContent = () => {
    switch (generatedWorksheet.type) {
      case "connect-dots":
        return (
          <VStack spacing={6} w="full">
            {generatedWorksheet.problems.map((shape, index) => (
              <ConnectTheDotsRenderer key={index} shape={shape} />
            ))}
          </VStack>
        );
      case "number-tracing":
        return (
          <NumberTracingRenderer numberSet={generatedWorksheet.problems[0]} />
        );
      case "letter-tracing":
        return (
          <LetterTracingRenderer letterSet={generatedWorksheet.problems[0]} />
        );
      case "sequence-patterns":
        return (
          <SequencePatternsRenderer
            sequenceSet={generatedWorksheet.problems[0]}
          />
        );
      case "shape-matching":
        return (
          <ShapeMatchingRenderer shapeSet={generatedWorksheet.problems[0]} />
        );
      case "color-recognition":
        return (
          <ColorRecognitionRenderer colorSet={generatedWorksheet.problems[0]} />
        );
      case "classification":
        return (
          <ClassificationRenderer
            classificationSet={generatedWorksheet.problems[0]}
          />
        );
      case "maze-simple":
        return <SimpleMazeRenderer mazeSet={generatedWorksheet.problems[0]} />;
      case "memory-game":
        return (
          <MemoryGameRenderer memorySet={generatedWorksheet.problems[0]} />
        );
      case "geometric-shapes":
        return (
          <GeometricShapesRenderer
            geometricSet={generatedWorksheet.problems[0].geometricSet}
          />
        );
      default:
        return (
          <SimpleGrid columns={2} spacing={1}>
            {generatedWorksheet.problems.map((problem, index) => (
              <MathProblemRenderer
                key={problem.id}
                problem={problem}
                index={index}
                includeAnswers={includeAnswers}
                showVisualObjects={generatedWorksheet.showVisualObjects}
                visualObjectType={generatedWorksheet.visualObjectType}
                showNumbers={generatedWorksheet.showNumbers}
              />
            ))}
          </SimpleGrid>
        );
    }
  };

  return (
    <Box
      ref={printRef}
      className="pdf-content"
      bg="white"
      minH="400px"
      w="100%"
      maxW="800px"
      position="relative"
      visibility="visible"
      opacity="1"
      display="block"
    >
      {/* Fixed Worksheet Header */}
      <Box
        position="sticky"
        top="0"
        zIndex="10"
        bg="white"
        pt={4}
        pb={2}
        borderBottom="1px solid"
        borderColor="gray.200"
      >
        <VStack spacing={2} mb={3}>
          {/* Standard Name and Date Fields */}
          <HStack spacing={6} w="full" justify="space-between" mb={4}>
            <HStack spacing={2}>
              <Text fontSize="md" fontWeight="bold">
                Nume:
              </Text>
              <Box
                w="180px"
                h="25px"
                borderBottom="2px solid"
                borderBottomColor="black"
                mb={0}
              />
            </HStack>
            <HStack spacing={2}>
              <Text fontSize="md" fontWeight="bold">
                Data:
              </Text>
              <Box
                w="120px"
                h="25px"
                borderBottom="2px solid"
                borderBottomColor="black"
                mb={0}
              />
            </HStack>
          </HStack>

          {/* Worksheet Title */}
          <Heading size="md" textAlign="center" color="blue.600">
            {generatedWorksheet.title}
          </Heading>

          {/* Level Info */}
          <HStack spacing={3}>
            <Badge colorScheme="blue" size="sm">
              Nivel: {getDifficultyText(difficulty, generatedWorksheet.type)}
            </Badge>
            {includeAnswers && (
              <Badge colorScheme="orange" size="sm">
                Cu Răspunsuri
              </Badge>
            )}
          </HStack>
          <Divider />
        </VStack>
      </Box>

      {/* Worksheet Content */}
      <Box pt={4}>{renderWorksheetContent()}</Box>

      {/* Worksheet Footer */}
      <Box mt={6} pt={4} borderTop="1px solid" borderColor="gray.200">
        <Text
          fontSize="xs"
          color="gray.500"
          textAlign="center"
          fontWeight="normal"
        >
          Generat cu Generatorul de Fișe Educaționale
        </Text>
      </Box>
    </Box>
  );
};

export default WorksheetPreview;
