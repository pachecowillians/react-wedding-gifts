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
  Button,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import MyStepper from "./MyStepper";
import MyContactInformation from "./MyContactInformation";
import MyPresentOptions from "./MyPresentOptions";
import MyPayment from "./MyPayment";
import MyCurrencyDisplay from "./MyCurrencyDisplay";
import { ArrowBackIcon, DeleteIcon, PhoneIcon } from "@chakra-ui/icons";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const MySearchGiftsModal = ({
  isOpen,
  onClose,
  selectedGiftData,
  setSelectedGiftData,
  fetchGifts,
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = ["Opções de Presente", "Pagamento", "Informações de Contato"];
  const activeStepText = steps[activeStep];

  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Este campo é obrigatório")
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "Somente letras são permitidas"),
    phone: Yup.string()
      .required("Este campo é obrigatório")
      .matches(/^\d{9,12}$/, "Número de celular inválido"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const toast = useToast();

  const onSubmit = (data) => {
    console.log("aqui");
    setSelectedGiftData((prevGiftData) => {
      const updatedGiftData = {
        ...prevGiftData,
        name: "",
        phone: "",
        status: "Disponível",
        message: "",
        giftDate: "",
      };
      const myPromise = enviarDadosParaAPI(updatedGiftData)
        .then(() => {
          fetchGifts();
        })
        .catch((error) => {
          console.error("Erro ao enviar dados:", error);
        });
      toast.promise(myPromise, {
        success: {
          title: "Presente Removido!",
          description:
            "Obrigado por reservar este presente! Estamos ansiosos para vê-lo em nosso casamento!",
          duration: 7000,
          isClosable: true,
          position: "top",
        },
        error: {
          title: "Erro ao Remover o Presente",
          description:
            "Ocorreu um erro ao processar sua reserva. Por favor, verifique o status da sua reserva ou entre em contato conosco para obter assistência. Se você já fez o pagamento via PIX, não é necessário refazê-lo.",
          duration: 10000,
          isClosable: true,
          position: "top",
        },
        loading: {
          title: "Aguarde um momento...",
          description:
            "Estamos processando sua remoção. Por favor, aguarde um momento.",
          duration: 7000,
          isClosable: true,
          position: "top",
        },
      });

      handleClose();
      return updatedGiftData;
    });
  };

  function enviarDadosParaAPI(selectedGiftData) {
    return new Promise(async (resolve, reject) => {
      try {
        const { id, name, phone, status, paymentMethod, message, giftDate } =
          selectedGiftData;
        const response = await fetch("/api/choose-gift", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id,
            name: name,
            phone: phone,
            status: status,
            paymentMethod: paymentMethod,
            message: message,
            giftDate: giftDate,
          }),
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(`Erro ao enviar dados: ${errorMessage}`);
        }

        const data = await response.json();
        resolve(data);
      } catch (error) {
        console.error("Erro ao enviar dados para a API:", error);
        reject(error);
      }
    });
  }

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
      size={{ base: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl" }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent pt="1em">
        <ModalHeader>
          Remover presente
          <ModalCloseButton m="0.125em" />
        </ModalHeader>

        <ModalBody>
          <Text fontSize="sm">
            Ullamco incididunt qui ea irure proident enim dolore occaecat
            proident commodo do. Cupidatat Lorem ut consequat nulla nostrud.
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4} m="2em 0">
              <FormControl isInvalid={errors.phone}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <PhoneIcon color="facebook.500" />
                  </InputLeftElement>
                  <Input
                    type="tel"
                    fontSize="sm"
                    placeholder="Número de celular"
                    {...register("phone")}
                  />
                </InputGroup>
                <FormErrorMessage fontSize={{ base: "xs", md: "sm", lg: "md" }}>
                  {errors.phone && errors.phone.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
            <Flex mb="1em" mt="2em" justifyContent="flex-end">
              <Button
                colorScheme="red"
                type="submit"
                isLoading={isSubmitting}
                leftIcon={<DeleteIcon />}
                fontSize="sm"
              >
                Remover
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MySearchGiftsModal;
