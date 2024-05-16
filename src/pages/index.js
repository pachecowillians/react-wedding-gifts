import Head from "next/head";
import {
  Container,
  Image,
  Text,
  Center,
  useDisclosure,
  Box,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import MyCard from "@/components/MyCard";
import styles from "@/styles/Home.module.css";
import MyChooseGiftModal from "@/components/modals/MyChooseGiftModal";
import useSWR from "swr";
import { SearchIcon } from "@chakra-ui/icons";
import { GrDeliver } from "react-icons/gr";

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
            Seja bem-vindo à nossa lista de presentes! Nela, reunimos itens que
            desejamos para nossa jornada juntos. Fique à vontade para escolher e
            contribuir como preferir: comprando diretamente ou enviando um PIX.
            Agradecemos imensamente por fazer parte deste momento conosco!
          </Text>
        </Center>
        {data && gifts && gifts.length == 0 ? (
          <Center flexDir="column" gap="0.75em" color="facebook.500" mt="5em">
            <GrDeliver fontSize="3.5em" />
            <Heading fontSize="lg" textAlign="center" mt="1em">
              Ops! Parece que nossos presentes ainda não chegaram ao site.
            </Heading>
            <Text textAlign="center">
              Mas não se preocupe! Estamos prontos para adicionar suas sugestões
              à nossa lista. Se tiver algo em mente, deixe-nos saber.
            </Text>
          </Center>
        ) : data ? (
          <>
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
              {gifts &&
                gifts.map((gift) => (
                  <MyCard
                    key={gift.id}
                    handleOpenModal={handleOpenModal}
                    gift={gift}
                    isChosen={gift.status == "Escolhido"}
                    allowRemove={false}
                  />
                ))}
            </Box>
          </>
        ) : (
          <Spinner mt="4em" size="xl" color="#D1AD74" />
        )}
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
