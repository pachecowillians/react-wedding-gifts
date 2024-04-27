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

import { google } from "googleapis";

export async function getServerSideProps() {
  // Autenticação com o Google Sheets
  const auth = await google.auth.getClient({
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  const range = `Página1!A:F`;

  try {
    // Obter os dados da planilha
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.SHEET_ID,
      range,
    });

    // Extrair os dados das células
    const rows = response.data.values;

    // Remover o cabeçalho
    const [header1, header2, ...gifts] = rows;

    // Retornar os dados como props
    return {
      props: {
        gifts,
      },
    };
  } catch (error) {
    console.error("Erro ao obter os dados da planilha:", error);
    return {
      props: {
        gifts: [],
      },
    };
  }
}

export default function Home({ gifts }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cardSelecionado, setCardSelecionado] = useState({
    // Define um estado inicial para o cardSelecionado
    imageSrc: "",
    title: "",
    price: 0,
  });

  // Função para lidar com a abertura do modal e definir o card selecionado
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
              key={index}
              handleOpenModal={handleOpenModal}
              cardInfo={{
                imageSrc: gift[0],
                title: gift[1],
                price: gift[2],
              }}
            />
          ))}
        </SimpleGrid>
      </Container>
      <MyModal isOpen={isOpen} onClose={onClose} cardInfo={cardSelecionado} />
    </>
  );
}
