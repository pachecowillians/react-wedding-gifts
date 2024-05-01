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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MyCard from "@/components/MyCard";
import MyModal from "@/components/MyModal";

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
        <title>Lista de Presentes | S & W</title>
        <meta
          name="description"
          content="Gift list for the wedding of Willian and Samara"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="8xl" p="5em 0em" centerContent>
        <Center flexDir="column">
          <Image
            src="./logo.svg"
            alt="Logo"
            boxSize={{ base: "12em", md: "13em" }}
          />
          <Text maxW="70vw" m="3em" textAlign="center">
            Ea deserunt elit duis enim aliquip irure aliquip et occaecat. Et
            laboris anim veniam non est adipisicing magna qui sit. Commodo magna
            eu eu non commodo dolor pariatur occaecat cillum est officia nisi.
            Consectetur tempor proident labore aute laborum veniam duis. Lorem
            sint non enim labore eiusmod nostrud ut minim cillum. Pariatur aute
          </Text>
        </Center>
        <Heading
          m="1.5em"
          textTransform="upper"
          fontWeight="400"
          textAlign={{ base: "center", md: "left" }}
        >
          Lista de Presentes
        </Heading>
        <Box display="block" style={{ columnCount: 2, columnGap: "1.5em" }}>
          {gifts.map((gift) => (
            <MyCard
              key={gift.id}
              handleOpenModal={handleOpenModal}
              gift={gift}
              disabled={gift.status == "Escolhido"}
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
