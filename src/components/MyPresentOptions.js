import React from "react";
import { Button, Flex, Text } from "@chakra-ui/react";
import { FaPix } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";

const MyPresentOptions = ({ giftData, setGiftData, setActiveStep }) => {
  return (
    <>
      <Text>
        Ullamco incididunt qui ea irure proident enim dolore occaecat proident
        commodo do. Cupidatat Lorem ut consequat nulla nostrud. Laboris elit
        laboris nisi velit proident culpa.
      </Text>
      <Flex mt={5} mb={3}>
        <Button
          colorScheme="facebook"
          variant="ghost"
          mr={3}
          onClick={() => {
            setGiftData({ ...giftData, paymentMethod: "pix" });
            setActiveStep(1);
          }}
          ml="auto"
          leftIcon={<FaPix />}
        >
          PIX
        </Button>
        <Button
          colorScheme="facebook"
          variant="ghost"
          onClick={() => {
            setGiftData({ ...giftData, paymentMethod: "buy" });
            setActiveStep(1);
          }}
          leftIcon={<FaShoppingCart />}
        >
          Eu Compro
        </Button>
      </Flex>
    </>
  );
};

export default MyPresentOptions;
