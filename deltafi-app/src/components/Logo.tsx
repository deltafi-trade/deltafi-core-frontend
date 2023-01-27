import React from "react";
import { Box, Link } from "@material-ui/core";

interface Props {
  isDark: boolean;
  href: string;
}

const Logo: React.FC<Props> = ({ isDark, href }) => {
  return (
    <Box>
      <Link underline="none" href={href} aria-label="DeltaFi home page">
        <img src="/horizontal 60.svg" alt="logo" />
      </Link>
    </Box>
  );
};

export default React.memo(Logo, (prev, next) => prev.isDark === next.isDark);
