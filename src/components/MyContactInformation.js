import React from "react";
import {
  Text,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
} from "@chakra-ui/react";
import { IoPerson } from "react-icons/io5";
import { PhoneIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";

const MyContactInformation = ({setGiftData}) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data); // Aqui você pode enviar os dados para onde quiser
  };

  return (
    <>
      <Text>
        Ullamco incididunt qui ea irure proident enim dolore occaecat proident
        commodo do. Cupidatat Lorem ut consequat nulla nostrud. Laboris elit
        laboris nisi velit proident culpa.
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4} mt="2em" mb="1em">
          <FormControl isInvalid={errors.name}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <IoPerson color="var(--chakra-colors-facebook-500)" />
              </InputLeftElement>
              <Input
                type="text"
                placeholder="Nome completo"
                {...register("name", {
                  required: "Este campo é obrigatório",
                  minLength: { value: 4, message: "Mínimo de 4 caracteres" },
                })}
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
                {...register("phone", {
                  required: "Este campo é obrigatório",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Número de celular inválido",
                  },
                })}
              />
            </InputGroup>
            <FormErrorMessage>
              {errors.phone && errors.phone.message}
            </FormErrorMessage>
          </FormControl>
        </Stack>
        <Button mt={4} colorScheme="teal" isLoading={isSubmitting} type="submit">
          Enviar
        </Button>
      </form>
    </>
  );
};

export default MyContactInformation;
