"use client";

import { VStack, HStack, Box } from "@chakra-ui/react";
import ProblemContainer from "./ProblemContainer";
import NumberDisplay from "./NumberDisplay";
import OperatorDisplay from "./OperatorDisplay";
import AnswerBox from "./AnswerBox";
import ObjectGroup from "./ObjectGroup";

// Helper function to get object types for mixed mode
const getObjectTypes = (visualObjectType) => {
  if (visualObjectType === "mixed") {
    const objectKeys = [
      "apple",
      "banana",
      "orange",
      "strawberry",
      "grape",
      "cherry",
      "peach",
      "lemon",
      "star",
      "heart",
      "circle",
      "square",
      "ball",
      "car",
      "flower",
      "butterfly",
      "fish",
      "bird",
      "cat",
      "dog",
      "bear",
      "rabbit",
      "duck",
      "frog",
      "bee",
      "ladybug",
      "sun",
      "moon",
      "cloud",
      "rainbow",
    ];

    // Generează tipuri diferite pentru fiecare număr
    const type1 = objectKeys[Math.floor(Math.random() * objectKeys.length)];
    let type2 = objectKeys[Math.floor(Math.random() * objectKeys.length)];

    // Asigură-te că tipurile sunt diferite
    while (type2 === type1) {
      type2 = objectKeys[Math.floor(Math.random() * objectKeys.length)];
    }

    return { type1, type2 };
  }
  return { type1: visualObjectType, type2: visualObjectType };
};

const MathProblemRenderer = ({
  problem,
  index,
  includeAnswers,
  showVisualObjects = false,
  visualObjectType = "apple",
  showNumbers = true,
}) => {
  const { type1, type2 } = getObjectTypes(visualObjectType);

  return (
    <ProblemContainer showVisualObjects={showVisualObjects}>
      <VStack spacing={2} align="center" w="full">
        {showVisualObjects && (
          <VStack spacing={2} align="center" w="full">
            {/* Objects Row - always show objects without numbers underneath */}
            <HStack spacing={3} align="center" justify="center" w="full">
              <ObjectGroup
                count={problem.num1}
                type={visualObjectType}
                specificType={type1}
                showNumbers={false}
              />
              <Box minW="15px" />
              <ObjectGroup
                count={problem.num2}
                type={visualObjectType}
                specificType={type2}
                showNumbers={false}
              />
              <Box minW="15px" />
              <Box minW="50px" />
            </HStack>

            {/* Numbers Row - always show structure, hide/show numbers based on toggle */}
            <HStack spacing={3} align="center" justify="center" w="full">
              {showNumbers ? (
                <NumberDisplay value={problem.num1} />
              ) : (
                <Box
                  minW="40px"
                  h="40px"
                  border="2px dashed"
                  borderColor="gray.300"
                  borderRadius="md"
                />
              )}
              <OperatorDisplay operator={problem.operator} />
              {showNumbers ? (
                <NumberDisplay value={problem.num2} />
              ) : (
                <Box
                  minW="40px"
                  h="40px"
                  border="2px dashed"
                  borderColor="gray.300"
                  borderRadius="md"
                />
              )}
              <OperatorDisplay operator="=" color="green.600" />
              <AnswerBox
                includeAnswers={includeAnswers}
                answer={problem.answer}
              />
            </HStack>
          </VStack>
        )}

        {!showVisualObjects && (
          <HStack spacing={1} align="center" w="full" justify="center">
            {showNumbers ? (
              <NumberDisplay value={problem.num1} />
            ) : (
              <Box
                minW="40px"
                h="40px"
                border="2px dashed"
                borderColor="gray.300"
                borderRadius="md"
              />
            )}
            <OperatorDisplay operator={problem.operator} />
            {showNumbers ? (
              <NumberDisplay value={problem.num2} />
            ) : (
              <Box
                minW="40px"
                h="40px"
                border="2px dashed"
                borderColor="gray.300"
                borderRadius="md"
              />
            )}
            <OperatorDisplay operator="=" color="green.600" />
            <AnswerBox
              includeAnswers={includeAnswers}
              answer={problem.answer}
            />
          </HStack>
        )}
      </VStack>
    </ProblemContainer>
  );
};

export default MathProblemRenderer;
