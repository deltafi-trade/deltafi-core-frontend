import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 43 43" {...props}>
      <rect width="43" height="43" rx="21.5" fill="url(#paint0_linear)" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 5.54852C22.426 5.55628 22.8062 5.81798 22.9656 6.21322L26.7611 15.626C27.0261 16.2833 26.5423 17 25.8337 17H24.1288C23.7214 17 23.3548 16.7529 23.2019 16.3753L21.9834 13.3662C21.6524 12.5489 20.5026 12.5288 20.1433 13.334L12.9013 29.5631C12.6061 30.2245 13.0902 30.9706 13.8145 30.9706H27.6281C28.3374 30.9706 28.8212 30.2527 28.555 29.5952L27.2512 26.3753C26.985 25.7179 27.4688 25 28.1781 25H29.8659C30.2738 25 30.6408 25.2477 30.7934 25.626L33.2165 31.6355C33.3485 31.9628 33.3093 32.3343 33.1118 32.6268C32.9143 32.9194 32.5844 33.0947 32.2315 33.0947H10.6363C10.2765 33.0947 9.94115 32.9125 9.74532 32.6107C9.54949 32.3089 9.51979 31.9284 9.66641 31.5998L21.0107 6.17761C21.1844 5.78843 21.5739 5.54075 22 5.54852Z"
        fill="white"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="21.5"
          y1="0"
          x2="21.5"
          y2="43"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FF5E79" />
          <stop offset="1" stopColor="#DC0640" />
        </linearGradient>
      </defs>
    </Svg>
  );
};

export default Icon;
