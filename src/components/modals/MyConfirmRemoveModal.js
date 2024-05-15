import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Flex,
  Text,
  Button,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const MyConfirmRemoveModal = ({
  isOpen,
  onClose,
  setSelectedGiftData,
  fetchGifts,
}) => {
  const toast = useToast();

  const handleClick = () => {
    setSelectedGiftData((prevGiftData) => {
      const updatedGiftData = {
        ...prevGiftData,
        status: "Disponível",
        name: "",
        phone: "",
        paymentMethod: "",
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
            "Sentimos muito que tenha desistido do presente! Agradecemos por considerar. Estamos ansiosos para vê-lo em nosso casamento!",
          duration: 7000,
          isClosable: true,
          position: "top",
        },
        error: {
          title: "Erro ao Remover o Presente",
          description:
            "Lamentamos informar que ocorreu um erro ao processar sua remoção de presente. Por favor, verifique o status da sua reserva ou entre em contato conosco para obter assistência. Se você já fez o pagamento via PIX, não é necessário refazê-lo.",
          duration: 10000,
          isClosable: true,
          position: "top",
        },
        loading: {
          title: "Aguarde um momento...",
          description:
            "Estamos processando a remoção do seu presente. Por favor, aguarde um momento.",
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
        const response = await fetch("/api/update-gift", {
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
          <Flex mb="1em" mt="2em" justifyContent="flex-end">
            <Button
              colorScheme="red"
              leftIcon={<DeleteIcon />}
              fontSize="sm"
              onClick={handleClick}
            >
              Remover
            </Button>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default MyConfirmRemoveModal;
