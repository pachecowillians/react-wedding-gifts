import React from "react";
import {
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import { ArrowForwardIcon, CheckIcon } from "@chakra-ui/icons";

function MyCard({ cardInfo, handleOpenModal }) {
  const { imageSrc, title, price, situation } = cardInfo;

  return (
    <Card maxW="sm" w="85vw" alignItems="center" size="lg">
      <CardBody>
        <Image
          src={imageSrc}
          alt={title}
          borderRadius="lg"
          boxSize="20em"
          objectFit="fill"
        />
        <Stack mt="6" spacing="3" alignItems="center">
          <Heading size="md" fontWeight="400">
            {title}
          </Heading>
          <Text color="blue.600" fontSize="2xl">
            {price}
          </Text>
        </Stack>
      </CardBody>
      <Divider color="gray.200" />
      <CardFooter>
        {situation == "Escolhido" ? (
          <Button
          variant="solid"
          colorScheme="facebook"
          size="lg"
          isDisabled
          leftIcon={<CheckIcon />}
          onClick={() => {
            handleOpenModal(cardInfo);
          }}
        >
          Escolhido
        </Button>
        ) : (
          <Button
            variant="solid"
            colorScheme="facebook"
            size="lg"
            rightIcon={<ArrowForwardIcon />}
            onClick={() => {
              handleOpenModal(cardInfo);
            }}
          >
            Escolher
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

export default MyCard;
