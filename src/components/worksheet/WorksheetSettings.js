"use client";

import {
  VStack,
  FormControl,
  FormLabel,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Input,
  Switch,
  Button,
  Text,
} from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import {
  WORKSHEET_TYPES,
  DIFFICULTY_OPTIONS,
  LETTER_DIFFICULTY_OPTIONS,
  LOGIC_DIFFICULTY_OPTIONS,
  MAZE_DIFFICULTY_OPTIONS,
  CONNECT_DOTS_CATEGORIES,
  CONNECT_DOTS_DIFFICULTY,
  VISUAL_OBJECT_TYPES,
  ORIENTATION_OPTIONS,
} from "../../constants/worksheetOptions";

const WorksheetSettings = ({
  worksheetType,
  setWorksheetType,
  difficulty,
  setDifficulty,
  numberOfProblems,
  setNumberOfProblems,
  includeAnswers,
  setIncludeAnswers,
  worksheetTitle,
  setWorksheetTitle,
  orientation,
  setOrientation,
  showVisualObjects,
  setShowVisualObjects,
  visualObjectType,
  setVisualObjectType,
  showNumbers,
  setShowNumbers,
  connectDotsCategory,
  setConnectDotsCategory,
  connectDotsDifficulty,
  setConnectDotsDifficulty,
  connectDotsCount,
  setConnectDotsCount,
  onGenerate,
}) => {
  // Function to handle worksheet type change and update title accordingly
  const handleWorksheetTypeChange = (newType) => {
    setWorksheetType(newType);

    // Reset difficulty to appropriate default when switching between number and letter tracing
    if (
      (newType === "number-tracing" && worksheetType === "letter-tracing") ||
      (newType === "letter-tracing" && worksheetType === "number-tracing")
    ) {
      setDifficulty("easy");
    }

    // Update the title based on the selected type
    let newTitle;
    switch (newType) {
      case "addition":
        newTitle = "Fișă de Adunare";
        break;
      case "subtraction":
        newTitle = "Fișă de Scădere";
        break;
      case "connect-dots":
        newTitle = "Conectează Punctele";
        break;
      case "number-tracing":
        newTitle = "Trasare Numere";
        break;
      case "letter-tracing":
        newTitle = "Trasare Litere";
        break;
      case "sequence-patterns":
        newTitle = "Secvențe și Modele";
        break;
      case "shape-matching":
        newTitle = "Potrivirea Formelor";
        break;
      case "color-recognition":
        newTitle = "Recunoașterea Culorilor";
        break;
      case "classification":
        newTitle = "Clasificări și Grupări";
        break;
      case "maze-simple":
        newTitle = "Labirinturi Simple";
        break;
      case "memory-game":
        newTitle = "Jocuri de Memorie";
        break;
      case "geometric-shapes":
        newTitle = "Figuri Geometrice și Culori";
        break;
      default:
        newTitle = "Fișă de Adunare";
    }
    setWorksheetTitle(newTitle);
  };

  return (
    <VStack
      spacing={8}
      align="stretch"
      fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif"
    >
      {/* Worksheet Type */}
      <FormControl>
        <FormLabel fontWeight="600" fontSize="md" color="gray.700" mb={3}>
          📝 Tipul Fișei
        </FormLabel>
        <Select
          value={worksheetType}
          onChange={(e) => handleWorksheetTypeChange(e.target.value)}
          size="lg"
          borderRadius="xl"
          border="2px solid"
          borderColor="gray.200"
          _hover={{ borderColor: "purple.300" }}
          _focus={{
            borderColor: "purple.500",
            boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
          }}
          bg="white"
          color="gray.800"
          _selected={{ bg: "purple.100", color: "purple.800" }}
        >
          {WORKSHEET_TYPES.map((opt) => (
            <option
              key={opt.value}
              value={opt.value}
              style={{ color: "black", backgroundColor: "white" }}
            >
              {opt.label}
            </option>
          ))}
        </Select>
      </FormControl>

      {/* Difficulty */}
      {worksheetType !== "connect-dots" && (
        <FormControl>
          <FormLabel fontWeight="600" fontSize="md" color="gray.700" mb={3}>
            📊 Nivel
          </FormLabel>
          <Select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            size="lg"
            borderRadius="xl"
            border="2px solid"
            borderColor="gray.200"
            _hover={{ borderColor: "purple.300" }}
            _focus={{
              borderColor: "purple.500",
              boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
            }}
            bg="white"
            color="gray.800"
          >
            {(worksheetType === "letter-tracing"
              ? LETTER_DIFFICULTY_OPTIONS
              : worksheetType === "maze-simple"
              ? MAZE_DIFFICULTY_OPTIONS
              : [
                  "sequence-patterns",
                  "shape-matching",
                  "color-recognition",
                  "classification",
                  "memory-game",
                  "geometric-shapes",
                ].includes(worksheetType)
              ? LOGIC_DIFFICULTY_OPTIONS
              : DIFFICULTY_OPTIONS
            ).map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                style={{ color: "black", backgroundColor: "white" }}
              >
                {opt.label}
              </option>
            ))}
          </Select>
        </FormControl>
      )}

      {/* Include Answers */}
      {worksheetType !== "connect-dots" &&
        worksheetType !== "number-tracing" &&
        worksheetType !== "letter-tracing" &&
        worksheetType !== "sequence-patterns" &&
        worksheetType !== "maze-simple" &&
        worksheetType !== "geometric-shapes" && (
          <FormControl
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={4}
            bg="gray.100"
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.300"
          >
            <VStack align="start" spacing={1}>
              <FormLabel mb="0" fontWeight="600" color="gray.700">
                ✅ Include Răspunsurile
              </FormLabel>
              <Text fontSize="sm" color="gray.500">
                Afișează răspunsurile pe fișă
              </Text>
            </VStack>
            <Switch
              isChecked={includeAnswers}
              onChange={(e) => setIncludeAnswers(e.target.checked)}
              colorScheme="green"
              size="lg"
              _checked={{
                bg: "green.600",
                borderColor: "green.600",
              }}
              _unchecked={{
                bg: "gray.400",
                borderColor: "gray.400",
              }}
              _focus={{
                boxShadow: "0 0 0 3px rgba(34, 197, 94, 0.3)",
              }}
              _hover={{
                _checked: {
                  bg: "green.700",
                },
                _unchecked: {
                  bg: "gray.500",
                },
              }}
            />
          </FormControl>
        )}

      {/* Connect the Dots Options */}
      {worksheetType === "connect-dots" && (
        <>
          {/* Category Selection */}
          <FormControl>
            <FormLabel fontWeight="600" fontSize="md" color="gray.700" mb={3}>
              🎨 Tipul de Desene
            </FormLabel>
            <Select
              value={connectDotsCategory}
              onChange={(e) => setConnectDotsCategory(e.target.value)}
              size="lg"
              bg="white"
              borderColor="gray.300"
              _hover={{ borderColor: "purple.300" }}
              _focus={{
                borderColor: "purple.500",
                boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
              }}
            >
              {CONNECT_DOTS_CATEGORIES.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </FormControl>

          {/* Difficulty */}
          <FormControl>
            <FormLabel fontWeight="600" fontSize="md" color="gray.700" mb={3}>
              🎯 Dificultatea
            </FormLabel>
            <Select
              value={connectDotsDifficulty}
              onChange={(e) => setConnectDotsDifficulty(e.target.value)}
              size="lg"
              bg="white"
              borderColor="gray.300"
              _hover={{ borderColor: "purple.300" }}
              _focus={{
                borderColor: "purple.500",
                boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
              }}
            >
              {CONNECT_DOTS_DIFFICULTY.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </Select>
          </FormControl>

          {/* Number of Drawings */}
          <FormControl>
            <FormLabel fontWeight="600" fontSize="md" color="gray.700" mb={3}>
              🔢 Numărul de Desene
            </FormLabel>
            <NumberInput
              value={connectDotsCount}
              onChange={(value) => setConnectDotsCount(parseInt(value) || 1)}
              min={1}
              max={4}
              size="lg"
            >
              <NumberInputField
                bg="white"
                borderColor="gray.300"
                color="gray.800"
                _hover={{ borderColor: "purple.300" }}
                _focus={{
                  borderColor: "purple.500",
                  boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
                }}
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </>
      )}

      {/* Show Visual Objects */}
      {(worksheetType === "addition" || worksheetType === "subtraction") && (
        <FormControl
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          p={4}
          bg="orange.100"
          borderRadius="xl"
          border="1px solid"
          borderColor="orange.300"
        >
          <VStack align="start" spacing={1}>
            <FormLabel mb="0" fontWeight="600" color="gray.700">
              🍎 Afișează Obiecte Vizuale
            </FormLabel>
            <Text fontSize="sm" color="gray.500">
              Adaugă fructe/obiecte pentru a ajuta copilul să numere
            </Text>
          </VStack>
          <Switch
            isChecked={showVisualObjects}
            onChange={(e) => setShowVisualObjects(e.target.checked)}
            colorScheme="orange"
            size="lg"
            _checked={{
              bg: "orange.600",
              borderColor: "orange.600",
            }}
            _unchecked={{
              bg: "gray.400",
              borderColor: "gray.400",
            }}
            _focus={{
              boxShadow: "0 0 0 3px rgba(255, 165, 0, 0.3)",
            }}
            _hover={{
              _checked: {
                bg: "orange.700",
              },
              _unchecked: {
                bg: "gray.500",
              },
            }}
          />
        </FormControl>
      )}

      {/* Show Numbers Under Objects */}
      {(worksheetType === "addition" || worksheetType === "subtraction") &&
        showVisualObjects && (
          <FormControl
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            p={4}
            bg="blue.100"
            borderRadius="xl"
            border="1px solid"
            borderColor="blue.300"
          >
            <VStack align="start" spacing={1}>
              <FormLabel mb="0" fontWeight="600" color="gray.700">
                🔢 Afișează Numerele
              </FormLabel>
              <Text fontSize="sm" color="gray.500">
                Afișează numerele sub obiecte (oprește pentru exercițiu de
                numărare)
              </Text>
            </VStack>
            <Switch
              isChecked={showNumbers}
              onChange={(e) => setShowNumbers(e.target.checked)}
              colorScheme="blue"
              size="lg"
              _checked={{
                bg: "blue.600",
                borderColor: "blue.600",
              }}
              _unchecked={{
                bg: "gray.400",
                borderColor: "gray.400",
              }}
              _focus={{
                boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.3)",
              }}
              _hover={{
                _checked: {
                  bg: "blue.700",
                },
                _unchecked: {
                  bg: "gray.500",
                },
              }}
            />
          </FormControl>
        )}

      {/* Visual Object Type */}
      {(worksheetType === "addition" || worksheetType === "subtraction") &&
        showVisualObjects && (
          <FormControl>
            <FormLabel fontWeight="600" fontSize="md" color="gray.700" mb={3}>
              🎨 Tipul Obiectelor
            </FormLabel>
            <Select
              value={visualObjectType}
              onChange={(e) => setVisualObjectType(e.target.value)}
              size="lg"
              borderRadius="xl"
              border="2px solid"
              borderColor="orange.200"
              _hover={{ borderColor: "orange.300" }}
              _focus={{
                borderColor: "orange.500",
                boxShadow: "0 0 0 3px rgba(255, 165, 0, 0.1)",
              }}
              bg="white"
              color="gray.800"
            >
              {VISUAL_OBJECT_TYPES.map((opt) => (
                <option
                  key={opt.value}
                  value={opt.value}
                  style={{ color: "black", backgroundColor: "white" }}
                >
                  {opt.label}
                </option>
              ))}
            </Select>
          </FormControl>
        )}

      {/* Worksheet Title */}
      <FormControl>
        <FormLabel fontWeight="600" fontSize="md" color="gray.700" mb={3}>
          📋 Titlul Fișei
        </FormLabel>
        <Input
          value={worksheetTitle}
          onChange={(e) => setWorksheetTitle(e.target.value)}
          placeholder="Introdu titlul fișei..."
          size="lg"
          borderRadius="xl"
          border="2px solid"
          borderColor="gray.200"
          color="gray.800"
          _hover={{ borderColor: "purple.300" }}
          _focus={{
            borderColor: "purple.500",
            boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
          }}
          bg="white"
        />
      </FormControl>

      {/* Orientation - hide for geometric shapes */}
      {worksheetType !== "geometric-shapes" && (
        <FormControl>
          <FormLabel fontWeight="600" fontSize="md" color="gray.700" mb={3}>
            📄 Orientarea PDF
          </FormLabel>
          <Select
            value={orientation}
            onChange={(e) => setOrientation(e.target.value)}
            size="lg"
            borderRadius="xl"
            border="2px solid"
            borderColor="gray.200"
            _hover={{ borderColor: "purple.300" }}
            _focus={{
              borderColor: "purple.500",
              boxShadow: "0 0 0 3px rgba(102, 126, 234, 0.1)",
            }}
            bg="white"
            color="gray.800"
          >
            {ORIENTATION_OPTIONS.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                style={{ color: "black", backgroundColor: "white" }}
              >
                {opt.label}
              </option>
            ))}
          </Select>
        </FormControl>
      )}

      <Button
        onClick={onGenerate}
        leftIcon={<FaPlus />}
        size="xl"
        py={8}
        px={12}
        bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        color="white"
        _hover={{
          bg: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
          transform: "translateY(-3px)",
          boxShadow:
            "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        }}
        _active={{ transform: "translateY(-1px)" }}
        boxShadow="0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"
        borderRadius="2xl"
        fontWeight="700"
        fontSize="lg"
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
        border="none"
        mt={4}
      >
        Generează Fișa
      </Button>
    </VStack>
  );
};

export default WorksheetSettings;
