import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Stack,
  Heading,
  Text,
  Image,
  Divider,
} from "@chakra-ui/react";
import MyStepper from "./MyStepper";
import MyContactInformation from "./MyContactInformation";
import MyPresentOptions from "./MyPresentOptions";
import MyPayment from "./MyPayment";

const MyModal = ({
  isOpen,
  onClose,
  selectedGiftData,
  setSelectedGiftData,
  fetchGifts,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Opções de Presente", "Pagamento", "Informações de Contato"];
  const activeStepText = steps[activeStep];

  function handleClose() {
    setActiveStep(0);
    setSelectedGiftData({});
    onClose();
  }

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={handleClose}
      size={{ base: "sm", md: "lg" }}
    >
      <ModalOverlay />
      <ModalContent p="1em 0 0 0">
        <ModalHeader>
          <ModalCloseButton m={1} />
        </ModalHeader>

        <ModalBody>
          <Flex gap="1em">
            <Image
              src={selectedGiftData && selectedGiftData.imageSrc}
              alt={selectedGiftData && selectedGiftData.description}
              borderRadius="0.7em"
              maxW="5em"
              // objectFit="fill"
            />
            <Stack spacing="1" justifyContent="center">
              <Heading size="sm" fontWeight="400">
                {selectedGiftData && selectedGiftData.title}
              </Heading>
              <Text color="blue.600" fontSize="sm">
                {selectedGiftData && selectedGiftData.price}
              </Text>
            </Stack>
          </Flex>
          <Divider m="1em 0" />
          <MyStepper
            activeStep={activeStep}
            steps={steps}
            activeStepText={activeStepText}
          />
          {activeStep === 0 && (
            <MyPresentOptions
              selectedGiftData={selectedGiftData}
              setSelectedGiftData={setSelectedGiftData}
              setActiveStep={setActiveStep}
            />
          )}
          {activeStep === 1 && (
            <MyPayment
              selectedGiftData={selectedGiftData}
              setActiveStep={setActiveStep}
            />
          )}
          {activeStep === 2 && (
            <MyContactInformation
              setSelectedGiftData={setSelectedGiftData}
              handleClose={handleClose}
              setActiveStep={setActiveStep}
              fetchGifts={fetchGifts}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MyModal;
