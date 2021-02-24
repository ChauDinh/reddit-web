import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import Head from "next/head";

import theme from "../theme";
import "./index.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "prismjs/themes/prism-tomorrow.css";

function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Head>
        <link
          rel="shortcut icon"
          href="https://res.cloudinary.com/dnlthcx1a/image/upload/v1614050755/Group_236_2x_eaksr9.png"
        />
        <title>Implement - Online blog platform</title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
