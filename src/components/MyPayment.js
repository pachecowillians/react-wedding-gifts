import React from "react";
import { Button, Center, Flex, Stack, Text } from "@chakra-ui/react";
import { useQRCode } from "next-qrcode";
import { useClipboard } from "@chakra-ui/react";
import { ArrowBackIcon, CheckIcon, CopyIcon } from "@chakra-ui/icons";

const MyPayment = ({ selectedGiftData, setActiveStep }) => {
  const { SVG } = useQRCode();
  const { onCopy, value, setValue, hasCopied } = useClipboard(
    process.env.NEXT_PUBLIC_PIX_KEY
  );

  return (
    <>
      <Center>
        {selectedGiftData.paymentMethod === "pix" ? (
          <Stack>
            <Text fontSize="sm">
              Você escolheu pagar via PIX!
              <br /> Copie a chave PIX ou escaneie o QR Code abaixo. No app do
              seu banco, confira os dados e realize o pagamento do valor
              equivalente ao presente escolhido.
            </Text>
            <Center mt="1em">
              <SVG
                text={process.env.NEXT_PUBLIC_QRCODE_TEXT}
                options={{
                  margin: 2,
                  width: 220,
                  color: {
                    dark: "#000000",
                    light: "#ffffff",
                  },
                }}
              />
            </Center>
            <Text
              alignSelf="center"
              fontSize="sm"
              fontWeight="600"
              color="facebook.500"
            >
              {process.env.NEXT_PUBLIC_ACCOUNT_OWNER}
            </Text>
            <Button
              onClick={onCopy}
              variant="ghost"
              colorScheme="gray"
              color="facebook.500"
              rightIcon={<CopyIcon fontSize="1.2em" />}
              fontSize="sm"
              w="fit-content"
              alignSelf="center"
              my="0.5em"
            >
              {hasCopied ? "Chave copiada!" : value}
            </Button>
          </Stack>
        ) : (
          <Text fontSize="sm">
            Você escolheu comprar o presente!
            <br /> Aguardamos sua entrega no dia do casamento ou em uma ocasião
            oportuna. Agradecemos por seu carinho e atenção!
          </Text>
        )}
      </Center>
      <Flex my="1em">
        <Button
          colorScheme="facebook"
          variant="ghost"
          mr={3}
          ml="auto"
          leftIcon={<ArrowBackIcon />}
          fontSize="sm"
          onClick={() => {
            setActiveStep(0);
          }}
        >
          Voltar
        </Button>
        <Button
          colorScheme="facebook"
          fontSize="sm"
          leftIcon={<CheckIcon />}
          onClick={() => {
            setActiveStep(2);
          }}
        >
          Finalizar
        </Button>
      </Flex>
    </>
  );
};

export default MyPayment;
