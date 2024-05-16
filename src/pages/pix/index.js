import Head from "next/head";
import {
  Container,
  Image,
  Text,
  Center,
  Button,
  useClipboard,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { useQRCode } from "next-qrcode";

export default function Pix() {
  const { SVG } = useQRCode();
  const { onCopy, value, setValue, hasCopied } = useClipboard(
    process.env.NEXT_PUBLIC_PIX_KEY
  );

  return (
    <>
      <Head>
        <title>Pix</title>
        <meta
          name="description"
          content="Gift list for the wedding of Willian and Samara"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container centerContent maxW={{ md: "80%" }} mb="9em">
        <Center flexDir="column">
          <Image src="./logo.svg" alt="Logo" mt="3em" boxSize="12em" />
          <Text mx="0.5em" my="2em" textAlign="center">
            Ea deserunt elit duis enim aliquip irure aliquip et occaecat. Et
            laboris anim veniam non est adipisicing magna qui sit. Commodo magna
            eu eu non commodo dolor pariatur occaecat cillum est officia nisi.
          </Text>

          <SVG
            text={process.env.NEXT_PUBLIC_QRCODE_TEXT}
            options={{
              margin: 2,
              width: 250,
              color: {
                dark: "#000000",
                light: "#ffffff",
              },
            }}
          />
        </Center>
        <Text alignSelf="center" fontSize="sm" fontWeight="600" mt="1em" color="facebook.500">
          {process.env.NEXT_PUBLIC_ACCOUNT_OWNER}
        </Text>
        <Button
          onClick={onCopy}
          variant="ghost"
          colorScheme="gray"
          color="facebook.500"
          rightIcon={<CopyIcon fontSize="1.2em"/>}
          fontSize="sm"
          w="fit-content"
          alignSelf="center"
          my="0.5em"
        >
          {hasCopied ? "Chave copiada!" : value}
        </Button>
      </Container>
    </>
  );
}
