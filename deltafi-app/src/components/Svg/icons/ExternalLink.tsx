import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

interface LinkProps extends SvgProps {
  isDark: boolean;
}

const Icon: React.FC<LinkProps> = ({ isDark, ...props }) => {
  const textColor = isDark ? "#F6F6F6" : "#15161D";
  const opacity = isDark ? 1 : 0.8;
  return (
    <Svg viewBox="0 0 16 16" {...props}>
      <path
        d="M6.33333 0.5V2.16667H2.16667V13.8333H13.8333V9.66667H15.5V14.6667C15.5 14.8877 15.4122 15.0996 15.2559 15.2559C15.0996 15.4122 14.8877 15.5 14.6667 15.5H1.33333C1.11232 15.5 0.900358 15.4122 0.744078 15.2559C0.587797 15.0996 0.5 14.8877 0.5 14.6667V1.33333C0.5 1.11232 0.587797 0.900358 0.744078 0.744078C0.900358 0.587797 1.11232 0.5 1.33333 0.5H6.33333ZM12.655 2.16667H8.83333V0.5H15.5V7.16667H13.8333V3.345L8 9.17833L6.82167 8L12.655 2.16667Z"
        fill={textColor}
        fillOpacity={opacity}
      />
    </Svg>
  );
};

export default Icon;
