import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Stack,
  Text,
  Button,
  FormControl,
  InputGroup,
  InputLeftElement,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";

const MySearchGiftsModal = ({ isOpen, onClose, setSelectedPage }) => {
  const router = useRouter();

  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Este campo é obrigatório")
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "Somente letras são permitidas"),
  });

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  function onSubmit(data) {
    router.push(
      {
        pathname: "/search",
        query: { query: data.name },
      },
      undefined,
      { shallow: true }
    );
    setSelectedPage("search");
    reset();
    onClose();
  }

  return (
    <Modal
      blockScrollOnMount={false}
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "sm", sm: "sm", md: "md", lg: "lg", xl: "xl" }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent pt="1em">
        <ModalHeader>
          Buscar presentes
          <ModalCloseButton m="0.25em" />
        </ModalHeader>

        <ModalBody>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4} m="1em 0">
              <FormControl isInvalid={errors.name}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="facebook.500" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    fontSize="sm"
                    placeholder="Digite o nome do presente"
                    {...register("name")}
                  />
                </InputGroup>
                <FormErrorMessage fontSize={{ base: "xs", md: "sm", lg: "md" }}>
                  {errors.name && errors.name.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
            <Flex mb="1em" mt="2em" justifyContent="flex-end">
              <Button
                colorScheme="facebook"
                type="submit"
                isLoading={isSubmitting}
                leftIcon={<SearchIcon />}
                fontSize="sm"
              >
                Buscar
              </Button>
            </Flex>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MySearchGiftsModal;
