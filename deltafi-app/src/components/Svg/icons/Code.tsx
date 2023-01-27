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
        d="M18.5 3H3.5V27H24.5V9H18.5V3ZM0.5 1.488C0.5 0.666 1.1705 0 1.9985 0H20L27.5 7.5V28.4895C27.5014 28.6865 27.464 28.8818 27.3898 29.0643C27.3157 29.2468 27.2064 29.413 27.0681 29.5532C26.9298 29.6935 26.7652 29.8052 26.5837 29.8818C26.4023 29.9585 26.2075 29.9986 26.0105 30H1.9895C1.59557 29.9973 1.21853 29.8396 0.939826 29.5612C0.661127 29.2828 0.503142 28.9059 0.5 28.512V1.488ZM22.4855 15L17.1815 20.304L15.0605 18.1815L18.242 15L15.062 11.8185L17.1815 9.696L22.4855 15ZM5.5145 15L10.82 9.696L12.941 11.8185L9.758 15L12.938 18.1815L10.8185 20.304L5.5145 15Z"
        fill={textColor}
        opacity={opacity}
      />
    </Svg>
  );
};

export default Icon;
