import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

interface YoutubeProps extends SvgProps {
  isDark: boolean;
}

const Icon: React.FC<YoutubeProps> = ({ isDark, ...props }) => {
  const textColor = isDark ? "#FFFFFF" : "#000000";
  return (
    <Svg viewBox="0 0 49 49" {...props}>
      <path
        opacity="0.1"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 24.5C0 10.969 10.969 0 24.5 0C38.031 0 49 10.969 49 24.5C49 38.031 38.031 49 24.5 49C10.969 49 0 38.031 0 24.5Z"
        fill={textColor}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M34.7102 16.0774C35.8347 16.3859 36.7203 17.2951 37.0208 18.4497C37.5669 20.5422 37.5669 24.9083 37.5669 24.9083C37.5669 24.9083 37.5669 29.2742 37.0208 31.3669C36.7203 32.5214 35.8347 33.4306 34.7102 33.7393C32.6724 34.2999 24.5003 34.2999 24.5003 34.2999C24.5003 34.2999 16.3281 34.2999 14.2901 33.7393C13.1657 33.4306 12.2801 32.5214 11.9796 31.3669C11.4336 29.2742 11.4336 24.9083 11.4336 24.9083C11.4336 24.9083 11.4336 20.5422 11.9796 18.4497C12.2801 17.2951 13.1657 16.3859 14.2901 16.0774C16.3281 15.5166 24.5003 15.5166 24.5003 15.5166C24.5003 15.5166 32.6724 15.5166 34.7102 16.0774ZM22.0503 21.2332V29.3999L28.5836 25.3167L22.0503 21.2332Z"
        fill={textColor}
      />
    </Svg>
  );
};

export default Icon;
