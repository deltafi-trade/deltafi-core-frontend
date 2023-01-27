import React from "react";
import { Button, ButtonProps, makeStyles, Theme } from "@material-ui/core";

import { MenuIcon } from "components";
import { useDarkMode } from "providers/theme";

const useStyles = makeStyles(({ spacing }: Theme) => ({
  button: {
    minWidth: 42,
    height: 42,
    padding: 0,
    marginLeft: spacing(2),
  },
}));

const MenuButton: React.FC<ButtonProps> = (props) => {
  const { isDark } = useDarkMode();
  const classes = useStyles(props);

  return (
    <Button className={classes.button} {...props}>
      <MenuIcon isDark={isDark} width="42px" />
    </Button>
  );
};

export default React.memo(MenuButton);
