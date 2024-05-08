import { Flex, Text } from "@chakra-ui/react";

const MyCurrencyDisplay = ({ price }) => {
  // Remove the "R$" from the string
  let valueWithoutSymbol = price;
  if (price.includes("R$")) {
    valueWithoutSymbol = price.replace("R$ ", "");
  }

  // Split the reais and cents
  const [reais, cents] = valueWithoutSymbol.split(",");

  return (
    <Flex alignItems="center" fontWeight="500" color="main.500">
      <Text fontSize="0.75em" mr="0.3em">
        R$
      </Text>
      <Text lineHeight="normal">{reais}</Text>
      <Text fontSize="0.6em" alignSelf="end" ml="0.2em">
        {cents}
      </Text>
    </Flex>
  );
};

export default MyCurrencyDisplay;
