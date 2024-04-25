import Head from "next/head";
import {
  SimpleGrid,
  Card,
  CardBody,
  Container,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  Button,
  CardHeader,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Box,
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  useToast,
} from "@chakra-ui/react";
import { FaPix } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";

import {
  ArrowForwardIcon,
  PhoneIcon,
  ArrowBackIcon,
  CheckIcon,
} from "@chakra-ui/icons";
import {
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import { useState } from "react";
import MyCard from "@/components/MyCard";
import MyStepper from "@/components/MyStepper";

// Vetor com URLs de imagens diferentes
const images = [
  "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

function getRandomImage() {
  // Seleciona aleatoriamente um índice do vetor de imagens
  const randomIndex = Math.floor(Math.random() * images.length);
  // Retorna a URL da imagem correspondente ao índice selecionado
  return images[randomIndex];
}
const steps = [
  { title: "contact", description: "Informações de Contato" },
  { title: "payment_method", description: "Opções de Presente" },
  { title: "confirm_payment", description: "Confirmação da Escolha" },
];

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const toast = useToast();

  const activeStepText = steps[activeStep].description;

  return (
    <>
      <Head>
        <title>Lista de Presentes | S & W</title>
        <meta
          name="description"
          content="Lista de presentes para o casamento de Willian e Samara"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="8xl" p="5em 0em">
        <Center flexDir="column">
          <Image
            src="./logo.svg"
            alt="Logo"
            boxSize={{ base: "12em", md: "13em" }}
          />
          <Text maxW="70vw" m="3em" textAlign="center">
            Ea deserunt elit duis enim aliquip irure aliquip et occaecat. Et
            laboris anim veniam non est adipisicing magna qui sit. Commodo magna
            eu eu non commodo dolor pariatur occaecat cillum est officia nisi.
            Consectetur tempor proident labore aute laborum veniam duis. Lorem
            sint non enim labore eiusmod nostrud ut minim cillum. Pariatur aute
          </Text>
        </Center>
        <Heading
          m="1.5em"
          textTransform="upper"
          fontWeight="400"
          textAlign={{ base: "center", md: "left" }}
        >
          Lista de Presentes
        </Heading>
        <SimpleGrid
          gap={50}
          minChildWidth="sm"
          justifyItems="center"
          justifyContent="center"
          alignItems="center"
        >
          {[...Array(20)].map((_, index) => (
            <MyCard
              key={index}
              onOpen={onOpen}
              cardInfo={{
                imageSrc: getRandomImage(),
                title: "Cama de Casal",
                price: 450.0,
              }}
            />
          ))}
        </SimpleGrid>
      </Container>
      <Modal
        blockScrollOnMount={false}
        isOpen={isOpen}
        onClose={onClose}
        size="lg"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex gap="1em">
              <Image
                src={getRandomImage()}
                alt="Green double couch with wooden legs"
                borderRadius="lg"
                boxSize="5em"
                objectFit="fill"
              />
              <Stack spacing="3" justifyContent="center">
                <Heading size="md" fontWeight="400">
                  Living room Sofa
                </Heading>
                <Text color="blue.600" fontSize="lg">
                  $450
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
              <>
                <Text>
                  Ullamco incididunt qui ea irure proident enim dolore occaecat
                  proident commodo do. Cupidatat Lorem ut consequat nulla
                  nostrud. Laboris elit laboris nisi velit proident culpa.
                </Text>
                <Stack spacing={4} mt="2em" mb="1em">
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <IoPerson color="var(--chakra-colors-facebook-500)" />
                    </InputLeftElement>
                    <Input type="text" placeholder="Nome completo" />
                  </InputGroup>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <PhoneIcon color="facebook.500" />
                    </InputLeftElement>
                    <Input type="tel" placeholder="Número de celular" />
                  </InputGroup>
                </Stack>
              </>
            )}
            {activeStep === 1 && (
              <>
                <Text>
                  Ullamco incididunt qui ea irure proident enim dolore occaecat
                  proident commodo do. Cupidatat Lorem ut consequat nulla
                  nostrud. Laboris elit laboris nisi velit proident culpa.
                </Text>
              </>
            )}
            {activeStep === 2 && (
              <Center>
                {paymentMethod == "pix" ? (
                  <Image
                    src="qrcode.jpeg"
                    alt="PIX"
                    borderRadius="lg"
                    height="30em"
                    justifySelf="center"
                    objectFit="fill"
                  />
                ) : (
                  <Text>
                    Ullamco incididunt qui ea irure proident enim dolore
                    occaecat proident commodo do. Cupidatat Lorem ut consequat
                    nulla nostrud. Laboris elit laboris nisi velit proident
                    culpa.
                  </Text>
                )}
              </Center>
            )}
          </ModalBody>

          <ModalFooter>
            {activeStep === 0 && (
              <>
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
              </>
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
    </>
  );
}
