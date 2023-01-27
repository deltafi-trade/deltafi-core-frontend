import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

interface BlogProps extends SvgProps {
  isDark: boolean;
}

const Icon: React.FC<BlogProps> = ({ isDark, ...props }) => {
  const textColor = isDark ? "#FFFFFF" : "#23242F";
  const opacity = isDark ? 1.0 : 0.8;
  return (
    <Svg viewBox="0 0 36 36" {...props}>
      <path
        d="M25.5 30H4.5C3.30653 30 2.16193 29.5259 1.31802 28.682C0.474106 27.8381 0 26.6935 0 25.5V1.5C0 1.10218 0.158035 0.720644 0.43934 0.43934C0.720644 0.158035 1.10218 0 1.5 0H22.5C22.8978 0 23.2794 0.158035 23.5607 0.43934C23.842 0.720644 24 1.10218 24 1.5V19.5H30V25.5C30 26.6935 29.5259 27.8381 28.682 28.682C27.8381 29.5259 26.6935 30 25.5 30ZM24 22.5V25.5C24 25.8978 24.158 26.2794 24.4393 26.5607C24.7206 26.842 25.1022 27 25.5 27C25.8978 27 26.2794 26.842 26.5607 26.5607C26.842 26.2794 27 25.8978 27 25.5V22.5H24ZM21 27V3H3V25.5C3 25.8978 3.15804 26.2794 3.43934 26.5607C3.72064 26.842 4.10218 27 4.5 27H21ZM6 7.5H18V10.5H6V7.5ZM6 13.5H18V16.5H6V13.5ZM6 19.5H13.5V22.5H6V19.5Z"
        fill={textColor}
        opacity={opacity}
      />
    </Svg>
  );
};

export default Icon;
