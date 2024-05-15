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
    onClose();
  }

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

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
          <ModalCloseButton m="0.125em" />
        </ModalHeader>

        <ModalBody>
          <Text fontSize="sm">
            Ullamco incididunt qui ea irure proident enim dolore occaecat
            proident commodo do. Cupidatat Lorem ut consequat nulla nostrud.
          </Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4} m="2em 0">
              <FormControl isInvalid={errors.name}>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="facebook.500" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    fontSize="sm"
                    placeholder="Nome do presente"
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
