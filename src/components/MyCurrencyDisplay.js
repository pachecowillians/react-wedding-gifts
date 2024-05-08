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
    <Flex alignItems="center" fontWeight="400" color="main.500">
      <Text fontSize="0.75em" mr="0.3em">
        R$
      </Text>
      <Text lineHeight="normal" fontSize="1.125em">{reais}</Text>
      <Text lineHeight="initial" fontSize="0.75em" alignSelf="end" ml="0.175em" mb="1px">
        {cents}
      </Text>
    </Flex>
  );
};

export default MyCurrencyDisplay;
