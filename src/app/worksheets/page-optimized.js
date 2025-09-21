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

  const handleGenerate = () => {
    worksheetGenerator.generateWorksheet();
  };

  const handlePrint = () => {
    printWorksheet(worksheetGenerator.generatedWorksheet);
  };

  const handleDownloadPDF = () => {
    downloadPDF(printRef, worksheetGenerator.generatedWorksheet);
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
            onRestartClick={worksheetGenerator.resetWorksheet}
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
                  onGenerate={handleGenerate}
                />
              </CardBody>
            </Card>

            {/* Generated Worksheet Preview */}
            <Card bg={cardBg} boxShadow="xl">
              <CardHeader>
                <HStack justify="space-between" align="center">
                  <Heading size="md" color="green.600">
                    📄 Previzualizare Fișă
                  </Heading>
                  {worksheetGenerator.generatedWorksheet && (
                    <HStack spacing={2}>
                      <Button
                        colorScheme="blue"
                        size="sm"
                        onClick={handleDownloadPDF}
                        leftIcon={<FaDownload />}
                        variant="outline"
                      >
                        Download PDF
                      </Button>
                      <Button
                        colorScheme="green"
                        size="sm"
                        onClick={handlePrint}
                        leftIcon={<FaPrint />}
                      >
                        Printează
                      </Button>
                    </HStack>
                  )}
                </HStack>
              </CardHeader>
              <CardBody>
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
