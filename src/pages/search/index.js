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
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import { fetchGifts } from "@/utils/fetchGifts";
import MySearchGiftsModal from "@/components/modals/MySearchGiftsModal";
import useSWR from "swr";
import MyChooseGiftModal from "@/components/modals/MyChooseGiftModal";

export default function Search() {
  const router = useRouter();
  const { query } = router.query;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedGiftData, setSelectedGiftData] = useState({});
  const [gifts, setGifts] = useState([]);

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error, mutate } = useSWR("/api/gifts", fetcher);

  useEffect(() => {
    if (data) {
      const removeAccents = (text) =>
        text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

      const filteredData = data.filter((object) => {
        // Normalize both the title and search term to lowercase and remove accents
        const normalizedTitle = removeAccents(object.title).toLowerCase();
        const searchTerm = query ? removeAccents(query).toLowerCase() : query;

        // Check if the normalized title contains the normalized search term
        return normalizedTitle.includes(searchTerm);
      });

      setGifts(filteredData);
    }
  }, [data, query]);

  const handleOpenModal = (cardData) => {
    setSelectedGiftData({ ...selectedGiftData, ...cardData });
    onOpen();
  };

  return (
    <>
      <Head>
        <title>Buscar</title>
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
            {query}
          </Text>
        </Center>
        <Box className={styles.cardsGrid} alignItems="center">
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
