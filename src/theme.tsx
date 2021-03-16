import {
  theme as chakraTheme,
  extendTheme,
  useColorModeValue,
} from "@chakra-ui/react";

const fonts = {
  heading: "Lato, SF Pro Display, -apple-system, sans-serif",
  body: "Lato, -apple-system, sans-serif",
  mono: "Lato, -apple-system, sans-serif",
};

const fontWeight = {
  normal: 400,
  medium: 500,
  bold: 700,
};

const configs = {
  initialColorMode: "light",
  useSystemColorMode: false,
  colors: {
    ...chakraTheme.colors,
    black: "#16161D",
  },
  fontWeight,
  fonts,
  // breakpoints: breakpoints,
  icons: {
    // ...chakraTheme.icons,
    logo: {
      path: (
        <svg
          width="3000"
          height="3163"
          viewBox="0 0 3000 3163"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="3000" height="3162.95" fill="none" />
          <path
            d="M1470.89 1448.81L2170 2488.19H820V706.392H2170L1470.89 1448.81ZM1408.21 1515.37L909.196 2045.3V2393.46H1998.84L1408.21 1515.37Z"
            fill="currentColor"
          />
        </svg>
      ),
      viewBox: "0 0 3000 3163",
    },
  },
};

const theme = extendTheme({
  ...chakraTheme,
  configs,
});

export default theme;
