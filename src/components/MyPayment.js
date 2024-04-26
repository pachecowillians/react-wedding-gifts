import React from "react";
import {
  Button,
  Center,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Heading,
  Image,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useQRCode } from "next-qrcode";
import { useClipboard } from "@chakra-ui/react";
import { FaKey } from "react-icons/fa";
import { CopyIcon } from "@chakra-ui/icons";

const MyPayment = ({ paymentMethod }) => {
  const { SVG } = useQRCode();
  const { onCopy, value, setValue, hasCopied } = useClipboard(process.env.NEXT_PUBLIC_PIX_KEY);
  return (
    <Center>
      {paymentMethod === "pix" ? (
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
          <Text alignSelf="center">{process.env.NEXT_PUBLIC_ACCOUNT_OWNER}</Text>
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
          Ullamco incididunt qui ea irure proident enim dolore occaecat proident
          commodo do. Cupidatat Lorem ut consequat nulla nostrud. Laboris elit
          laboris nisi velit proident culpa.
        </Text>
      )}
    </Center>
  );
};

export default MyPayment;
