import React from "react";
import Svg from "./../../Svg";
import { SvgProps } from "./../../types";

const Icon: React.FC<SvgProps> = ({ ...props }) => {
  return (
    <Svg viewBox="0 0 29 29" {...props}>
      <rect width="29" height="29" rx="7" fill="url(#paint0_linear_3586_13856)" />
      <path
        d="M9.6604 11.244C9.66898 11.1603 9.65749 11.0758 9.62686 10.9973C9.59623 10.9187 9.5473 10.8483 9.484 10.7916L8.1764 9.23306V9H12.235L15.3724 15.8097L18.1304 9H22V9.23306L20.8821 10.2925C20.8347 10.3284 20.7982 10.3763 20.7764 10.431C20.7545 10.4858 20.7483 10.5453 20.7582 10.6032V18.3954C20.7483 18.4533 20.7545 18.5129 20.7764 18.5676C20.7982 18.6223 20.8347 18.6702 20.8821 18.7061L21.9741 19.7662V20H16.4833V19.7669L17.6145 18.6807C17.7258 18.5707 17.7258 18.5384 17.7258 18.3706V12.0718L14.5814 19.9739H14.1572L10.4962 12.0718V17.3683C10.4661 17.5903 10.541 17.8151 10.6992 17.976L12.1699 19.7415V19.9739H8V19.7415L9.47 17.976C9.54778 17.8963 9.6055 17.7998 9.63856 17.6943C9.67162 17.5888 9.6791 17.4771 9.6604 17.3683V11.244Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3586_13856"
          x1="29"
          y1="29"
          x2="0.499999"
          y2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#434BFF" />
          <stop offset="1" stopColor="#FF4B81" />
        </linearGradient>
      </defs>
    </Svg>
  );
};

export default Icon;