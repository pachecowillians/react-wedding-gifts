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
import { useRouter } from "next/router";
import MyConfirmRemoveModal from "@/components/modals/MyConfirmRemoveModal";
import useSWR from "swr";

export default function MyGifts() {
  const router = useRouter();
  const { phone } = router.query;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedGiftData, setSelectedGiftData] = useState({});
  const [gifts, setGifts] = useState([]);

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const { data, error, mutate } = useSWR("/api/gifts", fetcher);

  useEffect(() => {
    if (data) {
      const filteredData = data.filter((object) => {
        if (object.status !== "Escolhido") {
          return false;
        }

        const normalizePhone = (phone) => phone.replace(/\D/g, "");

        const normalizedObjectPhone = normalizePhone(object.phone);
        const normalizedPhone = normalizePhone(phone);

        return (
          normalizedObjectPhone.includes(normalizedPhone) ||
          normalizedPhone.includes(normalizedObjectPhone)
        );
      });

      setGifts(filteredData);
    }
  }, [data, phone]);

  const handleOpenModal = (cardData) => {
    setSelectedGiftData({ ...selectedGiftData, ...cardData });
    onOpen();
  };

  return (
    <>
      <Head>
        <title>Meus Presentes</title>
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
            Meus Presentes
          </Text>
        </Center>
        <Box className={styles.cardsGrid} alignItems="center">
          {data ? (
            gifts.map((gift) => (
              <MyCard
                key={gift.id}
                handleOpenModal={handleOpenModal}
                gift={gift}
                isChosen={gift.status == "Escolhido"}
                allowRemove={true}
              />
            ))
          ) : (
            <Spinner mt="4em" size="xl" color="#D1AD74" />
          )}
        </Box>
      </Container>
      <MyConfirmRemoveModal
        isOpen={isOpen}
        onClose={onClose}
        setSelectedGiftData={setSelectedGiftData}
        fetchGifts={mutate}
      />
    </>
  );
}
