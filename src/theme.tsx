import { theme as chakraTheme } from "@chakra-ui/core";

const fonts = {
  heading: "Source Sans Pro, sans serif",
  body: "Source Sans Pro, sans serif",
  mono: "Source Sans Pro, sans serif",
};

const fontWeight = {
  normal: 400,
  medium: 500,
  bold: 700,
};

const breakpoints = ["40em", "52em", "64em"];

const theme = {
  ...chakraTheme,
  colors: {
    ...chakraTheme.colors,
    black: "#16161D",
    orange: {
      50: "#ffe9dd",
      100: "#ffc5af",
      200: "#ffa17e",
      300: "#ff7c4c",
      400: "#ff581a",
      500: "#ff4500",
      600: "#b42f00",
      700: "#812100",
      800: "#4f1200",
      900: "#210300",
    },
    grey: {
      50: "#f8f0f2",
      100: "#d9d9d9",
      200: "#d9d9d9",
      300: "#d9d9d9",
      400: "#d9d9d9",
      500: "#d9d9d9",
      600: "#8c8c8c",
      700: "#737373",
      800: "#595959",
      900: "#404040",
    },
    purple: {
      50: "#e2ebff",
      100: "#b3c3ff",
      200: "#829cfc",
      300: "#5274f9",
      400: "#224df6",
      500: "#0933dd",
      600: "#0328ad",
      700: "#001c7d",
      800: "#00114e",
      900: "#000620",
    },
  },
  fontWeight,
  fonts,
  breakpoints,
  icons: {
    ...chakraTheme.icons,
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

export default theme;
