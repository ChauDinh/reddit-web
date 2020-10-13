import { ThemeProvider, CSSReset, ColorModeProvider } from "@chakra-ui/core";

import theme from "../theme";
import "./index.css";

function MyApp({ Component, pageProps }: any) {
  return (
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <CSSReset />
          <Component {...pageProps} />
        </ColorModeProvider>
      </ThemeProvider>

  );
}

export default MyApp;
