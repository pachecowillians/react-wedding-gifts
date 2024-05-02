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
            <Text fontSize={{ base: "sm", md: "md", lg: "lg" }}>
              Culpa dolore voluptate mollit sunt sunt id anim proident sint aute
              non.
            </Text>
            <Center mt="1em">
              <SVG
                text={process.env.NEXT_PUBLIC_QRCODE_TEXT}
                options={{
                  margin: 2,
                  width: 170,
                  color: {
                    dark: "#000000",
                    light: "#ffffff",
                  },
                }}
              />
            </Center>
            <Text
              alignSelf="center"
              fontSize={{ base: "sm", md: "md", lg: "lg" }}
              mt="1em"
            >
              {process.env.NEXT_PUBLIC_ACCOUNT_OWNER}
            </Text>
            <Stack
              color="var(--chakra-colors-facebook-500)"
              gap={5}
              alignItems="center"
            >
              <Text
                fontWeight="bold"
                fontSize={{ base: "sm", md: "md", lg: "lg" }}
              >
                Chave: {value}
              </Text>
              <Button
                onClick={onCopy}
                variant="outline"
                colorScheme="gray"
                borderRadius="30em"
                w="11em"
                leftIcon={<CopyIcon />}
                fontSize={{ base: "sm", md: "md", lg: "lg" }}
              >
                {hasCopied ? "Chave copiada!" : "Copiar chave"}
              </Button>
            </Stack>
          </Stack>
        ) : (
          <Text fontSize={{ base: "sm", md: "md", lg: "lg" }}>
            Ullamco incididunt qui ea irure proident enim dolore occaecat
            proident commodo do. Cupidatat Lorem ut consequat nulla nostrud.
            Laboris elit laboris nisi velit proident culpa.
          </Text>
        )}
      </Center>
      <Flex mt={10} mb={3}>
        <Button
          colorScheme="facebook"
          variant="ghost"
          mr={3}
          ml="auto"
          borderRadius="30em"
          w="7em"
          leftIcon={<ArrowBackIcon />}
          fontSize={{ base: "sm", md: "md", lg: "lg" }}
          onClick={() => {
            setActiveStep(0);
          }}
        >
          Voltar
        </Button>
        <Button
          colorScheme="facebook"
          fontSize={{ base: "sm", md: "md", lg: "lg" }}
          borderRadius="30em"
          w="9em"
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
