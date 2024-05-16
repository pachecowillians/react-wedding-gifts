import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { FaPix } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";

const MyPresentOptions = ({
  selectedGiftData,
  setSelectedGiftData,
  setActiveStep,
}) => {
  return (
    <>
      <Text fontSize="sm">
        Escolha a melhor forma de presentear!
        <br /> Você pode nos enviar o valor equivalente ao presente via PIX, e
        cuidaremos de tudo para você, ou, se preferir, pode comprar o presente
        você mesmo. A decisão é sua!
      </Text>
      <Flex my="1em">
        <Button
          colorScheme="facebook"
          variant="ghost"
          mr={3}
          ml="auto"
          leftIcon={<FaPix />}
          fontSize="sm"
          onClick={() => {
            setSelectedGiftData({ ...selectedGiftData, paymentMethod: "pix" });
            setActiveStep(1);
          }}
        >
          Pix
        </Button>
        <Button
          colorScheme="facebook"
          variant="ghost"
          leftIcon={<FaShoppingCart />}
          fontSize="sm"
          onClick={() => {
            setSelectedGiftData({
              ...selectedGiftData,
              paymentMethod: "comprar",
            });
            setActiveStep(1);
          }}
        >
          Eu Compro
        </Button>
      </Flex>
    </>
  );
};

export default MyPresentOptions;
