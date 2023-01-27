import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

interface MenuProps extends SvgProps {
  isDark: boolean;
}

const Icon: React.FC<MenuProps> = ({ isDark, ...props }) => {
  const textColor = isDark ? "#FFFFFF" : "#000000";
  const backColor = isDark ? "#3B3C4E" : "#FFFFFF";
  return (
    <Svg viewBox="0 0 48 48" {...props}>
      <rect width="48" height="48" rx="12" fill={backColor} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 26V26C15.895 26 15 25.105 15 24V24C15 22.895 15.895 22 17 22V22C18.105 22 19 22.895 19 24V24C19 25.105 18.105 26 17 26Z"
        stroke={textColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 26V26C22.895 26 22 25.105 22 24V24C22 22.895 22.895 22 24 22V22C25.105 22 26 22.895 26 24V24C26 25.105 25.105 26 24 26Z"
        stroke={textColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31 26V26C29.895 26 29 25.105 29 24V24C29 22.895 29.895 22 31 22V22C32.105 22 33 22.895 33 24V24C33 25.105 32.105 26 31 26Z"
        stroke={textColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 33V33C15.895 33 15 32.105 15 31V31C15 29.895 15.895 29 17 29V29C18.105 29 19 29.895 19 31V31C19 32.105 18.105 33 17 33Z"
        stroke={textColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 33V33C22.895 33 22 32.105 22 31V31C22 29.895 22.895 29 24 29V29C25.105 29 26 29.895 26 31V31C26 32.105 25.105 33 24 33Z"
        stroke={textColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31 33V33C29.895 33 29 32.105 29 31V31C29 29.895 29.895 29 31 29V29C32.105 29 33 29.895 33 31V31C33 32.105 32.105 33 31 33Z"
        stroke={textColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17 19V19C15.895 19 15 18.105 15 17V17C15 15.895 15.895 15 17 15V15C18.105 15 19 15.895 19 17V17C19 18.105 18.105 19 17 19Z"
        stroke={textColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 19V19C22.895 19 22 18.105 22 17V17C22 15.895 22.895 15 24 15V15C25.105 15 26 15.895 26 17V17C26 18.105 25.105 19 24 19Z"
        stroke={textColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M31 19V19C29.895 19 29 18.105 29 17V17C29 15.895 29.895 15 31 15V15C32.105 15 33 15.895 33 17V17C33 18.105 32.105 19 31 19Z"
        stroke={textColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

export default Icon;
