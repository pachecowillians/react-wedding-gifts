import React from "react";
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
import { yupResolver } from "@hookform/resolvers/yup"; // Importe yupResolver
import * as Yup from "yup";

const MyContactInformation = ({ setGiftData, handleClose, setActiveStep }) => {
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
    handleClose();
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
