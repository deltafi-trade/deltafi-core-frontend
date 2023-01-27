import React from "react";
import Svg from "./../../Svg";
import { SvgProps } from "./../../types";

const Icon: React.FC<SvgProps> = ({ ...props }) => {
  return (
    <Svg viewBox="0 0 29 29" {...props}>
      <rect width="29" height="29" rx="7" fill="url(#paint0_linear_3586_13861)" />
      <path
        d="M19.9875 8.08548L6.70041 13.3803C5.79362 13.7567 5.79886 14.2794 6.53404 14.5125L9.94537 15.6122L17.8382 10.4661C18.2114 10.2314 18.5524 10.3577 18.2721 10.6148L11.8774 16.5787H11.8759L11.8774 16.5795L11.642 20.2131C11.9868 20.2131 12.1389 20.0497 12.3323 19.8569L13.9892 18.1919L17.4358 20.8226C18.0713 21.1843 18.5277 20.9984 18.6858 20.2147L20.9483 9.19602C21.1798 8.23649 20.5938 7.80203 19.9875 8.08548Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3586_13861"
          x1="29"
          y1="29"
          x2="0.499999"
          y2="1"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#4048FF" />
          <stop offset="1" stopColor="#FF4B81" />
        </linearGradient>
      </defs>
    </Svg>
  );
};

export default Icon;
