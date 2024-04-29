import React from "react";
import { Button, Center, Flex, Stack, Text } from "@chakra-ui/react";
import { useQRCode } from "next-qrcode";
import { useClipboard } from "@chakra-ui/react";
import { ArrowBackIcon, CheckIcon, CopyIcon } from "@chakra-ui/icons";

const MyPayment = ({ giftData, setActiveStep }) => {
  const { SVG } = useQRCode();
  const { onCopy, value, setValue, hasCopied } = useClipboard(
    process.env.NEXT_PUBLIC_PIX_KEY
  );
  return (
    <>
      <Center>
        {giftData.paymentMethod === "pix" ? (
          <Stack spacing={4} m={15}>
            <Text>
              Culpa dolore voluptate mollit sunt sunt id anim proident sint aute
              non.
            </Text>
            <Center>
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
            <Text alignSelf="center" fontSize={17}>
              {process.env.NEXT_PUBLIC_ACCOUNT_OWNER}
            </Text>
            <Stack
              color="var(--chakra-colors-facebook-500)"
              gap={5}
              alignItems="center"
            >
              <Text fontWeight="bold">Chave: {value}</Text>
              <Button onClick={onCopy} leftIcon={<CopyIcon />}>
                {hasCopied ? "Chave copiada!" : "Copiar chave"}
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Text>
            Ullamco incididunt qui ea irure proident enim dolore occaecat
            proident commodo do. Cupidatat Lorem ut consequat nulla nostrud.
            Laboris elit laboris nisi velit proident culpa.
          </Text>
        )}
      </Center>
      <Flex mt={5} mb={3}>
        <Button
          colorScheme="facebook"
          variant="ghost"
          mr={3}
          ml="auto"
          onClick={() => {
            setActiveStep(0);
          }}
          leftIcon={<ArrowBackIcon />}
        >
          Voltar
        </Button>
        <Button
          colorScheme="facebook"
          onClick={() => {
            setActiveStep(2);
          }}
          leftIcon={<CheckIcon />}
        >
          Confirmar
        </Button>
      </Flex>
    </>
  );
};

export default MyPayment;
