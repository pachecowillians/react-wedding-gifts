import Head from "next/head";
import {
  Container,
  Image,
  Text,
  Center,
  useDisclosure,
  Box,
  Spinner,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MyCard from "@/components/MyCard";
import styles from "@/styles/Home.module.css";
import MyChooseGiftModal from "@/components/modals/MyChooseGiftModal";
import useSWR from "swr";

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedGiftData, setSelectedGiftData] = useState({});
  const [gifts, setGifts] = useState([]);

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error, mutate } = useSWR("/api/gifts", fetcher);

  useEffect(() => {
    setGifts(data);
  }, [data]);

  const handleOpenModal = (cardData) => {
    setSelectedGiftData({ ...selectedGiftData, ...cardData });
    onOpen();
  };

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
            Bem-vindo à nossa lista de presentes! <br />
            Aqui você encontra os itens que mais curtimos e que gostaríamos de
            ter na nossa nova jornada juntos. <br />
            Dê uma olhada, escolha o que quiser e decida como contribuir:
            comprando diretamente ou enviando um PIX pra gente. <br />
            E se quiserem dar uma força extra, a chave PIX está aqui pra receber
            qualquer contribuição adicional. <br />
            Obrigado por fazer parte desse momento com a gente!
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
        <Box className={styles.cardsGrid} alignItems="center">
          {gifts ? (
            gifts.map((gift) => (
              <MyCard
                key={gift.id}
                handleOpenModal={handleOpenModal}
                gift={gift}
                isChosen={gift.status == "Escolhido"}
                allowRemove={false}
              />
            ))
          ) : (
            <Spinner mt="4em" size="xl" color="#D1AD74" />
          )}
        </Box>
      </Container>
      <MyChooseGiftModal
        isOpen={isOpen}
        onClose={onClose}
        selectedGiftData={selectedGiftData}
        setSelectedGiftData={setSelectedGiftData}
        fetchGifts={mutate}
      />
    </>
  );
}
