import React, { useMemo, useState, useContext } from "react";
import { ThemeProvider as SCThemeProvider } from "styled-components";
import {
  CssBaseline,
  ThemeProvider as MuiThemeProvider,
  StylesProvider,
  Theme,
} from "@material-ui/core";
import { darkTheme, lightTheme } from "theme";
import GlobalStyle from "style/Global";

const ThemeContext = React.createContext({ isDark: null, toggleDarkMode: () => null });

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(darkTheme);
  const isDark = useMemo(() => theme.palette.type === "dark", [theme]);
  const sctheme = useMemo(
    () => ({
      ...theme,
      muibreakpoints: theme.breakpoints,
      breakpoints: Object.values(theme.breakpoints.values).map((breakpoint) => `${breakpoint}px`),
    }),
    [theme],
  );

  const toggleDarkMode = () => {
    setTheme(isDark ? { ...lightTheme } : { ...darkTheme });
  };

  return (
    <ThemeContext.Provider value={{ isDark, toggleDarkMode }}>
      <StylesProvider injectFirst>
        <MuiThemeProvider theme={theme}>
          <SCThemeProvider theme={sctheme}>
            <GlobalStyle />
            <CssBaseline />
            {children}
          </SCThemeProvider>
        </MuiThemeProvider>
      </StylesProvider>
    </ThemeContext.Provider>
  );
};

const useDarkMode = () => {
  const { isDark, toggleDarkMode } = useContext(ThemeContext);
  return { isDark, toggleDarkMode };
};

export { ThemeContext, ThemeContextProvider, useDarkMode };
