import { createTheme, responsiveFontSizes } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core";
import React from "react";

declare module "@material-ui/core/styles/createTheme" {
  export interface Theme {
    status?: {
      danger: React.CSSProperties["color"];
    };
  }
  export interface ThemeOptions {
    status?: {
      danger: React.CSSProperties["color"];
    };
  }
}

declare module "@material-ui/core/styles/createPalette" {
  export interface Palette {
    gradient?: {
      cta: React.CSSProperties["color"];
      btnCta?: React.CSSProperties["color"];
      ctaContained?: React.CSSProperties["color"];
      logo?: React.CSSProperties["color"];
    };
    tertiary?: {
      main: React.CSSProperties["color"];
    };
  }
  export interface PaletteOptions {
    gradient?: {
      cta: React.CSSProperties["color"];
      btnCta?: React.CSSProperties["color"];
      ctaContained?: React.CSSProperties["color"];
      logo?: React.CSSProperties["color"];
    };
    tertiary?: {
      main: React.CSSProperties["color"];
    };
  }
  export interface TypeBackground {
    bgImage?: React.CSSProperties["background"];
    investorBg?: string;
    primary?: React.CSSProperties["color"];
    secondary?: React.CSSProperties["color"];
    tertiary?: React.CSSProperties["color"];
    black?: React.CSSProperties["color"];
    lightBlack?: React.CSSProperties["color"];
  }
  export interface TypeBackgroundOptions {
    bgImage?: React.CSSProperties["background"];
    investorBg?: string;
    primary?: React.CSSProperties["color"];
    secondary?: React.CSSProperties["color"];
    tertiary?: React.CSSProperties["color"];
    black?: React.CSSProperties["color"];
    lightBlack?: React.CSSProperties["color"];
  }
  export interface TypeText {
    crypto?: React.CSSProperties["color"];
    dark?: React.CSSProperties["color"];
    link?: React.CSSProperties["color"];
    success?: React.CSSProperties["color"];
    blue?: React.CSSProperties["color"];
  }
  export interface TypeTextOptions {
    crypto?: React.CSSProperties["color"];
    link?: React.CSSProperties["color"];
    success?: React.CSSProperties["color"];
    blue?: React.CSSProperties["color"];
  }
}

const baseTheme: Theme = createTheme({
  typography: {
    fontFamily: ["Poppins", "DM Sans", "sans-serif"].join(","),
  },
  status: {
    danger: "#ff0000",
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
    get down() {
      return (key) => `@media (max-width:${this.values[key]}px)`;
    },
  },
  mixins: {
    toolbar: {
      minHeight: 96,
      "@media (max-width: 600px) and (orientation: landscape)": {
        minHeight: 48,
      },
      "@media (max-width: 960px)": {
        minHeight: 65,
      },
    },
  },
});

const darkTheme: Theme = createTheme({
  ...responsiveFontSizes(baseTheme),
  palette: {
    type: "dark",
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#949292",
    },
    tertiary: {
      main: "#C3C5CA",
    },
    background: {
      bgImage: 'url("/images/bg.png") center center / 100% 100% no-repeat', // eslint-disable-line
      investorBg: "url(/images/investors-bg-dark.png)",
      primary: "#1D1A27",
      secondary: "#2F2C3E",
      default: "rgb(35, 36, 47)",
      tertiary: "#13111A",
      black: "#000000",
      lightBlack: "#15161D",
      // secondaryBlack: '#15161D',
    },
    gradient: {
      cta: "linear-gradient(rgb(35, 36, 47) 0%, rgb(12, 12, 19) 100%)",
      btnCta: "linear-gradient(90deg, #7A6FFF 0%, #B372CE 50.52%, #FF7586 100%)",
      ctaContained: "linear-gradient(229.09deg, rgba(229, 124, 255, 0.81) 13.9%, #4558FF 85.28%)",
      logo: "linear-gradient(314.49deg, #4048FF 0%, #FF6492 97.42%)",
    },
    text: {
      crypto: "#515369",
      link: "#C94A75",
      success: "#0B9409",
      blue: "#2B8CFF",
      dark: "#D3D3D3",
    },
  },
  overrides: {
    MuiIconButton: {
      root: {
        padding: 0,
      },
    },
  },
});

const lightTheme: Theme = createTheme({
  ...responsiveFontSizes(baseTheme),
  palette: {
    type: "light",
    primary: {
      main: "#F43F5E",
    },
    secondary: {
      main: "#6B7280",
    },
    tertiary: {
      main: "#C3C5CA",
    },
    background: {
      bgImage: 'url("/images/light-bg.png") center center / 100% 100% no-repeat', // eslint-disable-line
      investorBg: "url(/images/investors-bg-light.png)",
      primary: "#FFFFFF",
      secondary: "rgb(235, 236, 241)",
      default: "#EBECF1",
    },
    gradient: {
      cta: "linear-gradient(168.15deg, rgb(255, 255, 255) -145.84%, rgb(224, 219, 239) 148.53%)",
    },
    text: {
      crypto: "#515369",
    },
  },
});

export { darkTheme, lightTheme };
