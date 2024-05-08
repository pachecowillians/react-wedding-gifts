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
import MyCurrencyDisplay from "./MyCurrencyDisplay";

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
      size="sm"
      isCentered
    >
      <ModalOverlay />
      <ModalContent pt="1em">
        <ModalHeader>
          <ModalCloseButton m="0.125em"/>
        </ModalHeader>

        <ModalBody>
          <Flex gap="1em">
            <Image
              src={selectedGiftData && selectedGiftData.imageSrc}
              alt={selectedGiftData && selectedGiftData.description}
              borderRadius="md"
              objectFit="cover"
              maxW="5em"
              // objectFit="fill"
            />
            <Stack gap="0.75em" justifyContent="center">
              <Heading fontSize="sm" fontWeight="bold">
                {selectedGiftData && selectedGiftData.title}
              </Heading>
              <MyCurrencyDisplay price={selectedGiftData && selectedGiftData.price}/>
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
