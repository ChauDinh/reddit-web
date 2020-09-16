import { ThemeProvider, CSSReset } from "@chakra-ui/core";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import theme from "../theme";
import "./index.css";

function MyApp({ Component, pageProps }: any) {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
