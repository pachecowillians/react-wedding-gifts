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

const MyModal = ({ isOpen, onClose, selectedCardData }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [giftData, setGiftData] = useState({
    name: "",
    phone: "",
    paymentMethod: "",
    giftDate: "",
  });
  const steps = ["Opções de Presente", "Pagamento", "Informações de Contato"];
  const activeStepText = steps[activeStep];

  function handleClose() {
    setActiveStep(0);
    setGiftData({
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
              src={selectedCardData && selectedCardData.imageSrc}
              alt={selectedCardData && selectedCardData.description}
              borderRadius="lg"
              boxSize="5em"
              objectFit="fill"
            />
            <Stack spacing="3" justifyContent="center">
              <Heading size="md" fontWeight="400">
                {selectedCardData && selectedCardData.title}
              </Heading>
              <Text color="blue.600" fontSize="lg">
                {selectedCardData && selectedCardData.price}
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
              giftData={giftData}
              setGiftData={setGiftData}
              setActiveStep={setActiveStep}
            />
          )}
          {activeStep === 1 && (
            <MyPayment giftData={giftData} setActiveStep={setActiveStep} />
          )}
          {activeStep === 2 && (
            <MyContactInformation
              setGiftData={setGiftData}
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
