import React from 'react';
import { Center, Image, Text } from '@chakra-ui/react';

const MyPayment = ({ paymentMethod }) => {
  return (
    <Center>
      {paymentMethod === "pix" ? (
        <Image
          src="qrcode.jpeg"
          alt="PIX"
          borderRadius="lg"
          height="30em"
          justifySelf="center"
          objectFit="fill"
        />
      ) : (
        <Text>
          Ullamco incididunt qui ea irure proident enim dolore
          occaecat proident commodo do. Cupidatat Lorem ut consequat
          nulla nostrud. Laboris elit laboris nisi velit proident
          culpa.
        </Text>
      )}
    </Center>
  );
};

export default MyPayment;
