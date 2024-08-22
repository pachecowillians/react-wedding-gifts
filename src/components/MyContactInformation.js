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
  Textarea,
  Icon,
} from "@chakra-ui/react";
import { IoPerson } from "react-icons/io5";
import { ArrowBackIcon, PhoneIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { GrSend } from "react-icons/gr";

const MyContactInformation = ({
  setSelectedGiftData,
  handleClose,
  setActiveStep,
  fetchGifts,
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

  const toast = useToast();

  const onSubmit = (data) => {
    setSelectedGiftData((prevGiftData) => {
      const updatedGiftData = {
        ...prevGiftData,
        name: data.name,
        phone: data.phone,
        status: "Escolhido",
        message: data.message,
        giftDate: new Date().toLocaleString(undefined, {
          dateStyle: "medium",
          timeStyle: "medium",
        }),
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
          title: "Presente Confirmado!",
          description:
            "Obrigado por reservar este presente! Estamos ansiosos para vê-lo em nosso casamento!",
          duration: 7000,
          isClosable: true,
          position: "top",
        },
        error: {
          title: "Erro ao Reservar Presente",
          description:
            "Ocorreu um erro ao processar sua reserva. Por favor, verifique o status da sua reserva ou entre em contato conosco para obter assistência. Se você já fez o pagamento via PIX, não é necessário refazê-lo.",
          duration: 10000,
          isClosable: true,
          position: "top",
        },
        loading: {
          title: "Aguarde um momento...",
          description:
            "Estamos processando sua reserva. Por favor, aguarde um momento.",
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

  return (
    <>
      <Text fontSize="sm">
        Para que possamos identificar e agradecer seu presente, por favor,
        preencha seu nome e telefone abaixo. Se quiser deixar uma mensagem para
        nós, ficaremos muito felizes em ler suas palavras!
        <br /> Não se preocupe! Seus dados serão usados exclusivamente para isso
        e ficarão seguros conosco.
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4} m="2em 0">
          <FormControl isInvalid={errors.name}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={IoPerson} color="facebook.500" />
              </InputLeftElement>
              <Input
                fontSize="sm"
                type="text"
                placeholder="Nome completo"
                {...register("name")}
              />
            </InputGroup>
            <FormErrorMessage fontSize={{ base: "xs", md: "sm", lg: "md" }}>
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
                fontSize="sm"
                placeholder="Número de celular"
                {...register("phone")}
              />
            </InputGroup>
            <FormErrorMessage fontSize={{ base: "xs", md: "sm", lg: "md" }}>
              {errors.phone && errors.phone.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl>
            <InputGroup>
              <Textarea
                fontSize="sm"
                placeholder="Deixe uma mensagem para nós"
                {...register("message")}
              />
            </InputGroup>
          </FormControl>
        </Stack>
        <Flex mb="1em" mt="2em" justifyContent="flex-end">
          <Button
            colorScheme="facebook"
            variant="ghost"
            mr={3}
            leftIcon={<ArrowBackIcon />}
            fontSize="sm"
            onClick={() => {
              setActiveStep(1);
            }}
          >
            Voltar
          </Button>
          <Button
            colorScheme="facebook"
            type="submit"
            isLoading={isSubmitting}
            leftIcon={<GrSend />}
            fontSize="sm"
          >
            Enviar
          </Button>
        </Flex>
      </form>
    </>
  );
};

export default MyContactInformation;
