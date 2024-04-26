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

// Vetor com URLs de imagens diferentes
const images = [
  "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  "https://images.unsplash.com/photo-1617325247661-675ab4b64ae2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

function getRandomImage() {
  // Seleciona aleatoriamente um índice do vetor de imagens
  const randomIndex = Math.floor(Math.random() * images.length);
  // Retorna a URL da imagem correspondente ao índice selecionado
  return images[randomIndex];
}

export default function Home() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cardSelecionado, setCardSelecionado] = useState({ // Define um estado inicial para o cardSelecionado
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
          {[...Array(20)].map((_, index) => (
            <MyCard
              key={index}
              handleOpenModal={handleOpenModal}
              cardInfo={{ 
                imageSrc: getRandomImage(),
                title: "Cama de Casal",
                price: 450.0,
              }}
            />
          ))}
        </SimpleGrid>
      </Container>
      {/* Passa o estado do card selecionado para o componente MyModal */}
      <MyModal isOpen={isOpen} onClose={onClose} cardInfo={cardSelecionado}/>
    </>
  );
}
