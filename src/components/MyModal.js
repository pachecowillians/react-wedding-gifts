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

const MyModal = ({ isOpen, onClose, selectedGiftData, setSelectedGiftData }) => {
  const [activeStep, setActiveStep] = useState(0);
  console.log(selectedGiftData);
  const steps = ["Opções de Presente", "Pagamento", "Informações de Contato"];
  const activeStepText = steps[activeStep];

  function handleClose() {
    setActiveStep(0);
    setSelectedGiftData({
      id: -1,
      name: "",
      phone: "",
      paymentMethod: "",
      giftDate: "",
    });
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
      <ModalContent p={1}>
        <ModalHeader>
          <ModalCloseButton m={1} />
        </ModalHeader>

        <ModalBody>
          <Flex gap="1em">
            <Image
              src={selectedGiftData && selectedGiftData.imageSrc}
              alt={selectedGiftData && selectedGiftData.description}
              borderRadius="lg"
              boxSize="5em"
              objectFit="fill"
            />
            <Stack spacing="3" justifyContent="center">
              <Heading size="md" fontWeight="400">
                {selectedGiftData && selectedGiftData.title}
              </Heading>
              <Text color="blue.600" fontSize="lg">
                {selectedGiftData && selectedGiftData.price}
              </Text>
            </Stack>
          </Flex>
          <Divider m="1.5em 0" />
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
            <MyPayment selectedGiftData={selectedGiftData} setActiveStep={setActiveStep} />
          )}
          {activeStep === 2 && (
            <MyContactInformation
              selectedGiftData={selectedGiftData}
              setSelectedGiftData={setSelectedGiftData}
              handleClose={handleClose}
              setActiveStep={setActiveStep}
            />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MyModal;
