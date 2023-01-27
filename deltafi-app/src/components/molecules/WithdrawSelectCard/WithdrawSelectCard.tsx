import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Slider from "rc-slider";

import { Text } from "components/Text";
import useStyles from "./styles";

import "rc-slider/assets/index.css";

const WithdrawSelectCard = ({ onUpdatePercentage, percentage }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography className={classes.title}>
        Select the percentage of your position to withdraw:{" "}
      </Typography>
      <Box className={classes.content}>
        <Box className={classes.percent}>
          <Text className="slider-value" fontFamily="'Inter', sans-serif">
            {percentage ? Number(percentage).toFixed(2) : 0}%
          </Text>
        </Box>
        <Slider
          min={0}
          max={100}
          value={percentage}
          handleStyle={{
            background: "#C94A75",
            border: "1px solid #FFF",
            top: 4,
            width: 20,
            height: 20,
          }}
          trackStyle={{ background: "#C94A75", height: 8, borderRadius: 4 }}
          railStyle={{ background: "#D3D3D3", height: 8, borderRadius: 4 }}
          onChange={onUpdatePercentage}
        />
      </Box>
    </Box>
  );
};

export default WithdrawSelectCard;
