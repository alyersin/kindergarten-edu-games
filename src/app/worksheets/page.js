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
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { FaPrint, FaDownload, FaImage } from "react-icons/fa";
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
  const { downloadPDF, downloadImage, printWorksheet } = usePDFGenerator();

  const handleGenerate = () => {
    worksheetGenerator.generateWorksheet();
  };

  const handlePrint = () => {
    printWorksheet(printRef);
  };

  const handleDownloadPDF = () => {
    downloadPDF(printRef, worksheetGenerator.generatedWorksheet);
  };

  const handleDownloadImage = () => {
    downloadImage(worksheetGenerator.generatedWorksheet);
  };

  return (
    <Box
      minH="100vh"
      bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      py={8}
      fontFamily="'Inter', 'Segoe UI', system-ui, sans-serif"
    >
      <Container maxW="7xl">
        <VStack spacing={10}>
          {/* Professional Header */}
          <Box textAlign="center" color="white">
            <Heading
              size="2xl"
              fontWeight="700"
              mb={4}
              textShadow="0 2px 4px rgba(0,0,0,0.3)"
            >
              📚 Generator de Fișe Educaționale
            </Heading>
            <Text
              fontSize="xl"
              opacity={0.9}
              maxW="600px"
              mx="auto"
              lineHeight="1.6"
            >
              Creează fișe personalizate
            </Text>
          </Box>

          {/* Navigation */}
          <HStack spacing={4}>
            <Button
              onClick={() => router.push("/")}
              variant="outline"
              color="white"
              borderColor="white"
              _hover={{ bg: "white", color: "purple.600" }}
              size="lg"
              px={8}
              borderRadius="full"
              fontWeight="600"
            >
              🏠 Acasă
            </Button>
            <Button
              onClick={worksheetGenerator.resetWorksheet}
              variant="outline"
              color="white"
              borderColor="white"
              _hover={{ bg: "white", color: "purple.600" }}
              size="lg"
              px={8}
              borderRadius="full"
              fontWeight="600"
            >
              🔄 Resetează
            </Button>
          </HStack>

          <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={10} w="full">
            {/* Generator Controls */}
            <Card
              bg="white"
              boxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              borderRadius="2xl"
              border="1px solid"
              borderColor="gray.100"
            >
              <CardHeader
                bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                color="white"
                borderRadius="2xl 2xl 0 0"
                py={6}
              >
                <HStack spacing={3}>
                  <Box
                    p={3}
                    bg="rgba(255,255,255,0.2)"
                    borderRadius="xl"
                    backdropFilter="blur(10px)"
                  >
                    <Text fontSize="2xl">⚙️</Text>
                  </Box>
                  <VStack align="start" spacing={1}>
                    <Heading size="lg" fontWeight="700">
                      Configurare Fișă
                    </Heading>
                    <Text fontSize="sm" opacity={0.9}>
                      Personalizează fișa după nevoile tale
                    </Text>
                  </VStack>
                </HStack>
              </CardHeader>
              <CardBody p={8}>
                <WorksheetSettings
                  worksheetType={worksheetGenerator.worksheetType}
                  setWorksheetType={worksheetGenerator.setWorksheetType}
                  difficulty={worksheetGenerator.difficulty}
                  setDifficulty={worksheetGenerator.setDifficulty}
                  numberOfProblems={worksheetGenerator.numberOfProblems}
                  setNumberOfProblems={worksheetGenerator.setNumberOfProblems}
                  includeAnswers={worksheetGenerator.includeAnswers}
                  setIncludeAnswers={worksheetGenerator.setIncludeAnswers}
                  worksheetTitle={worksheetGenerator.worksheetTitle}
                  setWorksheetTitle={worksheetGenerator.setWorksheetTitle}
                  orientation={worksheetGenerator.orientation}
                  setOrientation={worksheetGenerator.setOrientation}
                  showVisualObjects={worksheetGenerator.showVisualObjects}
                  setShowVisualObjects={worksheetGenerator.setShowVisualObjects}
                  visualObjectType={worksheetGenerator.visualObjectType}
                  setVisualObjectType={worksheetGenerator.setVisualObjectType}
                  showNumbers={worksheetGenerator.showNumbers}
                  setShowNumbers={worksheetGenerator.setShowNumbers}
                  connectDotsCategory={worksheetGenerator.connectDotsCategory}
                  setConnectDotsCategory={
                    worksheetGenerator.setConnectDotsCategory
                  }
                  connectDotsDifficulty={
                    worksheetGenerator.connectDotsDifficulty
                  }
                  setConnectDotsDifficulty={
                    worksheetGenerator.setConnectDotsDifficulty
                  }
                  connectDotsCount={worksheetGenerator.connectDotsCount}
                  setConnectDotsCount={worksheetGenerator.setConnectDotsCount}
                  onGenerate={handleGenerate}
                />
              </CardBody>
            </Card>

            {/* Generated Worksheet Preview */}
            <Card
              bg="white"
              boxShadow="0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              borderRadius="2xl"
              border="1px solid"
              borderColor="gray.100"
            >
              <CardHeader
                bg="linear-gradient(135deg, #48bb78 0%, #38a169 100%)"
                color="white"
                borderRadius="2xl 2xl 0 0"
                py={6}
              >
                <HStack justify="space-between" align="center">
                  <HStack spacing={3}>
                    <Box
                      p={3}
                      bg="rgba(255,255,255,0.2)"
                      borderRadius="xl"
                      backdropFilter="blur(10px)"
                    >
                      <Text fontSize="2xl">📄</Text>
                    </Box>
                    <VStack align="start" spacing={1}>
                      <Heading size="lg" fontWeight="700">
                        Previzualizare
                      </Heading>
                      <Text fontSize="sm" opacity={0.9}>
                        Vezi cum arată fișa ta
                      </Text>
                    </VStack>
                  </HStack>
                  {worksheetGenerator.generatedWorksheet && (
                    <HStack spacing={3}>
                      <Button
                        onClick={handleDownloadPDF}
                        leftIcon={<FaDownload />}
                        bg="rgba(255,255,255,0.2)"
                        color="white"
                        border="1px solid rgba(255,255,255,0.3)"
                        _hover={{ bg: "rgba(255,255,255,0.3)" }}
                        size="sm"
                        borderRadius="full"
                        fontWeight="600"
                        backdropFilter="blur(10px)"
                      >
                        PDF
                      </Button>
                      <Button
                        onClick={handleDownloadImage}
                        leftIcon={<FaImage />}
                        bg="rgba(255,255,255,0.2)"
                        color="white"
                        border="1px solid rgba(255,255,255,0.3)"
                        _hover={{ bg: "rgba(255,255,255,0.3)" }}
                        size="sm"
                        borderRadius="full"
                        fontWeight="600"
                        backdropFilter="blur(10px)"
                      >
                        JPG
                      </Button>
                      <Button
                        onClick={handlePrint}
                        leftIcon={<FaPrint />}
                        bg="rgba(255,255,255,0.2)"
                        color="white"
                        border="1px solid rgba(255,255,255,0.3)"
                        _hover={{ bg: "rgba(255,255,255,0.3)" }}
                        size="sm"
                        borderRadius="full"
                        fontWeight="600"
                        backdropFilter="blur(10px)"
                      >
                        Print
                      </Button>
                    </HStack>
                  )}
                </HStack>
              </CardHeader>
              <CardBody p={8}>
                <WorksheetPreview
                  generatedWorksheet={worksheetGenerator.generatedWorksheet}
                  difficulty={worksheetGenerator.difficulty}
                  includeAnswers={worksheetGenerator.includeAnswers}
                  onPrint={handlePrint}
                  onDownloadPDF={handleDownloadPDF}
                  printRef={printRef}
                />
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
