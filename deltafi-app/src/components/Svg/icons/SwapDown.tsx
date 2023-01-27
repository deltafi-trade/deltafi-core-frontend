import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

interface BlogProps extends SvgProps {
  isDark: boolean;
}

const Icon: React.FC<BlogProps> = ({ isDark, ...props }) => {
  const textColor = isDark ? "#FFFFFF" : "#23242F";
  return (
    <Svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...props}>
      <path
        d="M6 13.375L7.17833 12.1967L9.29167 14.31V3.33333H10.9583V14.31L13.0717 12.1967L14.25 13.375L10.125 17.5L6 13.375Z"
        fill={textColor}
      />
    </Svg>
  );
};

export default Icon;
