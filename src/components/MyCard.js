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
      w="fit-content"
      alignItems="center"
      size="sm"
      boxShadow="2px 4px 12px #00000014"
      borderRadius="1em"
      mb={{base:"1.2em", md:"1.5em", lg: "2em"}}
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
          <Text fontSize={{base: "sm", md:"sm", lg: "md"}}>{title}</Text>
          <Text color="blue.600" fontSize={{base: "sm", md:"sm", lg: "md"}}>
            {price}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter width="100%" justifyContent="center">
        {disabled ? (
          <Button
            variant="outline"
            colorScheme="gray"
            borderRadius="30em"
            w="100%"
            fontSize={{ base: "sm", md: "md", lg: "lg" }}
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
            w="100%"
            fontSize={{ base: "sm", md: "md", lg: "lg" }}
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
