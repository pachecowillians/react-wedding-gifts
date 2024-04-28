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

function MyCard({ data, handleOpenModal, disabled }) {
  const { imageSrc, title, price } = data;

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
        {disabled ? (
          <Button
            variant="solid"
            colorScheme="gray"
            size="lg"
            isDisabled
            leftIcon={<CheckIcon />}
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
              handleOpenModal(data);
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
