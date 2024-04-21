import Head from "next/head";
import {
  SimpleGrid,
  Card,
  CardBody,
  Container,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  Button,
} from "@chakra-ui/react";

import { ArrowForwardIcon } from "@chakra-ui/icons";

export default function Home() {
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
      <Container maxW="8xl" p="5em">
        <SimpleGrid gap={50} minChildWidth="sm" justifyItems="center">
          {[...Array(20)].map((_, index) => (
            <Card key={index} maxW="sm">
              <CardBody>
                <Image
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  alt="Green double couch with wooden legs"
                  borderRadius="lg"
                />
                <Stack mt="6" spacing="3">
                  <Heading size="md">Living room Sofa</Heading>
                  <Text>
                    This sofa is perfect for modern tropical spaces, baroque
                    inspired spaces, earthy toned spaces and for people who love
                    a chic design with a sprinkle of vintage design.
                  </Text>
                  <Text color="blue.600" fontSize="2xl">
                    $450
                  </Text>
                </Stack>
              </CardBody>
              <Divider color="gray.200" />
              <CardFooter>
                <Button
                  variant="solid"
                  colorScheme="facebook"
                  size="md"
                  rightIcon={<ArrowForwardIcon />}
                >
                  Escolher
                </Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}
