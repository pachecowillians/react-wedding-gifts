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
import { ArrowBackIcon, DeleteIcon, PhoneIcon, SearchIcon } from "@chakra-ui/icons";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { IoSearchOutline } from "react-icons/io5";

const MySearchUserModal = ({ isOpen, onClose, setSelectedPage }) => {
  const router = useRouter();

  const schema = Yup.object().shape({
    phone: Yup.string()
      .required("Este campo é obrigatório")
      .matches(/^\d{9,12}$/, "Número de celular inválido"),
  });

  function onSubmit(data) {
    router.push({
      pathname: '/my-gifts',
      query: { phone: data.phone },
    }, undefined, { shallow: true }); 
    setSelectedPage("my-gifts")
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
          Meus presentes
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

export default MySearchUserModal;
