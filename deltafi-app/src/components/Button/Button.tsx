import React from "react";
import { Button as MuiButton, ButtonProps, makeStyles, Theme } from "@material-ui/core";

interface IButtonProps extends ButtonProps {
  isRound?: boolean;
}

const useStyles = makeStyles<Theme, IButtonProps>(({ palette, spacing }: Theme) => ({
  button: {
    fontWeight: "bold",
    borderRadius: ({ isRound }) => (isRound ? spacing(3) : spacing(1)),
  },
}));

const Button: React.FC<IButtonProps> = ({ children, ...props }) => {
  const classes = useStyles(props);

  return (
    <MuiButton {...props} className={classes.button}>
      {children}
    </MuiButton>
  );
};

export default React.memo(Button);
