import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { FaPix } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";

const MyPresentOptions = ({ selectedGiftData, setSelectedGiftData, setActiveStep }) => {
  return (
    <>
      <Text fontSize={{base: "sm", md:"md", lg: "lg"}}>
        Ullamco incididunt qui ea irure proident enim dolore occaecat proident
        commodo do. Cupidatat Lorem ut consequat nulla nostrud. Laboris elit
        laboris nisi velit proident culpa.
      </Text>
      <Flex mt={5} mb={3}>
        <Button
          colorScheme="facebook"
          variant="ghost"
          mr={3}
          ml="auto"
          borderRadius="30em"
          w="6em"
          leftIcon={<FaPix />}
          fontSize={{ base: "sm", md: "md", lg: "lg" }}
          onClick={() => {
            setSelectedGiftData({ ...selectedGiftData, paymentMethod: "pix" });
            setActiveStep(1);
          }}
        >
          PIX
        </Button>
        <Button
          colorScheme="facebook"
          variant="ghost"
          borderRadius="30em"
          w="9em"
          leftIcon={<FaShoppingCart />}
          fontSize={{ base: "sm", md: "md", lg: "lg" }}
          onClick={() => {
            setSelectedGiftData({ ...selectedGiftData, paymentMethod: "comprar" });
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
