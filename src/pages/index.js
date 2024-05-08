import Head from "next/head";
import {
  SimpleGrid,
  Container,
  Image,
  Text,
  Heading,
  Center,
  useDisclosure,
  Box,
  Button,
  Stack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MyCard from "@/components/MyCard";
import MyModal from "@/components/MyModal";
import styles from "@/styles/Home.module.css";
import { AddIcon } from "@chakra-ui/icons";
import MyDrawer from "@/components/MyDrawer";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isDrawerOpen,
    onOpen: onDrawerOpen,
    onClose: onDrawerClose,
  } = useDisclosure();
  const [gifts, setGifts] = useState([]);
  const [selectedGiftData, setSelectedGiftData] = useState({});

  const handleOpenModal = (cardData) => {
    setSelectedGiftData({ ...selectedGiftData, ...cardData });
    onOpen();
  };

  const fetchGifts = async () => {
    try {
      const response = await fetch("/api/gifts");
      if (!response.ok) {
        throw new Error("Failed to fetch gifts");
      }
      const data = await response.json();
      setGifts(data);
    } catch (error) {
      console.error("Error fetching gifts:", error);
    }
  };

  useEffect(() => {
    fetchGifts();
    // onDrawerOpen();
    // const interval = setInterval(fetchGifts, 30000);

    // return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Lista de Presentes | S & W</title>
        <meta
          name="description"
          content="Gift list for the wedding of Willian and Samara"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container centerContent>
        {/* <Button
          leftIcon={<AddIcon />}
          colorScheme="teal"
          onClick={onDrawerOpen}
        >
          Meus presentes
        </Button> */}
        <Center flexDir="column">
          <Image
            src="./logo.svg"
            alt="Logo"
            mt="3em"
            boxSize={{ base: "12em", md: "13em" }}
          />
          <Text mx="0.5em" mt="3em" textAlign="center">
            Ea deserunt elit duis enim aliquip irure aliquip et occaecat. Et
            laboris anim veniam non est adipisicing magna qui sit. Commodo magna
            eu eu non commodo dolor pariatur occaecat cillum est officia nisi.
            Consectetur tempor proident labore aute laborum veniam duis. Lorem
            sint non enim labore eiusmod nostrud ut minim cillum. Pariatur aute
          </Text>
        </Center>
        <Text
          as="h4"
          mt="3em"
          mb="1.5em"
          mx="0.5em"
          fontSize="1.5em"
          textTransform="uppercase"
          fontWeight="400"
          alignSelf="start"
        >
          Lista de Presentes
        </Text>
        <Stack
          // className={styles.cardsGrid}
          alignItems="center"
          gap="3em"
          // margin={{ base: "0 1em", md: "0 3em" }}
        >
          {gifts.map((gift) => (
            <MyCard
              key={gift.id}
              handleOpenModal={handleOpenModal}
              gift={gift}
              disabled={gift.status == "Escolhido"}
            />
          ))}
        </Stack>
      </Container>
      <MyModal
        isOpen={isOpen}
        onClose={onClose}
        selectedGiftData={selectedGiftData}
        setSelectedGiftData={setSelectedGiftData}
        fetchGifts={fetchGifts}
      />
      <MyDrawer
        isOpen={isDrawerOpen}
        onOpen={onDrawerOpen}
        onClose={onDrawerClose}
      />
    </>
  );
}
