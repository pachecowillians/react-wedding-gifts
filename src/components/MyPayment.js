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
          <Stack spacing={2}>
            <Text fontSize="sm">
              Culpa dolore voluptate mollit sunt sunt id anim proident sint aute
              non.
            </Text>
            <Center mt="1em">
              <SVG
                text={process.env.NEXT_PUBLIC_QRCODE_TEXT}
                options={{
                  margin: 2,
                  width: 200,
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
              mt="1em"
            >
              {process.env.NEXT_PUBLIC_ACCOUNT_OWNER}
            </Text>
            <Stack
              color="var(--chakra-colors-main-500)"
              gap={5}
              alignItems="center"
            >
              {/* <Text
                fontWeight="bold"
                fontSize="sm"
              >
                {value}
              </Text> */}
              <Button
                onClick={onCopy}
                variant="outline"
                colorScheme="main"
                rightIcon={<CopyIcon />}
                fontSize="sm"
                mt="0.75em"
              >
                {hasCopied ? "Chave copiada!" : value}
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Text fontSize="sm">
            Ullamco incididunt qui ea irure proident enim dolore occaecat
            proident commodo do. Cupidatat Lorem ut consequat nulla nostrud.
            Laboris elit laboris nisi velit proident culpa.
          </Text>
        )}
      </Center>
      <Flex mb="1em" mt="2em">
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
          Confirmar
        </Button>
      </Flex>
    </>
  );
};

export default MyPayment;
