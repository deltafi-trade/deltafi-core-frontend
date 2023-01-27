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
        d="M13.5 0.8145C13.995 0.771 14.4945 0.75 15 0.75C24.5265 0.75 32.25 8.4735 32.25 18C32.25 18.5055 32.229 19.005 32.1855 19.5H29.9265C29.1735 27.0795 22.7775 33 15 33C6.7155 33 0 26.2845 0 18C0 10.2225 5.9205 3.8265 13.5 3.075V0.813V0.8145ZM13.5 19.5V6.093C10.4741 6.47802 7.70828 8.0008 5.76478 10.3518C3.82128 12.7029 2.84592 15.7057 3.03693 18.75C3.22794 21.7944 4.571 24.6518 6.79312 26.7414C9.01524 28.8311 11.9497 29.9962 15 30C17.9229 30 20.7453 28.9332 22.9376 27C25.1299 25.0668 26.5413 22.4 26.907 19.5H13.5ZM29.172 16.5C28.8281 13.2569 27.3825 10.2297 25.0764 7.92358C22.7703 5.61747 19.7431 4.17188 16.5 3.828V16.5H29.172Z"
        fill={textColor}
        opacity={opacity}
      />
    </Svg>
  );
};

export default Icon;
