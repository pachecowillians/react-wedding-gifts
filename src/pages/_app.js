import theme from "@/themes/theme";
import { SearchIcon } from "@chakra-ui/icons";
import {
  Center,
  ChakraProvider,
  Flex,
  Icon,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { IoHomeOutline, IoSearchOutline } from "react-icons/io5";
import { AiOutlineGift, AiOutlineHome } from "react-icons/ai";
import { BsXDiamond } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MySearchGiftsModal from "@/components/modals/MySearchGiftsModal";
import MySearchUserModal from "@/components/modals/MySearchUserModal";

export default function App({ Component, pageProps }) {
  const [selectedPage, setSelectedPage] = useState("home"); // Defina a página inicialmente como 'home'
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isSearchOpen,
    onOpen: onSearchOpen,
    onClose: onSearchClose,
  } = useDisclosure();

  const router = useRouter();

  useEffect(() => {
    setSelectedPage("home");
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <Center w="full" px="1.75em" position="fixed" bottom="2em">
        <Flex
          w="full"
          maxW="25em"
          h="4.25em"
          bg="white"
          borderRadius="full"
          alignItems="center"
          justifyContent="space-evenly"
          boxShadow="xl"
        >
          <IconButton
            aria-label="Search Gifts"
            icon={<Icon as={AiOutlineHome} />}
            isRound={true}
            size="lg"
            w={selectedPage == "home" ? "3em" : "0em"}
            fontSize="1.375em"
            colorScheme={selectedPage == "home" ? "facebook" : "black"}
            variant={selectedPage == "home" ? "solid" : "ghost"}
            onClick={() => {
              router.push({
                pathname: '/',
              }, undefined, { shallow: true }); 
              setSelectedPage("home");
            }}
            transition="all ease 0.3s"
          />
          <IconButton
            aria-label="Search Gifts"
            icon={<Icon as={BsXDiamond} />}
            isRound={true}
            size="lg"
            w={selectedPage == "pix" ? "3em" : "0em"}
            fontSize="1.375em"
            colorScheme={selectedPage == "pix" ? "facebook" : "black"}
            variant={selectedPage == "pix" ? "solid" : "ghost"}
            onClick={() => {
              router.push({
                pathname: '/pix',
              }, undefined, { shallow: true }); 
              setSelectedPage("pix");
            }}
            transition="all ease 0.3s"
          />
          <IconButton
            aria-label="Search Gifts"
            icon={<Icon as={IoSearchOutline} />}
            isRound={true}
            size="lg"
            w={selectedPage == "search" ? "3em" : "0em"}
            fontSize="1.375em"
            colorScheme={selectedPage == "search" ? "facebook" : "black"}
            variant={selectedPage == "search" ? "solid" : "ghost"}
            onClick={() => {
              onSearchOpen();
            }}
            transition="all ease 0.3s"
          />
          <IconButton
            aria-label="Search Gifts"
            icon={<Icon as={AiOutlineGift} />}
            isRound={true}
            size="lg"
            w={selectedPage == "my-gifts" ? "3em" : "0em"}
            fontSize="1.375em"
            colorScheme={selectedPage == "my-gifts" ? "facebook" : "black"}
            variant={selectedPage == "my-gifts" ? "solid" : "ghost"}
            onClick={() => {
              onOpen();
            }}
            transition="all ease 0.3s"
          />
        </Flex>
      </Center>
      <MySearchUserModal
        isOpen={isOpen}
        onClose={onClose}
        setSelectedPage={setSelectedPage}
      />
      <MySearchGiftsModal
        isOpen={isSearchOpen}
        onClose={onSearchClose}
        setSelectedPage={setSelectedPage}
      />
    </ChakraProvider>
  );
}
