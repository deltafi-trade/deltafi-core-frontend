import React from "react";
import { Box, Typography, Slider } from "@material-ui/core";
import { Theme, makeStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";

const useStyles = makeStyles(({ breakpoints, palette, spacing }: Theme) => ({
  root: {
    background: palette.background.secondary,
    padding: spacing(2),
    borderRadius: 16,
    [breakpoints.up("md")]: {
      padding: `${spacing(3)}px ${spacing(2.5)}px`,
    },
  },
  label: {
    backgroundColor: palette.background.tertiary,
    width: 156,
    borderRadius: 28,
    marginRight: 25,
  },
}));

const CustomSlider = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.text.link,
    height: 8,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: theme.palette.text.link,
    border: "1px solid white",
    marginTop: -6,
    marginLeft: -10,
    "&:focus, &:hover": {
      boxShadow: "inherit",
    },
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
}))(Slider);

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
}

const PercentageSlider: React.FC<SliderProps> = (props) => {
  const classes = useStyles();
  const { value, onChange } = props;

  const handleChange = (_: any, newValue: number | number[]) => {
    onChange(newValue as number);
  };

  return (
    <Box className={classes.root}>
      <Typography>Select the percentage of your position to stake:</Typography>
      <Box display="flex" alignItems="center" mt={2.5}>
        <Box className={classes.label} py={2} textAlign="center">
          <Typography>{value}%</Typography>
        </Box>
        <CustomSlider
          value={value}
          onChange={handleChange}
          aria-labelledby="continuous-slider"
          step={0.01}
        />
      </Box>
    </Box>
  );
};

export default PercentageSlider;
