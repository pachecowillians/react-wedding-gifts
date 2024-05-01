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

function MyCard({ gift, handleOpenModal, disabled }) {
  const { imageSrc, title, price } = gift;

  return (
    <Card
      maxW="sm"
      w="40vw"
      alignItems="center"
      size="sm"
      boxShadow="2px 4px 12px #00000014"
      borderRadius="1em"
      mb="1.2em"
      p="0.3em"
      style={{ breakInside: "avoid" }}
    >
      <CardBody pb={0}>
        <Image
          src={imageSrc}
          alt={title}
          borderRadius="0.5em"
        />
        <Stack mt="3" spacing="2">
          <Text fontSize="xs">{title}</Text>
          <Text color="blue.600" fontSize="sm">
            {price}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter width="100%" justifyContent="start">
        {disabled ? (
          <Button
            variant="outline"
            colorScheme="gray"
            borderRadius="30em"
            p="1.2em 2em"
            size="xs"
            isDisabled
            leftIcon={<CheckIcon />}
          >
            Escolhido
          </Button>
        ) : (
          <Button
            variant="solid"
            colorScheme="facebook"
            borderRadius="30em"
            width="100%"
            p="1.2em 1.2em"
            size="xs"
            onClick={() => {
              handleOpenModal(gift);
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
