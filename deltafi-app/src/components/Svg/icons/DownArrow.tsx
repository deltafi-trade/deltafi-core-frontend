import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

interface BlogProps extends SvgProps {
  isDark: boolean;
}

const Icon: React.FC<BlogProps> = ({ isDark, ...props }) => {
  const textColor = isDark ? "#FFFFFF" : "#1A1919";
  return (
    <Svg viewBox="0 0 8 5" {...props}>
      <path d="M4.39732 4L7.79956 0.25H0.995079L4.39732 4Z" fill={textColor} />
    </Svg>
  );
};

export default Icon;
