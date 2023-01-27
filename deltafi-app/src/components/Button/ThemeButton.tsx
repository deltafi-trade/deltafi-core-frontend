import React from "react";
import { SunIcon, MoonIcon } from "components";
import { IconButtonProps, IconButton } from "@material-ui/core";

interface Props extends IconButtonProps {
  isDark: boolean;
  toggleDarkMode: () => void;
}

const ThemeButton: React.FC<Props> = ({ isDark, toggleDarkMode, ...rest }) => {
  return (
    <IconButton {...rest} onClick={toggleDarkMode}>
      {isDark ? <SunIcon /> : <MoonIcon />}
    </IconButton>
  );
};

export default React.memo(ThemeButton, (prev, next) => prev.isDark === next.isDark);
