import React, { useEffect } from "react";
import {
  Text,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  FormControl,
  FormErrorMessage,
  Button,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { IoPerson } from "react-icons/io5";
import { ArrowBackIcon, CheckIcon, PhoneIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

const MyContactInformation = ({
  selectedGiftData,
  setSelectedGiftData,
  handleClose,
  setActiveStep,
}) => {
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

  const onSubmit = (data) => {
    setSelectedGiftData((prevGiftData) => {
      const updatedGiftData = {
        ...prevGiftData,
        name: data.name,
        phone: data.phone,
        giftDate: new Date().toISOString(),
      };
      console.log("SUBMETEUUUUU");
      console.log(updatedGiftData);
      enviarDadosParaAPI(updatedGiftData)
        .then((data) => {
          console.log("Dados enviados com sucesso:", data);
        })
        .catch((error) => {
          console.error("Erro ao enviar dados:", error);
        });
      handleClose(updatedGiftData);
      return updatedGiftData;
    });
    toast({
      title: "Presente reservado!",
      description:
        "Muito obrigado pelo presente, te aguardamos em nosso casamento!",
      status: "success",
      duration: 9000,
      isClosable: false,
    });
  };
  const toast = useToast();

  async function enviarDadosParaAPI(selectedGiftData) {
    try {
      const { id, name, phone, paymentMethod, giftDate } = selectedGiftData;
      console.log(selectedGiftData);
      const response = await fetch("/api/choose-gift", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          name: name,
          phone: phone,
          paymentMethod: paymentMethod,
          giftDate: giftDate,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Erro ao enviar dados: ${errorMessage}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erro ao enviar dados para a API:", error);
      throw error;
    }
  }

  return (
    <>
      <Text>
        Ullamco incididunt qui ea irure proident enim dolore occaecat proident
        commodo do. Cupidatat Lorem ut consequat nulla nostrud. Laboris elit
        laboris nisi velit proident culpa.
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4} m="2em 0">
          <FormControl isInvalid={errors.name}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <IoPerson color="var(--chakra-colors-facebook-500)" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Nome completo"
                {...register("name")}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.name && errors.name.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.phone}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <PhoneIcon color="facebook.500" />
              </InputLeftElement>
              <Input
                type="tel"
                placeholder="Número de celular"
                {...register("phone")}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.phone && errors.phone.message}
            </FormErrorMessage>
          </FormControl>
        </Stack>
        <Flex mt={5} mb={3} justifyContent="flex-end">
          <Button
            colorScheme="facebook"
            variant="ghost"
            mr={3}
            onClick={() => {
              setActiveStep(0);
            }}
            leftIcon={<ArrowBackIcon />}
          >
            Voltar
          </Button>
          <Button
            colorScheme="facebook"
            type="submit"
            isLoading={isSubmitting}
            leftIcon={<CheckIcon />}
          >
            Finalizar
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default MyContactInformation;
