import Head from "next/head";
import {
  Container,
  Image,
  Text,
  Center,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MyCard from "@/components/MyCard";
import MyModal from "@/components/MyModal";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    // const interval = setInterval(fetchGifts, 30000);

    // return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>Lista de Presentes</title>
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
        <Box
          className={styles.cardsGrid}
          alignItems="center"
        >
          {gifts.map((gift) => (
            <MyCard
              key={gift.id}
              handleOpenModal={handleOpenModal}
              gift={gift}
              isChosen={gift.status == "Escolhido"}
              allowRemove={false}
            />
          ))}
        </Box>
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
