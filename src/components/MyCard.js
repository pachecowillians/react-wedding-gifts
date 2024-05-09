import React from "react";
import {
  Card,
  Image,
  Stack,
  Heading,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import MyCurrencyDisplay from "./MyCurrencyDisplay";

function MyCard({ gift, handleOpenModal, disabled }) {
  const { imageSrc, title, price } = gift;

  return (
    <Card
      direction="column"
      variant="outline"
      borderRadius="xl"
      overflow="hidden"
      mx="0.5em"
      maxW="25em"
      mb="2.5em"
    >
      <Image objectFit="cover" src={imageSrc} alt={title} />
      <Stack p="1.5em" gap="1.5em">
        <Heading size="sm">{title}</Heading>
        <Flex w="full" justifyContent="space-between" alignItems="center">
          <MyCurrencyDisplay price={price} />
          <Button
            colorScheme={disabled ? "gray" : "facebook"}
            alignSelf="end"
            fontSize="md"
            isDisabled={disabled}
            onClick={() => {
              if (!disabled) {
                handleOpenModal(gift);
              }
            }}
          >
            {disabled ? "Escolhido" : "Escolher"}
          </Button>
        </Flex>
      </Stack>
    </Card>
  );
}

export default MyCard;
