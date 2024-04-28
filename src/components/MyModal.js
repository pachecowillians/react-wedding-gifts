import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Flex,
  Stack,
  Heading,
  Text,
  Image,
  Divider,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon, CheckIcon } from "@chakra-ui/icons";
import { FaPix } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import MyStepper from "./MyStepper";
import MyContactInformation from "./MyContactInformation";
import MyPresentOptions from "./MyPresentOptions";
import MyPayment from "./MyPayment";
import { useToast } from "@chakra-ui/react";

const MyModal = ({ isOpen, onClose, selectedCardData }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("");
  const toast = useToast();
  const steps = ["Informações de Contato", "Opções de Presente", "Pagamento"];
  const activeStepText = steps[activeStep];

  function handleClose() {
    setActiveStep(0);
    setPaymentMethod("");
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
      <ModalContent>
        <ModalHeader></ModalHeader>
        <ModalCloseButton />
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
          {activeStep === 0 && <MyContactInformation />}
          {activeStep === 1 && <MyPresentOptions />}
          {activeStep === 2 && <MyPayment paymentMethod={paymentMethod} />}
        </ModalBody>

        <ModalFooter>
          {activeStep === 0 && (
            <Button
              colorScheme="facebook"
              variant="ghost"
              mr={3}
              onClick={() => {
                setActiveStep(activeStep + 1);
              }}
              rightIcon={<ArrowForwardIcon />}
            >
              Continuar
            </Button>
          )}
          {activeStep > 0 && (
            <>
              <Button
                colorScheme="facebook"
                variant="ghost"
                mr={3}
                onClick={() => {
                  setActiveStep(activeStep - 1);
                }}
                leftIcon={<ArrowBackIcon />}
              >
                Voltar
              </Button>
            </>
          )}
          {activeStep === 1 && (
            <>
              <Button
                colorScheme="facebook"
                variant="ghost"
                onClick={() => {
                  setPaymentMethod("pix");
                  setActiveStep(2);
                }}
                mr={3}
                ml="auto"
                leftIcon={<FaPix />}
              >
                PIX
              </Button>
              <Button
                colorScheme="facebook"
                variant="ghost"
                onClick={() => {
                  setPaymentMethod("buy");
                  setActiveStep(2);
                }}
                leftIcon={<FaShoppingCart />}
              >
                Eu Compro
              </Button>
            </>
          )}
          {activeStep === 2 && (
            <>
              <Button
                colorScheme="facebook"
                mr={3}
                ml="auto"
                onClick={() => {
                  setActiveStep(0);
                  onClose();
                  toast({
                    title: "Presente reservado!",
                    description:
                      "Muito obrigado pelo presente, te aguardamos em nosso casamento!",
                    status: "success",
                    duration: 9000,
                    isClosable: false,
                  });
                }}
                leftIcon={<CheckIcon />}
              >
                Confirmar
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MyModal;
