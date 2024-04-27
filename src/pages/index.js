import Head from "next/head";
import {
  SimpleGrid,
  Container,
  Image,
  Text,
  Heading,
  Center,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import MyCard from "@/components/MyCard";
import MyModal from "@/components/MyModal";
import { authenticateGoogleSheets } from "@/utils/auth";

export default function Home({ gifts }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cardSelecionado, setCardSelecionado] = useState({
    imageSrc: "",
    title: "",
    price: 0,
  });

  const handleOpenModal = (cardInfo) => {
    setCardSelecionado(cardInfo);
    onOpen();
  };

  return (
    <>
      <Head>
        <title>Lista de Presentes | S & W</title>
        <meta
          name="description"
          content="Lista de presentes para o casamento de Willian e Samara"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="8xl" p="5em 0em">
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
        <SimpleGrid
          gap={50}
          minChildWidth="sm"
          justifyItems="center"
          justifyContent="center"
          alignItems="center"
        >
          {gifts.map((gift, index) => (
            <MyCard
              key={++index}
              handleOpenModal={handleOpenModal}
              data={{
                imageSrc: gift[0],
                title: gift[1],
                price: gift[2],
                situation: gift[3],
              }}
            />
          ))}
        </SimpleGrid>
      </Container>
      <MyModal isOpen={isOpen} onClose={onClose} cardInfo={cardSelecionado} />
    </>
  );
}

export async function getServerSideProps() {
  // Authentication with Google Sheets
  const sheets = await authenticateGoogleSheets();

  const range = `Página1!A:F`;

  try {
    // Get data from the spreadsheet
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    });

    // Extract cell data
    const rows = response.data.values;

    // Remove the header
    const [header, ...gifts] = rows;

    // Return data as props
    return {
      props: {
        gifts,
      },
    };
  } catch (error) {
    console.error("Error fetching spreadsheet data:", error);
    return {
      props: {
        gifts: [],
      },
    };
  }
}
