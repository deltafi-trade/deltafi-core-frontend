import React from "react";

interface Props {}

const Medium = (props: Props) => {
  return (
    <svg width={26} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <g clipPath="url(#a)">
        <path
          d="M7.384 3C3.49 3 .334 6.179.334 10.1c0 3.92 3.156 7.098 7.05 7.098 3.894 0 7.05-3.178 7.05-7.099C14.435 6.18 11.279 3 7.385 3Zm11.26.416c-1.947 0-3.525 2.993-3.525 6.683s1.578 6.684 3.525 6.684c1.947 0 3.526-2.993 3.526-6.684 0-3.691-1.579-6.683-3.526-6.683Zm5.45.696c-.685 0-1.24 2.68-1.24 5.987s.554 5.988 1.24 5.988c.684 0 1.24-2.682 1.24-5.988 0-3.306-.556-5.987-1.24-5.987Z"
          fill="#F2F2F2"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="#fff" transform="translate(.5)" d="M0 0h25v20H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Medium;
