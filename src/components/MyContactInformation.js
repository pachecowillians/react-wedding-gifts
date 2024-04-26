import React from "react";
import {
  Text,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";
import { IoPerson } from "react-icons/io5";
import { PhoneIcon } from "@chakra-ui/icons";

const MyContactInformation = () => {
  return (
    <>
      <Text>
        Ullamco incididunt qui ea irure proident enim dolore occaecat proident
        commodo do. Cupidatat Lorem ut consequat nulla nostrud. Laboris elit
        laboris nisi velit proident culpa.
      </Text>
      <Stack spacing={4} mt="2em" mb="1em">
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <IoPerson color="var(--chakra-colors-facebook-500)" />
          </InputLeftElement>
          <Input type="text" placeholder="Nome completo" />
        </InputGroup>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <PhoneIcon color="facebook.500" />
          </InputLeftElement>
          <Input type="tel" placeholder="Número de celular" />
        </InputGroup>
      </Stack>
    </>
  );
};

export default MyContactInformation;
