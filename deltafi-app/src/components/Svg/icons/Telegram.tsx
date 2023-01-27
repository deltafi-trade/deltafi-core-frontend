import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

interface TelegramProps extends SvgProps {
  isDark: boolean;
}

const Icon: React.FC<TelegramProps> = ({ isDark, ...props }) => {
  const textColor = isDark ? "#FFFFFF" : "#000000";
  // const innerColor = isDark ? '#000000' : '#FFFFFF'
  return (
    <Svg width={19} height={16} {...props}>
      <path
        d="m18.946 1.45-2.868 13.522c-.216.955-.78 1.192-1.582.743l-4.368-3.22-2.108 2.028c-.234.233-.429.428-.878.428l.314-4.45 8.097-7.316c.352-.314-.077-.487-.548-.174L4.995 9.314.687 7.965c-.937-.292-.954-.937.195-1.386L17.737.085c.78-.293 1.463.174 1.209 1.366Z"
        fill={textColor}
      />
    </Svg>
  );
};

export default Icon;
