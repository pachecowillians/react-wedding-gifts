import React, { useEffect, useState } from "react";
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
import MyStepper from "../MyStepper";
import MyContactInformation from "../MyContactInformation";
import MyPresentOptions from "../MyPresentOptions";
import MyPayment from "../MyPayment";
import MyCurrencyDisplay from "../MyCurrencyDisplay";
import {
  ArrowBackIcon,
  DeleteIcon,
  PhoneIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { IoSearchOutline } from "react-icons/io5";

const MySearchGiftsModal = ({ isOpen, onClose, setSelectedPage }) => {
  const router = useRouter();

  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Este campo é obrigatório")
      .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/, "Somente letras são permitidas"),
  });

  function onSubmit(data) {
    router.push(`/search?query=${data.name}`);
    onClose();
  }

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });
  useEffect(() => {
    setSelectedPage("my-gifts");
  }, [setSelectedPage]);
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
