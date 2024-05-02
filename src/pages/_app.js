import { ChakraProvider } from "@chakra-ui/react";
import { Open_Sans } from "next/font/google";

const inter = Open_Sans({ weight: ["400", "700"], subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <div className={inter.className}>
        <Component {...pageProps} />
      </div>
    </ChakraProvider>
  );
}
