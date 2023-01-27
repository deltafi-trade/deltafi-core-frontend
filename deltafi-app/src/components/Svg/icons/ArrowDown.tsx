import React from "react";

import { SvgProps } from "../types";

interface BlogProps extends SvgProps {
  isDark: boolean;
}

const Icon: React.FC<BlogProps> = ({ isDark, ...props }) => {
  return (
    <svg viewBox="0 0 10 6" {...props}>
      <path
        d="M1 1L5 5L9 1"
        stroke="white"
        strokeWidth="1.2957"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default Icon;
