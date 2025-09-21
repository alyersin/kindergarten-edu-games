"use client";

import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Button,
  Icon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import { FaRedo, FaHome } from "react-icons/fa";
import { useEffect } from "react";

const LevelCompletedModal = ({
  isOpen,
  levelName,
  onNextLevel,
  onRestart,
  onHome,
  isLastLevel = false,
  ...props
}) => {
  const { isOpen: modalIsOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (isOpen) {
      onOpen();
    } else {
      onClose();
    }
  }, [isOpen, onOpen, onClose]);

  const handleNextLevel = () => {
    onClose();
    onNextLevel();
  };

  const handleRestart = () => {
    onClose();
    onRestart();
  };

  const handleHome = () => {
    onClose();
    if (onHome) onHome();
  };

  return (
    <Modal isOpen={modalIsOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(4px)" />
      <ModalContent
        bg="green.100"
        border="4px solid"
        borderColor="green.400"
        borderRadius="xl"
        mx={4}
        {...props}
      >
        <ModalBody p={8} textAlign="center">
          <VStack spacing={6}>
            <Text fontSize="6xl" mb={2}>
              🎉
            </Text>
            <Heading size="xl" color="green.700" mb={2}>
              Nivel Completat!
            </Heading>
            <Text fontSize="lg" color="green.600" mb={4}>
              Ai terminat nivelul &ldquo;{levelName}&rdquo; cu succes!
            </Text>
            <HStack justify="center" spacing={4} w="full">
              {!isLastLevel ? (
                <Button
                  onClick={handleNextLevel}
                  colorScheme="green"
                  size="lg"
                  flex="1"
                >
                  Următorul Nivel
                </Button>
              ) : (
                <Button
                  onClick={handleNextLevel}
                  colorScheme="green"
                  size="lg"
                  flex="1"
                >
                  Finalizează Jocul
                </Button>
              )}
              <Button
                onClick={handleRestart}
                colorScheme="blue"
                size="lg"
                leftIcon={<Icon as={FaRedo} />}
                flex="1"
              >
                Joacă Din Nou
              </Button>
            </HStack>
            {onHome && (
              <Button
                onClick={handleHome}
                variant="outline"
                colorScheme="gray"
                size="md"
                leftIcon={<Icon as={FaHome} />}
                mt={2}
              >
                Acasă
              </Button>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LevelCompletedModal;
