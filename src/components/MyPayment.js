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
              Culpa dolore voluptate mollit sunt sunt id anim proident sint aute
              non.
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
            <Text alignSelf="center" fontSize="sm" fontWeight="600">
              {process.env.NEXT_PUBLIC_ACCOUNT_OWNER}
            </Text>
            <Button
              onClick={onCopy}
              variant="ghost"
              colorScheme="main"
              rightIcon={<CopyIcon />}
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
            Ullamco incididunt qui ea irure proident enim dolore occaecat
            proident commodo do. Cupidatat Lorem ut consequat nulla nostrud.
            Laboris elit laboris nisi velit proident culpa.
          </Text>
        )}
      </Center>
      <Flex my="1em">
        <Button
          colorScheme="main"
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
          colorScheme="main"
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
