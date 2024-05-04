import React from "react";
import {
  Button,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Stack,
  Box,
  Input,
  Card,
  Heading,
  Text,
  Image,
  Flex,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { DeleteIcon, Search2Icon } from "@chakra-ui/icons";

function MyDrawer({ isOpen, onOpen, onClose, initialFocusRef }) {
  const firstField = React.useRef();

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="right"
        initialFocusRef={initialFocusRef || firstField}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton top="1em"/>
          <DrawerHeader borderBottomWidth="1px">Meus Presentes</DrawerHeader>

          <DrawerBody>
              <Box my="1em">

                <InputGroup>
                  <Input
                    ref={firstField}
                    colorScheme="facebook"
                    id="username"
                    type="tel"
                    w="100%"
                    placeholder="Digite seu telefone"
                    focusBorderColor="facebook.500"
                    variant="flushed"
                  />
                  <InputRightElement mr={2}>
                    <Search2Icon color="facebook.500" />
                  </InputRightElement>
                </InputGroup>
              </Box>

              <Stack alignItems="center" gap="2em" my="3em">
                {[...Array(5)].map((_, index) => (
                  <Card
                    key={index}
                    direction="column"
                    variant="outline"
                    borderRadius="xl"
                    overflow="hidden"
                    maxW="90%"
                  >
                    <Image
                      objectFit="cover"
                      src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                      alt="Caffe Latte"
                    />
                    <Stack p="1.3em" gap="1em">
                      <Heading size="sm">
                        Micro-ondas Philco 25L PM26 Limpa Fácil 1100W 220V
                      </Heading>
                      <Flex
                        w="full"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Flex alignItems="center">
                          <Text fontSize="0.5em" mr="0.3em" fontWeight="bold">
                            R$
                          </Text>
                          <Text lineHeight="normal">1233</Text>
                          <Text fontSize="0.6em" alignSelf="end" ml="0.2em">
                            30
                          </Text>
                        </Flex>
                        <Button
                          variant="ghost"
                          colorScheme="red"
                          leftIcon={<DeleteIcon />}
                          alignSelf="end"
                          fontSize="sm"
                        >
                          Remover
                        </Button>
                      </Flex>
                    </Stack>
                  </Card>
                ))}
              </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default MyDrawer;
