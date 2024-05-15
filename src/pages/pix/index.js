import Head from "next/head";
import {
  Container,
  Image,
  Text,
  Center,
  useDisclosure,
  Box,
  Button,
  Stack,
  useClipboard,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MyCard from "@/components/MyCard";
import MyModal from "@/components/MyModal";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { fetchGifts } from "@/utils/fetchGifts";
import { CheckIcon, CopyIcon } from "@chakra-ui/icons";
import { useQRCode } from "next-qrcode";

export default function Pix({ data }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedGiftData, setSelectedGiftData] = useState({});
  const [gifts, setGifts] = useState([]);

  const handleOpenModal = (cardData) => {
    setSelectedGiftData({ ...selectedGiftData, ...cardData });
    onOpen();
  };
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
      <Container centerContent maxW={{ md: "80%" }} mb="5em">
        <Center flexDir="column">
          <Image src="./logo.svg" alt="Logo" mt="3em" boxSize="12em" />
          <Text mx="0.5em" my="3em" textAlign="center">
            Ea deserunt elit duis enim aliquip irure aliquip et occaecat. Et
            laboris anim veniam non est adipisicing magna qui sit. Commodo magna
            eu eu non commodo dolor pariatur occaecat cillum est officia nisi.
          </Text>

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
          colorScheme="gray"
          color="facebook.500"
          rightIcon={<CopyIcon />}
          fontSize="sm"
          w="fit-content"
          alignSelf="center"
          my="0.5em"
        >
          {hasCopied ? "Chave copiada!" : value}
        </Button>
        <Button
          colorScheme="facebook"
          fontSize="sm"
          mt="1em"
          leftIcon={<CheckIcon />}
          onClick={() => {
            setActiveStep(2);
          }}
        >
          Finalizar
        </Button>
      </Container>
      <MyModal
        isOpen={isOpen}
        onClose={onClose}
        selectedGiftData={selectedGiftData}
        setSelectedGiftData={setSelectedGiftData}
        fetchGifts={fetchGifts}
      />
    </>
  );
}
