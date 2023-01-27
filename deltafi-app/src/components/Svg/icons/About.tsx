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
        d="M18 3C26.2845 3 33 9.7155 33 18C33 26.2845 26.2845 33 18 33C9.7155 33 3 26.2845 3 18C3 9.7155 9.7155 3 18 3ZM18 6C14.8174 6 11.7652 7.26428 9.51472 9.51472C7.26428 11.7652 6 14.8174 6 18C6 21.1826 7.26428 24.2348 9.51472 26.4853C11.7652 28.7357 14.8174 30 18 30C21.1826 30 24.2348 28.7357 26.4853 26.4853C28.7357 24.2348 30 21.1826 30 18C30 14.8174 28.7357 11.7652 26.4853 9.51472C24.2348 7.26428 21.1826 6 18 6V6ZM19.5 13.5L16.5 13.5V10.5L19.5 10.5L19.5 13.5ZM19.5 25.5H16.5L16.5 16.5L19.5 16.5V25.5Z"
        fill={textColor}
        opacity={opacity}
      />
    </Svg>
  );
};

export default Icon;
