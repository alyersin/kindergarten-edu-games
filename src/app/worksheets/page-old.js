"use client";

import {
  Box,
  Container,
  VStack,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Heading,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { FaPrint, FaDownload } from "react-icons/fa";
import GameHeader from "../../components/GameHeader";
import WorksheetSettings from "../../components/worksheet/WorksheetSettings";
import WorksheetPreview from "../../components/worksheet/WorksheetPreview";
import { useWorksheetGenerator } from "../../hooks/useWorksheetGenerator";
import { usePDFGenerator } from "../../hooks/usePDFGenerator";

export default function WorksheetGenerator() {
  const router = useRouter();
  const printRef = useRef(null);
  const cardBg = useColorModeValue("white", "gray.800");

  // Custom hooks
  const worksheetGenerator = useWorksheetGenerator();
  const { downloadPDF, printWorksheet } = usePDFGenerator();

  const generateAdditionProblems = () => {
    const problems = [];
    const max = parseInt(maxNumber);

    for (let i = 0; i < numberOfProblems; i++) {
      let num1, num2;

      if (difficulty === "easy") {
        num1 = Math.floor(Math.random() * Math.min(max, 5)) + 1;
        num2 = Math.floor(Math.random() * Math.min(max, 5)) + 1;
      } else if (difficulty === "medium") {
        num1 = Math.floor(Math.random() * Math.min(max, 10)) + 1;
        num2 = Math.floor(Math.random() * Math.min(max, 10)) + 1;
      } else {
        num1 = Math.floor(Math.random() * max) + 1;
        num2 = Math.floor(Math.random() * max) + 1;
      }

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
    const max = parseInt(maxNumber);

    for (let i = 0; i < numberOfProblems; i++) {
      let num1, num2;

      if (difficulty === "easy") {
        num1 = Math.floor(Math.random() * Math.min(max, 10)) + 5;
        num2 = Math.floor(Math.random() * Math.min(num1, 5)) + 1;
      } else if (difficulty === "medium") {
        num1 = Math.floor(Math.random() * Math.min(max, 20)) + 10;
        num2 = Math.floor(Math.random() * Math.min(num1, 10)) + 1;
      } else {
        num1 = Math.floor(Math.random() * max) + max;
        num2 = Math.floor(Math.random() * num1) + 1;
      }

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
    const shapes = [
      {
        name: "Casa",
        points: [
          { x: 100, y: 200 },
          { x: 200, y: 200 },
          { x: 200, y: 150 },
          { x: 150, y: 100 },
          { x: 100, y: 150 },
          { x: 100, y: 200 },
        ],
        numbers: [1, 2, 3, 4, 5, 6],
      },
      {
        name: "Stea",
        points: [
          { x: 150, y: 50 },
          { x: 170, y: 120 },
          { x: 240, y: 120 },
          { x: 190, y: 160 },
          { x: 210, y: 230 },
          { x: 150, y: 190 },
          { x: 90, y: 230 },
          { x: 110, y: 160 },
          { x: 60, y: 120 },
          { x: 130, y: 120 },
          { x: 150, y: 50 },
        ],
        numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      },
      {
        name: "Fluture",
        points: [
          { x: 150, y: 150 },
          { x: 120, y: 120 },
          { x: 100, y: 150 },
          { x: 120, y: 180 },
          { x: 150, y: 150 },
          { x: 180, y: 120 },
          { x: 200, y: 150 },
          { x: 180, y: 180 },
          { x: 150, y: 150 },
        ],
        numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      },
    ];

    return shapes[Math.floor(Math.random() * shapes.length)];
  };

  const generateNumberTracing = () => {
    const numberSets = [
      {
        name: "Numere 1-5",
        numbers: [1, 2, 3, 4, 5],
        description: "Trasează numerele de la 1 la 5",
      },
      {
        name: "Numere 6-10",
        numbers: [6, 7, 8, 9, 10],
        description: "Trasează numerele de la 6 la 10",
      },
      {
        name: "Numere 1-10",
        numbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        description: "Trasează numerele de la 1 la 10",
      },
      {
        name: "Numere 11-15",
        numbers: [11, 12, 13, 14, 15],
        description: "Trasează numerele de la 11 la 15",
      },
    ];

    return numberSets[Math.floor(Math.random() * numberSets.length)];
  };

  const generateWorksheet = () => {
    let problems = [];
    let title = worksheetTitle;

    switch (worksheetType) {
      case "addition":
        problems = generateAdditionProblems();
        title = "Fișă de Adunare";
        break;
      case "subtraction":
        problems = generateSubtractionProblems();
        title = "Fișă de Scădere";
        break;
      case "connect-dots":
        problems = [generateConnectTheDots()];
        title = "Conectează Punctele";
        break;
      case "number-tracing":
        problems = [generateNumberTracing()];
        title = "Trasare Numere";
        break;
      default:
        problems = generateAdditionProblems();
    }

    setGeneratedWorksheet({
      type: worksheetType,
      title,
      problems,
      difficulty,
      numberOfProblems,
      includeAnswers,
    });

    toast({
      title: "✅ Fișa Generată!",
      description: `Am creat ${numberOfProblems} probleme pentru tine!`,
      status: "success",
      duration: 2000,
      position: "top",
    });
  };

  const printWorksheet = () => {
    if (!generatedWorksheet) {
      toast({
        title: "⚠️ Eroare",
        description: "Generează mai întâi o fișă!",
        status: "warning",
        duration: 2000,
        position: "top",
      });
      return;
    }

    window.print();
  };

  const downloadPDF = async () => {
    if (!generatedWorksheet) {
      toast({
        title: "⚠️ Eroare",
        description: "Generează mai întâi o fișă!",
        status: "warning",
        duration: 2000,
        position: "top",
      });
      return;
    }

    try {
      toast({
        title: "📄 Se generează PDF-ul...",
        description: "Te rugăm să aștepți câteva secunde",
        status: "info",
        duration: 3000,
        position: "top",
      });

      const element = printRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      const imgData = canvas.toDataURL("image/png");

      // Use landscape orientation for number tracing worksheets
      const isLandscape = generatedWorksheet.type === "number-tracing";
      const pdf = new jsPDF(isLandscape ? "l" : "p", "mm", "a4");

      const imgWidth = isLandscape ? 295 : 210; // A4 width in mm (landscape vs portrait)
      const pageHeight = isLandscape ? 210 : 295; // A4 height in mm (landscape vs portrait)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      const fileName = `${generatedWorksheet.title.replace(/\s+/g, "_")}_${
        new Date().toISOString().split("T")[0]
      }.pdf`;
      pdf.save(fileName);

      toast({
        title: "✅ PDF Downloadat!",
        description: `Fișa a fost salvată ca ${fileName}`,
        status: "success",
        duration: 3000,
        position: "top",
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "❌ Eroare la generarea PDF",
        description: "A apărut o problemă. Încearcă din nou!",
        status: "error",
        duration: 3000,
        position: "top",
      });
    }
  };

  const renderMathProblem = (problem, index) => (
    <Box
      key={problem.id}
      p={3}
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      minH="60px"
      display="flex"
      alignItems="center"
      bg="white"
    >
      <HStack spacing={3} align="center" w="full">
        <Text fontSize="md" fontWeight="bold" minW="25px">
          {index + 1}.
        </Text>
        <HStack spacing={2} align="center" flex="1">
          <Text fontSize="xl" fontWeight="bold">
            {problem.num1}
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            {problem.operator}
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            {problem.num2}
          </Text>
          <Text fontSize="xl" fontWeight="bold">
            =
          </Text>
          <Box
            w="50px"
            h="35px"
            border="2px solid"
            borderColor="gray.300"
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
            ml="auto"
          >
            {includeAnswers && (
              <Text fontSize="lg" fontWeight="bold" color="green.600">
                {problem.answer}
              </Text>
            )}
          </Box>
        </HStack>
      </HStack>
    </Box>
  );

  const renderConnectTheDots = (shape) => (
    <Box
      p={6}
      border="1px solid"
      borderColor="gray.200"
      borderRadius="md"
      bg="white"
      minH="400px"
      position="relative"
    >
      <Text fontSize="lg" fontWeight="bold" mb={4} textAlign="center">
        Conectează punctele pentru a forma o {shape.name.toLowerCase()}!
      </Text>

      <Box
        position="relative"
        w="100%"
        h="300px"
        border="1px solid"
        borderColor="gray.300"
      >
        {shape.points.map((point, index) => (
          <Box
            key={index}
            position="absolute"
            left={`${point.x}px`}
            top={`${point.y}px`}
            w="20px"
            h="20px"
            bg="blue.500"
            borderRadius="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
            color="white"
            fontSize="sm"
            fontWeight="bold"
            transform="translate(-50%, -50%)"
          >
            {shape.numbers[index]}
          </Box>
        ))}
      </Box>

      <Text fontSize="sm" color="gray.600" mt={4} textAlign="center">
        Conectează punctele în ordine: {shape.numbers.join(" → ")}
      </Text>
    </Box>
  );

  const renderNumberTracing = (numberSet) => {
    // For numbers 1-10, use a 2x5 grid layout for better landscape fit
    const useGridLayout = numberSet.numbers.length > 5;

    return (
      <Box
        p={2}
        border="1px solid"
        borderColor="gray.200"
        borderRadius="md"
        bg="white"
        minH="300px"
      >
        <Text fontSize="sm" fontWeight="bold" mb={1} textAlign="center">
          {numberSet.description}
        </Text>

        <Text fontSize="xs" color="gray.600" mb={2} textAlign="center">
          Trasează cu creionul peste linia punctată pentru a descoperi numerele.
        </Text>

        {useGridLayout ? (
          /* Compact grid layout for 6+ numbers (landscape optimized) */
          <SimpleGrid columns={2} spacing={2} w="full">
            {numberSet.numbers.map((number, index) => (
              <Box key={index} w="full">
                <HStack spacing={2} align="center" justify="center">
                  {/* Numărul solid pentru referință */}
                  <Box
                    w="50px"
                    h="50px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg="gray.50"
                    borderRadius="sm"
                    border="1px solid"
                    borderColor="gray.400"
                  >
                    <Text fontSize="xl" fontWeight="bold" color="gray.800">
                      {number}
                    </Text>
                  </Box>

                  {/* Numerele punctate pentru trasare */}
                  <HStack spacing={1}>
                    {[1, 2, 3].map((_, traceIndex) => (
                      <Box
                        key={traceIndex}
                        w="50px"
                        h="50px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg="white"
                        borderRadius="sm"
                        border="1px dashed"
                        borderColor="gray.400"
                        position="relative"
                      >
                        <Text
                          fontSize="xl"
                          fontWeight="bold"
                          color="transparent"
                          style={{
                            WebkitTextStroke: "1.5px #9CA3AF",
                            WebkitTextFillColor: "transparent",
                            textShadow: "none",
                            fontFamily: "Arial, sans-serif",
                          }}
                        >
                          {number}
                        </Text>
                      </Box>
                    ))}
                  </HStack>
                </HStack>
              </Box>
            ))}
          </SimpleGrid>
        ) : (
          /* Vertical layout for 5 or fewer numbers */
          <VStack spacing={3} w="full">
            {numberSet.numbers.map((number, index) => (
              <Box key={index} w="full">
                <HStack spacing={4} align="center" justify="center">
                  {/* Numărul solid pentru referință */}
                  <Box
                    w="70px"
                    h="70px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    bg="gray.50"
                    borderRadius="md"
                    border="2px solid"
                    borderColor="gray.400"
                  >
                    <Text fontSize="3xl" fontWeight="bold" color="gray.800">
                      {number}
                    </Text>
                  </Box>

                  {/* Numerele punctate pentru trasare */}
                  <HStack spacing={2}>
                    {[1, 2, 3].map((_, traceIndex) => (
                      <Box
                        key={traceIndex}
                        w="70px"
                        h="70px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        bg="white"
                        borderRadius="md"
                        border="2px dashed"
                        borderColor="gray.400"
                        position="relative"
                      >
                        <Text
                          fontSize="3xl"
                          fontWeight="bold"
                          color="transparent"
                          style={{
                            WebkitTextStroke: "2px #9CA3AF",
                            WebkitTextFillColor: "transparent",
                            textShadow: "none",
                            fontFamily: "Arial, sans-serif",
                          }}
                        >
                          {number}
                        </Text>
                      </Box>
                    ))}
                  </HStack>
                </HStack>
              </Box>
            ))}
          </VStack>
        )}
      </Box>
    );
  };

  return (
    <Box minH="100vh" bg="blue.50" py={6}>
      <Container maxW="6xl">
        <VStack spacing={8}>
          <GameHeader
            title="📝 Generator de Fișe 📝"
            levelName="Creează Fișe Educaționale"
            description="Generează și printează fișe pentru copii!"
            onHomeClick={() => router.push("/")}
            onRestartClick={() => setGeneratedWorksheet(null)}
            textColor="gray.800"
          />

          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} w="full">
            {/* Generator Controls */}
            <Card bg={cardBg} boxShadow="xl">
              <CardHeader>
                <Heading size="md" color="blue.600">
                  ⚙️ Setări Fișă
                </Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={6} align="stretch">
                  {/* Worksheet Type */}
                  <FormControl>
                    <FormLabel fontWeight="bold">Tipul Fișei:</FormLabel>
                    <Select
                      value={worksheetType}
                      onChange={(e) => setWorksheetType(e.target.value)}
                    >
                      <option value="addition">Adunări</option>
                      <option value="subtraction">Scăderi</option>
                      <option value="connect-dots">Conectează Punctele</option>
                      <option value="number-tracing">Trasare Numere</option>
                    </Select>
                  </FormControl>

                  {/* Difficulty */}
                  {worksheetType !== "connect-dots" && (
                    <FormControl>
                      <FormLabel fontWeight="bold">Dificultate:</FormLabel>
                      <Select
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                      >
                        <option value="easy">Ușor (1-5)</option>
                        <option value="medium">Mediu (1-10)</option>
                        <option value="hard">Greu (1-20)</option>
                      </Select>
                    </FormControl>
                  )}

                  {/* Number of Problems */}
                  {worksheetType !== "connect-dots" && (
                    <FormControl>
                      <FormLabel fontWeight="bold">
                        Numărul de Probleme:
                      </FormLabel>
                      <NumberInput
                        value={numberOfProblems}
                        onChange={(value) =>
                          setNumberOfProblems(parseInt(value) || 10)
                        }
                        min={5}
                        max={20}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  )}

                  {/* Max Number */}
                  {worksheetType !== "connect-dots" && (
                    <FormControl>
                      <FormLabel fontWeight="bold">Numărul Maxim:</FormLabel>
                      <NumberInput
                        value={maxNumber}
                        onChange={(value) =>
                          setMaxNumber(parseInt(value) || 10)
                        }
                        min={5}
                        max={50}
                      >
                        <NumberInputField />
                        <NumberInputStepper>
                          <NumberIncrementStepper />
                          <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </FormControl>
                  )}

                  {/* Include Answers */}
                  {worksheetType !== "connect-dots" && (
                    <FormControl display="flex" alignItems="center">
                      <FormLabel mb="0" fontWeight="bold">
                        Include Răspunsurile:
                      </FormLabel>
                      <Switch
                        isChecked={includeAnswers}
                        onChange={(e) => setIncludeAnswers(e.target.checked)}
                        colorScheme="green"
                      />
                    </FormControl>
                  )}

                  {/* Worksheet Title */}
                  <FormControl>
                    <FormLabel fontWeight="bold">Titlul Fișei:</FormLabel>
                    <Input
                      value={worksheetTitle}
                      onChange={(e) => setWorksheetTitle(e.target.value)}
                      placeholder="Introdu titlul fișei..."
                    />
                  </FormControl>

                  <Button
                    colorScheme="blue"
                    size="lg"
                    onClick={generateWorksheet}
                    leftIcon={<FaPlus />}
                    fontSize="xl"
                    py={6}
                    px={8}
                    bg="blue.500"
                    _hover={{ bg: "blue.600", transform: "translateY(-2px)" }}
                    boxShadow="lg"
                    transition="all 0.3s"
                  >
                    🎯 Generează Fișa
                  </Button>
                </VStack>
              </CardBody>
            </Card>

            {/* Generated Worksheet Preview */}
            <Card bg={cardBg} boxShadow="xl">
              <CardHeader>
                <HStack justify="space-between" align="center">
                  <Heading size="md" color="green.600">
                    📄 Previzualizare Fișă
                  </Heading>
                  {generatedWorksheet && (
                    <HStack spacing={2}>
                      <Button
                        colorScheme="blue"
                        size="sm"
                        onClick={downloadPDF}
                        leftIcon={<FaDownload />}
                        variant="outline"
                      >
                        Download PDF
                      </Button>
                      <Button
                        colorScheme="green"
                        size="sm"
                        onClick={printWorksheet}
                        leftIcon={<FaPrint />}
                      >
                        Printează
                      </Button>
                    </HStack>
                  )}
                </HStack>
              </CardHeader>
              <CardBody>
                {generatedWorksheet ? (
                  <Box ref={printRef} className="pdf-content">
                    {/* Worksheet Header */}
                    <VStack
                      spacing={
                        generatedWorksheet.type === "number-tracing"
                          ? 1
                          : generatedWorksheet.type === "addition" ||
                            generatedWorksheet.type === "subtraction"
                          ? 1
                          : 2
                      }
                      mb={
                        generatedWorksheet.type === "number-tracing"
                          ? 2
                          : generatedWorksheet.type === "addition" ||
                            generatedWorksheet.type === "subtraction"
                          ? 2
                          : 3
                      }
                    >
                      {/* Name and Date Fields */}
                      <HStack
                        spacing={6}
                        w="full"
                        justify="flex-start"
                        mb={
                          generatedWorksheet.type === "number-tracing" ? 1 : 2
                        }
                      >
                        <HStack spacing={2}>
                          <Text
                            fontSize={
                              generatedWorksheet.type === "number-tracing"
                                ? "sm"
                                : "md"
                            }
                            fontWeight="bold"
                          >
                            Nume:
                          </Text>
                          <Box
                            w={
                              generatedWorksheet.type === "number-tracing"
                                ? "160px"
                                : "180px"
                            }
                            h={
                              generatedWorksheet.type === "number-tracing"
                                ? "20px"
                                : "25px"
                            }
                            border="1px solid"
                            borderColor="gray.400"
                            borderBottom="2px solid"
                            borderBottomColor="black"
                          />
                        </HStack>
                        <HStack spacing={2}>
                          <Text
                            fontSize={
                              generatedWorksheet.type === "number-tracing"
                                ? "sm"
                                : "md"
                            }
                            fontWeight="bold"
                          >
                            Data:
                          </Text>
                          <Box
                            w={
                              generatedWorksheet.type === "number-tracing"
                                ? "100px"
                                : "120px"
                            }
                            h={
                              generatedWorksheet.type === "number-tracing"
                                ? "20px"
                                : "25px"
                            }
                            border="1px solid"
                            borderColor="gray.400"
                            borderBottom="2px solid"
                            borderBottomColor="black"
                          />
                        </HStack>
                      </HStack>

                      <Heading
                        size={
                          generatedWorksheet.type === "number-tracing"
                            ? "sm"
                            : "md"
                        }
                        textAlign="center"
                        color="blue.600"
                      >
                        {generatedWorksheet.title}
                      </Heading>

                      {generatedWorksheet.type !== "number-tracing" &&
                        generatedWorksheet.type !== "connect-dots" && (
                          <HStack spacing={3}>
                            <Badge colorScheme="blue" size="sm">
                              Dificultate: {difficulty}
                            </Badge>
                            <Badge colorScheme="green" size="sm">
                              Probleme: {generatedWorksheet.numberOfProblems}
                            </Badge>
                            {includeAnswers && (
                              <Badge colorScheme="orange" size="sm">
                                Cu Răspunsuri
                              </Badge>
                            )}
                          </HStack>
                        )}
                      <Divider />
                    </VStack>

                    {/* Worksheet Content */}
                    {generatedWorksheet.type === "connect-dots" ? (
                      renderConnectTheDots(generatedWorksheet.problems[0])
                    ) : generatedWorksheet.type === "number-tracing" ? (
                      renderNumberTracing(generatedWorksheet.problems[0])
                    ) : (
                      <SimpleGrid columns={2} spacing={3}>
                        {generatedWorksheet.problems.map((problem, index) =>
                          renderMathProblem(problem, index)
                        )}
                      </SimpleGrid>
                    )}

                    {/* Worksheet Footer */}
                    <Box
                      mt={4}
                      pt={2}
                      borderTop="1px solid"
                      borderColor="gray.200"
                    >
                      <Text fontSize="xs" color="gray.500" textAlign="center">
                        Generat cu Generatorul de Fișe Educaționale
                      </Text>
                    </Box>
                  </Box>
                ) : (
                  <VStack spacing={6} py={12}>
                    <Box
                      p={8}
                      border="2px dashed"
                      borderColor="gray.300"
                      borderRadius="xl"
                      bg="gray.50"
                      w="full"
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
                          Alege tipul de fișă și setările în partea stângă, apoi
                          apasă butonul albastru "Generează Fișa"
                        </Text>
                        <VStack spacing={2} mt={4}>
                          <Text
                            fontSize="sm"
                            color="blue.600"
                            fontWeight="bold"
                          >
                            Pași pentru a genera o fișă:
                          </Text>
                          <VStack spacing={1} align="start">
                            <Text fontSize="sm" color="gray.600">
                              1. Alege tipul de fișă (Adunări, Scăderi, etc.)
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              2. Setează dificultatea
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              3. Ajustează numărul de probleme
                            </Text>
                            <Text fontSize="sm" color="gray.600">
                              4. Apasă "Generează Fișa"
                            </Text>
                          </VStack>
                        </VStack>
                      </VStack>
                    </Box>
                  </VStack>
                )}
              </CardBody>
            </Card>
          </SimpleGrid>
        </VStack>
      </Container>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .printable,
          .printable * {
            visibility: visible;
          }
          .printable {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }

        /* PDF Generation Styles */
        .pdf-content {
          background: white !important;
          color: black !important;
          font-family: Arial, sans-serif !important;
        }

        .pdf-content * {
          background: white !important;
          color: black !important;
        }
      `}</style>
    </Box>
  );
}
